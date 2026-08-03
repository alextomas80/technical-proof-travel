import { useStringListStore } from "./useStringListStore";
import { resetStringListStore } from "./testUtils";

describe("useStringListStore", () => {
  beforeEach(() => {
    resetStringListStore();
  });

  test("removes a single string by key", () => {
    const { addString, removeString } = useStringListStore.getState();

    addString("String 1");
    addString("String 2");

    const stringKey1 = useStringListStore.getState().strings[0].key;
    removeString(stringKey1);

    const updatedStrings = useStringListStore.getState().strings;
    expect(updatedStrings.length).toBe(1);
    expect(updatedStrings[0].value).toBe("String 2");
  });

  test("moves removed string to lastDeletedStrings", () => {
    const { addString, removeString } = useStringListStore.getState();

    addString("String 1");
    const stringKey1 = useStringListStore.getState().strings[0].key;

    removeString(stringKey1);

    const lastDeleted = useStringListStore.getState().lastDeletedStrings;
    expect(lastDeleted.length).toBe(1);
    expect(lastDeleted[0].key).toBe(stringKey1);
    expect(lastDeleted[0].value).toBe("String 1");
    expect(lastDeleted[0].isSelected).toBe(false);
  });

  test("removed string can be restored", () => {
    const { addString, removeString, restoreDeletedStrings } = useStringListStore.getState();

    addString("String 1");
    const stringKey1 = useStringListStore.getState().strings[0].key;

    removeString(stringKey1);
    restoreDeletedStrings();

    const restoredStrings = useStringListStore.getState().strings;
    expect(restoredStrings.length).toBe(1);
    expect(restoredStrings[0].key).toBe(stringKey1);
    expect(useStringListStore.getState().lastDeletedStrings.length).toBe(0);
  });

  test("removeString overwrites previous lastDeletedStrings", () => {
    const { addString, toggleSelection, removeSelectedStrings, removeString } = useStringListStore.getState();

    addString("String 1");
    addString("String 2");
    addString("String 3");

    const [key1, key2, key3] = useStringListStore.getState().strings.map((item) => item.key);

    toggleSelection(key1);
    removeSelectedStrings();

    removeString(key2);

    const lastDeleted = useStringListStore.getState().lastDeletedStrings;
    expect(lastDeleted.length).toBe(1);
    expect(lastDeleted[0].key).toBe(key2);

    const remainingStrings = useStringListStore.getState().strings;
    expect(remainingStrings.map((item) => item.key)).toEqual([key3]);
  });

  test("does nothing when removing a non-existent key", () => {
    const { addString, removeString } = useStringListStore.getState();

    addString("String 1");
    removeString("non-existent-key");

    expect(useStringListStore.getState().strings.length).toBe(1);
    expect(useStringListStore.getState().lastDeletedStrings.length).toBe(0);
  });

  test("adds a string", () => {
    const { addString } = useStringListStore.getState();
    addString("Test String");

    const updatedStrings = useStringListStore.getState().strings;

    expect(updatedStrings.length).toBe(1);
    expect(updatedStrings[0].value).toBe("Test String");
    expect(updatedStrings[0].isSelected).toBe(false);
  });

  test("toggles string selection", () => {
    const { addString, toggleSelection } = useStringListStore.getState();
    addString("Test String");

    const stringKey = useStringListStore.getState().strings[0].key;
    toggleSelection(stringKey);

    const updatedString = useStringListStore.getState().strings[0];
    expect(updatedString.isSelected).toBe(true);
  });

  test("removes selected strings", () => {
    const { addString, toggleSelection, removeSelectedStrings } = useStringListStore.getState();

    addString("String 1");
    addString("String 2");

    const stringKey1 = useStringListStore.getState().strings[0].key;
    const stringKey2 = useStringListStore.getState().strings[1].key;

    toggleSelection(stringKey1);
    toggleSelection(stringKey2);

    removeSelectedStrings();

    const updatedStrings = useStringListStore.getState().strings;
    expect(updatedStrings.length).toBe(0);
  });

  test("restores deleted strings", () => {
    const { addString, toggleSelection, removeSelectedStrings, restoreDeletedStrings } = useStringListStore.getState();

    addString("String 1");
    addString("String 2");

    const stringKey1 = useStringListStore.getState().strings[0].key;
    const stringKey2 = useStringListStore.getState().strings[1].key;

    toggleSelection(stringKey1);
    toggleSelection(stringKey2);

    removeSelectedStrings();
    restoreDeletedStrings();

    const restoredStrings = useStringListStore.getState().strings;
    expect(restoredStrings.length).toBe(2);
    expect(restoredStrings[0].isSelected).toBe(false);
    expect(restoredStrings[1].isSelected).toBe(false);
  });
});
