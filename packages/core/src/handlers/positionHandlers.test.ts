import { vi, describe, it, expect } from "vitest";
import { createStyleBuilder } from "../createStyleBuilder";

vi.mock("react-native", () => ({
  StyleSheet: {
    hairlineWidth: 0.5,
  },
}));

const { styles } = createStyleBuilder({});

describe("defaultPositionHandlers", () => {
  const cases: [Parameters<typeof styles>[0], object][] = [
    ["relative", { position: "relative" }],
    ["absolute", { position: "absolute" }],
    ["hidden", { display: "none" }],
    ["visible", { display: "flex" }],
    ["overflow:visible", { overflow: "visible" }],
    ["overflow:hidden", { overflow: "hidden" }],
    ["overflow:scroll", { overflow: "scroll" }],
    ["z:0", { zIndex: 0 }],
  ];

  it.each(cases)("styles(%s) equals %s", (cn, expectedOutput) => {
    expect(styles(cn)).toEqual(expectedOutput);
  });
});
