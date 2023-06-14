import { NextAuthOptions } from "next-auth"
import DiscordProvider from "next-auth/providers/discord"

import { drizzleAdapter } from "./drizzle-adapter"
import { env } from "@/env.mjs"

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user?.id,
        role: user?.role,
      },
    }),
    redirect: ({ url }) => url,
  },
  adapter: drizzleAdapter(),

  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
}
