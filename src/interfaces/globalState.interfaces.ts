import { ACTIONS } from "./../store/Actions";
import { IItem } from "./item.interface";
export interface IGlobalState {
  items: IItem[];
}

export interface IAction<K = any> {
  type: ACTIONS;
  payload: K;
}
