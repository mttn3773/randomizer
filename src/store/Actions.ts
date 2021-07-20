import { IItem } from "../interfaces/item.interface";
import { IAction } from "./../interfaces/globalState.interfaces";
export enum ACTIONS {
  CREATE_NEW_ITEM = "CREATE_ITEM",
  CHANGE_ITEMS_NAME = "CHANGE_ITEMS_NAME",
  CHANGE_ITEMS_VALUE = "CHANGE_ITEMS_VALUE",
  INCREMENT_ITEMS_VALUE = "INCREMENT_ITEMS_VALUE",
  DELETE_ITEM = "DELETE_ITEM",
}

let maxId = 1;

export const deleteItem = (id: number): IAction<{ id: number }> => {
  return { type: ACTIONS.DELETE_ITEM, payload: { id } };
};

export const createItem = (): IAction<IItem> => {
  return {
    type: ACTIONS.CREATE_NEW_ITEM,
    payload: { name: "", value: 0, id: maxId++ },
  };
};

export const changeItemsName = (
  name: string,
  id: number
): IAction<{ name: string; id: number }> => {
  return { type: ACTIONS.CHANGE_ITEMS_NAME, payload: { name, id } };
};

export const changeItemsValue = (
  value: number,
  id: number
): IAction<{ value: number; id: number }> => {
  return { type: ACTIONS.CHANGE_ITEMS_VALUE, payload: { value, id } };
};

export const incrementItemsValue = (
  increment: number,
  id: number
): IAction<{ increment: number; id: number }> => {
  return { type: ACTIONS.INCREMENT_ITEMS_VALUE, payload: { increment, id } };
};
