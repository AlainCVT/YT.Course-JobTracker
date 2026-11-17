import clsx, { type ClassValue } from "clsx";
import { Star } from "lucide-react";
import { type KeyboardEvent, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

export function Rating({
  id,
  className,
  name,
  required = false,
  disabled = false,
  onChange,
  defaultValue,
}: {
  id?: string;
  className?: ClassValue;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  onChange?: (value: number) => void;
  defaultValue?: number;
}) {
  const [currentValue, setCurrentValue] = useState(Math.max(0, Math.min(5, defaultValue ?? 0)));
  const [focusedValue, setFocusedValue] = useState(Math.max(0, Math.min(5, defaultValue ?? 0)));

  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleChange = (newValue: number) => {
    setCurrentValue(newValue === currentValue ? 0 : newValue);
    onChange?.(newValue);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, value: number) => {
    let nextValue = value;

    switch (event.key) {
      case "ArrowRight":
      case "ArrowUp":
        nextValue = Math.min(5, value + 1);
        break;

      case "ArrowLeft":
      case "ArrowDown":
        nextValue = Math.max(1, value - 1);
        break;

      case "Home":
        nextValue = 1;
        break;

      case "End":
        nextValue = 5;
        break;

      default:
        return;
    }

    event.preventDefault();

    setFocusedValue(nextValue);
    buttonRefs.current[nextValue - 1]?.focus();
  };

  return (
    <div className={clsx(className)}>
      <input type="hidden" id={id} name={name} required={required} value={currentValue} />
      <div
        role="radiogroup"
        aria-label="Note"
        aria-required={required}
        aria-disabled={disabled}
        className="flex gap-1"
      >
        {[1, 2, 3, 4, 5].map((n) => (
          <Button
            key={n}
            ref={(element) => {
              buttonRefs.current[n - 1] = element;
            }}
            type="button"
            role="radio"
            variant={n <= currentValue ? "tinted-yellow" : "ghost"}
            size="icon-sm"
            disabled={disabled}
            tabIndex={n === focusedValue ? 0 : -1}
            aria-label={`${n} sur 5`}
            aria-checked={currentValue === n}
            onClick={() => {
              setFocusedValue(n);
              handleChange(n);
            }}
            onKeyDown={(event) => handleKeyDown(event, n)}
          >
            <Star
              aria-hidden="true"
              className={clsx(
                "size-5",
                n <= currentValue
                  ? "fill-current text-yellow-400 hover:bg-current/10 dark:text-yellow-600"
                  : "text-muted-foreground",
              )}
            />
          </Button>
        ))}
      </div>
    </div>
  );
}
