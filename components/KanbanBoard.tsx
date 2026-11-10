"use client";

import clsx from "clsx";
import { MoreVertical, Plus, Trash2 } from "lucide-react";

import { JobApplicationCard } from "@/components/cards/JobApplicationCard";
import CreateJobApplicationDialog from "@/components/dialogs/CreateJobApplicationDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { COLUMNS_ICONS } from "@/lib/constants";
import type {
  MongoID,
  PopulatedBoardType,
  PopulatedColumnType,
  PopulatedJobApplicationType,
} from "@/lib/models";

interface KanbanBoardProps {
  board: PopulatedBoardType | null;
  userId: string;
}

export default function KanbanBoard({ board, userId }: KanbanBoardProps) {
  const sortedColumns = board?.columns?.sort((a, b) => a.order - b.order) || [];

  return (
    <div className="flex flex-col gap-8">
      {!!board &&
        board.columns.map((column, index) => (
          <KanbanDroppableColumn
            key={`droppable-column-${index}`}
            boardId={board._id}
            column={column}
            sortedColumns={sortedColumns}
          />
        ))}
    </div>
  );
}

function KanbanDroppableColumn({
  boardId,
  column,
  sortedColumns,
}: {
  column: PopulatedColumnType;
  boardId: MongoID;
  sortedColumns: PopulatedColumnType[];
}) {
  const Icon = column.icon ? COLUMNS_ICONS[column.icon] : null;

  const sortedJobs = column.jobApplications.sort((a, b) => a.order - b.order) || [];

  return (
    <Card className="min-w-xs shrink-0 bg-muted/20 p-0 pb-6 shadow-md">
      <CardHeader
        className={clsx("py-2 text-white selection:bg-white", {
          "bg-red-500 selection:text-red-500 dark:bg-red-900 dark:selection:text-red-900":
            column.color === "red",
          "bg-orange-500 selection:text-orange-500 dark:bg-orange-900 dark:selection:text-orange-900":
            column.color === "orange",
          "bg-amber-500 selection:text-amber-500 dark:bg-amber-900 dark:selection:text-amber-900":
            column.color === "amber",
          "bg-yellow-500 selection:text-yellow-500 dark:bg-yellow-900 dark:selection:text-yellow-900":
            column.color === "yellow",
          "bg-lime-500 selection:text-lime-500 dark:bg-lime-900 dark:selection:text-lime-900":
            column.color === "lime",
          "bg-green-500 selection:text-green-500 dark:bg-green-900 dark:selection:text-green-900":
            column.color === "green",
          "bg-emerald-500 selection:text-emerald-500 dark:bg-emerald-900 dark:selection:text-emerald-900":
            column.color === "emerald",
          "bg-teal-500 selection:text-teal-500 dark:bg-teal-900 dark:selection:text-teal-900":
            column.color === "teal",
          "bg-cyan-500 selection:text-cyan-500 dark:bg-cyan-900 dark:selection:text-cyan-900":
            column.color === "cyan",
          "bg-sky-500 selection:text-sky-500 dark:bg-sky-900 dark:selection:text-sky-900":
            column.color === "sky",
          "bg-blue-500 selection:text-blue-500 dark:bg-blue-900 dark:selection:text-blue-900":
            column.color === "blue",
          "bg-indigo-500 selection:text-indigo-500 dark:bg-indigo-900 dark:selection:text-indigo-900":
            column.color === "indigo",
          "bg-violet-500 selection:text-violet-500 dark:bg-violet-900 dark:selection:text-violet-900":
            column.color === "violet",
          "bg-purple-500 selection:text-purple-500 dark:bg-purple-900 dark:selection:text-purple-900":
            column.color === "purple",
          "bg-fuchsia-500 selection:text-fuchsia-500 dark:bg-fuchsia-900 dark:selection:text-fuchsia-900":
            column.color === "fuchsia",
          "bg-pink-500 selection:text-pink-500 dark:bg-pink-900 dark:selection:text-pink-900":
            column.color === "pink",
          "bg-rose-500 selection:text-rose-500 dark:bg-rose-900 dark:selection:text-rose-900":
            column.color === "rose",
        })}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div>{Icon && <Icon className="size-4" />}</div>
            <CardTitle className="text-base font-semibold">{column.name}</CardTitle>
          </div>
          <DropdownMenu>
            <Button render={<DropdownMenuTrigger />} variant="ghost" size="icon">
              <MoreVertical className="size-4" />
            </Button>
            <DropdownMenuContent align="end" className="w-36 whitespace-nowrap">
              <DropdownMenuItem variant="destructive">
                <Trash2 className="size-4" />
                Delete column
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      {!!sortedJobs.length && (
        <CardContent className="space-y-2">
          {sortedJobs.map((job, index) => (
            <KanbanSortableJobCard
              key={`job-card-${index}`}
              job={{ ...job, columnId: job.columnId || column._id }}
              columns={sortedColumns}
            />
          ))}
        </CardContent>
      )}
      <CardFooter>
        <CreateJobApplicationDialog
          boardId={boardId}
          columnId={column._id}
          columnName={column.name}
          trigger={
            <Button variant="outline">
              <Plus /> Add job
            </Button>
          }
        />
      </CardFooter>
    </Card>
  );
}

function KanbanSortableJobCard({
  job,
  columns,
}: {
  job: PopulatedJobApplicationType;
  columns: PopulatedColumnType[];
}) {
  return (
    <div>
      <JobApplicationCard job={job} columns={columns} />
    </div>
  );
}
