import { vi, describe, it, expect } from "vitest";
import { createStyleBuilder } from "../createStyleBuilder";
import { DEFAULT_CONSTRAINTS, defaultHandlers } from "./defaultHandlers";
import { createBorderHandlers } from "./createBorderHandlers";
import { createRoundedHandlers } from "./createRoundedHandlers";

let platform = "android";

vi.mock("react-native", () => ({
  StyleSheet: {
    hairlineWidth: 0.5,
  },
  Platform: {
    select: (args: { android: any; default: any }) =>
      platform === "android" ? args?.android : args?.default,
  },
}));

const { styled: sb } = createStyleBuilder({
  handlers: defaultHandlers,
});
const C = DEFAULT_CONSTRAINTS.SHADOWS;

describe("createShadowHandlers", () => {
  it("handles shadows, platform specific", () => {
    platform = "android";
    expect(sb("shadow:sm")).toEqual({
      elevation: C.sm.android,
    });

    platform = "ios";
    const [width, height, shadowRadius, shadowOpacity] = C.md.ios;
    expect(sb("shadow:md")).toEqual({
      shadowOffset: { width, height },
      shadowOpacity,
      shadowRadius,
    });
  });
});
