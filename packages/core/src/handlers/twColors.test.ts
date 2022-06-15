import { describe, expect, it } from "vitest";
import { extractTwColor, twColors } from "./twColors";

describe("extractTwColor", () => {
  it("will extract a TW color as key:value object", () => {
    const blue = extractTwColor({ twColor: "blue", name: "blue" });

    for (const key in twColors.blue) {
      // @ts-expect-error don't feel like typing this.
      expect(blue[`blue-${key}`]).toEqual(twColors.blue[key]);
    }
  });

  it("will rename a TW color based on the name field", () => {
    const newBlue = extractTwColor({ twColor: "blue", name: "newBlue" });

    for (const key in twColors.blue) {
      // @ts-expect-error don't feel like typing this.
      expect(newBlue[`newBlue-${key}`]).toEqual(twColors.blue[key]);
    }
  });
});
