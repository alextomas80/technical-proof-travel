import { useStringListStore } from "@/store/useStringListStore";
import { ListItemRow } from "../list-item-row";

import "./list-items.scss";
import { useShallow } from "zustand/shallow";

export const ListItems = () => {
  const strings = useStringListStore(useShallow((state) => state.strings));

  return (
    <div className="list-items">
      {strings.map((item) => (
        <ListItemRow key={item.key} itemKey={item.key} text={item.value} selected={item.isSelected} />
      ))}
    </div>
  );
};
