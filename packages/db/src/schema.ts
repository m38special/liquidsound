import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

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
