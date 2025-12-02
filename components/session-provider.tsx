"use client";

import { useSession } from "@/lib/auth-client";
import { User } from "better-auth";
import { createContext, useContext, ReactNode } from "react";

interface SessionContextType {
  user: User | null;
  isLoading: boolean;
}

const SessionContext = createContext<SessionContextType>({
  user: null,
  isLoading: true,
});

export function SessionProvider({ children }: { children: ReactNode }) {
  const { data: session, isPending } = useSession();

  return (
    <SessionContext.Provider
      value={{
        user: session?.user || null,
        isLoading: isPending,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export const useAuthSession = () => useContext(SessionContext);
