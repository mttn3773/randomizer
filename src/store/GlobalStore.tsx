import { createContext } from "react";
import { useReducer } from "react";
import { useContext } from "react";
import { IAction, IGlobalState } from "../interfaces/globalState.interfaces";
import { reducers } from "./Reducers";

const initialState: IGlobalState = {
  items: [],
};

export const DataContext = createContext<{
  state: IGlobalState;
  dispatch: React.Dispatch<IAction>;
}>({
  state: initialState,
  dispatch: () => {},
});

export const GlobalState: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducers, initialState);
  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
