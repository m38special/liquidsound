import { db, videoRenderJobs } from "@liquid-sound/db";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";

interface RenderWebhookPayload {
  jobId: string;
  renderId: string;
  bucketName: string;
  outputUrl?: string;
  errorMessage?: string;
  type: "success" | "error" | "progress";
}

function verifyWebhookSignature(body: string, signature: string | null): boolean {
  const secret = process.env.RENDER_WEBHOOK_SECRET;
  if (!secret || !signature) return false;

  const expected = createHmac("sha256", secret).update(body).digest("hex");
  const expectedBuf = Buffer.from(`sha256=${expected}`);
  const sigBuf = Buffer.from(signature);

  if (expectedBuf.length !== sigBuf.length) return false;
  return timingSafeEqual(expectedBuf, sigBuf);
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-render-signature");

  if (!verifyWebhookSignature(rawBody, signature)) {
    return NextResponse.json({ success: false, error: "Invalid signature" }, { status: 401 });
  }

  let payload: RenderWebhookPayload;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON" }, { status: 400 });
  }

  const { jobId, renderId, bucketName, outputUrl, errorMessage, type } = payload;

  if (type === "success" && outputUrl) {
    await db
      .update(videoRenderJobs)
      .set({
        status: "done",
        outputUrl,
        remotionRenderId: renderId,
        remotionBucketName: bucketName,
        updatedAt: new Date(),
      })
      .where(eq(videoRenderJobs.id, jobId));
  } else if (type === "error") {
    await db
      .update(videoRenderJobs)
      .set({
        status: "failed",
        remotionRenderId: renderId,
        errorMessage: errorMessage ?? "Unknown render error",
        updatedAt: new Date(),
      })
      .where(eq(videoRenderJobs.id, jobId));
  }

  return NextResponse.json({ success: true });
}
