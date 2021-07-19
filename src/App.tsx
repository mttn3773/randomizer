import React, { useContext, useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { ItemsList } from "./components/ItemsList/ItemsList";
import { SVGWheel } from "./components/SVGWheel/SVGWheel";
import { INormalizedItem } from "./interfaces/item.interface";
import { DataContext } from "./store/GlobalStore";
import "./styles/global.scss";
import { mapItemsToNormalized } from "./utils/items.utils.";

function App() {
  const { state } = useContext(DataContext);
  const { items } = state;
  const [normalizedItems, setNormalizedItems] = useState<INormalizedItem[]>([]);
  useEffect(() => {
    setNormalizedItems(mapItemsToNormalized(items));
  }, []);

  return (
    <div>
      <ItemsList items={items} />
      <SVGWheel
        normalizedItemsList={normalizedItems}
        setNormalizedItems={setNormalizedItems}
      />
    </div>
  );
}

export default App;
