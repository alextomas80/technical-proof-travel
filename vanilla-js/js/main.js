import { loadState, removeSelectedStrings, restoreDeletedStrings } from "./state.js";
import { deleteButton, restoreButton, addButton } from "./dom.js";
import { render } from "./render.js";
import { openModal } from "./modal.js";
import "./listEvents.js";

deleteButton.addEventListener("click", () => {
  if (removeSelectedStrings()) render();
});

restoreButton.addEventListener("click", () => {
  if (restoreDeletedStrings()) render();
});

addButton.addEventListener("click", openModal);

loadState();
render();
