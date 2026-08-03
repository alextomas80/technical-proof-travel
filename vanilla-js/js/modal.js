import { modal, modalInput, modalConfirmButton, modalCancelButton, modalContent } from "./dom.js";
import { addString } from "./state.js";
import { render } from "./render.js";

export function openModal() {
  modal.hidden = false;
  modalInput.value = "";
  modalConfirmButton.disabled = true;
  modalInput.focus();
  document.addEventListener("keydown", handleModalKeyDown);
}

export function closeModal() {
  modal.hidden = true;
  modalInput.value = "";
  document.removeEventListener("keydown", handleModalKeyDown);
}

function confirmAdd() {
  const trimmed = modalInput.value.trim();
  if (!trimmed) return;
  addString(trimmed);
  render();
  closeModal();
}

function handleModalKeyDown(e) {
  if (e.key === "Escape") {
    closeModal();
    return;
  }
  if (e.key === "Tab") {
    const focusable = modalContent.querySelectorAll(
      "button, input, [href], select, textarea, [tabindex]:not([tabindex='-1'])",
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
}

modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

modalInput.addEventListener("input", () => {
  modalConfirmButton.disabled = !modalInput.value.trim();
});

modalInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") confirmAdd();
});

modalConfirmButton.addEventListener("click", confirmAdd);
modalCancelButton.addEventListener("click", closeModal);
