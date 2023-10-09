import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

const queryClient = postgres(process.env.POSTGRES_URL_NON_POOLING ?? "", {
  max: 1,
});

const nonPoolingDb = drizzle(queryClient);
async function runMigration() {
  await migrate(nonPoolingDb, {
    migrationsFolder: "./db/drizzle",
  });
}

runMigration()
  .then(() => {
    console.log("Migration complete");
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    console.log("Migration failed");
    process.exit(1);
  });
