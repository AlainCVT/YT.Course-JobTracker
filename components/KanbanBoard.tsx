"use client";

import clsx from "clsx";
import { MoreVertical, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { COLUMNS_ICONS } from "@/lib/constants";
import type { PopulatedBoardType, PopulatedColumnType } from "@/lib/models";

type Props = {
  board: PopulatedBoardType | null;
  userId: string;
};

function DroppableColumn({ column }: { column: PopulatedColumnType }) {
  const Icon = column.icon ? COLUMNS_ICONS[column.icon] : null;

  return (
    <Card className="min-w-xs shrink-0 p-0 shadow-md">
      <CardHeader
        className={clsx("py-2 text-white selection:bg-white", {
          "bg-red-500 selection:text-red-500": column.color === "red",
          "bg-orange-500 selection:text-orange-500": column.color === "orange",
          "bg-amber-500 selection:text-amber-500": column.color === "amber",
          "bg-yellow-500 selection:text-yellow-500": column.color === "yellow",
          "bg-lime-500 selection:text-lime-500": column.color === "lime",
          "bg-green-500 selection:text-green-500": column.color === "green",
          "bg-emerald-500 selection:text-emerald-500": column.color === "emerald",
          "bg-teal-500 selection:text-teal-500": column.color === "teal",
          "bg-cyan-500 selection:text-cyan-500": column.color === "cyan",
          "bg-sky-500 selection:text-sky-500": column.color === "sky",
          "bg-blue-500 selection:text-blue-500": column.color === "blue",
          "bg-indigo-500 selection:text-indigo-500": column.color === "indigo",
          "bg-violet-500 selection:text-violet-500": column.color === "violet",
          "bg-purple-500 selection:text-purple-500": column.color === "purple",
          "bg-fuchsia-500 selection:text-fuchsia-500": column.color === "fuchsia",
          "bg-pink-500 selection:text-pink-500": column.color === "pink",
          "bg-rose-500 selection:text-rose-500": column.color === "rose",
        })}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div>{Icon && <Icon className="size-4" />}</div>
            <CardTitle className="text-base font-semibold">{column.name}</CardTitle>
          </div>
          <DropdownMenu>
            <Button render={<DropdownMenuTrigger />} variant="ghost">
              <MoreVertical className="size-4" />
            </Button>
            <DropdownMenuContent align="end" className="w-40 whitespace-nowrap">
              <Button
                render={<DropdownMenuItem />}
                nativeButton={false}
                variant="destructive"
                className="w-full justify-start"
              >
                <Trash2 className="size-4" />
                Delete column
              </Button>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
    </Card>
  );
}

export default function KanbanBoard({ board, userId }: Props) {
  return (
    <div className="flex flex-col gap-8">
      {!!board &&
        board.columns.map((column, index) => (
          <DroppableColumn key={`droppable-column-${index}`} column={column} />
        ))}
    </div>
  );
}
