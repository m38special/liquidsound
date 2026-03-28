const TIKTOK_API_BASE = "https://open.tiktokapis.com/v2";

export interface TikTokPostResult {
  publishId: string;
  errorCode?: number;
  errorMessage?: string;
}

export interface TikTokPostOptions {
  videoUrl: string;
  title: string;
  hashtags?: string[];
  /** Privacy level. Defaults to PUBLIC_TO_EVERYONE */
  privacyLevel?:
    | "PUBLIC_TO_EVERYONE"
    | "MUTUAL_FOLLOW_FRIENDS"
    | "FOLLOWER_OF_CREATOR"
    | "SELF_ONLY";
}

/**
 * Post a video to TikTok using the Content Posting API v2.
 *
 * Uses PULL_FROM_URL — TikTok fetches the video from the provided URL.
 * Requires env vars: TIKTOK_ACCESS_TOKEN, TIKTOK_OPEN_ID
 *
 * Returns the publish_id which can be used to poll status via fetchPostStatus().
 */
export async function postVideoToTikTok(opts: TikTokPostOptions): Promise<TikTokPostResult> {
  const accessToken = process.env.TIKTOK_ACCESS_TOKEN;
  const openId = process.env.TIKTOK_OPEN_ID;

  if (!accessToken || !openId) {
    throw new Error("TIKTOK_ACCESS_TOKEN and TIKTOK_OPEN_ID env vars are required");
  }

  // HEAD the video URL to get file size (required by PULL_FROM_URL)
  const headResp = await fetch(opts.videoUrl, { method: "HEAD" });
  if (!headResp.ok) {
    throw new Error(`Could not HEAD video URL: ${headResp.status} ${headResp.statusText}`);
  }
  const videoSize = parseInt(headResp.headers.get("content-length") ?? "0", 10);
  if (!videoSize) {
    throw new Error("Video URL did not return a Content-Length header");
  }

  // Build title with hashtags (TikTok title field includes hashtags inline)
  const hashtagString =
    opts.hashtags && opts.hashtags.length > 0
      ? " " + opts.hashtags.map((h) => `#${h.replace(/^#/, "")}`).join(" ")
      : "";
  const postTitle = `${opts.title}${hashtagString}`.slice(0, 2200); // TikTok title max

  const body = {
    post_info: {
      title: postTitle,
      privacy_level: opts.privacyLevel ?? "PUBLIC_TO_EVERYONE",
      disable_duet: false,
      disable_comment: false,
      disable_stitch: false,
      video_cover_timestamp_ms: 1000,
    },
    source_info: {
      source: "PULL_FROM_URL",
      video_url: opts.videoUrl,
      video_size: videoSize,
      chunk_size: videoSize,
      total_chunk_count: 1,
    },
  };

  const resp = await fetch(`${TIKTOK_API_BASE}/post/publish/video/init/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(body),
  });

  const json = (await resp.json()) as {
    data?: { publish_id?: string };
    error?: { code?: number; message?: string };
  };

  if (!resp.ok || json.error?.code) {
    const errResult: TikTokPostResult = {
      publishId: "",
      errorMessage: json.error?.message ?? `HTTP ${resp.status}`,
    };
    if (json.error?.code !== undefined) errResult.errorCode = json.error.code;
    return errResult;
  }

  return { publishId: json.data?.publish_id ?? "" };
}

/**
 * Fetch the status of a TikTok post by its publish_id.
 * Returns the post status string (e.g. "PUBLISH_COMPLETE", "FAILED").
 */
export async function fetchTikTokPostStatus(
  publishId: string
): Promise<{ status: string; failReason?: string }> {
  const accessToken = process.env.TIKTOK_ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error("TIKTOK_ACCESS_TOKEN env var is required");
  }

  const resp = await fetch(`${TIKTOK_API_BASE}/post/publish/status/fetch/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({ publish_id: publishId }),
  });

  const json = (await resp.json()) as {
    data?: { status?: string; fail_reason?: string };
    error?: { message?: string };
  };

  const result: { status: string; failReason?: string } = {
    status: json.data?.status ?? "UNKNOWN",
  };
  if (json.data?.fail_reason) result.failReason = json.data.fail_reason;
  return result;
}
