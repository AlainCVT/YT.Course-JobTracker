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
import { Textarea } from "@/components/ui/textarea";
import { updateBoard } from "@/lib/actions/board";
import type { PopulatedBoardType } from "@/lib/models";

type UpdateBoardProps = {
  payload: Omit<PopulatedBoardType, "columns" | "userId">;
};

type UpdateBoardDialogProps = UpdateBoardProps &
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

export default function UpdateBoardDialog({ payload, ...handleOpen }: UpdateBoardDialogProps) {
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
      <UpdateBoardContent payload={payload} close={close} />
    </Dialog>
  ) : (
    <Dialog open={handleOpen.open} onOpenChange={handleOpen.setOpen}>
      <UpdateBoardContent payload={payload} close={close} />
    </Dialog>
  );
}

function UpdateBoardContent({ payload, close }: UpdateBoardProps & { close: () => void }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    if (!formRef.current) return;
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(formRef.current);
    const name = formData.get("name")?.toString() ?? "";
    const description = formData.get("description")?.toString() ?? "";

    try {
      await updateBoard(payload._id, { name, description });
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
        <DialogTitle className="text-lg">Edit Board</DialogTitle>
        <DialogDescription>Update this board data</DialogDescription>
      </DialogHeader>
      <form ref={formRef} className="space-y-8" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <Field>
            <FieldLabel htmlFor="name">
              <span>
                Name <span className="text-destructive">*</span>
              </span>
            </FieldLabel>
            <Input id="name" name="name" required defaultValue={payload.name} autoComplete="off" />
          </Field>
          <Field>
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <Textarea
              id="description"
              name="description"
              rows={3}
              defaultValue={payload.description ?? ""}
            />
          </Field>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={close}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : "Edit board"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
