import { initializeUserBoard } from "@/lib/init-user-board";
import { JobApplication } from "@/lib/models";

import { JOB_APPLICATIONS_FIXTURES } from "./fixtures/job-applications.fixtures";

function shuffle<T>(array: T[]): T[] {
  const result = [...array];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

function getRandomDistribution<T>(n: number, array: T[]): T[][] {
  const result: T[][] = Array.from({ length: n }, () => []);

  for (const item of array) {
    const index = Math.floor(Math.random() * n);
    result[index].push(item);
  }

  return result;
}

export async function seedJobApplications(userId: string): Promise<number> {
  const { board, columns } = await initializeUserBoard(userId);

  if (columns.length === 0) {
    throw new Error(`❌ No columns found for board ${board._id.toString()}`);
  }

  const date = new Date();

  const jobApplicationsDistribution = getRandomDistribution(
    columns.length,
    shuffle(JOB_APPLICATIONS_FIXTURES),
  );

  for (const columnIndex in columns) {
    const column = columns[columnIndex];
    const jobApplicationsByColumn = jobApplicationsDistribution[columnIndex];
    const mightHaveApplied = ["Applied", "Interviewing", "Offer", "Rejected"].includes(column.name);

    for (const order in jobApplicationsByColumn) {
      console.log(`📋 Creating application #${order} in columns "${column.name}"…`);

      const jobApplication = await JobApplication.create({
        ...jobApplicationsByColumn[order],
        ...(mightHaveApplied && {
          appliedAt: new Date(
            date.getTime() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000,
          ),
        }),
        priority: Math.ceil(Math.random() * 5),
        order: Number(order),
        userId,
        boardId: board._id,
        columnId: column._id,
      });

      column.jobApplications.push(jobApplication._id);
    }

    await column.save();
  }

  return JOB_APPLICATIONS_FIXTURES.length;
}
