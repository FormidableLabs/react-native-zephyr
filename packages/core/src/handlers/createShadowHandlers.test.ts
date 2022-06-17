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

  it("allows for custom constraints", () => {
    const { styles } = createStyleBuilder({
      overrideTheme: {
        shadows: {
          foo: { ios: [1, 2, 3, 4], android: 2 },
        },
      },
    });

    expect(styles("shadow:foo")).toEqual({
      shadowOffset: { width: 1, height: 2 },
      shadowRadius: 3,
      shadowOpacity: 4,
    });
    // @ts-expect-error
    expect(styles("shadow:md")).toEqual({});
  });

  it("allows extending constraints", () => {
    const { styles } = createStyleBuilder({
      extendTheme: {
        shadows: {
          foo: { ios: [1, 2, 3, 4], android: 2 },
        },
      },
    });

    const md = DefaultConstraints.shadows.md.ios;
    expect(styles("shadow:md")).toEqual({
      shadowOffset: { width: md[0], height: md[1] },
      shadowRadius: md[2],
      shadowOpacity: md[3],
    });
    expect(styles("shadow:foo")).toEqual({
      shadowOffset: { width: 1, height: 2 },
      shadowRadius: 3,
      shadowOpacity: 4,
    });
  });
});
