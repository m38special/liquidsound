import { jsonb, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

// Core schema — extend as features are built

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  clerkId: text("clerk_id").notNull().unique(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const tracks = pgTable("tracks", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  artistId: uuid("artist_id")
    .notNull()
    .references(() => users.id),
  audioUrl: text("audio_url"),
  coverUrl: text("cover_url"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const renderJobStatusEnum = pgEnum("render_job_status", [
  "pending",
  "rendering",
  "done",
  "failed",
]);

export const videoRenderJobs = pgTable("video_render_jobs", {
  id: uuid("id").primaryKey().defaultRandom(),
  compositionId: text("composition_id").notNull(),
  inputProps: jsonb("input_props").notNull().$type<Record<string, unknown>>(),
  outputUrl: text("output_url"),
  status: renderJobStatusEnum("status").notNull().default("pending"),
  remotionRenderId: text("remotion_render_id"),
  remotionBucketName: text("remotion_bucket_name"),
  errorMessage: text("error_message"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
