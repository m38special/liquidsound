// Shared TypeScript types for LiQUiD SOUND

export interface User {
  id: string;
  clerkId: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Track {
  id: string;
  title: string;
  artistId: string;
  audioUrl: string | null;
  coverUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface VideoRenderJob {
  id: string;
  compositionId: string;
  inputProps: Record<string, unknown>;
  outputUrl: string | null;
  status: "pending" | "rendering" | "done" | "failed";
  distributionStatus: "pending" | "posted" | "failed";
  postedAt: Date | null;
  tiktokPostId: string | null;
  distributionError: string | null;
  createdAt: Date;
}

// TikTok Content Posting API
export interface TikTokPostResult {
  publishId: string;
  errorCode?: number;
  errorMessage?: string;
}

export type ApiResponse<T> = { success: true; data: T } | { success: false; error: string };

// TikTok slide pipeline — script format from RANGIKU (CMO)
export interface TikTokSlideData {
  text: string; // Subtitle text shown on the slide
  audioUrl?: string; // Pre-generated TTS audio URL (R2 public URL)
  durationInFrames: number; // Frame count at 30fps
}

export interface TikTokScript {
  title: string;
  slides: Array<{ text: string }>;
  hashtags?: string[];
  cta?: string;
}
