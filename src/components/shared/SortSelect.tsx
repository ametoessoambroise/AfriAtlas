import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ListFilter } from "lucide-react";

interface SortOption {
  label: string;
  value: string;
}

interface SortSelectProps {
  options: SortOption[];
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SortSelect({
  options,
  value,
  onValueChange,
  placeholder = "Trier par",
  className,
}: SortSelectProps) {
  return (
    <div className={className}>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-[200px] bg-zinc-950/50 border-white/10 text-white rounded-md h-10 focus:ring-primary/20">
          <div className="flex items-center gap-2">
            <ListFilter className="h-4 w-4 text-white/40" />
            <SelectValue placeholder={placeholder} />
          </div>
        </SelectTrigger>
        <SelectContent className="bg-zinc-950 border-white/10 text-white">
          {options.map((option) => (
            <SelectItem 
              key={option.value} 
              value={option.value}
              className="focus:bg-white/5 focus:text-white cursor-pointer"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
