import { useState } from "react";

import { CustomButton } from "../custom-button";
import { ModalAdd } from "../modal-add";
import { useStringListStore } from "@/store/useStringListStore";
import ReloadIcon from "@/assets/icon-reload";

import "./controls.scss";

export const Controls = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { strings, lastDeletedStrings, removeSelectedStrings, restoreDeletedStrings } = useStringListStore();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const hasSelectedStrings = strings.some((item) => item.isSelected);
  const hasDeletedStrings = lastDeletedStrings.length > 0;

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
            disabled={!hasSelectedStrings}
            label="DELETE"
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
