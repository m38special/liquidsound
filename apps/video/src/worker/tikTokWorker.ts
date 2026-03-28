import {
  createTikTokPipelineWorker,
  renderQueue,
  TikTokPipelineJobResult,
} from "@liquid-sound/storage";
import { TikTokSlideData } from "@liquid-sound/types";
import { synthesizeSlideAudio } from "../utils/tts";

const FPS = 30;
const MIN_SLIDE_FRAMES = FPS * 2; // 2s minimum per slide
const SLIDE_PADDING_FRAMES = Math.round(FPS * 0.5); // 0.5s silence after audio

// BullMQ worker — processes TikTok pipeline jobs
// Run with: pnpm ts-node src/worker/tikTokWorker.ts
const worker = createTikTokPipelineWorker(async (job): Promise<TikTokPipelineJobResult> => {
  const { jobId, script } = job.data;

  job.log(`[tikTokWorker] Pipeline start: "${script.title}" (${script.slides.length} slides)`);

  // Step 1: Generate TTS audio for each slide in parallel
  const ttsResults = await Promise.all(
    script.slides.map(async (slide, i) => {
      job.log(
        `[tikTokWorker] TTS slide ${i + 1}/${script.slides.length}: "${slide.text.slice(0, 40)}..."`
      );
      return synthesizeSlideAudio(slide.text);
    })
  );

  // Step 2: Build slide data with frame timing from audio durations
  const slides: TikTokSlideData[] = script.slides.map((slide, i) => {
    const tts = ttsResults[i]!;
    const audioFrames = Math.ceil((tts.durationMs / 1000) * FPS);
    const durationInFrames = Math.max(MIN_SLIDE_FRAMES, audioFrames + SLIDE_PADDING_FRAMES);

    return {
      text: slide.text,
      audioUrl: tts.audioUrl,
      durationInFrames,
    };
  });

  const totalFrames = slides.reduce((sum, s) => sum + s.durationInFrames, 0);
  const durationSecs = (totalFrames / FPS).toFixed(1);

  job.log(`[tikTokWorker] TTS complete. Total duration: ${durationSecs}s. Enqueueing render.`);

  await job.updateProgress(50);

  // Step 3: Enqueue Remotion Lambda render job
  await renderQueue.add(
    `tiktok-render-${jobId}`,
    {
      jobId,
      compositionId: "TikTokSlide",
      inputProps: {
        slides,
        hashtags: script.hashtags ?? ["liquidsound", "music", "tiktok"],
        cta: script.cta ?? "Follow for more",
      },
      serveUrl: process.env.REMOTION_LAMBDA_SERVE_URL!,
      functionName: process.env.REMOTION_LAMBDA_FUNCTION_NAME!,
      region: process.env.AWS_REGION ?? "us-east-2",
    },
    { jobId }
  );

  await job.updateProgress(100);
  job.log(`[tikTokWorker] Render job enqueued for ${jobId}`);

  return { jobId, totalFrames };
});

worker.on("completed", (job, result) => {
  console.log(
    `[tikTokWorker] Job ${job.id} done — ${result.totalFrames} frames enqueued for render`
  );
});

worker.on("failed", (job, err) => {
  console.error(`[tikTokWorker] Job ${job?.id} failed: ${err.message}`);
});

console.log("[tikTokWorker] Started — waiting for TikTok pipeline jobs...");
