import { renderMediaOnLambda, getRenderProgress } from "@remotion/lambda/client";
import { createRenderWorker, RenderJobData, RenderJobResult } from "@liquid-sound/storage";

// BullMQ worker — processes video render jobs via Remotion Lambda
// Run with: npx ts-node src/worker/renderWorker.ts (or via Docker in production)
const worker = createRenderWorker(
  async (job): Promise<RenderJobResult> => {
    const { jobId, compositionId, inputProps, serveUrl, functionName, region } = job.data;

    job.log(`Starting render: ${compositionId} (job ${jobId})`);

    const { renderId, bucketName } = await renderMediaOnLambda({
      region: region as Parameters<typeof renderMediaOnLambda>[0]["region"],
      functionName,
      serveUrl,
      composition: compositionId,
      inputProps,
      codec: "h264",
      downloadBehavior: { type: "download", fileName: `${compositionId}-${jobId}.mp4` },
      outName: `renders/${compositionId}/${jobId}.mp4`,
      // Notify our webhook when render completes
      webhook: process.env.NEXT_PUBLIC_APP_URL
        ? {
            url: `${process.env.NEXT_PUBLIC_APP_URL}/api/videos/webhook`,
            secret: process.env.RENDER_WEBHOOK_SECRET ?? "",
          }
        : undefined,
    });

    job.log(`Render started: renderId=${renderId}, bucket=${bucketName}`);

    // Poll for completion (Remotion Lambda is async — webhook handles the final update,
    // but we wait here so BullMQ can report success/failure correctly)
    for (let i = 0; i < 300; i++) {
      await new Promise((r) => setTimeout(r, 3000));

      const progress = await getRenderProgress({
        renderId,
        bucketName,
        functionName,
        region: region as Parameters<typeof getRenderProgress>[0]["region"],
      });

      await job.updateProgress(Math.round(progress.overallProgress * 100));

      if (progress.done && progress.outputFile) {
        const outputUrl = progress.outputFile;
        job.log(`Render complete: ${outputUrl}`);
        return { renderId, bucketName, outputUrl };
      }

      if (progress.fatalErrorEncountered) {
        const errMsg = progress.errors?.[0]?.message ?? "Unknown Lambda error";
        throw new Error(`Remotion Lambda render failed: ${errMsg}`);
      }
    }

    throw new Error("Render timed out after 15 minutes");
  }
);

worker.on("completed", (job, result) => {
  console.log(`[worker] Job ${job.id} completed: ${result.outputUrl}`);
});

worker.on("failed", (job, err) => {
  console.error(`[worker] Job ${job?.id} failed: ${err.message}`);
});

console.log("[worker] Render worker started — waiting for jobs...");
