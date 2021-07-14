import React, { useContext } from "react";
import { useEffect } from "react";
import { ItemsList } from "./components/ItemsList/ItemsList";
import { Wheel } from "./components/Wheel/Wheel";
import { DataContext } from "./store/GlobalStore";
import "./styles/global.scss";

function App() {
  const { state } = useContext(DataContext);
  const { items } = state;
  return (
    <div>
      {JSON.stringify(state, null, 12)}

      <ItemsList items={items} />
      <Wheel />
    </div>
  );
}

export default App;
