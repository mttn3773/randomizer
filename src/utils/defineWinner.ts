import { INormalizedItem } from "./../interfaces/item.interface";
export const defineWinner = (
  seed: number,
  normalizeItemsList: INormalizedItem[]
): INormalizedItem => {
  let res: INormalizedItem = normalizeItemsList[normalizeItemsList.length - 1];
  let accumulate = 0;
  for (let i = 0; i < normalizeItemsList.length; i++) {
    if (normalizeItemsList[i].percentage / 100 + accumulate > seed) {
      res = normalizeItemsList[i];
      break;
    }
    accumulate += normalizeItemsList[i].percentage / 100;
  }

  return res;
};
