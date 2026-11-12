import { type ClassValue, clsx } from "clsx";
import { ArrowDown, ArrowUp, Edit2, ExternalLink, MoreVertical, Trash2 } from "lucide-react";
import { useState } from "react";

import DeleteJobApplicationDialog from "@/components/dialogs/DeleteJobApplicationDialog";
import UpdateJobApplicationDialog from "@/components/dialogs/UpdateJobApplicationDialog";
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
import { updateJobApplication } from "@/lib/actions/job-applications.action";
import { getStringColor } from "@/lib/helpers";
import type { PopulatedColumnType, PopulatedJobApplicationType } from "@/lib/models";

interface JobApplicationCardProps {
  className?: ClassValue;
  jobApplication: PopulatedJobApplicationType;
  columns: PopulatedColumnType[];
}

export function JobApplicationCard({
  className,
  jobApplication,
  columns,
}: JobApplicationCardProps) {
  const currentColumn = columns.find((column) => column._id === jobApplication.columnId);

  return (
    <Card className={clsx(className)}>
      <CardContent>
        <div className="grid grid-cols-[1fr_auto] gap-4">
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <div>
              <h3 className="text-base font-semibold">{jobApplication.position}</h3>
              <p className="text-sm text-muted-foreground">
                {jobApplication.company}
                {jobApplication.url && (
                  <Button
                    render={
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={jobApplication.url}
                        onClick={(event) => {
                          event.stopPropagation();
                        }}
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
              </p>
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
                    <Badge
                      key={`tag-${index}`}
                      variant="outline"
                      className={clsx({
                        "border-red-500/20 bg-red-500/10 text-red-500 selection:bg-red-500 selection:text-red-100 dark:selection:text-red-900":
                          color === "red",
                        "border-orange-500/20 bg-orange-500/10 text-orange-500 selection:bg-orange-500 selection:text-orange-100 dark:selection:text-orange-900":
                          color === "orange",
                        "border-amber-500/20 bg-amber-500/10 text-amber-500 selection:bg-amber-500 selection:text-amber-100 dark:selection:text-amber-900":
                          color === "amber",
                        "border-yellow-500/20 bg-yellow-500/10 text-yellow-500 selection:bg-yellow-500 selection:text-yellow-100 dark:selection:text-yellow-900":
                          color === "yellow",
                        "border-lime-500/20 bg-lime-500/10 text-lime-500 selection:bg-lime-500 selection:text-lime-100 dark:selection:text-lime-900":
                          color === "lime",
                        "border-green-500/20 bg-green-500/10 text-green-500 selection:bg-green-500 selection:text-green-100 dark:selection:text-green-900":
                          color === "green",
                        "border-emerald-500/20 bg-emerald-500/10 text-emerald-500 selection:bg-emerald-500 selection:text-emerald-100 dark:selection:text-emerald-900":
                          color === "emerald",
                        "border-teal-500/20 bg-teal-500/10 text-teal-500 selection:bg-teal-500 selection:text-teal-100 dark:selection:text-teal-900":
                          color === "teal",
                        "border-cyan-500/20 bg-cyan-500/10 text-cyan-500 selection:bg-cyan-500 selection:text-cyan-100 dark:selection:text-cyan-900":
                          color === "cyan",
                        "border-sky-500/20 bg-sky-500/10 text-sky-500 selection:bg-sky-500 selection:text-sky-100 dark:selection:text-sky-900":
                          color === "sky",
                        "border-blue-500/20 bg-blue-500/10 text-blue-500 selection:bg-blue-500 selection:text-blue-100 dark:selection:text-blue-900":
                          color === "blue",
                        "border-indigo-500/20 bg-indigo-500/10 text-indigo-500 selection:bg-indigo-500 selection:text-indigo-100 dark:selection:text-indigo-900":
                          color === "indigo",
                        "border-violet-500/20 bg-violet-500/10 text-violet-500 selection:bg-violet-500 selection:text-violet-100 dark:selection:text-violet-900":
                          color === "violet",
                        "border-purple-500/20 bg-purple-500/10 text-purple-500 selection:bg-purple-500 selection:text-purple-100 dark:selection:text-purple-900":
                          color === "purple",
                        "border-fuchsia-500/20 bg-fuchsia-500/10 text-fuchsia-500 selection:bg-fuchsia-500 selection:text-fuchsia-100 dark:selection:text-fuchsia-900":
                          color === "fuchsia",
                        "border-pink-500/20 bg-pink-500/10 text-pink-500 selection:bg-pink-500 selection:text-pink-100 dark:selection:text-pink-900":
                          color === "pink",
                        "border-rose-500/20 bg-rose-500/10 text-rose-500 selection:bg-rose-500 selection:text-rose-100 dark:selection:text-rose-900":
                          color === "rose",
                      })}
                    >
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
            />
            <div className="flex flex-col">
              <Button
                variant="ghost"
                size="icon"
                disabled={!currentColumn || jobApplication.order <= 0}
                onClick={() => {
                  updateJobApplication(jobApplication._id, { order: jobApplication.order - 1 });
                }}
              >
                <ArrowUp />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                disabled={
                  !currentColumn || jobApplication.order >= currentColumn.jobApplications.length - 1
                }
                onClick={() => {
                  updateJobApplication(jobApplication._id, { order: jobApplication.order + 1 });
                }}
              >
                <ArrowDown />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function JobApplicationMenu({
  jobApplication,
  otherColumns,
}: {
  jobApplication: PopulatedJobApplicationType;
  otherColumns: PopulatedColumnType[];
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
          <DropdownMenuItem
            onClick={() => {
              setEditDialogOpen(true);
            }}
          >
            <Edit2 className="size-4" />
            Edit
          </DropdownMenuItem>
          {otherColumns.length > 1 && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {otherColumns.map((column, key) => (
                  <DropdownMenuItem
                    key={key}
                    variant={column.color || "default"}
                    onClick={() => {
                      updateJobApplication(jobApplication._id, { columnId: column._id }).catch(
                        (error) => {
                          console.error("Failed to move job application:", error);
                        },
                      );
                    }}
                  >
                    Move to {column.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
            </>
          )}
          <DropdownMenuItem
            variant="destructive"
            onClick={() => {
              setRemoveDialogOpen(true);
            }}
          >
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
