const STORAGE_KEY = "vanilla-string-list-store";

export const state = {
  strings: [],
  lastDeletedStrings: [],
};

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (parsed && Array.isArray(parsed.strings)) {
      state.strings = parsed.strings;
      state.lastDeletedStrings = Array.isArray(parsed.lastDeletedStrings) ? parsed.lastDeletedStrings : [];
    }
  } catch (e) {
    console.error("Failed to load state from localStorage", e);
  }
}

export function saveState() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ strings: state.strings, lastDeletedStrings: state.lastDeletedStrings }),
  );
}

function generateId() {
  if (window.crypto && window.crypto.randomUUID) return window.crypto.randomUUID();
  return "id-" + Date.now() + "-" + Math.random().toString(16).slice(2);
}

export function addString(text) {
  state.strings.push({ key: generateId(), value: text, isSelected: false });
  saveState();
}

export function toggleSelection(key) {
  state.strings = state.strings.map((item) =>
    item.key === key ? Object.assign({}, item, { isSelected: !item.isSelected }) : item,
  );
  saveState();
}

export function removeSelectedStrings() {
  const selected = state.strings.filter((item) => item.isSelected);
  if (selected.length === 0) return false;
  state.strings = state.strings.filter((item) => !item.isSelected);
  state.lastDeletedStrings = selected;
  saveState();
  return true;
}

export function removeString(key) {
  const removed = state.strings.find((item) => item.key === key);
  if (!removed) return false;
  state.strings = state.strings.filter((item) => item.key !== key);
  state.lastDeletedStrings = [Object.assign({}, removed, { isSelected: false })];
  saveState();
  return true;
}

export function restoreDeletedStrings() {
  if (state.lastDeletedStrings.length === 0) return false;
  const restored = state.lastDeletedStrings.map((item) => Object.assign({}, item, { isSelected: false }));
  state.strings = state.strings.concat(restored);
  state.lastDeletedStrings = [];
  saveState();
  return true;
}
