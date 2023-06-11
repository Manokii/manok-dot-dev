import { randomUUID } from "node:crypto"
import { db } from "@/db/client"
import { accounts, sessions, users, verificationTokens } from "@/db/schema/auth"
import { and, eq } from "drizzle-orm"
import { Adapter } from "next-auth/adapters"

/*
 * Drizzle adapter for NextAuth.js
 */
export function drizzleAdapter(): Adapter {
  return {
    createUser: async (payload) => {
      const res = await db.transaction(async (tx) => {
        const id = randomUUID()
        await tx.insert(users).values({ ...payload, id })
        const data = await tx.query.users.findFirst({ where: eq(users.id, id) })

        if (!data) {
          tx.rollback()
          throw new Error("Failed to create user")
        }

        return data
      })

      return res
    },

    getUser: async (userId) => {
      const data = await db.query.users.findFirst({
        where: eq(users.id, userId),
      })
      return data ?? null
    },

    getUserByEmail: async (email) => {
      const data = await db.query.users.findFirst({
        where: eq(users.email, email),
      })
      return data ?? null
    },

    createSession: async (payload) => {
      const res = await db.transaction(async (tx) => {
        await db.insert(sessions).values(payload)
        const data = await db.query.sessions.findFirst({
          where: eq(sessions.sessionToken, payload.sessionToken),
        })
        if (!data) {
          tx.rollback()
          throw new Error("Failed to create session")
        }
        return data
      })
      return res
    },

    getSessionAndUser: async (sessionToken) => {
      const data = await db
        .select({
          session: sessions,
          user: users,
        })
        .from(sessions)
        .where(eq(sessions.sessionToken, sessionToken))
        .innerJoin(users, eq(users.id, sessions.userId))
        .then((res) => res.at(0))

      return data ?? null
    },

    updateUser: async (payload) => {
      if (!payload.id) {
        throw new Error("No user id.")
      }

      const res = await db.transaction(async (tx) => {
        await tx.update(users).set(payload).where(eq(users.id, payload.id))

        const data = await tx.query.users.findFirst({
          where: eq(users.id, payload.id),
        })

        if (!data) {
          tx.rollback()
          throw new Error("Failed to update user")
        }

        return data
      })

      return res
    },

    updateSession: async (payload) => {
      const res = db.transaction(async (tx) => {
        await tx
          .update(sessions)
          .set(payload)
          .where(eq(sessions.sessionToken, payload.sessionToken))

        const data = await tx.query.sessions.findFirst({
          where: eq(sessions.sessionToken, payload.sessionToken),
        })

        if (!data) {
          tx.rollback()
          throw new Error("Failed to update session")
        }
        return data
      })

      return res
    },

    linkAccount: async (rawAccount) => {
      await db.insert(accounts).values({ ...rawAccount })
    },

    getUserByAccount: async (payload) => {
      const dbAccount = await db
        .select()
        .from(accounts)
        .where(
          and(
            eq(accounts.providerAccountId, payload.providerAccountId),
            eq(accounts.provider, payload.provider)
          )
        )
        .leftJoin(users, eq(accounts.userId, users.id))
        .then((res) => res.at(0))

      return dbAccount?.users ?? null
    },

    deleteSession: async (sessionToken) => {
      await db.delete(sessions).where(eq(sessions.sessionToken, sessionToken))
    },

    createVerificationToken: async (token) => {
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
    },

    useVerificationToken: async (token) => {
      try {
        const deletedToken =
          (await db
            .select()
            .from(verificationTokens)
            .where(
              and(
                eq(verificationTokens.identifier, token.identifier),
                eq(verificationTokens.token, token.token)
              )
            )
            .then((res) => res[0])) ?? null

        await db
          .delete(verificationTokens)
          .where(
            and(
              eq(verificationTokens.identifier, token.identifier),
              eq(verificationTokens.token, token.token)
            )
          )

        return deletedToken
      } catch (err) {
        throw new Error("No verification token found.")
      }
    },

    deleteUser: async (id) => {
      await db.delete(users).where(eq(users.id, id))
    },

    unlinkAccount: async (payload) => {
      await db
        .delete(accounts)
        .where(
          and(
            eq(accounts.providerAccountId, payload.providerAccountId),
            eq(accounts.provider, payload.provider)
          )
        )

      return undefined
    },
  }
}
