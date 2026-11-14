"use client";

import {
  createContext,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
  useContext,
  useState,
} from "react";

import { updateJobApplication } from "@/lib/actions/job-applications.action";
import type { PopulatedBoardType, PopulatedColumnType } from "@/lib/models";

export const DashboardContext = createContext<{
  board: PopulatedBoardType | null;
  setBoard: Dispatch<SetStateAction<PopulatedBoardType | null>>;
  columns: PopulatedColumnType[];
  setColumns: Dispatch<SetStateAction<PopulatedColumnType[]>>;
}>({
  board: null,
  setBoard: () => {},
  columns: [],
  setColumns: () => {},
});

export function DashboardProvider({
  children,
  initialBoard,
}: PropsWithChildren<{ initialBoard: PopulatedBoardType | null }>) {
  const [board, setBoard] = useState<PopulatedBoardType | null>(initialBoard);
  const [columns, setColumns] = useState<PopulatedColumnType[]>(initialBoard?.columns ?? []);

  if (initialBoard !== board) {
    setBoard(initialBoard);
    setColumns(initialBoard?.columns ?? []);
  }

  return (
    <DashboardContext.Provider value={{ board, setBoard, columns, setColumns }}>
      {children}
    </DashboardContext.Provider>
  );
}

export const useDashboard = () => {
  const context = useContext(DashboardContext);

  const moveJobApplication = async (
    jobApplicationId: string,
    prevColumnId: string,
    newColumnId: string,
    prevOrder: number,
    newOrder: number,
  ) => {
    // No movement
    if (prevColumnId === newColumnId && prevOrder === newOrder) {
      return;
    }

    context.setColumns((columns) => {
      // No columns
      if (!columns.length) {
        return [];
      }

      // Current job application moves inside its current column
      if (prevColumnId === newColumnId) {
        return columns.map((column) => {
          // Column of the current job application found
          if (column._id === newColumnId) {
            return {
              ...column,
              jobApplications: column.jobApplications
                .map((jobApplication) => {
                  // Current job application found
                  if (jobApplication._id === jobApplicationId) {
                    return {
                      ...jobApplication,
                      order: newOrder,
                    };
                  }

                  // Other job applications
                  const currentOrder = jobApplication.order;
                  const isJobApplicationBetweenRange =
                    (currentOrder >= prevOrder && currentOrder <= newOrder) ||
                    (currentOrder <= prevOrder && currentOrder >= newOrder);

                  if (isJobApplicationBetweenRange) {
                    // Job applications in range must shift down
                    if (prevOrder > newOrder) {
                      return {
                        ...jobApplication,
                        order: currentOrder + 1,
                      };
                    }

                    // Job applications in range must shift up
                    if (prevOrder < newOrder) {
                      return {
                        ...jobApplication,
                        order: currentOrder - 1,
                      };
                    }
                  }

                  return jobApplication;
                })
                .toSorted((a, b) => a.order - b.order),
            };
          }

          // Other columns
          return column;
        });
      }

      // Current job application moves to another column
      const currentJobApplication = columns
        .find((column) => column._id === prevColumnId)
        ?.jobApplications.find((jobApplication) => jobApplication._id === jobApplicationId);

      if (currentJobApplication) {
        return columns.map((column) => {
          // Previous column of the current job application
          if (column._id === prevColumnId) {
            const currentJobApplicationIndex = column.jobApplications.findIndex(
              (jobApplication) => jobApplication._id === jobApplicationId,
            );

            if (currentJobApplicationIndex >= 0) {
              return {
                ...column,
                jobApplications: column.jobApplications
                  .toSpliced(currentJobApplicationIndex, 1)
                  .map((jobApplication) => {
                    // Shift up below job applications
                    if (jobApplication.order > prevOrder) {
                      return {
                        ...jobApplication,
                        order: jobApplication.order - 1,
                      };
                    }

                    // Other job applications
                    return jobApplication;
                  })
                  .toSorted((a, b) => a.order - b.order),
              };
            }

            // Error
            return column;
          }

          // New column of the current job application
          if (column._id === newColumnId) {
            return {
              ...column,
              jobApplications: column.jobApplications
                .toSpliced(column.jobApplications.length, 0, currentJobApplication)
                .map((jobApplication) => {
                  // Current job application found
                  if (jobApplication._id === jobApplicationId) {
                    return {
                      ...jobApplication,
                      order: newOrder,
                    };
                  }

                  // Shift down below job applications
                  if (jobApplication.order >= newOrder) {
                    return {
                      ...jobApplication,
                      order: jobApplication.order + 1,
                    };
                  }

                  // Other job applications
                  return jobApplication;
                })
                .toSorted((a, b) => a.order - b.order),
            };
          }

          // Other columns
          return column;
        });
      }

      // Error
      return columns;
    });

    try {
      await updateJobApplication(jobApplicationId, {
        columnId: newColumnId,
        order: newOrder,
      });
    } catch (error) {
      console.error("Error", error);
    }
  };

  return {
    ...context,
    moveJobApplication,
  };
};
