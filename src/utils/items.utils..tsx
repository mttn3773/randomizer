import { IItem, INormalizedItem } from "../interfaces/item.interface";

export const calculateSummary = (items: IItem[]): number => {
  let sum = 0;
  items.map((item) => {
    sum += item.value;
  });
  return sum;
};

export const mapItemsToNormalized = (items: IItem[]): INormalizedItem[] => {
  const resultMap: INormalizedItem[] = [];
  const summary = calculateSummary(items);
  items.map(({ value, name }) => {
    if (value === 0) return resultMap.push({ percentage: 0, name });
    const percentage = (value / summary) * 100;
    return resultMap.push({ percentage, name });
  });
  return resultMap;
};
