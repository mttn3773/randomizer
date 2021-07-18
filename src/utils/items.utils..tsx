import { IItem, INormalizedItem } from "../interfaces/item.interface";
import { calculateSummary } from "./common.utils";

export const mapItemsToNormalized = (items: IItem[]): INormalizedItem[] => {
  const resultMap: INormalizedItem[] = [];
  const summary = calculateSummary(items);
  items.forEach(({ value, name }) => {
    if (value === 0) return resultMap.push({ percentage: 0, name });
    const percentage = (value / summary) * 100;
    resultMap.push({ percentage, name });
  });
  resultMap.sort((el1, el2) => {
    if (el1.percentage < el2.percentage) return 1;
    return 0;
  });
  return resultMap;
};
