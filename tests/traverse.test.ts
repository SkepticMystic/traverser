import { assertEquals } from "https://deno.land/std@0.217.0/assert/mod.ts";
import { assertThrows } from "https://deno.land/std@0.217.0/assert/assert_throws.ts";
import {
  TraverseInput,
  name_traversal,
  traverse,
} from "../src/lib/traverse.ts";

Deno.test("happy", async (t) => {
  let input: TraverseInput;

  input = { n: 3, skips: [1] };
  await t.step(name_traversal(input), () => {
    assertEquals(traverse(input).path, [0, 1, 2]);
  });

  input = { n: 3, skips: [2] };
  await t.step(name_traversal(input), () => {
    assertEquals(traverse(input).path, [0, 2, 1]);
  });

  input = { n: 4, skips: [2] };
  await t.step(name_traversal(input), () => {
    assertEquals(traverse(input).path, [0, 2]);
  });
});

Deno.test("error", async (t) => {
  await t.step("n < 1", () => {
    assertThrows(() => traverse({ n: 0, skips: [1] }));
  });

  await t.step("skips.length === 0", () => {
    assertThrows(() => traverse({ n: 3, skips: [] }));
  });

  await t.step("skips.every(s => s === 0)", () => {
    assertThrows(() => traverse({ n: 3, skips: [0, 0, 0] }));
  });
});
