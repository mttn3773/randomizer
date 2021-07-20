import React, { useContext, useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { INormalizedItem } from "../../interfaces/item.interface";
import { DataContext } from "../../store/GlobalStore";
import { mapItemsToNormalized } from "../../utils/items.utils.";
import { ItemsList } from "../ItemsList/ItemsList";
import { SVGWheel } from "../SVGWheel/SVGWheel";
import { Timer } from "../Timer/Timer";
import "./App.scss";

function App() {
  const { state } = useContext(DataContext);
  const { items } = state;
  const [normalizedItems, setNormalizedItems] = useState<INormalizedItem[]>([]);
  useEffect(() => {
    setNormalizedItems(mapItemsToNormalized(items));
  }, []);

  return (
    <main>
      <section className="items-section">
        <div className="item-list-wrapper">
          <ItemsList items={items} />
        </div>
        <div className="timer-wrapper">
          <Timer />
        </div>
      </section>
      <section className="wheel-section">
        <SVGWheel
          normalizedItemsList={normalizedItems}
          setNormalizedItems={setNormalizedItems}
        />
      </section>
    </main>
  );
}

export default App;
