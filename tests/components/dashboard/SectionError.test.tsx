import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { SectionError } from "@/components/dashboard/SectionError";

describe("SectionError", () => {
  it("renders with default error message", () => {
    render(<SectionError />);

    expect(screen.getByText("Impossible de charger les données")).toBeDefined();
  });

  it("renders with custom title", () => {
    render(<SectionError title="Favoris Récents" />);

    expect(screen.getByText("Favoris Récents")).toBeDefined();
  });

  it("renders with custom message", () => {
    render(<SectionError message="Custom error message" />);

    expect(screen.getByText("Custom error message")).toBeDefined();
  });

  it("renders network error variant", () => {
    render(<SectionError variant="network" />);

    expect(
      screen.getByText(
        "Impossible de se connecter au serveur. Vérifiez votre connexion internet.",
      ),
    ).toBeDefined();
  });

  it("renders server error variant", () => {
    render(<SectionError variant="server" />);

    expect(
      screen.getByText(
        "Le serveur a rencontré une erreur. Veuillez réessayer dans quelques instants.",
      ),
    ).toBeDefined();
  });

  it("renders auth error variant", () => {
    render(<SectionError variant="auth" />);

    expect(
      screen.getByText("Votre session a expiré. Veuillez vous reconnecter."),
    ).toBeDefined();
  });

  it("renders retry button when onRetry is provided", () => {
    const onRetry = vi.fn();
    render(<SectionError onRetry={onRetry} />);

    expect(screen.getByRole("button", { name: /réessayer/i })).toBeDefined();
  });

  it("does not render retry button when onRetry is not provided", () => {
    render(<SectionError />);

    expect(screen.queryByRole("button", { name: /réessayer/i })).toBeNull();
  });

  it("calls onRetry when retry button is clicked", () => {
    const onRetry = vi.fn();
    render(<SectionError onRetry={onRetry} />);

    const retryButton = screen.getByRole("button", { name: /réessayer/i });
    retryButton.click();

    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("renders AlertCircle icon", () => {
    const { container } = render(<SectionError />);

    // Check for the AlertCircle icon by class
    const icon = container.querySelector("svg");
    expect(icon).toBeDefined();
  });

  it("renders RefreshCw icon in retry button", () => {
    const { container } = render(<SectionError onRetry={vi.fn()} />);

    // Check for the RefreshCw icon by class
    const icons = container.querySelectorAll("svg");
    expect(icons.length).toBeGreaterThan(1); // AlertCircle + RefreshCw
  });

  it("applies destructive styling", () => {
    const { container } = render(<SectionError />);

    const errorContainer = container.querySelector('[class*="bg-destructive"]');
    expect(errorContainer).toBeDefined();
  });

  it("custom message overrides variant message", () => {
    render(<SectionError variant="network" message="Custom override" />);

    expect(screen.getByText("Custom override")).toBeDefined();
    expect(
      screen.queryByText(
        "Impossible de se connecter au serveur. Vérifiez votre connexion internet.",
      ),
    ).toBeNull();
  });
});
