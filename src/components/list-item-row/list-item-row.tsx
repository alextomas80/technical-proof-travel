import classNames from "classnames";
import { useShallow } from "zustand/shallow";

import { useStringListStore } from "@/store/useStringListStore";

import "./list-item-row.scss";

interface ListItemRowProps {
  itemKey: string;
  text: string;
  selected: boolean;
}

export const ListItemRow = ({ itemKey, text, selected }: ListItemRowProps) => {
  const { toggleSelection, removeString } = useStringListStore(
    useShallow((state) => ({ toggleSelection: state.toggleSelection, removeString: state.removeString }))
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleSelection(itemKey);
    }
  };

  return (
    <div
      className={classNames("list-item-row", { "list-item-row--selected": selected })}
      onClick={() => toggleSelection(itemKey)}
      onDoubleClick={() => removeString(itemKey)}
      onKeyDown={handleKeyDown}
      role="option"
      aria-selected={selected}
      tabIndex={0}
    >
      {text}
    </div>
  );
};
