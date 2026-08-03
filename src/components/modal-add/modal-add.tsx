import { useEffect, useRef, useState } from "react";

import { useStringListStore } from "@/store/useStringListStore";
import { CustomButton } from "../custom-button";

import "./modal-add.scss";

interface ModalAddProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalAdd = ({ isOpen, onClose }: ModalAddProps) => {
  const addString = useStringListStore((state) => state.addString);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleDocumentKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setInputValue("");
        onClose();
        return;
      }

      if (e.key === "Tab" && contentRef.current) {
        const focusable = contentRef.current.querySelectorAll<HTMLElement>(
          "button, input, [href], select, textarea, [tabindex]:not([tabindex='-1'])"
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
    };

    document.addEventListener("keydown", handleDocumentKeyDown);
    return () => document.removeEventListener("keydown", handleDocumentKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleAddClick = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue && trimmedValue.length > 0) {
      addString(trimmedValue);
      setInputValue("");
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddClick();
    }
  };

  const handleClose = () => {
    setInputValue("");
    onClose();
  };

  return (
    <div className="modal-add" data-testid="modal-add">
      <div
        className="modal-add__content"
        onClick={(e) => e.stopPropagation()}
        ref={contentRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-add-title"
      >
        <h2 className="modal-add__text" id="modal-add-title">
          Add item to list
        </h2>
        <input
          autoComplete="off"
          className="modal-add__input"
          name="modal-add-input"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Type the text here..."
          ref={inputRef}
          type="text"
          value={inputValue}
        />
        <div className="modal-add__actions">
          <CustomButton label="Add" onClick={handleAddClick} disabled={!inputValue.trim()} />
          <CustomButton label="Cancel" variant="outline" onClick={handleClose} />
        </div>
      </div>
    </div>
  );
};
