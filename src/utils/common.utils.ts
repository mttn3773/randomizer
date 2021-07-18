import { IItem } from "../interfaces/item.interface";

export const calculateSummary = (items: IItem[]): number => {
  const accumulate = items.reduce((sum, { value }) => sum + value, 0);
  return accumulate;
};

export const textToFit = (text: string) => {
  text = text.trim();
  return `${text.slice(0, 9)}${text.length > 9 ? "..." : ""}`;
};
