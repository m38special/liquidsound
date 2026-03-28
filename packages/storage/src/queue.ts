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

// TikTok pipeline queue — accepts raw scripts, worker handles TTS + render enqueue
export interface TikTokPipelineJobData {
  jobId: string; // DB video_render_jobs id to update on completion
  script: {
    title: string;
    slides: Array<{ text: string }>;
    hashtags?: string[];
    cta?: string;
  };
}

export type TikTokPipelineJobResult = {
  jobId: string;
  totalFrames: number;
};

const TIKTOK_PIPELINE_QUEUE = "tiktok-pipeline";

const QUEUE_NAME = "video-renders";

// Lazy init: ioredis and BullMQ must not connect at module load time.
let _connection: Redis | null = null;
const getConnection = (): Redis =>
  _connection ??
  (_connection = new Redis(process.env.UPSTASH_REDIS_URL!, {
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
    tls: process.env.UPSTASH_REDIS_URL?.startsWith("rediss://") ? {} : undefined,
  }));

let _renderQueue: Queue<RenderJobData, RenderJobResult> | null = null;
const getRenderQueue = (): Queue<RenderJobData, RenderJobResult> =>
  _renderQueue ??
  (_renderQueue = new Queue<RenderJobData, RenderJobResult>(QUEUE_NAME, {
    connection: getConnection(),
    defaultJobOptions: {
      attempts: 3,
      backoff: { type: "exponential", delay: 5000 },
      removeOnComplete: { count: 100 },
      removeOnFail: { count: 50 },
    },
  }));

export const renderQueue = new Proxy({} as Queue<RenderJobData, RenderJobResult>, {
  get: (_, prop) => {
    const q = getRenderQueue();
    const value = q[prop as keyof Queue<RenderJobData, RenderJobResult>];
    return typeof value === "function" ? (value as (...args: unknown[]) => unknown).bind(q) : value;
  },
});

export function createRenderWorker(
  processor: (job: Job<RenderJobData, RenderJobResult>) => Promise<RenderJobResult>
): Worker<RenderJobData, RenderJobResult> {
  return new Worker<RenderJobData, RenderJobResult>(QUEUE_NAME, processor, {
    connection: getConnection(),
    concurrency: 5,
  });
}

// TikTok pipeline queue (separate from render queue — runs TTS before render enqueue)
let _tikTokQueue: Queue<TikTokPipelineJobData, TikTokPipelineJobResult> | null = null;
const getTikTokQueue = (): Queue<TikTokPipelineJobData, TikTokPipelineJobResult> =>
  _tikTokQueue ??
  (_tikTokQueue = new Queue<TikTokPipelineJobData, TikTokPipelineJobResult>(TIKTOK_PIPELINE_QUEUE, {
    connection: getConnection(),
    defaultJobOptions: {
      attempts: 2,
      backoff: { type: "exponential", delay: 10000 },
      removeOnComplete: { count: 50 },
      removeOnFail: { count: 25 },
    },
  }));

export const tikTokPipelineQueue = new Proxy(
  {} as Queue<TikTokPipelineJobData, TikTokPipelineJobResult>,
  {
    get: (_, prop) => {
      const q = getTikTokQueue();
      const value = q[prop as keyof Queue<TikTokPipelineJobData, TikTokPipelineJobResult>];
      return typeof value === "function"
        ? (value as (...args: unknown[]) => unknown).bind(q)
        : value;
    },
  }
);

export function createTikTokPipelineWorker(
  processor: (
    job: Job<TikTokPipelineJobData, TikTokPipelineJobResult>
  ) => Promise<TikTokPipelineJobResult>
): Worker<TikTokPipelineJobData, TikTokPipelineJobResult> {
  return new Worker<TikTokPipelineJobData, TikTokPipelineJobResult>(
    TIKTOK_PIPELINE_QUEUE,
    processor,
    { connection: getConnection(), concurrency: 2 }
  );
}
