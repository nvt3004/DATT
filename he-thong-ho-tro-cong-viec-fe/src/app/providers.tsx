"use client";
import { SessionProvider } from "next-auth/react";
import React, { PropsWithChildren } from "react";

export function Provider({ children }: PropsWithChildren) {
  return (
    <SessionProvider refetchOnWindowFocus={false} refetchInterval={60 * 60}>
      {children}
    </SessionProvider>
  );
}
