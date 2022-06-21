import { vi, describe, expect, it } from "vitest";
import { createStyleBuilder } from "../createStyleBuilder";
import { DefaultTheme } from "../theme";

vi.mock("react-native", () => ({
  StyleSheet: {
    hairlineWidth: 0.5,
  },
}));

const { styles } = createStyleBuilder({});
const C = DefaultTheme.colors;

describe("createColorHandlers", () => {
  const cases: [Parameters<typeof styles>[0], object][] = [
    // bg:
    ["bg:red-300", { backgroundColor: C["red-300"] }],
    ["bg:black", { backgroundColor: C["black"] }],
    ["bg:[pink]", { backgroundColor: "pink" }],
    // border-color:
    ["border-color:red-300", { borderColor: C["red-300"] }],
    ["border-color:black", { borderColor: C["black"] }],
    ["border-color:[pink]", { borderColor: "pink" }],
    // color:
    ["color:red-300", { color: C["red-300"] }],
    ["color:black", { color: C["black"] }],
    ["color:[pink]", { color: "pink" }],
  ];

  it.each(cases)("styles(%s) equals %s", (cn, expectedOutput) => {
    expect(styles(cn)).toEqual(expectedOutput);
  });

  it("allows custom constraints", () => {
    const { styles } = createStyleBuilder({
      overrideTheme: {
        colors: { black: "#000", pink: "pink" },
      },
    });

    expect(styles("bg:black")).toEqual({ backgroundColor: "#000" });
    expect(styles("color:pink")).toEqual({ color: "pink" });
    // @ts-expect-error
    expect(styles("color:red-300")).toEqual({});
  });

  it("allows extending constraints", () => {
    const { styles } = createStyleBuilder({
      extendTheme: { colors: { dirt: "brown" } },
    });

    expect(styles("bg:black")).toEqual({ backgroundColor: "#000" });
    expect(styles("bg:dirt")).toEqual({ backgroundColor: "brown" });
  });
});
