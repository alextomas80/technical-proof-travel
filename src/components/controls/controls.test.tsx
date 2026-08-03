import { fireEvent, render, screen } from "@testing-library/react";
import { useStringListStore } from "@/store/useStringListStore";
import { vi } from "vitest";
import type { Mock } from "vitest";

import { Controls } from "./controls";

vi.mock("@/store/useStringListStore");

describe("Controls Component", () => {
  const mockRemoveSelectedStrings = vi.fn();
  const mockRestoreDeletedStrings = vi.fn();

  beforeEach(() => {
    (useStringListStore as unknown as Mock).mockReturnValue({
      removeSelectedStrings: mockRemoveSelectedStrings,
      restoreDeletedStrings: mockRestoreDeletedStrings,
      strings: [],
      lastDeletedStrings: [],
    });
    mockRemoveSelectedStrings.mockClear();
    mockRestoreDeletedStrings.mockClear();
  });

  test("renders ADD and DELETE buttons", () => {
    render(<Controls />);

    expect(screen.getByText("ADD")).toBeInTheDocument();
    expect(screen.getByText("DELETE")).toBeInTheDocument();
  });

  test("DELETE button is disabled when no strings are selected", () => {
    render(<Controls />);

    const deleteButton = screen.getByText("DELETE") as HTMLButtonElement;
    expect(deleteButton.disabled).toBe(true);
  });

  test("DELETE button is enabled when strings are selected", () => {
    (useStringListStore as unknown as Mock).mockReturnValue({
      removeSelectedStrings: mockRemoveSelectedStrings,
      restoreDeletedStrings: mockRestoreDeletedStrings,
      strings: [{ key: "1", value: "Test", isSelected: true }],
      lastDeletedStrings: [],
    });
    render(<Controls />);

    const deleteButton = screen.getByText("DELETE") as HTMLButtonElement;
    expect(deleteButton.disabled).toBe(false);
  });

  test("calls removeSelectedStrings when DELETE button is clicked", () => {
    (useStringListStore as unknown as Mock).mockReturnValue({
      removeSelectedStrings: mockRemoveSelectedStrings,
      restoreDeletedStrings: mockRestoreDeletedStrings,
      strings: [{ key: "1", value: "Test", isSelected: true }],
      lastDeletedStrings: [],
    });
    render(<Controls />);

    const deleteButton = screen.getByText("DELETE") as HTMLButtonElement;
    fireEvent.click(deleteButton);
    expect(mockRemoveSelectedStrings).toHaveBeenCalledTimes(1);
  });

  test("reload button is disabled when there are no deleted strings", () => {
    render(<Controls />);

    const reloadButton = screen.getByTestId("restore-button") as HTMLButtonElement;
    expect(reloadButton.disabled).toBe(true);
  });

  test("reload button is enabled when there are deleted strings", () => {
    (useStringListStore as unknown as Mock).mockReturnValue({
      removeSelectedStrings: mockRemoveSelectedStrings,
      restoreDeletedStrings: mockRestoreDeletedStrings,
      strings: [],
      lastDeletedStrings: [{ key: "1", value: "Deleted", isSelected: false }],
    });
    render(<Controls />);

    const reloadButton = screen.getByTestId("restore-button") as HTMLButtonElement;
    expect(reloadButton.disabled).toBe(false);
  });

  test("calls restoreDeletedStrings when reload button is clicked", () => {
    (useStringListStore as unknown as Mock).mockReturnValue({
      removeSelectedStrings: mockRemoveSelectedStrings,
      restoreDeletedStrings: mockRestoreDeletedStrings,
      strings: [],
      lastDeletedStrings: [{ key: "1", value: "Deleted", isSelected: false }],
    });
    render(<Controls />);

    const restoreButton = screen.getByTestId("restore-button") as HTMLButtonElement;
    fireEvent.click(restoreButton);
    expect(mockRestoreDeletedStrings).toHaveBeenCalledTimes(1);
  });

  test("opens and closes ModalAdd when ADD button is clicked", () => {
    render(<Controls />);

    const addButton = screen.getByText("ADD");
    fireEvent.click(addButton);
    expect(screen.getByText("Add")).toBeInTheDocument();

    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);
    expect(screen.queryByText("Add")).not.toBeInTheDocument();
  });
});
