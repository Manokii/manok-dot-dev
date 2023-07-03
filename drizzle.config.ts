import type { Config } from "drizzle-kit"

import "dotenv/config"
import { env } from "./env.mjs"

export default {
  schema: "./db/schema/*",
  out: "./db/drizzle",
  dbCredentials: {
    host: env.POSTGRES_HOST,
    user: env.POSTGRES_USER,
    password: env.POSTGRES_PASSWORD,
    database: env.POSTGRES_DATABASE,
    ssl: true,
  },
  driver: "pg",
} satisfies Config
