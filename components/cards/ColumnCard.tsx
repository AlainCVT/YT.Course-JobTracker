import clsx from "clsx";
import { ArrowLeft, ArrowRight, Edit2, MoreVertical, Plus, Trash2 } from "lucide-react";
import {
  type ComponentPropsWithoutRef,
  type ComponentRef,
  forwardRef,
  type PropsWithChildren,
  useState,
} from "react";

import DeleteColumnDialog from "@/components/dialogs/column/DeleteColumnDialog";
import UpdateColumnDialog from "@/components/dialogs/column/UpdateColumnDialog";
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
import type { PopulatedColumnType } from "@/lib/models";

interface ColumnCardProps extends PropsWithChildren {
  boardId: string;
  column: PopulatedColumnType;
  isActive?: boolean;
}

export default forwardRef<
  ComponentRef<typeof Card>,
  ColumnCardProps & ComponentPropsWithoutRef<typeof Card>
>(function ColumnCard({ children, boardId, column, isActive, ...props }, ref) {
  const Icon = column.icon ? COLUMNS_ICONS[column.icon] : null;
  const jobApplications = column.jobApplications;

  const { columns, moveColumn } = useDashboard();

  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
  const [removeDialogOpen, setRemoveDialogOpen] = useState<boolean>(false);

  return (
    <Card
      ref={ref}
      className={clsx("w-lg shrink-0 p-0 pb-6 shadow-md", {
        [`card-ui card-ui-${column.color}`]: column.color,
        "card-ui-active": isActive,
      })}
      {...props}
    >
      <CardHeader
        className={clsx("py-2", {
          [`card-ui-header-${column.color}`]: column.color,
        })}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div>{Icon && <Icon className="size-4" />}</div>
            <CardTitle role="heading" aria-level={2} className="text-base font-semibold">
              {column.name}
            </CardTitle>
          </div>
          <div className="flex gap-4">
            <div className="flex">
              <Button
                variant={column.color ? `tinted-${column.color}` : "ghost"}
                size="icon"
                disabled={column.order <= 0}
                onClick={() => moveColumn(column._id, column.order, column.order - 1)}
              >
                <ArrowLeft />
              </Button>
              <Button
                variant={column.color ? `tinted-${column.color}` : "ghost"}
                size="icon"
                disabled={column.order >= columns.length - 1}
                onClick={() => moveColumn(column._id, column.order, column.order + 1)}
              >
                <ArrowRight />
              </Button>
            </div>
            <DropdownMenu>
              <Button
                render={<DropdownMenuTrigger />}
                variant={column.color ? `tinted-${column.color}` : "ghost"}
                size="icon"
              >
                <MoreVertical className="size-4" />
              </Button>
              <DropdownMenuContent align="end" className="w-38 whitespace-nowrap">
                <DropdownMenuItem onClick={() => setEditDialogOpen(true)}>
                  <Edit2 className="size-4" />
                  Edit column
                </DropdownMenuItem>
                <DropdownMenuItem
                  variant="destructive"
                  disabled={!!jobApplications.length}
                  onClick={() => setRemoveDialogOpen(true)}
                >
                  <Trash2 className="size-4" />
                  Remove column
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      {!!jobApplications.length && <CardContent className="space-y-2">{children}</CardContent>}
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
      <UpdateColumnDialog
        id={column._id}
        payload={column}
        open={editDialogOpen}
        setOpen={setEditDialogOpen}
      />
      <DeleteColumnDialog id={column._id} open={removeDialogOpen} setOpen={setRemoveDialogOpen} />
    </Card>
  );
});
