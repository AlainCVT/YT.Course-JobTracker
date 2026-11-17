import clsx from "clsx";
import { parseISO } from "date-fns";
import { Loader2 } from "lucide-react";
import {
  type Dispatch,
  type ReactElement,
  type SetStateAction,
  type SubmitEvent,
  useRef,
  useState,
} from "react";

import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Rating } from "@/components/ui/rating";
import { TagInput } from "@/components/ui/tag-input";
import { Textarea } from "@/components/ui/textarea";
import { updateJobApplication } from "@/lib/actions/job-applications.action";
import type {
  MongoSchemaBase,
  MongoTimestampProps,
  PopulatedJobApplicationType,
} from "@/lib/models";

type UpdateJobApplicationProps = {
  id: string;
  payload: Omit<
    PopulatedJobApplicationType,
    keyof MongoSchemaBase | "order" | "userId" | "boardId" | "columnId" | keyof MongoTimestampProps
  >;
};

type UpdateJobApplicationDialogProps = UpdateJobApplicationProps &
  (
    | {
        trigger: ReactElement;
        nativeTriggerButton?: boolean;
      }
    | {
        open: boolean;
        setOpen: Dispatch<SetStateAction<boolean>>;
      }
  );

export default function UpdateJobApplicationDialog({
  id,
  payload,
  ...handleOpen
}: UpdateJobApplicationDialogProps) {
  const [open, setOpen] = useState<boolean>(false);

  const close = () => {
    if ("setOpen" in handleOpen) {
      handleOpen.setOpen(false);
    } else {
      setOpen(false);
    }
  };

  return "trigger" in handleOpen ? (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={handleOpen.trigger} nativeButton={handleOpen.nativeTriggerButton} />
      <UpdateJobApplicationContent id={id} payload={payload} close={close} />
    </Dialog>
  ) : (
    <Dialog open={handleOpen.open} onOpenChange={handleOpen.setOpen}>
      <UpdateJobApplicationContent id={id} payload={payload} close={close} />
    </Dialog>
  );
}

function UpdateJobApplicationContent({
  id,
  payload,
  close,
}: UpdateJobApplicationProps & { close: () => void }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    if (!formRef.current) return;
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(formRef.current);
    const company = formData.get("company")?.toString() ?? "";
    const position = formData.get("position")?.toString() ?? "";
    const location = formData.get("location")?.toString() ?? "";
    const salary = formData.getAll("salary").map((value) => Number(value));
    const url = formData.get("url")?.toString() ?? "";
    const tags = formData.getAll("tags").map((value) => value.toString());
    const appliedAt = formData.get("appliedAt")?.toString() ?? "";
    const priority = Number(formData.get("priority")?.toString() ?? "");
    const description = formData.get("description")?.toString() ?? "";
    const notes = formData.get("notes")?.toString() ?? "";

    try {
      await updateJobApplication(id, {
        company,
        position,
        location,
        salary,
        url,
        tags,
        ...(appliedAt && {
          appliedAt: parseISO(appliedAt),
        }),
        priority: Math.max(0, Math.min(5, Number(priority))),
        description,
        notes,
      });
      close();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DialogContent className="max-h-[calc(100vh-1rem*2)] overflow-auto">
      <DialogHeader>
        <DialogTitle className="text-lg">Edit Job Application</DialogTitle>
        <DialogDescription>Update this job application data</DialogDescription>
      </DialogHeader>
      <form ref={formRef} className="space-y-8" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="company">
                <span>
                  Company <span className="text-destructive">*</span>
                </span>
              </FieldLabel>
              <Input id="company" name="company" required defaultValue={payload.company} />
            </Field>
            <Field>
              <FieldLabel htmlFor="position">
                <span>
                  Position <span className="text-destructive">*</span>
                </span>
              </FieldLabel>
              <Input id="position" name="position" required defaultValue={payload.position} />
            </Field>
          </div>
          <Field>
            <FieldLabel htmlFor="location">
              <span>
                Location <span className="text-destructive">*</span>
              </span>
            </FieldLabel>
            <Input id="location" name="location" required defaultValue={payload.location ?? ""} />
          </Field>
          <Field>
            <FieldLabel htmlFor="salary">Salary (USD/year)</FieldLabel>
            <div className="grid grid-cols-2 gap-4">
              <Input
                id="salary"
                name="salary"
                type="number"
                placeholder="Minimum"
                step={500}
                min={0}
                defaultValue={payload.salary[0]}
              />
              <Input
                id="salary"
                name="salary"
                type="number"
                placeholder="Maximum"
                step={500}
                min={0}
                defaultValue={payload.salary[1]}
              />
            </div>
          </Field>
          <Field>
            <FieldLabel htmlFor="url">URL</FieldLabel>
            <Input id="url" name="url" type="url" defaultValue={payload.url ?? ""} />
          </Field>
          <Field>
            <FieldLabel htmlFor="tags">Tags</FieldLabel>
            <TagInput id="tags" name="tags" defaultValue={payload.tags ?? []} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="appliedAt">Applied at </FieldLabel>
              <DatePicker
                id="appliedAt"
                name="appliedAt"
                defaultValue={payload.appliedAt ? new Date(payload.appliedAt) : undefined}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="priority">Priority</FieldLabel>
              <Rating
                id="priority"
                className="my-auto"
                name="priority"
                defaultValue={payload.priority || 0}
              />
            </Field>
          </div>
          <Field>
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <Textarea
              id="description"
              name="description"
              rows={3}
              defaultValue={payload.description ?? ""}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="notes">Notes</FieldLabel>
            <Textarea id="notes" name="notes" rows={4} defaultValue={payload.notes ?? ""} />
          </Field>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={close}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            <span className={clsx(loading && "opacity-0")}>Edit job application</span>
            <Loader2 className={clsx("absolute m-auto animate-spin", !loading && "opacity-0")} />
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
