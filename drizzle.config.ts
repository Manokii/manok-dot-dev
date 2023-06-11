import type { Config } from "drizzle-kit"

import "dotenv/config"

export default {
  schema: "./db/schema/*",
  out: "./db/drizzle",
  connectionString: process.env.DATABASE_URL,
} satisfies Config
