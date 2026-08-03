import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

export interface StringItem {
  key: string;
  value: string;
  isSelected: boolean;
}

interface StringListState {
  strings: StringItem[];
  lastDeletedStrings: StringItem[];
  addString: (text: string) => void;
  toggleSelection: (key: string) => void;
  removeSelectedStrings: () => void;
  removeString: (key: string) => void;
  restoreDeletedStrings: () => void;
}

export const useStringListStore = create<StringListState>()(
  devtools(
    persist(
      (set) => ({
        strings: [],

        lastDeletedStrings: [],

        addString: (text: string) =>
          set((state) => ({
            strings: [...state.strings, { key: uuidv4(), value: text, isSelected: false }],
          })),

        toggleSelection: (key: string) =>
          set((state) => ({
            strings: state.strings.map((item) => (item.key === key ? { ...item, isSelected: !item.isSelected } : item)),
          })),

        removeSelectedStrings: () =>
          set((state) => {
            const selectedItems = state.strings.filter((item) => item.isSelected);
            return {
              strings: state.strings.filter((item) => !item.isSelected),
              lastDeletedStrings: selectedItems,
            };
          }),

        removeString: (key: string) =>
          set((state) => {
            const removedItem = state.strings.find((item) => item.key === key);
            if (!removedItem) return state;
            return {
              strings: state.strings.filter((item) => item.key !== key),
              lastDeletedStrings: [{ ...removedItem, isSelected: false }],
            };
          }),

        restoreDeletedStrings: () =>
          set((state) => ({
            strings: [...state.strings, ...state.lastDeletedStrings.map((item) => ({ ...item, isSelected: false }))],
            lastDeletedStrings: [],
          })),
      }),
      {
        name: "string-list-store",
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          strings: state.strings,
          lastDeletedStrings: state.lastDeletedStrings,
        }),
      },
    ),
    { name: "StringListStore" },
  ),
);
