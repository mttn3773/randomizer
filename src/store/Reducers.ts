import { IAction, IGlobalState } from "./../interfaces/globalState.interfaces";
import { ACTIONS } from "./Actions";
export const reducers = (
  state: IGlobalState,
  action: IAction
): IGlobalState => {
  switch (action.type) {
    case ACTIONS.CREATE_NEW_ITEM:
      return { items: [...state.items, action.payload] };
    default:
      return state;
  }
};
