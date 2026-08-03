import { listEl } from "./dom.js";
import { toggleSelection, removeString } from "./state.js";
import { render } from "./render.js";

listEl.addEventListener("click", (e) => {
  const row = e.target.closest(".list-item-row");
  if (!row) return;
  toggleSelection(row.dataset.key);
  render();
});

listEl.addEventListener("dblclick", (e) => {
  const row = e.target.closest(".list-item-row");
  if (!row) return;
  if (removeString(row.dataset.key)) render();
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
