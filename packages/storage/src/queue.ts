import { Queue, Worker, Job } from "bullmq";
import { Redis } from "ioredis";

export interface RenderJobData {
  jobId: string;
  compositionId: string;
  inputProps: Record<string, unknown>;
  serveUrl: string;
  functionName: string;
  region: string;
}

export type RenderJobResult = {
  renderId: string;
  bucketName: string;
  outputUrl: string;
};

const connection = new Redis(process.env.UPSTASH_REDIS_URL!, {
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
  tls: process.env.UPSTASH_REDIS_URL?.startsWith("rediss://") ? {} : undefined,
});

export const renderQueue = new Queue<RenderJobData, RenderJobResult>("video-renders", {
  connection,
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: "exponential", delay: 5000 },
    removeOnComplete: { count: 100 },
    removeOnFail: { count: 50 },
  },
});

export function createRenderWorker(
  processor: (job: Job<RenderJobData, RenderJobResult>) => Promise<RenderJobResult>
): Worker<RenderJobData, RenderJobResult> {
  return new Worker<RenderJobData, RenderJobResult>("video-renders", processor, {
    connection,
    concurrency: 5,
  });
}
