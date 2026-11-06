import { Loader2, Plus } from "lucide-react";
import { type SubmitEvent, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
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
import { TagInput } from "@/components/ui/tag-input";
import { Textarea } from "@/components/ui/textarea";
import { createJobApplication } from "@/lib/actions/job-applications";
import type { MongoID } from "@/lib/models";

export default function CreateJobApplicationDialog({
  columnName,
  columnId,
  boardId,
}: {
  columnName: string;
  columnId: MongoID;
  boardId: MongoID;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

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
    const description = formData.get("description")?.toString() ?? "";
    const notes = formData.get("notes")?.toString() ?? "";

    try {
      await createJobApplication({
        company,
        position,
        location,
        salary,
        url,
        tags,
        description,
        notes,
        columnId,
        boardId,
      });

      setOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button render={<DialogTrigger />} variant="outline">
        <Plus /> Add job
      </Button>
      <DialogContent className="max-h-[calc(100vh-1rem*2)] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-lg">Add Job Application to {columnName}</DialogTitle>
          <DialogDescription>Track a new job application</DialogDescription>
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
                <Input id="company" name="company" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="position">
                  <span>
                    Position <span className="text-destructive">*</span>
                  </span>
                </FieldLabel>
                <Input id="position" name="position" required />
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="location">
                <span>
                  Location <span className="text-destructive">*</span>
                </span>
              </FieldLabel>
              <Input id="location" name="location" required />
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
                />
                <Input
                  id="salary"
                  name="salary"
                  type="number"
                  placeholder="Maximum"
                  step={500}
                  min={0}
                />
              </div>
            </Field>
            <Field>
              <FieldLabel htmlFor="url">URL</FieldLabel>
              <Input id="url" name="url" type="url" />
            </Field>
            <Field>
              <FieldLabel htmlFor="tags">Tags</FieldLabel>
              <TagInput id="tags" name="tags" />
            </Field>
            <Field>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Textarea id="description" name="description" rows={3} />
            </Field>
            <Field>
              <FieldLabel htmlFor="notes">Notes</FieldLabel>
              <Textarea id="notes" name="notes" rows={4} />
            </Field>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : "Add Application"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
