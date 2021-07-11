import React from "react";
import { IItem } from "../../interfaces/item.interface";

interface AuctionItemProps {
  item: IItem;
}

export const AuctionItem: React.FC<AuctionItemProps> = ({ item }) => {
  return (
    <div className="item">
      <i>{item.id}.</i>
      <input defaultValue={item.name} type="text" />
      <input defaultValue={item.value} type="text" />
    </div>
  );
};
