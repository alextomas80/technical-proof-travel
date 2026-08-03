import { useStringListStore } from "./useStringListStore";

export const resetStringListStore = () => {
  useStringListStore.setState({ strings: [], lastDeletedStrings: [] });
};
