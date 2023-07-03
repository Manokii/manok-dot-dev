import { migrate } from "drizzle-orm/vercel-postgres/migrator"
import { db } from "./client"
import dotenv from "dotenv"
dotenv.config({ path: ".env" })

async function runMigration() {
  await migrate(db, {
    migrationsFolder: "./db/drizzle",
  })
}

runMigration()
  .then(() => {
    console.log("Migration complete")
    process.exit(0)
  })
  .catch((e) => {
    console.error(e)
    console.log("Migration failed")
    process.exit(1)
  })
