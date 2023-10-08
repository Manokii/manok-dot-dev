import { db } from "@/db/client";
import { accounts } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import type { Adapter } from "next-auth/adapters";

export const unlinkAccount: Adapter["unlinkAccount"] = async (payload) => {
  await db
    .delete(accounts)
    .where(
      and(
        eq(accounts.providerAccountId, payload.providerAccountId),
        eq(accounts.provider, payload.provider),
      ),
    );

  return undefined;
};
