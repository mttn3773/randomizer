import React from "react";
import { useContext } from "react";
import { IItem } from "../../interfaces/item.interface";
import { createItem } from "../../store/Actions";
import { DataContext } from "../../store/GlobalStore";
import { AuctionItem } from "../AuctionItem/AuctionItem";
import "./ItemsList.scss";
interface ItemsListProps {
  items: IItem[];
}

export const ItemsList: React.FC<ItemsListProps> = ({ items }) => {
  const { dispatch } = useContext(DataContext);
  const handleCreateNewItem = () => {
    return dispatch(createItem());
  };
  return (
    <div>
      <div className="item-list">
        {items.map((item) => (
          <AuctionItem key={item.id} item={item} />
        ))}
      </div>
      <button onClick={handleCreateNewItem}> + </button>
    </div>
  );
};
