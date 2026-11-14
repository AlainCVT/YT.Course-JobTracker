"use client";

import {
  type CollisionDetection,
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  PointerSensor,
  pointerWithin,
  useDndContext,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";
import { ArrowLeft, ArrowRight, MoreVertical, Pen, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

import JobApplicationCard from "@/components/cards/JobApplicationCard";
import Container from "@/components/Container";
import UpdateBoardDialog from "@/components/dialogs/board/UpdateBoardDialog";
import CreateJobApplicationDialog from "@/components/dialogs/job-application/CreateJobApplicationDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDashboard } from "@/contexts/dashboard";
import { COLUMNS_ICONS } from "@/lib/constants";
import type { PopulatedColumnType, PopulatedJobApplicationType } from "@/lib/models";

type DroppableData = {
  type: "column";
  columnId: string;
  maxOrder: number;
};

type SortableData = {
  type: "job-application";
  jobApplicationId: string;
  columnId: string;
  order: number;
};

const kanbanCollisionDetection: CollisionDetection = (args) => {
  const collisions = pointerWithin(args).filter((collision) => collision.id !== args.active.id);
  const jobApplicationsCollisions = collisions.filter(
    (collision) =>
      args.droppableContainers.find((container) => container.id === collision.id)?.data.current
        ?.type === "job-application",
  );

  return jobApplicationsCollisions.length
    ? jobApplicationsCollisions
    : collisions.filter(
        (collision) =>
          args.droppableContainers.find((container) => container.id === collision.id)?.data.current
            ?.type === "column",
      );
};

export default function KanbanBoard() {
  const { board, columns, moveJobApplication } = useDashboard();
  const [overlayId, setOverlayId] = useState<string | null>(null);

  const overlayJobApplication = columns
    .flatMap((column) => column.jobApplications || [])
    .find((jobApplication) => jobApplication._id === overlayId?.toString());

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 0,
      },
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    setOverlayId(event.active.id.toString());
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    setOverlayId(null);

    if (!over || !board?._id) return;

    const activeId = active.id.toString();
    const overId = over.id.toString();

    const activeData = active.data.current as SortableData | undefined;
    const overData = over.data.current as DroppableData | SortableData | undefined;

    if (!activeData || !overData || activeId === overId) return;

    switch (overData.type) {
      case "column":
        await moveJobApplication(
          activeId,
          activeData.columnId,
          overId,
          activeData.order,
          activeData.columnId === overId ? activeData.order : overData.maxOrder + 1,
        );
        break;
      case "job-application":
        await moveJobApplication(
          activeId,
          activeData.columnId,
          overData.columnId,
          activeData.order,
          overData.order,
        );
        break;
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-12 overflow-x-auto py-12">
      <div className="sticky left-0">
        <Container>
          {board && (
            <>
              <div>
                <h1 className="inline text-3xl font-bold">{board.name}</h1>
                <UpdateBoardDialog
                  payload={board}
                  trigger={
                    <Button className="mx-2" variant="link" size="icon-sm">
                      <Pen />
                    </Button>
                  }
                />
              </div>
              {board?.description && <p className="text-muted-foreground">{board.description}</p>}
            </>
          )}
        </Container>
      </div>
      <DndContext
        id={`board-${board?._id ?? "empty"}`}
        sensors={sensors}
        collisionDetection={kanbanCollisionDetection}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <Container className="flex gap-8" definedBy="margin">
          {!!board &&
            columns.map((column) => (
              <KanbanDroppableColumn
                key={`droppable-column-${column._id}`}
                boardId={board._id}
                column={column}
              />
            ))}
        </Container>
        <DragOverlay>
          {!!overlayJobApplication && (
            <JobApplicationCard
              className="cursor-grabbing opacity-50"
              jobApplication={overlayJobApplication}
            />
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

function KanbanDroppableColumn({
  boardId,
  column,
}: {
  column: PopulatedColumnType;
  boardId: string;
}) {
  const Icon = column.icon ? COLUMNS_ICONS[column.icon] : null;
  const jobApplications = column.jobApplications;

  const { isOver, setNodeRef } = useDroppable({
    id: column._id,
    data: {
      type: "column",
      columnId: column._id,
      maxOrder: jobApplications.length
        ? Math.max(...jobApplications.map((jobApplication) => jobApplication.order))
        : -1,
    } satisfies DroppableData,
  });
  const { over } = useDndContext();

  const overData = over?.data.current as SortableData | undefined;
  const isJobApplicationOver =
    overData?.type === "job-application" && overData.columnId === column._id;

  return (
    <Card
      ref={setNodeRef}
      className={clsx("w-lg shrink-0 p-0 pb-6 shadow-md", {
        [`card-ui card-ui-${column.color}`]: column.color,
        "card-ui-active": isOver || isJobApplicationOver,
      })}
    >
      <CardHeader
        className={clsx("py-2", {
          [`card-ui-header-${column.color}`]: column.color,
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
              variant={column.color ? `tinted-${column.color}` : "ghost"}
              size="icon"
            >
              <MoreVertical className="size-4" />
            </Button>
            <DropdownMenuContent align="end" className="w-36 whitespace-nowrap">
              <DropdownMenuItem variant="destructive" disabled={!!jobApplications.length}>
                <Trash2 className="size-4" />
                Delete column
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      {!!jobApplications.length && (
        <CardContent className="space-y-2">
          <SortableContext
            items={jobApplications.map((jobApplication) => jobApplication._id)}
            strategy={verticalListSortingStrategy}
          >
            {jobApplications.map((jobApplication) => (
              <KanbanSortableJobApplicationCard
                key={`sortable-job-application-card-${jobApplication._id}`}
                jobApplication={{
                  ...jobApplication,
                  columnId: jobApplication.columnId || column._id,
                }}
              />
            ))}
          </SortableContext>
        </CardContent>
      )}
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
}: {
  jobApplication: PopulatedJobApplicationType;
}) {
  const { attributes, listeners, transform, transition, isDragging, setNodeRef } = useSortable({
    id: jobApplication._id,
    data: {
      type: "job-application",
      jobApplicationId: jobApplication._id,
      columnId: jobApplication.columnId,
      order: jobApplication.order,
    } satisfies SortableData,
  });

  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

  useEffect(() => {
    const updateMouseState = () => {
      if (!isDragging) {
        setIsMouseDown(false);
      }
    };
    updateMouseState();
  }, [isDragging]);

  return (
    <JobApplicationCard
      ref={setNodeRef}
      jobApplication={jobApplication}
      className={isMouseDown ? "cursor-grabbing" : "cursor-grab"}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
      }}
      onMouseDown={() => setIsMouseDown(true)}
      onMouseUp={() => setIsMouseDown(false)}
      onMouseEnter={() => setIsMouseDown(false)}
      onMouseLeave={() => setIsMouseDown(false)}
      {...{ ...attributes, tabIndex: -1, ...listeners }}
    />
  );
}
