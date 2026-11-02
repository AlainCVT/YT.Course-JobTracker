"use client";

import { redirect } from "next/navigation";

import AuthForm from "@/components/auth/AuthForm";
import { useSession } from "@/lib/auth/auth-client";

export default function SignUp() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return null;
  }

  if (session) {
    redirect("/dashboard");
  }

  return <AuthForm type="sign-up" />;
}
