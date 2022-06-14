import { vi, describe, it, expect } from "vitest";
import { createStyleBuilder } from "../createStyleBuilder";

vi.mock("react-native", () => ({
  StyleSheet: {
    hairlineWidth: 0.5,
  },
}));

const { styles } = createStyleBuilder({});

describe("defaultPositionHandlers", () => {
  const cases: [string, object, object][] = [
    ["relative", styles("relative"), { position: "relative" }],
    ["absolute", styles("absolute"), { position: "absolute" }],
    ["hidden", styles("hidden"), { display: "none" }],
    ["visible", styles("visible"), { display: "flex" }],
    ["overflow:visible", styles("overflow:visible"), { overflow: "visible" }],
    ["overflow:hidden", styles("overflow:hidden"), { overflow: "hidden" }],
    ["overflow:scroll", styles("overflow:scroll"), { overflow: "scroll" }],
    ["z:0", styles("z:0"), { zIndex: 0 }],
  ];

  it.each(cases)(
    "builder(...%s)=%s equals %s",
    (_, actualOutput, expectedOutput) => {
      expect(actualOutput).toEqual(expectedOutput);
    }
  );
});
