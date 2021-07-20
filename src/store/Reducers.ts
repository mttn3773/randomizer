import { IAction, IGlobalState } from "./../interfaces/globalState.interfaces";
import { ACTIONS } from "./Actions";
export const reducers = (
  state: IGlobalState,
  action: IAction
): IGlobalState => {
  switch (action.type) {
    case ACTIONS.CREATE_NEW_ITEM:
      return { ...state, items: [...state.items, action.payload] };
    case ACTIONS.CHANGE_ITEMS_NAME:
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, name: action.payload.name };
          }
          return item;
        }),
      };
    case ACTIONS.CHANGE_ITEMS_VALUE:
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, value: action.payload.value };
          }
          return item;
        }),
      };
    case ACTIONS.INCREMENT_ITEMS_VALUE:
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, value: item.value + action.payload.increment };
          }
          return item;
        }),
      };
    case ACTIONS.DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(({ id }) => !(id === action.payload.id)),
      };
    default:
      return state;
  }
};
