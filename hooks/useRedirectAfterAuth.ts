"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useSession } from "@/lib/auth/auth-client";

export const useRedirectAfterAuth = (path: string, mustHaveSession: boolean) => {
  const router = useRouter();

  const [redirectAfterAuth, setRedirectAfterAuth] = useState<boolean>(false);
  const { data: session, isPending, isRefetching } = useSession();

  useEffect(() => {
    if (
      redirectAfterAuth &&
      !isPending &&
      !isRefetching &&
      (mustHaveSession ? session : !session)
    ) {
      router.push(path);
    }
  }, [redirectAfterAuth, isPending, isRefetching, session, router, path, mustHaveSession]);

  return setRedirectAfterAuth;
};
