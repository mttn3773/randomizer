import { INormalizedItem } from "./../interfaces/item.interface";
export const defineWinner = (
  seed: number,
  normalizeItemsList: INormalizedItem[]
): INormalizedItem => {
  const sorted = normalizeItemsList.sort((el1, el2) => {
    if (el1.percentage > el2.percentage) return 1;
    return -1;
  });
  let res: INormalizedItem = sorted[sorted.length - 1];
  let accumulate = 0;
  for (let i = 0; i < sorted.length; i++) {
    if (sorted[i].percentage / 100 + accumulate > seed) {
      res = sorted[i];
      break;
    }
    accumulate += sorted[i].percentage / 100;
  }

  return res;
};
