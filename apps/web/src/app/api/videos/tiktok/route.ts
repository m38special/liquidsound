export const dynamic = "force-dynamic";

import { db, videoRenderJobs } from "@liquid-sound/db";
import { tikTokPipelineQueue } from "@liquid-sound/storage";
import { TikTokScript } from "@liquid-sound/types";
import { NextRequest, NextResponse } from "next/server";

const PIPELINE_SECRET = process.env.TIKTOK_PIPELINE_SECRET;

/**
 * POST /api/videos/tiktok
 *
 * Accepts a TikTokScript from RANGIKU (or the 4-hour cron), creates a DB record,
 * and enqueues the script onto the tiktok-pipeline BullMQ queue.
 *
 * The tikTokWorker process (apps/video) picks it up, generates TTS audio per slide
 * via AWS Polly, then enqueues a Remotion Lambda render job.
 *
 * Auth: Bearer token matching TIKTOK_PIPELINE_SECRET env var.
 */
export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.replace(/^Bearer\s+/i, "");
  if (!PIPELINE_SECRET || token !== PIPELINE_SECRET) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  let script: TikTokScript;
  try {
    script = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON body" }, { status: 400 });
  }

  if (!script.title || !Array.isArray(script.slides) || script.slides.length === 0) {
    return NextResponse.json(
      { success: false, error: "Script must have a title and at least one slide" },
      { status: 400 }
    );
  }

  // Create DB tracking record
  const result = await db
    .insert(videoRenderJobs)
    .values({
      compositionId: "TikTokSlide",
      inputProps: script as unknown as Record<string, unknown>,
      status: "pending",
    })
    .returning();

  const job = result[0];
  if (!job) {
    return NextResponse.json(
      { success: false, error: "Failed to create render job record" },
      { status: 500 }
    );
  }

  // Enqueue pipeline job — tikTokWorker handles TTS generation + render enqueue
  await tikTokPipelineQueue.add(`tiktok-script-${job.id}`, {
    jobId: job.id,
    script,
  });

  return NextResponse.json(
    {
      success: true,
      data: {
        jobId: job.id,
        status: "pending",
        slides: script.slides.length,
        title: script.title,
      },
    },
    { status: 202 }
  );
}
