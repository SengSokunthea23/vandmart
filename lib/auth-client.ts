import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { auth } from "./auth";

export const authClient = createAuthClient({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://vandmart.online"
      : typeof window !== "undefined"
      ? window.location.origin
      : "http://localhost:3000",
  plugins: [inferAdditionalFields<typeof auth>()],
});

export const { signIn, signUp, signOut, useSession, getSession } = authClient;
