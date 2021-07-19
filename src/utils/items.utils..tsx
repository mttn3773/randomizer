import { IItem, INormalizedItem } from "../interfaces/item.interface";
import { calculateSummary } from "./common.utils";

export const mapItemsToNormalized = (
  items: IItem[],
  eliminationMode?: boolean
): INormalizedItem[] => {
  const resultMap: INormalizedItem[] = [];
  const summary = calculateSummary(items);
  let eliminationSummary = 0;
  items.forEach(({ value }) => {
    const value2 = summary - value;
    eliminationSummary += value2;
  });
  items.forEach(({ value, name, id }) => {
    if (value === 0) return resultMap.push({ percentage: 0, name, id });
    const percentage = eliminationMode
      ? ((summary - value) / eliminationSummary) * 100
      : (value / summary) * 100;
    resultMap.push({ percentage, name, id });
  });
  resultMap.sort((el1, el2) => {
    if (el1.percentage < el2.percentage) return 1;
    return 0;
  });

  return resultMap;
};
