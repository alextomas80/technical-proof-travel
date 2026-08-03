import { fireEvent, render, screen } from "@testing-library/react";
import { useStringListStore } from "@/store/useStringListStore";
import { vi } from "vitest";
import type { Mock } from "vitest";

import { ListItemRow } from "./list-item-row";

vi.mock("@/store/useStringListStore");

describe("ListItemRow Component", () => {
  const itemKey = "test-key";
  const text = "Test Item";
  const mockToggleSelection = vi.fn();
  const mockRemoveString = vi.fn();

  beforeEach(() => {
    (useStringListStore as unknown as Mock).mockReturnValue({
      toggleSelection: mockToggleSelection,
      removeString: mockRemoveString,
    });
    mockToggleSelection.mockClear();
    mockRemoveString.mockClear();
  });

  test("renders with given text", () => {
    render(<ListItemRow itemKey={itemKey} text={text} selected={false} />);

    const listItem = screen.getByText(text);
    expect(listItem).toBeInTheDocument();
  });

  test("applies selected class when selected is true", () => {
    render(<ListItemRow itemKey={itemKey} text={text} selected={true} />);

    const listItem = screen.getByText(text);
    expect(listItem).toHaveClass("list-item-row--selected");
  });

  test("does not apply selected class when selected is false", () => {
    render(<ListItemRow itemKey={itemKey} text={text} selected={false} />);

    const listItem = screen.getByText(text);
    expect(listItem).not.toHaveClass("list-item-row--selected");
  });

  test("adds selected class when selected is true", () => {
    render(<ListItemRow itemKey="1" text="Hello" selected={true} />);

    const item = screen.getByText("Hello");
    expect(item.classList.contains("list-item-row--selected")).toBe(true);
  });

  test("does not add selected class when selected is false", () => {
    render(<ListItemRow itemKey="1" text="Hello" selected={false} />);

    const item = screen.getByText("Hello");
    expect(item.classList.contains("list-item-row--selected")).toBe(false);
  });

  test("calls toggleSelection with itemKey on single click", () => {
    render(<ListItemRow itemKey={itemKey} text={text} selected={false} />);

    fireEvent.click(screen.getByText(text));
    expect(mockToggleSelection).toHaveBeenCalledTimes(1);
    expect(mockToggleSelection).toHaveBeenCalledWith(itemKey);
  });

  test("calls removeString with itemKey on double click", () => {
    render(<ListItemRow itemKey={itemKey} text={text} selected={false} />);

    fireEvent.doubleClick(screen.getByText(text));
    expect(mockRemoveString).toHaveBeenCalledTimes(1);
    expect(mockRemoveString).toHaveBeenCalledWith(itemKey);
  });

  test("does not call toggleSelection on double click", () => {
    render(<ListItemRow itemKey={itemKey} text={text} selected={false} />);

    fireEvent.doubleClick(screen.getByText(text));
    expect(mockToggleSelection).not.toHaveBeenCalled();
  });
});
