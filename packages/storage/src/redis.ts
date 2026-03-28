import { Redis } from "@upstash/redis";

// Lazy init: Redis SDK must not be called at module load time.
let _redis: Redis | null = null;
const getRedis = (): Redis =>
  _redis ??
  (_redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  }));

export const redis = new Proxy({} as Redis, {
  get: (_, prop) => {
    const client = getRedis();
    const value = client[prop as keyof Redis];
    return typeof value === "function" ? (value as Function).bind(client) : value;
  },
});
