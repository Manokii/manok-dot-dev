import { db } from "@/db/client";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import type { Adapter } from "next-auth/adapters";

export const deleteUser: Adapter["deleteUser"] = async (id) => {
  await db.delete(users).where(eq(users.id, id));
};
