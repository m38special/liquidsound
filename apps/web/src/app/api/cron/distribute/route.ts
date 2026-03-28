export const dynamic = "force-dynamic";
export const maxDuration = 60; // Vercel function timeout

import { db, videoRenderJobs } from "@liquid-sound/db";
import { redis, postVideoToTikTok, tikTokPipelineQueue } from "@liquid-sound/storage";
import { and, eq, isNotNull } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { getScriptForSlot } from "@/lib/tiktok-scripts";

const CRON_SECRET = process.env.CRON_SECRET;
const PIPELINE_SECRET = process.env.TIKTOK_PIPELINE_SECRET;
const SCRIPT_SLOT_KEY = "tiktok:schedule:slot";

/**
 * POST /api/cron/distribute
 *
 * Called every 4 hours by Vercel Cron.
 * 1. Posts any done-but-not-yet-distributed videos to TikTok.
 * 2. Enqueues the next script in the rotation for video generation.
 *
 * Auth: Authorization: Bearer $CRON_SECRET
 */
export async function POST(req: NextRequest) {
  // Verify cron secret
  const auth = req.headers.get("authorization");
  const token = auth?.replace(/^Bearer\s+/i, "");
  if (!CRON_SECRET || token !== CRON_SECRET) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const results: {
    distributed: string[];
    distributionErrors: string[];
    newJobId: string | null;
    nextSlot: number;
  } = { distributed: [], distributionErrors: [], newJobId: null, nextSlot: 0 };

  // ── Step 1: Distribute ready videos ──────────────────────────────────────
  const readyJobs = await db
    .select()
    .from(videoRenderJobs)
    .where(
      and(
        eq(videoRenderJobs.status, "done"),
        eq(videoRenderJobs.distributionStatus, "pending"),
        isNotNull(videoRenderJobs.outputUrl)
      )
    )
    .limit(5); // process up to 5 at a time

  for (const job of readyJobs) {
    try {
      const postResult = await postVideoToTikTok({
        videoUrl: job.outputUrl!,
        title: (job.inputProps as { title?: string }).title ?? "LiQUiD SOUND",
        hashtags: (job.inputProps as { hashtags?: string[] }).hashtags ?? [
          "liquidsound",
          "soundhealing",
          "frequency",
        ],
      });

      if (postResult.publishId) {
        await db
          .update(videoRenderJobs)
          .set({
            distributionStatus: "posted",
            postedAt: new Date(),
            tiktokPostId: postResult.publishId,
            updatedAt: new Date(),
          })
          .where(eq(videoRenderJobs.id, job.id));
        results.distributed.push(job.id);
      } else {
        await db
          .update(videoRenderJobs)
          .set({
            distributionStatus: "failed",
            distributionError: postResult.errorMessage ?? "Unknown TikTok API error",
            updatedAt: new Date(),
          })
          .where(eq(videoRenderJobs.id, job.id));
        results.distributionErrors.push(
          `${job.id}: ${postResult.errorMessage ?? "TikTok API error"}`
        );
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      await db
        .update(videoRenderJobs)
        .set({
          distributionStatus: "failed",
          distributionError: msg,
          updatedAt: new Date(),
        })
        .where(eq(videoRenderJobs.id, job.id));
      results.distributionErrors.push(`${job.id}: ${msg}`);
    }
  }

  // ── Step 2: Enqueue next script in rotation ───────────────────────────────
  if (!PIPELINE_SECRET) {
    console.error("[cron/distribute] TIKTOK_PIPELINE_SECRET not set — skipping script enqueue");
  } else {
    // Atomically increment the slot counter
    const rawSlot = await redis.incr(SCRIPT_SLOT_KEY);
    const slot = (rawSlot - 1) % 6; // 0-indexed
    results.nextSlot = slot;

    const script = getScriptForSlot(slot);

    // Create DB record + enqueue pipeline job directly (same as POST /api/videos/tiktok)
    const insertResult = await db
      .insert(videoRenderJobs)
      .values({
        compositionId: "TikTokSlide",
        inputProps: script as unknown as Record<string, unknown>,
        status: "pending",
      })
      .returning();

    const newJob = insertResult[0];
    if (newJob) {
      await tikTokPipelineQueue.add(`tiktok-script-${newJob.id}`, {
        jobId: newJob.id,
        script,
      });
      results.newJobId = newJob.id;
    }
  }

  console.log("[cron/distribute]", JSON.stringify(results));
  return NextResponse.json({ success: true, data: results });
}
