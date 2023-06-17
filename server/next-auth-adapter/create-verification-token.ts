import { Adapter } from "next-auth/adapters"
import { db } from "@/db/client"
import { verificationTokens } from "@/db/schema"
import { eq } from "drizzle-orm"

export const createVerificationToken: Adapter["createVerificationToken"] =
  async (token) => {
    const res = db.transaction(async (tx) => {
      await tx.insert(verificationTokens).values(token)
      const data = await tx.query.verificationTokens.findFirst({
        where: eq(verificationTokens.identifier, token.identifier),
      })

      if (!data) {
        tx.rollback()
        throw new Error("Failed to create verification token")
      }

      return data
    })

    return res
  }
