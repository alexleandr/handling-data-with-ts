export interface CountList {
  [key: string]: number;
}

export default function countBy(arr: (string | number)[]) {
  return arr.reduce((acc: CountList, cur) => {
    if (acc[cur]) {
      acc[cur] += 1;
    } else {
      acc[cur] = 1;
    }
    return acc;
  }, {});
}
