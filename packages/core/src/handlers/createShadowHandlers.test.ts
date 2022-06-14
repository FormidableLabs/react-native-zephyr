import { vi, describe, it, expect } from "vitest";
import { createStyleBuilder } from "../createStyleBuilder";
import { DefaultConstraints } from "../theme";

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

const { styles } = createStyleBuilder({});
const C = DefaultConstraints.shadows;

describe("createShadowHandlers", () => {
  it("handles shadows, platform specific", () => {
    platform = "android";
    expect(styles("shadow:sm")).toEqual({
      elevation: C.sm.android,
    });

    platform = "ios";
    const [width, height, shadowRadius, shadowOpacity] = C.md.ios;
    expect(styles("shadow:md")).toEqual({
      shadowOffset: { width, height },
      shadowOpacity,
      shadowRadius,
    });
  });
});
