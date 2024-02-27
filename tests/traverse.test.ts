import { assertEquals } from "https://deno.land/std@0.217.0/assert/mod.ts";
import { assertThrows } from "https://deno.land/std@0.217.0/assert/assert_throws.ts";
import { traverse } from "../src/lib/traverse.ts";

Deno.test("happy", async (t) => {
  await t.step("c(3, 1)", () => {
    assertEquals(traverse(3, 1).path, [0, 1, 2]);
  });

  await t.step("c(3, 2)", () => {
    assertEquals(traverse(3, 2).path, [0, 2, 1]);
  });

  await t.step("c(4, 2)", () => {
    assertEquals(traverse(4, 2).path, [0, 2]);
  });
});

Deno.test("error", async (t) => {
  await t.step("n < 1", () => {
    assertThrows(() => traverse(0, 1));
  });

  await t.step("skip === 0", () => {
    assertThrows(() => traverse(3, 0));
  });
});
