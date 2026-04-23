import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

interface AtlasPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function AtlasPagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: AtlasPaginationProps) {
  if (totalPages <= 1) return null;

  const renderPageItems = () => {
    const items = [];
    const siblingCount = 1;

    for (let i = 1; i <= totalPages; i++) {
      // Always show first, last, current, and siblings
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - siblingCount && i <= currentPage + siblingCount)
      ) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              isActive={i === currentPage}
              onClick={() => onPageChange(i)}
              className={cn(
                "cursor-pointer rounded-full w-10 h-10 transition-all duration-300 font-bold font-body flex items-center justify-center",
                i === currentPage
                  ? "bg-primary text-white shadow-md shadow-primary/30 scale-110"
                  : "hover:bg-white/60 text-muted-foreground hover:text-foreground",
              )}
            >
              {i}
            </PaginationLink>
          </PaginationItem>,
        );
      } else if (
        i === currentPage - siblingCount - 1 ||
        i === currentPage + siblingCount + 1
      ) {
        items.push(
          <PaginationItem key={i}>
            <PaginationEllipsis />
          </PaginationItem>,
        );
      }
    }
    return items;
  };

  return (
    <div className={cn("flex justify-center", className)}>
      <div className="bg-white/40 backdrop-blur-md border border-white/40 shadow-lg rounded-full px-4 py-2 flex items-center">
        <Pagination>
          <PaginationContent className="gap-2">
            <PaginationItem>
              <PaginationPrevious
                onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                className={cn(
                  "rounded-full transition-all duration-300 font-bold font-body",
                  currentPage <= 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer hover:bg-white/60 text-foreground",
                )}
              />
            </PaginationItem>

            {renderPageItems()}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  currentPage < totalPages && onPageChange(currentPage + 1)
                }
                className={cn(
                  "rounded-full transition-all duration-300 font-bold font-body",
                  currentPage >= totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer hover:bg-white/60 text-foreground",
                )}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
