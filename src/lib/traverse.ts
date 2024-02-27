import { MAX_ITERATIONS } from "./const/index.ts";

export const traverse = (n: number, skip: number) => {
  if (n < 1) {
    throw new Error("n must be a positive integer");
  } else if (skip === 0) {
    throw new Error("skip can't be 0");
  }

  let i = 0;
  let point = 0;
  const path: number[] = [];

  // Continue until getting back to the start
  while (point !== 0 || path.length === 0) {
    if (i++ > MAX_ITERATIONS) {
      throw new Error("Infinite loop detected");
    }

    path.push(point);
    point = (point + skip) % n;
  }

  return { n, skip, path };
};

export type Traversal = ReturnType<typeof traverse>;

export const name_traversal = ({ n, skip }: Traversal) => `${n}_${skip}`;
