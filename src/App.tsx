import React, { useContext } from "react";
import { ItemsList } from "./components/ItemsList/ItemsList";
import { SVGWheel } from "./components/SVGWheel/SVGWheel";
import { DataContext } from "./store/GlobalStore";
import "./styles/global.scss";
import { mapItemsToNormalized } from "./utils/items.utils.";

function App() {
  const { state } = useContext(DataContext);
  const { items } = state;
  const normalizedItems = mapItemsToNormalized(items);

  return (
    <div>
      <ItemsList items={items} />
      <SVGWheel normalizedItemsList={normalizedItems} />
    </div>
  );
}

export default App;
