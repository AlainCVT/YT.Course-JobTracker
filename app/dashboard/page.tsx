import { Loader2 } from "lucide-react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import Container from "@/components/Container";
import KanbanBoard from "@/components/KanbanBoard";
import { getSession } from "@/lib/auth/auth";
import connectDB from "@/lib/db";
import { Board, type PopulatedBoardType } from "@/lib/models";

export const metadata: Metadata = {
  title: "Your Job Search Dashboard",
  description: "Manage your job applications and track your job search progress.",
  robots: {
    index: false,
    follow: false,
  },
};

const getBoard = async (userId: string): Promise<PopulatedBoardType | null> => {
  "use cache";

  await connectDB();

  const board = await Board.findOne({
    userId,
    name: "Job Hunt",
  }).populate<Pick<PopulatedBoardType, "columns">>({
    path: "columns",
    populate: {
      path: "jobApplications",
    },
  });

  if (!board) return null;

  return JSON.parse(JSON.stringify(board)) as PopulatedBoardType;
};

export default function Dashboard() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-1 items-center justify-center">
          <Loader2 className="animate-spin text-primary" />
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}

async function DashboardContent() {
  const session = await getSession();

  if (!session?.user) {
    return redirect("sign-in");
  }

  const board = await getBoard(session.user.id);

  return (
    <div className="flex flex-1 flex-col gap-12 overflow-x-auto py-12">
      <div className="sticky left-0">
        <Container>
          <h1 className="text-3xl font-bold">Job Hunt</h1>
          <p className="text-muted-foreground">Track your job applications</p>
        </Container>
      </div>
      <KanbanBoard board={board} />
    </div>
  );
}
