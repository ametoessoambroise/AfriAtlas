import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import StatCardSkeleton from "@/components/dashboard/skeletons/StatCardSkeleton";

describe("StatCardSkeleton", () => {
  it("renders skeleton with correct structure", () => {
    const { container } = render(<StatCardSkeleton />);

    // Check main container has correct classes
    const mainContainer = container.firstChild as HTMLElement;
    expect(mainContainer).toHaveClass(
      "bg-card",
      "border",
      "border-border",
      "p-6",
      "rounded-[32px]",
      "shadow-sm",
    );
  });

  it("renders icon and chart skeleton placeholders", () => {
    const { container } = render(<StatCardSkeleton />);

    // Should have skeleton elements
    const skeletons = container.querySelectorAll('[class*="bg-muted"]');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("matches StatCard layout dimensions", () => {
    const { container } = render(<StatCardSkeleton />);

    // Check for icon skeleton (w-12 h-12)
    const iconSkeleton = container.querySelector(".w-12.h-12");
    expect(iconSkeleton).toBeInTheDocument();

    // Check for chart skeleton (w-20 h-8)
    const chartSkeleton = container.querySelector(".w-20.h-8");
    expect(chartSkeleton).toBeInTheDocument();
  });
});
