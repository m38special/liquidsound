import { S3Client } from "@aws-sdk/client-s3";

export const R2_BUCKET = process.env.CLOUDFLARE_R2_BUCKET_NAME ?? "liquid-sound-media";
export const R2_PUBLIC_URL = process.env.NEXT_PUBLIC_R2_PUBLIC_URL ?? "";

// Lazy init: S3Client must not be instantiated at module load time.
let _r2: S3Client | null = null;
const getR2 = (): S3Client =>
  _r2 ??
  (_r2 = new S3Client({
    region: "auto",
    endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
      secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!,
    },
  }));

export const r2 = new Proxy({} as S3Client, {
  get: (_, prop) => {
    const client = getR2();
    const value = client[prop as keyof S3Client];
    return typeof value === "function" ? (value as Function).bind(client) : value;
  },
});
