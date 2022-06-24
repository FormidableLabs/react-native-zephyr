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
    // HSL
    ["hsl(300, 100%, 100%)", 1, "hsla(300,100%,100%,1)"],
    ["hsl(300, 100%, 100%)", 0.3, "hsla(300,100%,100%,0.3)"],
    ["hsl(300, 100%, 100%)", 0, "hsla(300,100%,100%,0)"],
    // HSLA
    ["hsl(300, 100%, 100%, 0.3)", 1, "hsla(300,100%,100%,0.3)"],
    ["hsl(300, 100%, 100%, 0.3)", 0.5, "hsla(300,100%,100%,0.15)"],
    ["hsl(300, 100%, 100%, 0.3)", 0, "hsla(300,100%,100%,0)"],
    // TODO: Hex values
    // #rgb
    // ["#f0f", 1, "#ff00fffff"],
    // ["#f0f", 0.4, "#ff00fff"],
  ];

  it.each(cases)(
    "applyOpacityToColor(%s, %s) = %s",
    (color, opacity, expectedOutput) => {
      expect(applyOpacityToColor(color, opacity)).toEqual(expectedOutput);
    }
  );
});
