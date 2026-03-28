import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import type { NeonDatabase } from "drizzle-orm/neon-http";
import * as schema from "./schema";

type Schema = typeof schema;

// Lazy init: neon() must not be called at module load time because Next.js
// evaluates all modules during build, and DATABASE_URL is only available at runtime.
let _db: NeonDatabase<Schema> | null = null;

function getDb(): NeonDatabase<Schema> {
  if (!_db) {
    const sql = neon(process.env.DATABASE_URL!);
    _db = drizzle(sql, { schema });
  }
  return _db;
}

export const db = new Proxy({} as NeonDatabase<Schema>, {
  get(_target, prop) {
    return getDb()[prop as keyof NeonDatabase<Schema>];
  },
});
