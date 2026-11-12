import { type ClassValue, clsx } from "clsx";
import { Edit2, ExternalLink, MoreVertical, Trash2 } from "lucide-react";
import { useState } from "react";

import DeleteJobApplicationDialog from "@/components/dialogs/DeleteJobApplicationDialog";
import UpdateJobApplicationDialog from "@/components/dialogs/UpdateJobApplicationDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { updateJobApplication } from "@/lib/actions/job-applications.action";
import { getStringColor } from "@/lib/helpers";
import type { PopulatedColumnType, PopulatedJobApplicationType } from "@/lib/models";

interface JobApplicationCardProps {
  className?: ClassValue;
  job: PopulatedJobApplicationType;
  columns: PopulatedColumnType[];
}

export function JobApplicationCard({ className, job, columns }: JobApplicationCardProps) {
  return (
    <Card className={clsx(className)}>
      <CardContent>
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <div>
              <h3 className="text-base font-semibold">{job.position}</h3>
              <p className="text-sm text-muted-foreground">
                {job.company}
                {job.url && (
                  <Button
                    render={
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={job.url}
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
                {job.salary.length && job.salary.some(Boolean) && (
                  <Badge
                    variant="secondary"
                    className="bg-muted text-muted-foreground selection:bg-muted-foreground selection:text-muted"
                  >
                    {!job.salary[1] ? (
                      <>
                        &ge;{" "}
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                          notation: "compact",
                        }).format(job.salary[0])}
                      </>
                    ) : !job.salary[0] ? (
                      <>
                        &le;{" "}
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                          notation: "compact",
                        }).format(job.salary[1])}
                      </>
                    ) : (
                      <>
                        {[
                          new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                            notation: "compact",
                          }).format(job.salary[0]),
                          new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                            notation: "compact",
                          }).format(job.salary[1]),
                        ].join(" - ")}
                      </>
                    )}
                  </Badge>
                )}
              </p>
            </div>
            {job.description && (
              <p className="line-clamp-2 text-xs text-muted-foreground">{job.description}</p>
            )}
            {job.tags?.length && (
              <div className="flex flex-wrap gap-1">
                {job.tags.map((tag, index) => {
                  const color = getStringColor(tag);
                  return (
                    <Badge
                      key={`tag-${index}`}
                      variant="secondary"
                      className={clsx({
                        "bg-red-500/10 text-red-500 selection:bg-red-500 selection:text-red-100 dark:selection:text-red-900":
                          color === "red",
                        "bg-orange-500/10 text-orange-500 selection:bg-orange-500 selection:text-orange-100 dark:selection:text-orange-900":
                          color === "orange",
                        "bg-amber-500/10 text-amber-500 selection:bg-amber-500 selection:text-amber-100 dark:selection:text-amber-900":
                          color === "amber",
                        "bg-yellow-500/10 text-yellow-500 selection:bg-yellow-500 selection:text-yellow-100 dark:selection:text-yellow-900":
                          color === "yellow",
                        "bg-lime-500/10 text-lime-500 selection:bg-lime-500 selection:text-lime-100 dark:selection:text-lime-900":
                          color === "lime",
                        "bg-green-500/10 text-green-500 selection:bg-green-500 selection:text-green-100 dark:selection:text-green-900":
                          color === "green",
                        "bg-emerald-500/10 text-emerald-500 selection:bg-emerald-500 selection:text-emerald-100 dark:selection:text-emerald-900":
                          color === "emerald",
                        "bg-teal-500/10 text-teal-500 selection:bg-teal-500 selection:text-teal-100 dark:selection:text-teal-900":
                          color === "teal",
                        "bg-cyan-500/10 text-cyan-500 selection:bg-cyan-500 selection:text-cyan-100 dark:selection:text-cyan-900":
                          color === "cyan",
                        "bg-sky-500/10 text-sky-500 selection:bg-sky-500 selection:text-sky-100 dark:selection:text-sky-900":
                          color === "sky",
                        "bg-blue-500/10 text-blue-500 selection:bg-blue-500 selection:text-blue-100 dark:selection:text-blue-900":
                          color === "blue",
                        "bg-indigo-500/10 text-indigo-500 selection:bg-indigo-500 selection:text-indigo-100 dark:selection:text-indigo-900":
                          color === "indigo",
                        "bg-violet-500/10 text-violet-500 selection:bg-violet-500 selection:text-violet-100 dark:selection:text-violet-900":
                          color === "violet",
                        "bg-purple-500/10 text-purple-500 selection:bg-purple-500 selection:text-purple-100 dark:selection:text-purple-900":
                          color === "purple",
                        "bg-fuchsia-500/10 text-fuchsia-500 selection:bg-fuchsia-500 selection:text-fuchsia-100 dark:selection:text-fuchsia-900":
                          color === "fuchsia",
                        "bg-pink-500/10 text-pink-500 selection:bg-pink-500 selection:text-pink-100 dark:selection:text-pink-900":
                          color === "pink",
                        "bg-rose-500/10 text-rose-500 selection:bg-rose-500 selection:text-rose-100 dark:selection:text-rose-900":
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
          <JobApplicationMenu
            jobApplication={job}
            otherColumns={columns.filter((column) => column._id !== job.columnId)}
          />
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
          {otherColumns.length > 1 &&
            otherColumns.map((column, key) => (
              <DropdownMenuItem
                key={key}
                className={clsx({
                  "focus:bg-red-500/10 focus:text-red-500": column.color === "red",
                  "focus:bg-orange-500/10 focus:text-orange-500": column.color === "orange",
                  "focus:bg-amber-500/10 focus:text-amber-500": column.color === "amber",
                  "focus:bg-yellow-500/10 focus:text-yellow-500": column.color === "yellow",
                  "focus:bg-lime-500/10 focus:text-lime-500": column.color === "lime",
                  "focus:bg-green-500/10 focus:text-green-500": column.color === "green",
                  "focus:bg-emerald-500/10 focus:text-emerald-500": column.color === "emerald",
                  "focus:bg-teal-500/10 focus:text-teal-500": column.color === "teal",
                  "focus:bg-cyan-500/10 focus:text-cyan-500": column.color === "cyan",
                  "focus:bg-sky-500/10 focus:text-sky-500": column.color === "sky",
                  "focus:bg-blue-500/10 focus:text-blue-500": column.color === "blue",
                  "focus:bg-indigo-500/10 focus:text-indigo-500": column.color === "indigo",
                  "focus:bg-violet-500/10 focus:text-violet-500": column.color === "violet",
                  "focus:bg-purple-500/10 focus:text-purple-500": column.color === "purple",
                  "focus:bg-fuchsia-500/10 focus:text-fuchsia-500": column.color === "fuchsia",
                  "focus:bg-pink-500/10 focus:text-pink-500": column.color === "pink",
                  "focus:bg-rose-500/10 focus:text-rose-500": column.color === "rose",
                })}
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
