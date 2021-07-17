import { useEffect, useState } from "react";
import { INormalizedItem } from "./../interfaces/item.interface";
export const useWinner = (normalizeItemsList: INormalizedItem[]) => {
  const [seed, setSeed] = useState<number>();
  const findWinner = () => {
    const seed = Math.random();
    setSeed(seed);
    const sortedList = normalizeItemsList.sort((el1, el2) => {
      if (el1.percentage > el2.percentage) return 1;
      return 0;
    });
  };

  return { findWinner };
};
