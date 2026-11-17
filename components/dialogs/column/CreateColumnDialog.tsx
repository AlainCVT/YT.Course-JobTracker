import clsx from "clsx";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createColumn } from "@/lib/actions/column";
import { assertIsInArray } from "@/lib/assertion";
import { COLUMNS_ICONS, UI_COLORS } from "@/lib/constants";

type CreateColumnProps = {
  boardId: string;
  boardName: string;
};

type CreateColumnDialogProps = CreateColumnProps &
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

const UPPERCASE_EXCEPTIONS: Record<string, string> = {
  "3d": "3D",
  Airplay: "AirPlay",
  Cctv: "CCTV",
  Cpu: "CPU",
  Dna: "DNA",
  Gpu: "GPU",
  Hd: "HD",
  Hdmi: "HDMI",
  Id: "ID",
  Midi: "MIDI",
  Nfc: "NFC",
  Pc: "PC",
  Qr: "QR",
  Rss: "RSS",
  Sim: "SIM",
  Tv: "TV",
  Usb: "USB",
  Wifi: "Wi-Fi",
};

const formatIconName = (currentIcon: string): string => {
  return currentIcon
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/^([A-Z])(?=[A-Z][a-z])/, "$1 ")
    .replace(/([a-wyzA-WYZ])(\d+)/g, "$1 $2")
    .split(" ")
    .map((word) => UPPERCASE_EXCEPTIONS[word] ?? word)
    .join(" ")
    .trim();
};

const capitalize = (s: string): string => s.replace(/^./, (char) => char.toUpperCase());

export default function CreateColumnDialog({
  boardId,
  boardName,
  ...handleOpen
}: CreateColumnDialogProps) {
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
      <CreateContentContent boardId={boardId} boardName={boardName} close={close} />
    </Dialog>
  ) : (
    <Dialog open={handleOpen.open} onOpenChange={handleOpen.setOpen}>
      <CreateContentContent boardId={boardId} boardName={boardName} close={close} />
    </Dialog>
  );
}

function CreateContentContent({
  boardId,
  boardName,
  close,
}: CreateColumnProps & { close: () => void }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentIcon, setCurrentIcon] = useState<keyof typeof COLUMNS_ICONS | null>(null);
  const [currentColor, setCurrentColor] = useState<(typeof UI_COLORS)[number] | null>(null);

  const icons = Object.keys(COLUMNS_ICONS);
  const SelectedIcon = currentIcon ? COLUMNS_ICONS[currentIcon] : null;

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    if (!formRef.current) return;
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(formRef.current);
    const name = formData.get("name")?.toString() ?? "";
    const icon = formData.get("icon")?.toString() ?? "";
    const color = formData.get("color")?.toString() ?? "";

    try {
      assertIsInArray(icon, Object.keys(COLUMNS_ICONS));
      assertIsInArray(color, UI_COLORS);

      await createColumn({
        name,
        icon,
        color,
        boardId,
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
        <DialogTitle className="text-lg">Add Column to {boardName}</DialogTitle>
        <DialogDescription>Create a new column</DialogDescription>
      </DialogHeader>
      <form ref={formRef} className="space-y-8" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <Field>
            <FieldLabel htmlFor="name">
              <span>
                Name <span className="text-destructive">*</span>
              </span>
            </FieldLabel>
            <Input id="name" name="name" required autoComplete="off" />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="icon">
                <span>
                  Icon <span className="text-destructive">*</span>
                </span>
              </FieldLabel>
              <Select
                id="icon"
                name="icon"
                value={currentIcon}
                onValueChange={(value) => setCurrentIcon(value)}
              >
                <SelectTrigger>
                  {currentIcon && SelectedIcon ? (
                    <span className="flex items-center gap-2 overflow-hidden">
                      <SelectedIcon className="mt-0.5" />
                      {formatIconName(currentIcon)}
                    </span>
                  ) : (
                    <SelectValue placeholder="Select an icon" />
                  )}
                </SelectTrigger>
                <SelectContent alignItemWithTrigger={true}>
                  <SelectGroup>
                    <SelectLabel>Icons</SelectLabel>
                    {icons.map((icon, index) => {
                      const Icon = COLUMNS_ICONS[icon];
                      return (
                        <SelectItem key={`icon-${index}`} value={icon}>
                          <span className="flex items-start gap-2 whitespace-normal">
                            <Icon className="mt-0.5" />
                            {formatIconName(icon)}
                          </span>
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel htmlFor="color">
                <span>
                  Color <span className="text-destructive">*</span>
                </span>
              </FieldLabel>
              <Select
                id="color"
                name="color"
                value={currentColor}
                onValueChange={(value) => setCurrentColor(value)}
              >
                <SelectTrigger>
                  {currentColor ? (
                    <span className="flex items-center gap-2 overflow-hidden">
                      <span
                        className={`mt-0.5 size-4 rounded-sm border border-border bg-${currentColor}-500`}
                      />
                      {capitalize(currentColor)}
                    </span>
                  ) : (
                    <SelectValue placeholder="Select a color" />
                  )}
                </SelectTrigger>
                <SelectContent alignItemWithTrigger={true}>
                  <SelectGroup>
                    <SelectLabel>Colors</SelectLabel>
                    {UI_COLORS.map((color, index) => {
                      return (
                        <SelectItem key={`color-${index}`} value={color}>
                          <span className="flex items-start gap-2 whitespace-normal">
                            <span
                              className={`mt-0.5 size-4 rounded-sm border border-border bg-${color}-500`}
                            />
                            {capitalize(color)}
                          </span>
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={close}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            <span className={clsx(loading && "opacity-0")}>Add column</span>
            <Loader2 className={clsx("absolute m-auto animate-spin", !loading && "opacity-0")} />
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
