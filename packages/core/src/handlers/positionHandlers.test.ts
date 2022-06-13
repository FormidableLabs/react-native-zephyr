import { vi, describe, it, expect } from "vitest";
import { defaultHandlers } from "./defaultHandlers";
import { createStyleBuilder } from "../createStyleBuilder";

vi.mock("react-native", () => ({
  StyleSheet: {
    hairlineWidth: 0.5,
  },
}));

const { styled: sb } = createStyleBuilder({
  handlers: defaultHandlers,
});

describe("defaultPositionHandlers", () => {
  const cases: [string, object, object][] = [
    ["relative", sb("relative"), { position: "relative" }],
    ["absolute", sb("absolute"), { position: "absolute" }],
    ["hidden", sb("hidden"), { display: "none" }],
    ["visible", sb("visible"), { display: "flex" }],
    ["overflow:visible", sb("overflow:visible"), { overflow: "visible" }],
    ["overflow:hidden", sb("overflow:hidden"), { overflow: "hidden" }],
    ["overflow:scroll", sb("overflow:scroll"), { overflow: "scroll" }],
    ["z:0", sb("z:0"), { zIndex: 0 }],
  ];

  it.each(cases)(
    "builder(...%s)=%s equals %s",
    (_, actualOutput, expectedOutput) => {
      expect(actualOutput).toEqual(expectedOutput);
    }
  );
});
