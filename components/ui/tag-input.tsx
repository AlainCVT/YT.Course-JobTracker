"use client";

import type { ClassValue } from "clsx";
import { X } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TagInputProps {
  id?: string;
  name?: string;
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: ClassValue;
}

export function TagInput({
  id,
  name,
  value,
  defaultValue = [],
  onValueChange,
  placeholder,
  disabled,
  className,
}: TagInputProps) {
  const [internal, setInternal] = useState<string[]>(defaultValue);
  const [draft, setDraft] = useState<string>("");

  const tags = value ?? internal;

  const update = (next: string[]) => {
    if (value === undefined) setInternal(next);
    onValueChange?.(next);
  };

  const addTag = () => {
    const tag = draft.trim();
    if (!tag) return;
    if (!tags.includes(tag)) update([...tags, tag]);
    setDraft("");
  };

  const removeTag = (tag: string) => update(tags.filter((t) => t !== tag));

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;

    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    } else if (e.key === "Backspace" && draft === "" && tags.length > 0) {
      update(tags.slice(0, -1));
    }
  };

  return (
    <div
      className={cn(
        "flex min-h-9 w-full flex-wrap items-center gap-1.5 rounded-md border border-input bg-transparent px-3 py-1.5 text-sm shadow-xs focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50",
        disabled && "pointer-events-none opacity-50",
        className,
      )}
    >
      {tags.map((tag) => (
        <Badge key={tag} variant="secondary" className="gap-1 pr-1">
          {tag}
          <button
            type="button"
            onClick={() => {
              removeTag(tag);
            }}
            aria-label={`Remove: ${tag}`}
            className="rounded-full p-0.5 hover:bg-muted-foreground/20"
          >
            <X className="size-3" />
          </button>
        </Badge>
      ))}
      <input
        value={draft}
        onChange={(e) => {
          setDraft(e.target.value);
        }}
        onKeyDown={onKeyDown}
        onBlur={addTag}
        placeholder={tags.length === 0 ? placeholder : undefined}
        disabled={disabled}
        className="min-w-24 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
      />
      {name && tags.map((tag) => <input id={id} key={tag} type="hidden" name={name} value={tag} />)}
    </div>
  );
}
