import { renderQueue } from "@liquid-sound/storage";
import { TikTokScript, TikTokSlideData } from "@liquid-sound/types";
import { synthesizeSlideAudio } from "../utils/tts";

const FPS = 30;
// Minimum slide duration (frames) even if audio is short
const MIN_SLIDE_FRAMES = FPS * 2; // 2s
// Padding added after each slide's audio (frames)
const SLIDE_PADDING_FRAMES = Math.round(FPS * 0.5); // 0.5s

export interface TikTokPipelineResult {
  jobId: string;
  totalFrames: number;
  durationSecs: number;
}

/**
 * Run the full TikTok pipeline:
 * 1. Generate TTS audio for each slide via AWS Polly → upload to R2
 * 2. Calculate frame counts from audio durations
 * 3. Enqueue a Remotion Lambda render job for TikTokSlide
 */
export async function runTikTokPipeline(
  script: TikTokScript,
  jobId: string
): Promise<TikTokPipelineResult> {
  console.log(
    `[tikTokPipeline] Starting pipeline for "${script.title}" (${script.slides.length} slides)`
  );

  // Step 1: Generate TTS audio for each slide in parallel
  const ttsResults = await Promise.all(
    script.slides.map(async (slide, i) => {
      console.log(`[tikTokPipeline] Synthesizing audio for slide ${i + 1}/${script.slides.length}`);
      const result = await synthesizeSlideAudio(slide.text);
      return result;
    })
  );

  // Step 2: Build slide data with frame counts
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
  const durationSecs = totalFrames / FPS;

  console.log(
    `[tikTokPipeline] Total duration: ${durationSecs.toFixed(1)}s (${totalFrames} frames). Enqueueing render.`
  );

  // Step 3: Enqueue Remotion Lambda render
  await renderQueue.add(
    `tiktok-${jobId}`,
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

  return { jobId, totalFrames, durationSecs };
}
