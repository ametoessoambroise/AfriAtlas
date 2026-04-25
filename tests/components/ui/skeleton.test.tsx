import { render } from "@testing-library/react";
import { Skeleton } from "@/components/ui/skeleton";
import { describe, it, expect } from "vitest";

describe("Skeleton Component", () => {
  it("renders with shimmer animation classes", () => {
    const { container } = render(<Skeleton />);
    const skeleton = container.firstChild as HTMLElement;

    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveClass("relative");
    expect(skeleton).toHaveClass("overflow-hidden");
    expect(skeleton).toHaveClass("rounded-md");
    expect(skeleton).toHaveClass("bg-muted");
  });

  it("applies custom className", () => {
    const { container } = render(<Skeleton className="w-20 h-20" />);
    const skeleton = container.firstChild as HTMLElement;

    expect(skeleton).toHaveClass("w-20");
    expect(skeleton).toHaveClass("h-20");
  });

  it("has shimmer animation pseudo-element classes", () => {
    const { container } = render(<Skeleton />);
    const skeleton = container.firstChild as HTMLElement;

    // Check for the before: classes that create the shimmer effect
    expect(skeleton.className).toContain("before:absolute");
    expect(skeleton.className).toContain("before:inset-0");
    expect(skeleton.className).toContain("before:animate-shimmer");
  });

  it("matches dimensions of actual content", () => {
    const { container } = render(<Skeleton className="w-64 h-10" />);
    const skeleton = container.firstChild as HTMLElement;

    expect(skeleton).toHaveClass("w-64");
    expect(skeleton).toHaveClass("h-10");
  });
});
