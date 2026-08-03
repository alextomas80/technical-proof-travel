import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, test } from "vitest";

import App from "./App";
import { useStringListStore } from "./store/useStringListStore";

const resetStore = () => {
  useStringListStore.setState({ strings: [], lastDeletedStrings: [] });
  localStorage.clear();
};

const addStringThroughModal = (text: string) => {
  fireEvent.click(screen.getByText("ADD"));
  const input = screen.getByPlaceholderText("Type the text here...");
  fireEvent.change(input, { target: { value: text } });
  fireEvent.click(screen.getByText("Add"));
};

const getDeleteButton = () => screen.getByText("DELETE") as HTMLButtonElement;
const getRestoreButton = () => screen.getByTestId("restore-button") as HTMLButtonElement;

describe("Complete flows of the application", () => {
  beforeEach(() => {
    resetStore();
  });

  test("allows creating a string from the modal and displaying it in the list", () => {
    render(<App />);

    addStringThroughModal("Buenos días");

    expect(screen.getByText("Buenos días")).toBeInTheDocument();
  });

  test("allows selecting, deleting and restoring a string", () => {
    render(<App />);

    addStringThroughModal("Buenos días");

    const listItem = screen.getByText("Buenos días");
    fireEvent.click(listItem);

    const deleteButton = screen.getByText("DELETE") as HTMLButtonElement;
    expect(deleteButton.disabled).toBe(false);
    fireEvent.click(deleteButton);

    expect(screen.queryByText("Buenos días")).not.toBeInTheDocument();

    const restoreButton = screen.getByTestId("restore-button") as HTMLButtonElement;
    expect(restoreButton.disabled).toBe(false);
    fireEvent.click(restoreButton);

    expect(screen.getByText("Buenos días")).toBeInTheDocument();
  });

  test("allows deleting and restoring multiple strings while maintaining the state of the buttons", () => {
    render(<App />);

    addStringThroughModal("Elemento 1");
    addStringThroughModal("Elemento 2");

    fireEvent.click(screen.getByText("Elemento 1"));
    fireEvent.click(screen.getByText("Elemento 2"));

    const deleteButton = getDeleteButton();
    expect(deleteButton.disabled).toBe(false);
    fireEvent.click(deleteButton);

    expect(screen.queryByText("Elemento 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Elemento 2")).not.toBeInTheDocument();

    const restoreButton = getRestoreButton();
    expect(restoreButton.disabled).toBe(false);
    fireEvent.click(restoreButton);

    expect(screen.getByText("Elemento 1")).toBeInTheDocument();
    expect(screen.getByText("Elemento 2")).toBeInTheDocument();
    expect(getDeleteButton().disabled).toBe(true);
    expect(getRestoreButton().disabled).toBe(true);
  });

  test("adds a string with the Enter key and prevents empty values", () => {
    render(<App />);

    fireEvent.click(screen.getByText("ADD"));

    const input = screen.getByPlaceholderText("Type the text here...") as HTMLInputElement;
    const addButton = screen.getByText("Add") as HTMLButtonElement;

    expect(addButton.disabled).toBe(true);

    fireEvent.change(input, { target: { value: "   " } });
    expect(addButton.disabled).toBe(true);

    fireEvent.change(input, { target: { value: "Nuevo con Enter" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(screen.queryByTestId("modal-add")).not.toBeInTheDocument();
    expect(screen.getByText("Nuevo con Enter")).toBeInTheDocument();
  });

  test("cancels the creation and clears the input value when the modal is reopened", () => {
    render(<App />);

    fireEvent.click(screen.getByText("ADD"));

    let input = screen.getByPlaceholderText("Type the text here...") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Temporal string" } });

    fireEvent.click(screen.getByText("Cancel"));
    expect(screen.queryByTestId("modal-add")).not.toBeInTheDocument();
    expect(screen.queryByText("Temporal string")).not.toBeInTheDocument();

    fireEvent.click(screen.getByText("ADD"));
    input = screen.getByPlaceholderText("Type the text here...") as HTMLInputElement;
    expect(input.value).toBe("");
  });
});
