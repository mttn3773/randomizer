import React from "react";
import { useContext } from "react";
import { IItem } from "../../interfaces/item.interface";
import { ACTIONS, createItem, deleteItem } from "../../store/Actions";
import { DataContext } from "../../store/GlobalStore";
import { calculateSummary } from "../../utils/common.utils";
import { AuctionItem } from "../AuctionItem/AuctionItem";
import FlipMove from "react-flip-move";

import "./ItemsList.scss";
import { useEffect } from "react";
interface ItemsListProps {
  items: IItem[];
}

export const ItemsList: React.FC<ItemsListProps> = ({ items }) => {
  const { dispatch, state } = useContext(DataContext);
  const handleCreateNewItem = () => {
    return dispatch(createItem());
  };
  useEffect(() => {
    handleCreateNewItem();
  }, []);
  const handleDeleteItems = (id: number) => {
    return dispatch(deleteItem(id));
  };
  const sortByValue = (items: IItem[]) =>
    items.sort((el1, el2) => {
      if (el1.value <= el2.value) return 1;
      return -1;
    });
  const summaryValue = calculateSummary(state.items);
  return (
    <div className="auction-container">
      <div className="item-list">
        <FlipMove
          typeName={null}
          enterAnimation="fade"
          leaveAnimation="fade"
          maintainContainerHeight
        >
          {sortByValue(items).map((item, index) => (
            <div key={item.id}>
              <AuctionItem
                handleDelete={handleDeleteItems}
                index={index}
                item={item}
              />
            </div>
          ))}
        </FlipMove>
      </div>
      <button className="create-new-btn" onClick={handleCreateNewItem}>
        +
      </button>
      <h2>TOTAL : {summaryValue}</h2>
    </div>
  );
};
