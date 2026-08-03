import { useState } from "react";

import { CustomButton } from "../custom-button";
import { ModalAdd } from "../modal-add";
import { useStringListStore } from "@/store/useStringListStore";
import { ReloadIcon } from "@/assets/icon-reload";

import "./controls.scss";

export const Controls = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { strings, lastDeletedStrings, removeSelectedStrings, restoreDeletedStrings } = useStringListStore();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const selectedStringsCount = strings.filter((item) => item.isSelected).length;
  const hasSelectedStrings = selectedStringsCount > 0;
  const hasDeletedStrings = lastDeletedStrings.length > 0;
  const deleteLabel = selectedStringsCount > 1 ? `DELETE (${selectedStringsCount})` : "DELETE";

  return (
    <>
      <section className="controls">
        <div className="controls__group">
          <CustomButton
            data-testid="restore-button"
            disabled={!hasDeletedStrings}
            label={<ReloadIcon />}
            name="restore-button"
            onClick={restoreDeletedStrings}
            variant="outline"
          />
          <CustomButton
            data-testid="delete-button"
            disabled={!hasSelectedStrings}
            label={deleteLabel}
            onClick={removeSelectedStrings}
            variant="outline"
          />
        </div>
        <CustomButton label="ADD" onClick={toggleModal} />
      </section>

      <ModalAdd isOpen={isModalOpen} onClose={toggleModal} />
    </>
  );
};
