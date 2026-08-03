import { render, screen, fireEvent } from "@testing-library/react";

import { ModalAdd } from "./modal-add";

describe("ModalAdd Component", () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  test("renders correctly when open", () => {
    render(<ModalAdd isOpen={true} onClose={mockOnClose} />);

    expect(screen.getByPlaceholderText("Type the text here...")).toBeInTheDocument();
    expect(screen.getByText("Add")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  test("does not render when closed", () => {
    render(<ModalAdd isOpen={false} onClose={mockOnClose} />);

    expect(screen.queryByPlaceholderText("Type the text here...")).not.toBeInTheDocument();
  });

  test("calls onClose when Cancel button is clicked", () => {
    render(<ModalAdd isOpen={true} onClose={mockOnClose} />);

    fireEvent.click(screen.getByText("Cancel"));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test("adds string and closes modal on Add button click", () => {
    const { getByPlaceholderText, getByText } = render(<ModalAdd isOpen={true} onClose={mockOnClose} />);

    const input = getByPlaceholderText("Type the text here...") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "New Item" } });
    expect(input.value).toBe("New Item");

    fireEvent.click(getByText("Add"));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test("does not add string when input is empty", () => {
    const { getByText } = render(<ModalAdd isOpen={true} onClose={mockOnClose} />);
    fireEvent.click(getByText("Add"));

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  test("adds string and closes modal on Enter key press", () => {
    const { getByPlaceholderText } = render(<ModalAdd isOpen={true} onClose={mockOnClose} />);

    const input = getByPlaceholderText("Type the text here...") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "New Item" } });
    expect(input.value).toBe("New Item");

    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test("does not add string on Enter key press when input is empty", () => {
    const { getByPlaceholderText } = render(<ModalAdd isOpen={true} onClose={mockOnClose} />);

    const input = getByPlaceholderText("Type the text here...") as HTMLInputElement;
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    expect(mockOnClose).not.toHaveBeenCalled();
  });
});
