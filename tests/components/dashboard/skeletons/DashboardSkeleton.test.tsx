import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import DashboardSkeleton from "@/components/dashboard/skeletons/DashboardSkeleton";

describe("DashboardSkeleton", () => {
  it("renders the full dashboard skeleton structure", () => {
    const { container } = render(<DashboardSkeleton />);
    expect(container.querySelector(".min-h-screen")).toBeInTheDocument();
  });

  it("renders welcome banner skeleton", () => {
    const { container } = render(<DashboardSkeleton />);
    const welcomeBanner = container.querySelector(".rounded-\\[40px\\]");
    expect(welcomeBanner).toBeInTheDocument();
  });

  it("renders 4 stat card skeletons", () => {
    const { container } = render(<DashboardSkeleton />);
    const statCards = container.querySelectorAll(".rounded-\\[32px\\]");
    // At least 4 stat cards (there are other elements with this class too)
    expect(statCards.length).toBeGreaterThanOrEqual(4);
  });

  it("renders recent favorites skeleton section", () => {
    const { container } = render(<DashboardSkeleton />);
    // Check for the favorites grid
    const grids = container.querySelectorAll(".grid");
    expect(grids.length).toBeGreaterThan(0);
  });

  it("renders recent orders skeleton section", () => {
    const { container } = render(<DashboardSkeleton />);
    // Check for orders container with rounded-[32px]
    const ordersContainer = container.querySelector(".overflow-hidden");
    expect(ordersContainer).toBeInTheDocument();
  });

  it("renders global top places skeleton section", () => {
    const { container } = render(<DashboardSkeleton />);
    // Check for multiple place card skeletons
    const placeCards = container.querySelectorAll(".aspect-square");
    expect(placeCards.length).toBe(6);
  });

  it("renders subscription card skeleton in sidebar", () => {
    const { container } = render(<DashboardSkeleton />);
    const sidebar = container.querySelector(".lg\\:col-span-4");
    expect(sidebar).toBeInTheDocument();
  });

  it("renders quick actions skeleton in sidebar", () => {
    const { container } = render(<DashboardSkeleton />);
    // Check for 4 quick action items
    const quickActions = container.querySelectorAll(".rounded-3xl");
    expect(quickActions.length).toBeGreaterThanOrEqual(4);
  });

  it("uses responsive grid layout", () => {
    const { container } = render(<DashboardSkeleton />);
    const mainGrid = container.querySelector(".lg\\:grid-cols-12");
    expect(mainGrid).toBeInTheDocument();
  });

  it("applies correct spacing between sections", () => {
    const { container } = render(<DashboardSkeleton />);
    const spacedContainer = container.querySelector(".space-y-8");
    expect(spacedContainer).toBeInTheDocument();
  });

  it("renders with proper container padding", () => {
    const { container } = render(<DashboardSkeleton />);
    const paddedContainer = container.querySelector(".px-4");
    expect(paddedContainer).toBeInTheDocument();
  });

  it("includes bottom padding for mobile navigation", () => {
    const { container } = render(<DashboardSkeleton />);
    const mainContainer = container.querySelector(".pb-20");
    expect(mainContainer).toBeInTheDocument();
  });
});
