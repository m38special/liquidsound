import { S3Client } from "@aws-sdk/client-s3";

// Cloudflare R2 is S3-compatible — use the AWS SDK with a custom endpoint
export const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!,
  },
});

export const R2_BUCKET = process.env.CLOUDFLARE_R2_BUCKET_NAME ?? "liquid-sound-media";
export const R2_PUBLIC_URL = process.env.NEXT_PUBLIC_R2_PUBLIC_URL ?? "";
