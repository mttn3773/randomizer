import { IItem } from "../interfaces/item.interface";
import { IAction } from "./../interfaces/globalState.interfaces";
export enum ACTIONS {
  CREATE_NEW_ITEM = "CREATE_ITEM",
  CHANGE_ITEMS_NAME = "CHANGE_ITEMS_NAME",
  CHANGE_ITEMS_VALUE = "CHANGE_ITEMS_VALUE",
}

let maxId = 0;

export const createItem = (): IAction<IItem> => {
  return {
    type: ACTIONS.CREATE_NEW_ITEM,
    payload: { name: "", value: 0, id: maxId++ },
  };
};

export const changeItemsName = (name: string): IAction<{ name: string }> => {
  return { type: ACTIONS.CHANGE_ITEMS_NAME, payload: { name } };
};
