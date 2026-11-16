import { strict as assert } from "node:assert";
import test from "node:test";

import { UI_COLORS } from "@/lib/constants";
import { getStringColor } from "@/lib/helpers";

test("getStringColor returns a valid color for a given string", () => {
  const color = getStringColor("OpenAI");

  assert.ok(UI_COLORS.includes(color));
  assert.equal(typeof color, "string");
});

test("getStringColor is stable for equivalent inputs regardless of spacing or casing", () => {
  const first = getStringColor("  JOB TRACKER  ");
  const second = getStringColor("job tracker");

  assert.equal(first, second);
});
