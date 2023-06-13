import { env } from "@/env.mjs"
import { connect } from "@planetscale/database"
import { drizzle } from "drizzle-orm/planetscale-serverless"

import "dotenv/config"

import * as schema from "./schema"

const connection = connect({
  host: env.DATABASE_HOST,
  username: env.DATABASE_USERNAME,
  password: env.DATABASE_PASSWORD,
})

export const db = drizzle(connection, {
  schema,
})
