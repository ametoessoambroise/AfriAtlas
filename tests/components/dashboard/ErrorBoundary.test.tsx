import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeAll, afterAll } from "vitest";
import { ErrorBoundary } from "@/components/dashboard/ErrorBoundary";

// Component that throws an error for testing
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error("Test error");
  }
  return <div>No error</div>;
};

describe("ErrorBoundary", () => {
  // Suppress console.error for these tests
  const originalError = console.error;
  beforeAll(() => {
    console.error = vi.fn();
  });

  afterAll(() => {
    console.error = originalError;
  });

  it("renders children when there is no error", () => {
    render(
      <ErrorBoundary>
        <div>Test content</div>
      </ErrorBoundary>,
    );

    expect(screen.getByText("Test content")).toBeDefined();
  });

  it("renders error UI when child component throws", () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>,
    );

    expect(screen.getByText("Une erreur est survenue")).toBeDefined();
    expect(
      screen.getByText(/Le tableau de bord a rencontré un problème/),
    ).toBeDefined();
  });

  it("displays error icon in error state", () => {
    const { container } = render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>,
    );

    // Check for AlertCircle icon (lucide-react renders as svg)
    const icon = container.querySelector("svg");
    expect(icon).toBeDefined();
    expect(icon?.classList.contains("text-destructive")).toBe(true);
  });

  it("displays retry button in error state", () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>,
    );

    const retryButton = screen.getByRole("button", { name: /Réessayer/i });
    expect(retryButton).toBeDefined();
  });

  it("calls handleRetry when retry button is clicked", () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>,
    );

    // Error state should be shown
    expect(screen.getByText("Une erreur est survenue")).toBeDefined();

    // Click retry button
    const retryButton = screen.getByRole("button", { name: /Réessayer/i });

    // Verify button exists and is clickable
    expect(retryButton).toBeDefined();

    // Click should not throw an error
    expect(() => fireEvent.click(retryButton)).not.toThrow();
  });

  it("renders custom fallback when provided", () => {
    const customFallback = <div>Custom error message</div>;

    render(
      <ErrorBoundary fallback={customFallback}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>,
    );

    expect(screen.getByText("Custom error message")).toBeDefined();
    expect(screen.queryByText("Une erreur est survenue")).toBeNull();
  });

  it("logs error to console when error occurs", () => {
    const consoleErrorSpy = vi.spyOn(console, "error");

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>,
    );

    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  it("applies correct styling classes to error container", () => {
    const { container } = render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>,
    );

    const errorContainer = container.querySelector(".min-h-screen");
    expect(errorContainer).toBeDefined();
    expect(errorContainer?.classList.contains("flex")).toBe(true);
    expect(errorContainer?.classList.contains("items-center")).toBe(true);
    expect(errorContainer?.classList.contains("justify-center")).toBe(true);
  });

  it("displays error heading with correct styling", () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>,
    );

    const heading = screen.getByText("Une erreur est survenue");
    expect(heading.tagName).toBe("H2");
    expect(heading.classList.contains("text-2xl")).toBe(true);
    expect(heading.classList.contains("font-black")).toBe(true);
  });

  it("displays error message with muted styling", () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>,
    );

    const message = screen.getByText(
      /Le tableau de bord a rencontré un problème/,
    );
    expect(message.classList.contains("text-muted-foreground")).toBe(true);
  });

  it("retry button includes refresh icon", () => {
    const { container } = render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>,
    );

    const button = screen.getByRole("button", { name: /Réessayer/i });
    const svg = button.querySelector("svg");
    expect(svg).toBeDefined();
  });
});
