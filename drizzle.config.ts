import type { Config } from "drizzle-kit";

import "dotenv/config";
import { env } from "./env.mjs";

const isStudio = Boolean(process.env.DRIZZLE_STUDIO);

export default {
  schema: "./db/schema/*",
  out: "./db/drizzle",
  dbCredentials: {
    host: env.POSTGRES_HOST,
    user: env.POSTGRES_USER,
    password: env.POSTGRES_PASSWORD,
    database: env.POSTGRES_DATABASE,
    ssl: !isStudio,
  },
  driver: "pg",
} satisfies Config;
