import { applyOpacityToColor } from "./applyOpacityToColor";
import { describe, expect, it } from "vitest";

describe("applyOpacityToColor", () => {
  const cases: [string, number, string][] = [
    // RGB
    ["rgb(255, 0, 0)", 1, "rgba(255,0,0,1)"],
    ["rgb(255, 0, 0)", 0.5, "rgba(255,0,0,0.5)"],
    ["rgb(255, 0, 0)", 0, "rgba(255,0,0,0)"],
    // RGBA
    ["rgb(255, 0, 0, 0.3)", 1, "rgba(255,0,0,0.3)"],
    ["rgb(255, 0, 0, 0.3)", 0.5, "rgba(255,0,0,0.15)"],
    ["rgb(255, 0, 0, 0.3)", 0, "rgba(255,0,0,0)"],
  ];

  it.each(cases)(
    "applyOpacityToColor(%s, %s) = %s",
    (color, opacity, expectedOutput) => {
      expect(applyOpacityToColor(color, opacity)).toEqual(expectedOutput);
    }
  );
});
