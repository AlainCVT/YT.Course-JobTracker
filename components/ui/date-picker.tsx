"use client";

import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface DatePickerProps {
  id?: string;
  name?: string;
  defaultValue?: Date;
}

export function DatePicker({ id, name, defaultValue }: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(defaultValue);

  return (
    <div className="grid">
      <input type="hidden" id={id} name={name} value={date ? format(date, "yyyy-MM-dd") : ""} />
      <Popover>
        <PopoverTrigger
          render={
            <Button
              type="button"
              variant="outline"
              data-empty={!date}
              className="justify-between text-left font-normal"
            >
              {date ? (
                new Intl.DateTimeFormat(navigator.language, {
                  day: "numeric",
                  month: "numeric",
                  year: "numeric",
                }).format(date)
              ) : (
                <span>Pick a date</span>
              )}
              <ChevronDownIcon data-icon="inline-end" />
            </Button>
          }
        />
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar mode="single" selected={date} onSelect={setDate} defaultMonth={date} />
        </PopoverContent>
      </Popover>
    </div>
  );
}
