import React, { useContext } from "react";
import { ItemsList } from "./components/ItemsList/ItemsList";
import { DataContext } from "./store/GlobalStore";
import "./styles/global.scss";

function App() {
  const { state } = useContext(DataContext);
  const { items } = state;
  return (
    <div>
      {JSON.stringify(state)}
      <ItemsList items={items} />
    </div>
  );
}

export default App;
