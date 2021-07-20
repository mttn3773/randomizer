import { IItem, INormalizedItem } from "../interfaces/item.interface";
import { calculateSummary } from "./common.utils";

export const mapItemsToNormalized = (items: IItem[]): INormalizedItem[] => {
  const resultMap: INormalizedItem[] = [];
  const summary = calculateSummary(items);

  items.forEach(({ value, name, id }) => {
    if (value === 0) return resultMap.push({ percentage: 0, name, id });
    const percentage = (value / summary) * 100;
    resultMap.push({ percentage, name, id });
  });
  resultMap.sort((el1, el2) => {
    if (el1.percentage < el2.percentage) return 1;
    return 0;
  });
  return resultMap;
};

export const mapItemsForElimination = (
  items: IItem[],
  eliminatedItems: number[]
): INormalizedItem[] => {
  items = items.filter(({ id }) => !eliminatedItems.includes(id));
  const resultMap: INormalizedItem[] = [];
  const summary = calculateSummary(items);
  const eliminationSummary = items.reduce(
    (sum, { value }) => (value ? sum + summary - value : sum),
    0
  );
  items.forEach(({ value, name, id }) => {
    if (value === 0) return resultMap.push({ percentage: 0, name, id });
    if (eliminationSummary === 0)
      return resultMap.push({ percentage: 100, name, id });
    const percentage = ((summary - value) / eliminationSummary) * 100;

    resultMap.push({ percentage, name, id });
  });
  resultMap.sort((el1, el2) => {
    if (el1.percentage < el2.percentage) return 1;
    return 0;
  });
  return resultMap;
};
