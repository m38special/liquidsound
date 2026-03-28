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
  createdAt: Date;
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
