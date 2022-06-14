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
  ];

  it.each(cases)("builder(%s) equals %s", (className, expectedOutput) => {
    expect(styles(className)).toEqual(expectedOutput);
  });
});
