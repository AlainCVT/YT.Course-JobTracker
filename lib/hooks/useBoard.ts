"use client";

import { useEffect, useState } from "react";

import { updateJobApplication } from "@/lib/actions/job-applications.action";
import type { PopulatedBoardType, PopulatedColumnType } from "@/lib/models";

export type MoveJobApplicationHandler = (
  jobApplicationId: string,
  sourceColumnId: string,
  targetColumnId: string,
  oldOrder: number,
  newOrder: number,
) => void | Promise<void>;

export function useBoard(initialBoard?: PopulatedBoardType | null) {
  const [columns, setColumns] = useState<PopulatedColumnType[]>(initialBoard?.columns || []);

  useEffect(() => {
    const updateColumns = () => {
      if (initialBoard) {
        setColumns(initialBoard.columns || []);
      }
    };
    updateColumns();
  }, [initialBoard]);

  const moveJobApplication: MoveJobApplicationHandler = async (
    jobApplicationId,
    sourceColumnId,
    targetColumnId,
    oldOrder,
    newOrder,
  ) => {
    if (sourceColumnId === targetColumnId && oldOrder === newOrder) {
      return;
    }

    setColumns((prevColumns) => {
      const newColumns = prevColumns.map((column) => ({
        ...column,
        jobApplications: [...column.jobApplications],
      }));

      const sourceColumnIndex = newColumns.findIndex((column) => column._id === sourceColumnId);
      const targetColumnIndex = newColumns.findIndex((column) => column._id === targetColumnId);

      if (sourceColumnIndex === -1 || targetColumnIndex === -1) {
        return prevColumns;
      }

      const sourceJobApplications = newColumns[sourceColumnIndex].jobApplications;
      const targetJobApplications = newColumns[targetColumnIndex].jobApplications;

      const jobApplicationIndex = sourceJobApplications.findIndex(
        (jobApplication) => jobApplication._id === jobApplicationId,
      );

      if (jobApplicationIndex === -1) {
        return prevColumns;
      }

      const [currentJobApplication] = sourceJobApplications.splice(jobApplicationIndex, 1);

      const insertionIndex = Math.max(
        0,
        Math.min(Math.floor(newOrder), targetJobApplications.length),
      );

      targetJobApplications.splice(insertionIndex, 0, {
        ...currentJobApplication,
        columnId: targetColumnId,
      });

      if (sourceColumnIndex !== targetColumnIndex) {
        newColumns[sourceColumnIndex].jobApplications = sourceJobApplications.map(
          (application, index) => ({
            ...application,
            order: index,
          }),
        );
      }

      newColumns[targetColumnIndex].jobApplications = targetJobApplications.map(
        (application, index) => ({
          ...application,
          order: index,
        }),
      );

      return newColumns;
    });

    try {
      await updateJobApplication(jobApplicationId, {
        columnId: targetColumnId,
        order: newOrder,
      });
    } catch (error) {
      console.error("Error", error);
    }
  };

  return { board: initialBoard, columns, moveJobApplication };
}
