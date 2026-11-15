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
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

import ColumnCard from "@/components/cards/ColumnCard";
import JobApplicationCard from "@/components/cards/JobApplicationCard";
import Container from "@/components/Container";
import BoardHeading from "@/components/heading/BoardHeading";
import { useDashboard } from "@/contexts/dashboard";
import type { PopulatedColumnType, PopulatedJobApplicationType } from "@/lib/models";

type ColumnContextData = {
  type: "column";
  columnId: string;
  maxOrder: number;
};

type JobApplicationContextData = {
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

  const [jobApplicationOverlayId, setJobApplicationOverlayId] = useState<string | null>(null);

  const overlayJobApplication = columns
    .flatMap((column) => column.jobApplications || [])
    .find((jobApplication) => jobApplication._id === jobApplicationOverlayId?.toString());

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 0,
      },
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    setJobApplicationOverlayId(event.active.id.toString());
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    setJobApplicationOverlayId(null);

    if (!over || !board?._id) return;

    const activeId = active.id.toString();
    const overId = over.id.toString();

    const activeData = active.data.current as JobApplicationContextData | undefined;
    const overData = over.data.current as ColumnContextData | JobApplicationContextData | undefined;

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

  return board ? (
    <div className="flex flex-1 flex-col gap-12 overflow-x-auto py-12">
      <BoardHeading className="sticky left-0" />
      <DndContext
        id={`board-${board._id}`}
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
  ) : (
    <Container className="flex flex-1 items-center justify-center py-12">
      <Loader2 className="animate-spin text-primary" />
    </Container>
  );
}

function KanbanDroppableColumn({
  boardId,
  column,
}: {
  boardId: string;
  column: PopulatedColumnType;
}) {
  const jobApplications = column.jobApplications;

  const { isOver, setNodeRef } = useDroppable({
    id: column._id,
    data: {
      type: "column",
      columnId: column._id,
      maxOrder: jobApplications.length
        ? Math.max(...jobApplications.map((jobApplication) => jobApplication.order))
        : -1,
    } satisfies ColumnContextData,
  });
  const { over } = useDndContext();

  const overData = over?.data.current as JobApplicationContextData | undefined;
  const isJobApplicationOver =
    overData?.type === "job-application" && overData.columnId === column._id;

  return (
    <ColumnCard
      ref={setNodeRef}
      boardId={boardId}
      column={column}
      isActive={isOver || isJobApplicationOver}
    >
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
    </ColumnCard>
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
    } satisfies JobApplicationContextData,
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
