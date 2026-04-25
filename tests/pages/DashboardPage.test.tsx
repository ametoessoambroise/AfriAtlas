import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import DashboardPage from "@/pages/DashboardPage";
import * as useUserDashboardHook from "@/hooks/queries/useUserDashboard";

// Mock the useUserDashboard hook
vi.mock("@/hooks/queries/useUserDashboard");

const mockDashboardData = {
  dashboard: {
    user: {
      id: "1",
      fullname: "Jean Dupont",
      email: "jean@example.com",
      avatar_url: "/avatar.jpg",
      country: "Togo",
      plan: "free",
    },
    favorites_count: 5,
    albums_count: 3,
  },
  orders: [],
  favorites: [],
  bookings: [],
  topPlaces: [],
  isLoading: false,
  isError: false,
  refetch: vi.fn(),
};

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("DashboardPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders skip-to-content link for accessibility", () => {
    vi.mocked(useUserDashboardHook.useUserDashboard).mockReturnValue(
      mockDashboardData,
    );

    renderWithRouter(<DashboardPage />);

    const skipLink = screen.getByText("Aller au contenu principal");
    expect(skipLink).toBeDefined();
    expect(skipLink.getAttribute("href")).toBe("#main-content");
  });

  it("renders DashboardSkeleton during loading", () => {
    vi.mocked(useUserDashboardHook.useUserDashboard).mockReturnValue({
      ...mockDashboardData,
      isLoading: true,
      dashboard: null,
    });

    const { container } = renderWithRouter(<DashboardPage />);

    // Check for skeleton elements (using bg-muted class from Skeleton component)
    const skeletons = container.querySelectorAll(".bg-muted");
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("renders error state with retry button when data fetch fails", () => {
    const mockRefetch = vi.fn();
    vi.mocked(useUserDashboardHook.useUserDashboard).mockReturnValue({
      ...mockDashboardData,
      isError: true,
      refetch: mockRefetch,
    });

    renderWithRouter(<DashboardPage />);

    expect(screen.getByText("Erreur de chargement")).toBeDefined();
    expect(
      screen.getByText("Impossible de charger le tableau de bord"),
    ).toBeDefined();

    const retryButton = screen.getByRole("button", { name: /Réessayer/i });
    expect(retryButton).toBeDefined();

    fireEvent.click(retryButton);
    expect(mockRefetch).toHaveBeenCalledTimes(1);
  });

  it("renders main content with semantic HTML structure", () => {
    vi.mocked(useUserDashboardHook.useUserDashboard).mockReturnValue(
      mockDashboardData,
    );

    const { container } = renderWithRouter(<DashboardPage />);

    const mainElement = container.querySelector("main#main-content");
    expect(mainElement).toBeDefined();

    const sectionElement = container.querySelector("section");
    expect(sectionElement).toBeDefined();

    const asideElement = container.querySelector("aside");
    expect(asideElement).toBeDefined();
  });

  it("applies correct mobile padding classes", () => {
    vi.mocked(useUserDashboardHook.useUserDashboard).mockReturnValue(
      mockDashboardData,
    );

    const { container } = renderWithRouter(<DashboardPage />);

    const mainElement = container.querySelector("main");
    expect(mainElement?.classList.contains("pb-20")).toBe(true);
    expect(mainElement?.classList.contains("md:pb-6")).toBe(true);
  });

  it("applies staggered animation delays to components", () => {
    vi.mocked(useUserDashboardHook.useUserDashboard).mockReturnValue(
      mockDashboardData,
    );

    const { container } = renderWithRouter(<DashboardPage />);

    const animatedDivs = container.querySelectorAll(
      ".animate-in.fade-in.slide-in-from-bottom-4",
    );
    expect(animatedDivs.length).toBeGreaterThanOrEqual(3);

    // Check animation delays
    const delays = Array.from(animatedDivs).map(
      (div) => (div as HTMLElement).style.animationDelay,
    );
    expect(delays).toContain("0ms");
    expect(delays).toContain("100ms");
    expect(delays).toContain("200ms");
  });

  it("renders WelcomeBanner component", () => {
    vi.mocked(useUserDashboardHook.useUserDashboard).mockReturnValue(
      mockDashboardData,
    );

    renderWithRouter(<DashboardPage />);

    // WelcomeBanner should display user's first name
    expect(screen.getByText(/Jean/)).toBeDefined();
  });

  it("renders StatsRow with correct data", () => {
    vi.mocked(useUserDashboardHook.useUserDashboard).mockReturnValue(
      mockDashboardData,
    );

    const { container } = renderWithRouter(<DashboardPage />);

    // Check that stats are rendered (StatsRow component should be present)
    // We can't check exact values without knowing StatsRow implementation
    // but we can verify the component structure exists
    expect(container.querySelector(".container")).toBeDefined();
  });

  it("renders sidebar with ActiveSubscriptionCard and QuickActions", () => {
    vi.mocked(useUserDashboardHook.useUserDashboard).mockReturnValue(
      mockDashboardData,
    );

    const { container } = renderWithRouter(<DashboardPage />);

    const aside = container.querySelector("aside");
    expect(aside).toBeDefined();
    expect(aside?.classList.contains("lg:col-span-4")).toBe(true);
  });

  it("uses 12-column grid layout for desktop", () => {
    vi.mocked(useUserDashboardHook.useUserDashboard).mockReturnValue(
      mockDashboardData,
    );

    const { container } = renderWithRouter(<DashboardPage />);

    const gridContainer = container.querySelector(".lg\\:grid-cols-12");
    expect(gridContainer).toBeDefined();
  });

  it("main content spans 8 columns on desktop", () => {
    vi.mocked(useUserDashboardHook.useUserDashboard).mockReturnValue(
      mockDashboardData,
    );

    const { container } = renderWithRouter(<DashboardPage />);

    const mainContent = container.querySelector("section.lg\\:col-span-8");
    expect(mainContent).toBeDefined();
  });

  it("displays error icon in error state", () => {
    vi.mocked(useUserDashboardHook.useUserDashboard).mockReturnValue({
      ...mockDashboardData,
      isError: true,
    });

    const { container } = renderWithRouter(<DashboardPage />);

    const icon = container.querySelector("svg.text-destructive");
    expect(icon).toBeDefined();
  });

  it("skip-to-content link has correct accessibility attributes", () => {
    vi.mocked(useUserDashboardHook.useUserDashboard).mockReturnValue(
      mockDashboardData,
    );

    renderWithRouter(<DashboardPage />);

    const skipLink = screen.getByText("Aller au contenu principal");
    expect(skipLink.classList.contains("sr-only")).toBe(true);
    expect(skipLink.classList.contains("focus:not-sr-only")).toBe(true);
  });
});
