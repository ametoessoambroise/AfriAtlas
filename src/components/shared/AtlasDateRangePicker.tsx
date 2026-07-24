import * as React from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface AtlasDateRangePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  date: DateRange | undefined;
  setDate: (date: DateRange | undefined) => void;
  variant?: "ghost" | "outline" | "solid";
}

export function AtlasDateRangePicker({
  className,
  date,
  setDate,
  variant = "outline"
}: AtlasDateRangePickerProps) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "w-fit min-w-[260px] justify-between text-left font-bold rounded-md h-11 transition-all",
              variant === "outline" ? "bg-zinc-900/40 border-white/5 text-white/60 hover:bg-white/5 hover:border-white/10 hover:text-white" : "",
              !date && "text-muted-foreground",
            )}
          >
            <div className="flex items-center">
              <CalendarIcon className="mr-3 h-4 w-4 text-primary" />
              <span className="truncate">
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "dd MMM y", { locale: fr })} —{" "}
                      {format(date.to, "dd MMM y", { locale: fr })}
                    </>
                  ) : (
                    format(date.from, "dd MMM y", { locale: fr })
                  )
                ) : (
                  "Choisir une période"
                )}
              </span>
            </div>
            <ChevronDown className="ml-2 h-4 w-4 opacity-40" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0 bg-zinc-950 border-white/10 shadow-2xl shadow-black rounded-md overflow-hidden"
          align="start"
        >
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            locale={fr}
            className="text-white p-4"
          />
          
          <div className="p-3 border-t border-white/5 bg-white/[0.02] flex justify-end gap-2">
             <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setDate(undefined)}
                className="text-[10px] uppercase font-black tracking-widest text-white/40 hover:text-white"
             >
                Réinitialiser
             </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
