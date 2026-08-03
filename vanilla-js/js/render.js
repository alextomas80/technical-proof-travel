import { state } from "./state.js";
import { listEl, deleteButton, restoreButton } from "./dom.js";

export function render() {
  listEl.innerHTML = "";
  state.strings.forEach((item) => {
    const row = document.createElement("div");
    row.className = "list-item-row" + (item.isSelected ? " list-item-row--selected" : "");
    row.textContent = item.value;
    row.setAttribute("role", "option");
    row.setAttribute("aria-selected", String(item.isSelected));
    row.setAttribute("tabindex", "0");
    row.dataset.key = item.key;
    listEl.appendChild(row);
  });

  const hasSelected = state.strings.some((item) => item.isSelected);
  const hasDeleted = state.lastDeletedStrings.length > 0;

  deleteButton.disabled = !hasSelected;
  restoreButton.disabled = !hasDeleted;
}
