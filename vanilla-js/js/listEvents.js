import { listEl } from "./dom.js";
import { toggleSelection, removeString } from "./state.js";
import { render } from "./render.js";

const DOUBLE_CLICK_MS = 300;
let lastClick = { key: null, time: 0 };

listEl.addEventListener("click", (e) => {
  const row = e.target.closest(".list-item-row");
  if (!row) return;
  const key = row.dataset.key;
  const now = Date.now();
  const isDoubleClick = key === lastClick.key && now - lastClick.time < DOUBLE_CLICK_MS;
  lastClick = { key: null, time: 0 };

  if (isDoubleClick) {
    if (removeString(key)) render();
    return;
  }

  lastClick = { key, time: now };
  toggleSelection(key);
  render();
});

listEl.addEventListener("keydown", (e) => {
  const row = e.target.closest(".list-item-row");
  if (!row) return;
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    toggleSelection(row.dataset.key);
    render();
  }
});
