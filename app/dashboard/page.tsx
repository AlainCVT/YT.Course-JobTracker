"use client";

import { redirect } from "next/navigation";

import { useSession } from "@/lib/auth/auth-client";

export default function Dashboard() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return null;
  }

  if (!session) {
    redirect("/sign-in");
  }

  return <div>Dashboard</div>;
}
