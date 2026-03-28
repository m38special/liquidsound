import { db, videoRenderJobs } from "@liquid-sound/db";
import { renderQueue } from "@liquid-sound/storage";
import { NextRequest, NextResponse } from "next/server";

const VALID_COMPOSITIONS = ["FinancialTip", "CourseIntro", "SocialClip"] as const;
type CompositionId = (typeof VALID_COMPOSITIONS)[number];

interface RenderRequest {
  compositionId: CompositionId;
  inputProps: Record<string, unknown>;
}

export async function POST(req: NextRequest) {
  let body: RenderRequest;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const { compositionId, inputProps } = body;

  if (!VALID_COMPOSITIONS.includes(compositionId)) {
    return NextResponse.json(
      { success: false, error: `Invalid compositionId. Must be one of: ${VALID_COMPOSITIONS.join(", ")}` },
      { status: 400 }
    );
  }

  if (!inputProps || typeof inputProps !== "object") {
    return NextResponse.json({ success: false, error: "inputProps must be an object" }, { status: 400 });
  }

  // Create DB record
  const [job] = await db
    .insert(videoRenderJobs)
    .values({
      compositionId,
      inputProps,
      status: "pending",
    })
    .returning();

  // Enqueue render job
  await renderQueue.add(
    `render-${compositionId}-${job.id}`,
    {
      jobId: job.id,
      compositionId,
      inputProps,
      serveUrl: process.env.REMOTION_LAMBDA_SERVE_URL!,
      functionName: process.env.REMOTION_LAMBDA_FUNCTION_NAME!,
      region: process.env.AWS_REGION ?? "us-east-1",
    },
    { jobId: job.id }
  );

  return NextResponse.json(
    { success: true, data: { jobId: job.id, status: "pending" } },
    { status: 202 }
  );
}
