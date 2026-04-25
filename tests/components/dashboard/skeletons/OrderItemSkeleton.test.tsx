import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import OrderItemSkeleton from "@/components/dashboard/skeletons/OrderItemSkeleton";

describe("OrderItemSkeleton", () => {
  it("renders skeleton with correct structure", () => {
    const { container } = render(<OrderItemSkeleton />);

    // Check main container has correct classes
    const mainContainer = container.firstChild as HTMLElement;
    expect(mainContainer).toHaveClass(
      "flex",
      "items-center",
      "justify-between",
      "p-4",
      "border-b",
      "border-border",
    );
  });

  it("renders left section with order info skeletons", () => {
    const { container } = render(<OrderItemSkeleton />);

    // Check for order number skeleton (h-4 w-32)
    const orderNumberSkeleton = container.querySelector(".h-4.w-32");
    expect(orderNumberSkeleton).toBeTruthy();

    // Check for date skeleton (h-3 w-24)
    const dateSkeleton = container.querySelector(".h-3.w-24");
    expect(dateSkeleton).toBeTruthy();
  });

  it("renders right section with price and status skeletons", () => {
    const { container } = render(<OrderItemSkeleton />);

    // Check for price skeleton (h-4 w-20)
    const priceSkeleton = container.querySelector(".h-4.w-20");
    expect(priceSkeleton).toBeTruthy();

    // Check for status skeleton (h-3 w-16)
    const statusSkeleton = container.querySelector(".h-3.w-16");
    expect(statusSkeleton).toBeTruthy();

    // Check for chevron icon skeleton (w-4 h-4)
    const chevronSkeleton = container.querySelector(".w-4.h-4");
    expect(chevronSkeleton).toBeTruthy();
  });

  it("matches OrderItem layout with horizontal structure", () => {
    const { container } = render(<OrderItemSkeleton />);

    // Should have flex layout with justify-between
    const mainContainer = container.firstChild as HTMLElement;
    expect(mainContainer.className).toContain("justify-between");

    // Should have gap-3 in right section
    const rightSection = container.querySelector(".gap-3");
    expect(rightSection).toBeTruthy();
  });
});
