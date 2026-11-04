import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth/auth";

export default async function Dashboard() {
  const session = await getSession();

  if (!session?.user) {
    redirect("sign-in");
  }

  return <div>Dashboard</div>;
}
