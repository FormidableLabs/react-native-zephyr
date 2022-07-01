import { describe, expect, it } from "vitest";
import { cleanMaybeNumberString } from "./cleanMaybeNumberString";

describe("cleanMaybeNumberString", () => {
  it.each([
    ["1", 1],
    ["1.3", 1.3],
    ["foo", "foo"],
    ["x1", "x1"],
    ["0.231", 0.231],
    ["-69", -69],
  ])("cleanMaybeNumberString(%s) returns %s", (str, expectedOutput) => {
    expect(cleanMaybeNumberString(str)).toEqual(expectedOutput);
  });
});
