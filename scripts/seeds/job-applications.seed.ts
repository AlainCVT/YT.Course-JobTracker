import { initializeUserBoard } from "@/lib/init-user-board";
import { JobApplication } from "@/lib/models";

import { JOB_APPLICATIONS_FIXTURES } from "./fixtures/job-applications.fixtures";

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

  const jobApplicationsDistribution = getRandomDistribution(
    columns.length,
    JOB_APPLICATIONS_FIXTURES,
  );

  for (const columnIndex in columns) {
    const column = columns[columnIndex];
    const jobApplicationsByColumn = jobApplicationsDistribution[columnIndex];

    for (const order in jobApplicationsByColumn) {
      console.log(`📋 Creating application #${order} in columns "${column.name}"…`);

      const jobApplication = await JobApplication.create({
        ...jobApplicationsByColumn[order],
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
