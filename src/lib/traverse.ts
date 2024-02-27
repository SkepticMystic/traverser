import { MAX_ITERATIONS } from "./const/index.ts";

export type TraverseInput = {
  n: number;
  skips: number[];
};

export const traverse = ({ n, skips }: TraverseInput) => {
  if (n < 1) {
    throw new Error("n must be a positive integer");
  } else if (skips.length === 0) {
    throw new Error("skips can't be empty");
  }

  let iter = 0,
    skip_i = 0,
    point = 0;

  const path: number[] = [];

  // Continue until getting back to the start, using the same skip
  while (point !== 0 || skip_i !== 0 || path.length === 0) {
    if (iter++ > MAX_ITERATIONS) {
      throw new Error("Infinite loop detected");
    }

    path.push(point);

    point = (point + skips[skip_i]) % n;
    skip_i = (skip_i + 1) % skips.length;
  }

  return { n, skips, path };
};

export type Traversal = ReturnType<typeof traverse>;

export const name_traversal = ({ n, skips }: TraverseInput) =>
  `${n}_${skips.map((s) => s % n).join("-")}`;
