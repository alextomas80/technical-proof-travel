import { render, screen } from "@testing-library/react";
import { useStringListStore } from "@/store/useStringListStore";
import { vi } from "vitest";
import type { Mock } from "vitest";

import { ListItems } from "./list-items";

vi.mock("@/store/useStringListStore");

describe("ListItems Component", () => {
  beforeEach(() => {
    (useStringListStore as unknown as Mock).mockReturnValue([]);
  });

  test("renders no rows when strings is empty", () => {
    render(<ListItems />);

    expect(screen.queryAllByRole("option")).toHaveLength(0);
  });

  test("renders one ListItemRow per string", () => {
    (useStringListStore as unknown as Mock).mockReturnValue([
      { key: "1", value: "First", isSelected: false },
      { key: "2", value: "Second", isSelected: true },
    ]);

    render(<ListItems />);

    expect(screen.getByText("First")).toBeInTheDocument();
    expect(screen.getByText("Second")).toBeInTheDocument();
  });

  test("applies selected class to the selected item only", () => {
    (useStringListStore as unknown as Mock).mockReturnValue([
      { key: "1", value: "First", isSelected: false },
      { key: "2", value: "Second", isSelected: true },
    ]);

    render(<ListItems />);

    expect(screen.getByText("First")).not.toHaveClass("list-item-row--selected");
    expect(screen.getByText("Second")).toHaveClass("list-item-row--selected");
  });
});
