import {
  ArrowDown,
  ArrowUp,
  Edit2,
  ExternalLink,
  MapPin,
  MoreVertical,
  Trash2,
} from "lucide-react";
import {
  ComponentPropsWithoutRef,
  type ComponentRef,
  forwardRef,
  type PointerEvent,
  useState,
} from "react";

import DeleteJobApplicationDialog from "@/components/dialogs/job-application/DeleteJobApplicationDialog";
import UpdateJobApplicationDialog from "@/components/dialogs/job-application/UpdateJobApplicationDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getStringColor } from "@/lib/helpers";
import type { MoveJobApplicationHandler } from "@/lib/hooks/useBoard";
import type { PopulatedColumnType, PopulatedJobApplicationType } from "@/lib/models";

interface JobApplicationCardProps {
  jobApplication: PopulatedJobApplicationType;
  columns: PopulatedColumnType[];
  onMoveJobApplication?: MoveJobApplicationHandler;
}

export default forwardRef<
  ComponentRef<typeof Card>,
  JobApplicationCardProps & ComponentPropsWithoutRef<typeof Card>
>(function JobApplicationCard({ jobApplication, columns, onMoveJobApplication, ...props }, ref) {
  const currentColumn = columns.find((column) => column._id === jobApplication.columnId);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const target = event.target;

    if (!(target instanceof Node) || !event.currentTarget.contains(target)) {
      return;
    }

    const interactiveTarget =
      target instanceof Element
        ? target.closest(
            'button, a, [role="button"], [role="dialog"], [role="link"], [role="menu"], [role="menuitem"], [role="presentation"]',
          )
        : null;

    if (interactiveTarget && interactiveTarget !== event.currentTarget) {
      return;
    }

    props?.onPointerDown?.(event);
  };

  return (
    <Card ref={ref} {...props} onPointerDown={handlePointerDown}>
      <CardContent>
        <div className="grid grid-cols-[1fr_auto] gap-4">
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <div className="grid">
              <h3 className="text-base font-semibold">{jobApplication.position}</h3>
              <div className="text-sm text-muted-foreground">
                {jobApplication.company}
                {jobApplication.url && (
                  <Button
                    render={
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={jobApplication.url}
                        onClick={(event) => event.stopPropagation()}
                      />
                    }
                    nativeButton={false}
                    variant="link"
                    size="icon-xs"
                    className="mx-1 focus-visible:border-primary focus-visible:ring-primary/50"
                  >
                    <ExternalLink className="size-3" />
                  </Button>
                )}
                {jobApplication.salary.length && jobApplication.salary.some(Boolean) && (
                  <Badge
                    variant="secondary"
                    className="bg-muted text-muted-foreground selection:bg-muted-foreground selection:text-muted"
                  >
                    {!jobApplication.salary[1] ? (
                      <>
                        &ge;{" "}
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                          notation: "compact",
                        }).format(jobApplication.salary[0])}
                      </>
                    ) : !jobApplication.salary[0] ? (
                      <>
                        &le;{" "}
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                          notation: "compact",
                        }).format(jobApplication.salary[1])}
                      </>
                    ) : (
                      <>
                        {[
                          new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                            notation: "compact",
                          }).format(jobApplication.salary[0]),
                          new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                            notation: "compact",
                          }).format(jobApplication.salary[1]),
                        ].join(" - ")}
                      </>
                    )}
                  </Badge>
                )}
              </div>
              {jobApplication.location && (
                <div className="text-sm text-muted-foreground">
                  <MapPin className="inline size-4" /> {jobApplication.location}
                </div>
              )}
            </div>
            {jobApplication.description && (
              <p className="line-clamp-2 text-xs text-muted-foreground">
                {jobApplication.description}
              </p>
            )}
            {jobApplication.tags?.length && (
              <div className="flex flex-wrap gap-1">
                {jobApplication.tags.map((tag, index) => {
                  const color = getStringColor(tag);
                  return (
                    <Badge key={`tag-${index}`} variant={color || "ghost"}>
                      {tag}
                    </Badge>
                  );
                })}
              </div>
            )}
          </div>
          <div className="flex flex-col justify-between gap-4">
            <JobApplicationMenu
              jobApplication={jobApplication}
              otherColumns={columns.filter((column) => column._id !== jobApplication.columnId)}
              onMoveJobApplication={onMoveJobApplication}
            />
            <div className="flex flex-col">
              <Button
                variant="ghost"
                size="icon"
                disabled={!currentColumn || jobApplication.order <= 0 || !onMoveJobApplication}
                onClick={() =>
                  onMoveJobApplication?.(
                    jobApplication._id,
                    jobApplication.columnId,
                    jobApplication.columnId,
                    jobApplication.order,
                    jobApplication.order - 1,
                  )
                }
              >
                <ArrowUp />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                disabled={
                  !currentColumn ||
                  jobApplication.order >= currentColumn.jobApplications.length - 1 ||
                  !onMoveJobApplication
                }
                onClick={() =>
                  onMoveJobApplication?.(
                    jobApplication._id,
                    jobApplication.columnId,
                    jobApplication.columnId,
                    jobApplication.order,
                    jobApplication.order + 1,
                  )
                }
              >
                <ArrowDown />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

function JobApplicationMenu({
  jobApplication,
  otherColumns,
  onMoveJobApplication,
}: {
  jobApplication: PopulatedJobApplicationType;
  otherColumns: PopulatedColumnType[];
  onMoveJobApplication?: MoveJobApplicationHandler;
}) {
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
  const [removeDialogOpen, setRemoveDialogOpen] = useState<boolean>(false);

  return (
    <>
      <DropdownMenu>
        <Button render={<DropdownMenuTrigger />} variant="ghost" size="icon">
          <MoreVertical className="size-4" />
        </Button>
        <DropdownMenuContent align="end" className="w-48 whitespace-nowrap">
          <DropdownMenuItem onClick={() => setEditDialogOpen(true)}>
            <Edit2 className="size-4" />
            Edit job application
          </DropdownMenuItem>
          {otherColumns.length > 1 && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {otherColumns.map((column, key) => (
                  <DropdownMenuItem
                    key={key}
                    variant={column.color || "default"}
                    onClick={() =>
                      onMoveJobApplication?.(
                        jobApplication._id,
                        jobApplication.columnId,
                        column._id,
                        jobApplication.order,
                        column.jobApplications.length,
                      )
                    }
                  >
                    Move to {column.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
            </>
          )}
          <DropdownMenuItem variant="destructive" onClick={() => setRemoveDialogOpen(true)}>
            <Trash2 className="size-4" />
            Delete job application
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <UpdateJobApplicationDialog
        payload={jobApplication}
        open={editDialogOpen}
        setOpen={setEditDialogOpen}
      />
      <DeleteJobApplicationDialog
        id={jobApplication._id}
        open={removeDialogOpen}
        setOpen={setRemoveDialogOpen}
      />
    </>
  );
}
