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
    // #rgb
    ["#f0f", 1, "#ff00ffff"],
    ["#f0f", 0.5, "#ff00ff80"],
    ["#f0f", 0, "#ff00ff00"],
    // #rgba
    ["#f0f2", 1, "#ff00ff22"],
    ["#f0f2", 0.5, "#ff00ff11"],
    ["#f0f2", 0.2, "#ff00ff07"],
    ["#f0f2", 0, "#ff00ff00"],
    // #rrggbb
    ["#ff00ff", 1, "#ff00ffff"],
    ["#ff00ff", 0.5, "#ff00ff80"],
    ["#ff00ff", 0, "#ff00ff00"],
    /// #rrggbbaa
    ["#ff00ff22", 1, "#ff00ff22"],
    ["#ff00ff22", 0.5, "#ff00ff11"],
    ["#ff00ff22", 0.2, "#ff00ff07"],
    ["#ff00ff22", 0, "#ff00ff00"],
  ];

  it.each(cases)(
    "applyOpacityToColor(%s, %s) = %s",
    (color, opacity, expectedOutput) => {
      expect(applyOpacityToColor(color, opacity)).toEqual(expectedOutput);
    }
  );
});
