import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import FavoriteCardSkeleton from "@/components/dashboard/skeletons/FavoriteCardSkeleton";

describe("FavoriteCardSkeleton", () => {
  it("renders skeleton with correct structure", () => {
    const { container } = render(<FavoriteCardSkeleton />);

    // Check main container exists with correct classes
    const mainContainer = container.querySelector(
      ".bg-card.border.border-border.p-3.rounded-2xl",
    );
    expect(mainContainer).toBeInTheDocument();
  });

  it("renders thumbnail skeleton with correct dimensions", () => {
    const { container } = render(<FavoriteCardSkeleton />);

    // Check thumbnail skeleton (64x64px = w-16 h-16)
    const thumbnail = container.querySelector(".w-16.h-16.rounded-xl");
    expect(thumbnail).toBeInTheDocument();
    expect(thumbnail).toHaveClass("shrink-0");
  });

  it("renders text skeleton lines", () => {
    const { container } = render(<FavoriteCardSkeleton />);

    // Check for three skeleton lines (name, city, badge)
    const textContainer = container.querySelector(".flex-1.space-y-2");
    expect(textContainer).toBeInTheDocument();

    const skeletonLines = textContainer?.querySelectorAll(".h-4, .h-3");
    expect(skeletonLines).toHaveLength(3);
  });

  it("matches the FavoriteCard layout structure", () => {
    const { container } = render(<FavoriteCardSkeleton />);

    // Verify flex layout with gap
    const flexContainer = container.querySelector(".flex.items-center.gap-4");
    expect(flexContainer).toBeInTheDocument();

    // Verify text container has min-w-0 for proper truncation
    const textContainer = container.querySelector(".min-w-0");
    expect(textContainer).toBeInTheDocument();
  });
});
