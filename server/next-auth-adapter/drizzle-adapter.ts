import type { Adapter } from "next-auth/adapters";
import { createSession } from "./create-session";
import { createUser } from "./create-user";
import { createVerificationToken } from "./create-verification-token";
import { deleteSession } from "./delete-session";
import { deleteUser } from "./delete-user";
import { getSessionAndUser } from "./get-session-and-user";
import { getUser } from "./get-user";
import { getUserByAccount } from "./get-user-by-account";
import { getUserByEmail } from "./get-user-by-email";
import { linkAccount } from "./link-account";
import { unlinkAccount } from "./unlink-account";
import { updateSession } from "./update-session";
import { updateUser } from "./update-user";
import { useVerificationToken } from "./use-verification-token";

export const drizzleAdapter: Adapter = {
  createSession,
  createUser,
  createVerificationToken,
  deleteSession,
  deleteUser,
  getSessionAndUser,
  getUser,
  getUserByAccount,
  getUserByEmail,
  linkAccount,
  unlinkAccount,
  updateSession,
  updateUser,
  useVerificationToken,
};
