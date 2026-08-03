import { render, screen } from "@testing-library/react";

import { CustomButton } from "./custom-button";

describe("CustomButton Component", () => {
  const mockOnClick = vi.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  test("renders with correct label", () => {
    render(<CustomButton label="Click Me" onClick={mockOnClick} />);

    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  test("calls onClick when clicked", () => {
    render(<CustomButton label="Click Me" onClick={mockOnClick} />);

    const button = screen.getByText("Click Me");
    button.click();
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test("applies correct variant class", () => {
    const { rerender } = render(<CustomButton label="Solid Button" variant="solid" onClick={mockOnClick} />);

    expect(screen.getByText("Solid Button")).toHaveClass("custom-button--solid");

    rerender(<CustomButton label="Outline Button" variant="outline" onClick={mockOnClick} />);
    expect(screen.getByText("Outline Button")).toHaveClass("custom-button--outline");
  });

  test("is disabled when disabled prop is true", () => {
    render(<CustomButton label="Disabled Button" onClick={mockOnClick} disabled={true} />);

    const button = screen.getByText("Disabled Button") as HTMLButtonElement;
    expect(button.disabled).toBe(true);
  });
});
