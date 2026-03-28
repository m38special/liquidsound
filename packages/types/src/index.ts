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

export type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string };
