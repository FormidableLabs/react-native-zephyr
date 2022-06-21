import { vi, describe, it, expect } from "vitest";
import { createStyleBuilder } from "../createStyleBuilder";
import { DefaultConstraints } from "../theme";

vi.mock("react-native", () => ({
  StyleSheet: {
    hairlineWidth: 0.5,
  },
}));

const { styles } = createStyleBuilder();
const FW = DefaultConstraints.fontWeights;
const FS = DefaultConstraints.fontSizes;
const LS = DefaultConstraints.letterSpacing;

describe("createTypographyHelpers", () => {
  const cases: [Parameters<typeof styles>[0], object][] = [
    ["italic", { fontStyle: "italic" }],
    ["uppercase", { textTransform: "uppercase" }],
    ["lowercase", { textTransform: "lowercase" }],
    ["capitalize", { textTransform: "capitalize" }],
    ["underline", { textDecorationLine: "underline" }],
    ["line-through", { textDecorationLine: "line-through" }],
    [
      "underline-line-through",
      { textDecorationLine: "underline line-through" },
    ],
    ["text-align:auto", { textAlign: "auto" }],
    ["text-align:center", { textAlign: "center" }],
    ["text-align:left", { textAlign: "left" }],
    ["text-align:right", { textAlign: "right" }],
    ["text:sm", { fontSize: FS.sm[0], lineHeight: FS.sm[1] }],
    ["text:xl", { fontSize: FS.xl[0], lineHeight: FS.xl[1] }],
    ["font-weight:bold", { fontWeight: FW.bold }],
    ["font-weight:black", { fontWeight: FW.black }],
    ["font-weight:semibold", { fontWeight: FW.semibold }],
    ["tracking:tight", { letterSpacing: LS.tight }],
    ["tracking:normal", { letterSpacing: LS.normal }],
    ["tracking:widest", { letterSpacing: LS.widest }],
  ];

  it.each(cases)("builder(%s) equals %s", (className, expectedOutput) => {
    expect(styles(className)).toEqual(expectedOutput);
  });

  it("allows for custom constraints", () => {
    const { styles } = createStyleBuilder({
      overrideTheme: {
        fontSizes: { foo: [8, 10] },
        fontWeights: { bar: "bold" },
      },
    });

    expect(styles("text:foo")).toEqual({ fontSize: 8, lineHeight: 10 });
    // @ts-expect-error
    expect(styles("text:sm")).toEqual({});

    expect(styles("font-weight:bar")).toEqual({ fontWeight: "bold" });
    // @ts-expect-error
    expect(styles("font-weight:bold")).toEqual({});
  });

  it("allows extending constraints", () => {
    const { styles } = createStyleBuilder({
      extendTheme: {
        fontSizes: { foo: [8, 10] },
        fontWeights: { bar: "bold" },
      },
    });

    expect(styles("text:sm")).toEqual({
      fontSize: FS.sm[0],
      lineHeight: FS.sm[1],
    });
    expect(styles("text:foo")).toEqual({ fontSize: 8, lineHeight: 10 });

    expect(styles("font-weight:bold")).toEqual({ fontWeight: "700" });
    expect(styles("font-weight:bar")).toEqual({ fontWeight: "bold" });
  });
});
