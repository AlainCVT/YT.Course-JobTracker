"use client";

import clsx from "clsx";
import { MoreVertical, Plus, Trash2 } from "lucide-react";

import { JobApplicationCard } from "@/components/cards/JobApplicationCard";
import Container from "@/components/Container";
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
  PopulatedBoardType,
  PopulatedColumnType,
  PopulatedJobApplicationType,
} from "@/lib/models";

interface KanbanBoardProps {
  board: PopulatedBoardType | null;
}

export default function KanbanBoard({ board }: KanbanBoardProps) {
  const sortedColumns = board?.columns?.sort((a, b) => a.order - b.order) || [];

  return (
    <Container className="flex gap-8" definedBy="margin">
      {!!board &&
        board.columns.map((column, index) => (
          <KanbanDroppableColumn
            key={`droppable-column-${index}`}
            boardId={board._id}
            column={column}
            sortedColumns={sortedColumns}
          />
        ))}
    </Container>
  );
}

function KanbanDroppableColumn({
  boardId,
  column,
  sortedColumns,
}: {
  column: PopulatedColumnType;
  boardId: string;
  sortedColumns: PopulatedColumnType[];
}) {
  const Icon = column.icon ? COLUMNS_ICONS[column.icon] : null;
  const sortedJobApplications = column.jobApplications.sort((a, b) => a.order - b.order) || [];

  return (
    <Card
      className={clsx("w-lg shrink-0 p-0 pb-6 shadow-md", {
        "bg-red-100/5 ring-red-500/20 dark:bg-red-900/5": column.color === "red",
        "bg-orange-100/5 ring-orange-500/20 dark:bg-orange-900/5": column.color === "orange",
        "bg-amber-100/5 ring-amber-500/20 dark:bg-amber-900/5": column.color === "amber",
        "bg-yellow-100/5 ring-yellow-500/20 dark:bg-yellow-900/5": column.color === "yellow",
        "bg-lime-100/5 ring-lime-500/20 dark:bg-lime-900/5": column.color === "lime",
        "bg-green-100/5 ring-green-500/20 dark:bg-green-900/5": column.color === "green",
        "bg-emerald-100/5 ring-emerald-500/20 dark:bg-emerald-900/5": column.color === "emerald",
        "bg-teal-100/5 ring-teal-500/20 dark:bg-teal-900/5": column.color === "teal",
        "bg-cyan-100/5 ring-cyan-500/20 dark:bg-cyan-900/5": column.color === "cyan",
        "bg-sky-100/5 ring-sky-500/20 dark:bg-sky-900/5": column.color === "sky",
        "bg-blue-100/5 ring-blue-500/20 dark:bg-blue-900/5": column.color === "blue",
        "bg-indigo-100/5 ring-indigo-500/20 dark:bg-indigo-900/5": column.color === "indigo",
        "bg-violet-100/5 ring-violet-500/20 dark:bg-violet-900/5": column.color === "violet",
        "bg-purple-100/5 ring-purple-500/20 dark:bg-purple-900/5": column.color === "purple",
        "bg-fuchsia-100/5 ring-fuchsia-500/20 dark:bg-fuchsia-900/5": column.color === "fuchsia",
        "bg-pink-100/5 ring-pink-500/20 dark:bg-pink-900/5": column.color === "pink",
        "bg-rose-100/5 ring-rose-500/20 dark:bg-rose-900/5": column.color === "rose",
      })}
    >
      <CardHeader
        className={clsx("py-2", {
          "bg-red-500/10 text-red-900 selection:bg-red-900 selection:text-red-100 dark:text-red-100 dark:selection:bg-red-100 dark:selection:text-red-900":
            column.color === "red",
          "bg-orange-500/10 text-orange-900 selection:bg-orange-900 selection:text-orange-100 dark:text-orange-100 dark:selection:bg-orange-100 dark:selection:text-orange-900":
            column.color === "orange",
          "bg-amber-500/10 text-amber-900 selection:bg-amber-900 selection:text-amber-100 dark:text-amber-100 dark:selection:bg-amber-100 dark:selection:text-amber-900":
            column.color === "amber",
          "bg-yellow-500/10 text-yellow-900 selection:bg-yellow-900 selection:text-yellow-100 dark:text-yellow-100 dark:selection:bg-yellow-100 dark:selection:text-yellow-900":
            column.color === "yellow",
          "bg-lime-500/10 text-lime-900 selection:bg-lime-900 selection:text-lime-100 dark:text-lime-100 dark:selection:bg-lime-100 dark:selection:text-lime-900":
            column.color === "lime",
          "bg-green-500/10 text-green-900 selection:bg-green-900 selection:text-green-100 dark:text-green-100 dark:selection:bg-green-100 dark:selection:text-green-900":
            column.color === "green",
          "bg-emerald-500/10 text-emerald-900 selection:bg-emerald-900 selection:text-emerald-100 dark:text-emerald-100 dark:selection:bg-emerald-100 dark:selection:text-emerald-900":
            column.color === "emerald",
          "bg-teal-500/10 text-teal-900 selection:bg-teal-900 selection:text-teal-100 dark:text-teal-100 dark:selection:bg-teal-100 dark:selection:text-teal-900":
            column.color === "teal",
          "bg-cyan-500/10 text-cyan-900 selection:bg-cyan-900 selection:text-cyan-100 dark:text-cyan-100 dark:selection:bg-cyan-100 dark:selection:text-cyan-900":
            column.color === "cyan",
          "bg-sky-500/10 text-sky-900 selection:bg-sky-900 selection:text-sky-100 dark:text-sky-100 dark:selection:bg-sky-100 dark:selection:text-sky-900":
            column.color === "sky",
          "bg-blue-500/10 text-blue-900 selection:bg-blue-900 selection:text-blue-100 dark:text-blue-100 dark:selection:bg-blue-100 dark:selection:text-blue-900":
            column.color === "blue",
          "bg-indigo-500/10 text-indigo-900 selection:bg-indigo-900 selection:text-indigo-100 dark:text-indigo-100 dark:selection:bg-indigo-100 dark:selection:text-indigo-900":
            column.color === "indigo",
          "bg-violet-500/10 text-violet-900 selection:bg-violet-900 selection:text-violet-100 dark:text-violet-100 dark:selection:bg-violet-100 dark:selection:text-violet-900":
            column.color === "violet",
          "bg-purple-500/10 text-purple-900 selection:bg-purple-900 selection:text-purple-100 dark:text-purple-100 dark:selection:bg-purple-100 dark:selection:text-purple-900":
            column.color === "purple",
          "bg-fuchsia-500/10 text-fuchsia-900 selection:bg-fuchsia-900 selection:text-fuchsia-100 dark:text-fuchsia-100 dark:selection:bg-fuchsia-100 dark:selection:text-fuchsia-900":
            column.color === "fuchsia",
          "bg-pink-500/10 text-pink-900 selection:bg-pink-900 selection:text-pink-100 dark:text-pink-100 dark:selection:bg-pink-100 dark:selection:text-pink-900":
            column.color === "pink",
          "bg-rose-500/10 text-rose-900 selection:bg-rose-900 selection:text-rose-100 dark:text-rose-100 dark:selection:bg-rose-100 dark:selection:text-rose-900":
            column.color === "rose",
        })}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div>{Icon && <Icon className="size-4" />}</div>
            <CardTitle className="text-base font-semibold">{column.name}</CardTitle>
          </div>
          <DropdownMenu>
            <Button
              render={<DropdownMenuTrigger />}
              variant={column.color ? `ghost-${column.color}` : "ghost"}
              size="icon"
            >
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
      <CardContent className="space-y-2">
        {sortedJobApplications.map((jobApplication, index) => (
          <KanbanSortableJobApplicationCard
            key={`job-application-card-${index}`}
            jobApplication={{ ...jobApplication, columnId: jobApplication.columnId || column._id }}
            columns={sortedColumns}
            color={column.color}
          />
        ))}
      </CardContent>
      <CardFooter>
        <CreateJobApplicationDialog
          boardId={boardId}
          columnId={column._id}
          columnName={column.name}
          trigger={
            <Button variant={column.color ? `outline-${column.color}` : "outline"}>
              <Plus /> Add job application
            </Button>
          }
        />
      </CardFooter>
    </Card>
  );
}

function KanbanSortableJobApplicationCard({
  jobApplication,
  columns,
  color,
}: {
  jobApplication: PopulatedJobApplicationType;
  columns: PopulatedColumnType[];
  color: PopulatedColumnType["color"];
}) {
  return (
    <div>
      <JobApplicationCard
        className={clsx("bg-background dark:bg-background", {
          "ring-red-500/20": color === "red",
          "ring-orange-500/20": color === "orange",
          "ring-amber-500/20": color === "amber",
          "ring-yellow-500/20": color === "yellow",
          "ring-lime-500/20": color === "lime",
          "ring-green-500/20": color === "green",
          "ring-emerald-500/20": color === "emerald",
          "ring-teal-500/20": color === "teal",
          "ring-cyan-500/20": color === "cyan",
          "ring-sky-500/20": color === "sky",
          "ring-blue-500/20": color === "blue",
          "ring-indigo-500/20": color === "indigo",
          "ring-violet-500/20": color === "violet",
          "ring-purple-500/20": color === "purple",
          "ring-fuchsia-500/20": color === "fuchsia",
          "ring-pink-500/20": color === "pink",
          "ring-rose-500/20": color === "rose",
        })}
        jobApplication={jobApplication}
        columns={columns}
      />
    </div>
  );
}
