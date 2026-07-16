"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { DayPickerProps } from "react-day-picker";

export interface CalendarSchedulerProps extends Omit<DayPickerProps, "mode" | "selected" | "onSelect"> {
  date?: Date;
  onDateChange?: (date: Date | undefined) => void;
  time?: string;
  onTimeChange?: (time: string | undefined) => void;
  timeSlots?: string[];
  onConfirm?: (value: { date?: Date; time?: string }) => void;
  className?: string;
}

function CalendarScheduler({
  date: controlledDate,
  onDateChange,
  time: controlledTime,
  onTimeChange,
  timeSlots = [
    "08:00 AM",
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
    "07:00 PM",
    "08:00 PM",
    "09:00 PM",
    "10:00 PM",
  ],
  onConfirm,
  className,
  ...props
}: CalendarSchedulerProps) {
  const [internalDate, setInternalDate] = React.useState<Date | undefined>(
    new Date(),
  );
  const [internalTime, setInternalTime] = React.useState<string | undefined>();

  const isControlled =
    controlledDate !== undefined || onDateChange !== undefined;

  const date = isControlled ? controlledDate : internalDate;
  const setDate = isControlled ? onDateChange || (() => {}) : setInternalDate;

  const time = isControlled ? controlledTime : internalTime;
  const setTime = isControlled ? onTimeChange || (() => {}) : setInternalTime;

  return (
    <div className={className}>
      <Card className="w-full shadow-none border-none bg-background">
        {/* We can hide CardHeader and CardFooter if onConfirm is not provided, making it flexible for forms */}
        {!isControlled && (
          <CardHeader>
            <CardTitle className="text-base">Schedule a Meeting</CardTitle>
          </CardHeader>
        )}
        <CardContent className="flex flex-col sm:flex-row gap-4 p-0 sm:p-6">
          {/* Calendar Section */}
          <div className="flex-1 border border-border rounded-md p-2">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md w-full"
              {...props} />
          </div>

          {/* Time Slots Section */}
          <div className="flex-1 border border-border rounded-md p-2 overflow-y-auto max-h-[320px]">
            <p className="mb-2 text-sm font-medium text-muted-foreground">
              Créneaux horaire
            </p>
            <div className="grid grid-cols-2 gap-2">
              {timeSlots.map((slot) => (
                <Button
                  key={slot}
                  variant={time === slot ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    "w-full",
                    time === slot && "ring-2 ring-primary",
                  )}
                  onClick={() => setTime(slot)}
                  type="button"
                >
                  {slot}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
        {onConfirm && !isControlled && (
          <CardFooter className="flex justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setDate(undefined);
                setTime(undefined);
              }}
              type="button"
            >
              Reset
            </Button>
            <Button
              size="sm"
              onClick={() => onConfirm?.({ date, time })}
              disabled={!date || !time}
              type="button"
            >
              Confirm
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}

export { CalendarScheduler };
