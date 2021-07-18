import React, { useRef } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { IItem } from "../../interfaces/item.interface";
import {
  changeItemsName,
  changeItemsValue,
  incrementItemsValue,
} from "../../store/Actions";
import { DataContext } from "../../store/GlobalStore";
import "./AuctionItem.scss";
interface AuctionItemProps {
  item: IItem;
  index: number;
}

export const AuctionItem: React.FC<AuctionItemProps> = ({ item, index }) => {
  const { dispatch } = useContext(DataContext);
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const valueInputRef = useRef<HTMLInputElement | null>(null);
  const incrementInputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    valueInputRef.current!.value = item.value.toString();
  }, [item.value]);
  const handleChangeName = (name: string) => {
    if (name === item.name) return;
    dispatch(changeItemsName(name, item.id));
  };
  const handleChangeValue = (value: string) => {
    let number = parseInt(value);
    if (number === item.value) return;
    if (isNaN(number)) {
      valueInputRef.current!.value = item.value.toString();
      number = item.value;
    }
    dispatch(changeItemsValue(number, item.id));
  };
  const handleIncrement = (value: string) => {
    let number = parseInt(value);
    if (isNaN(number) || number === 0) {
      incrementInputRef.current!.value = "";
      number = 0;
      return;
    }
    dispatch(incrementItemsValue(number, item.id));
    incrementInputRef.current!.value = "";
  };
  return (
    <div className="item">
      <div className="index">
        <i>#{index + 1}</i>
      </div>
      <input
        ref={nameInputRef}
        onKeyPress={(e) => {
          if (e.code === "Enter")
            return handleChangeName(nameInputRef.current?.value || "");
        }}
        onBlur={() => handleChangeName(nameInputRef.current?.value || "")}
        className="name-input"
        defaultValue={item.name}
        type="text"
      />
      <input
        ref={valueInputRef}
        className="price-input"
        onKeyPress={(e) => {
          if (e.code === "Enter")
            return handleChangeValue(valueInputRef.current?.value || "");
        }}
        onBlur={() => handleChangeValue(valueInputRef.current?.value || "")}
        type="text"
      />
      <button
        onClick={() => handleIncrement(incrementInputRef.current?.value || "")}
      >
        +
      </button>
      <input
        placeholder="₽"
        ref={incrementInputRef}
        onKeyPress={(e) => {
          if (e.code === "Enter") {
            return handleIncrement(incrementInputRef.current?.value || "");
          }
        }}
        className="increment-input"
        defaultValue=""
        type="text"
      />
    </div>
  );
};
