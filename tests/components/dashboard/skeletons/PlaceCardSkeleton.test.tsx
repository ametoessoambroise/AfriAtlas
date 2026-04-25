import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import PlaceCardSkeleton from "@/components/dashboard/skeletons/PlaceCardSkeleton";

describe("PlaceCardSkeleton", () => {
  it("renders with correct aspect ratio", () => {
    const { container } = render(<PlaceCardSkeleton />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass("aspect-square");
  });

  it("renders with rounded corners", () => {
    const { container } = render(<PlaceCardSkeleton />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass("rounded-2xl");
  });

  it("renders with overflow hidden", () => {
    const { container } = render(<PlaceCardSkeleton />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass("overflow-hidden");
  });

  it("renders with surface-alt background", () => {
    const { container } = render(<PlaceCardSkeleton />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass("bg-surface-alt");
  });

  it("renders skeleton with full dimensions", () => {
    const { container } = render(<PlaceCardSkeleton />);
    const skeleton = container.querySelector(".w-full.h-full");
    expect(skeleton).toBeInTheDocument();
  });
});
