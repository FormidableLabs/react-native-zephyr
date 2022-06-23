import { describe, expect, it } from "vitest";
import { colorStringToRgb } from "./colorStringToRgb";

describe("colorStringToRgb", () => {
  it.each([
    ["rgb(0,0,0)", [0, 0, 0]],
    ["rgb(100, 50, 232)", [100, 50, 232]],
    ["rgb(100,50,232)", [100, 50, 232]],
    ["rgb(32, 255, 255)", [32, 255, 255]],
    ["#000", [0, 0, 0]],
    ["#000000", [0, 0, 0]],
    ["#fff", [255, 255, 255]],
    ["#ffffff", [255, 255, 255]],
    ["#f00", [255, 0, 0]],
    ["#ff0000", [255, 0, 0]],
    ["#0f0", [0, 255, 0]],
    ["#00ff00", [0, 255, 0]],
    ["#00f", [0, 0, 255]],
    ["#0000ff", [0, 0, 255]],
    ["#3c5e2d", [60, 94, 45]],
    ["#964ae3", [150, 74, 227]],
    ["#e2ae92", [226, 174, 146]],
  ])("Converts %s to rgb(%p)", (str, [r, g, b]) => {
    expect(colorStringToRgb(str)).toEqual({ r, g, b });
  });
});
