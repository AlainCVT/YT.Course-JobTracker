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
import { deleteJobApplication } from "@/lib/actions/job-applications.action";

type DeleteJobApplicationProps = {
  id: string;
};

type DeleteJobApplicationDialogProps = DeleteJobApplicationProps &
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

export default function DeleteJobApplicationDialog({
  id,
  ...handleOpen
}: DeleteJobApplicationDialogProps) {
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
      <DeleteJobApplicationContent id={id} close={close} />
    </Dialog>
  ) : (
    <Dialog open={handleOpen.open} onOpenChange={handleOpen.setOpen}>
      <DeleteJobApplicationContent id={id} close={close} />
    </Dialog>
  );
}

function DeleteJobApplicationContent({
  id,
  close,
}: DeleteJobApplicationProps & { close: () => void }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      await deleteJobApplication(id);
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
        <DialogTitle className="text-lg">Remove Job Application</DialogTitle>
        <DialogDescription>Confirm to delete the job application</DialogDescription>
      </DialogHeader>
      <form ref={formRef} className="space-y-8" onSubmit={handleSubmit}>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={close}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : "Remove job application"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
