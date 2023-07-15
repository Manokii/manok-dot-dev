import { drizzle } from "drizzle-orm/postgres-js"
import { env } from "@/env.mjs"
import postgres from "postgres"
import * as schema from "./schema"

const queryClient = postgres(env.POSTGRES_URL, {
  ssl: {
    rejectUnauthorized: false,
  },
})
export const db = drizzle(queryClient, { schema })
