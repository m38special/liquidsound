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
    return typeof value === "function" ? (value as Function).bind(q) : value;
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
