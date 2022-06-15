import { vi, describe, it, expect } from "vitest";
import { createStyleBuddy } from "../createStyleBuddy";

vi.mock("react-native", () => ({
  StyleSheet: {
    hairlineWidth: 0.5,
  },
}));

const { styles } = createStyleBuddy({});

describe("defaultFlexHandlers", () => {
  const cases: [Parameters<typeof styles>[0], object][] = [
    // justify:
    ["justify:start", { justifyContent: "flex-start" }],
    ["justify:end", { justifyContent: "flex-end" }],
    ["justify:center", { justifyContent: "center" }],
    ["justify:between", { justifyContent: "space-between" }],
    ["justify:around", { justifyContent: "space-around" }],
    ["justify:evenly", { justifyContent: "space-evenly" }],

    // items:
    ["items:start", { alignItems: "flex-start" }],
    ["items:end", { alignItems: "flex-end" }],
    ["items:center", { alignItems: "center" }],
    ["items:baseline", { alignItems: "baseline" }],
    ["items:stretch", { alignItems: "stretch" }],

    // flex helpers
    ["flex:1", { flexGrow: 1, flexShrink: 1, flexBasis: "0%" }],
    ["flex:auto", { flexGrow: 1, flexShrink: 1, flexBasis: "auto" }],
    ["flex:initial", { flexGrow: 0, flexShrink: 1, flexBasis: "auto" }],
    ["flex:none", { flexGrow: 0, flexShrink: 0, flexBasis: "auto" }],
    ["flex:row", { flexDirection: "row" }],
    ["flex:row-reverse", { flexDirection: "row-reverse" }],
    ["flex:col", { flexDirection: "column" }],
    ["flex:col-reverse", { flexDirection: "column-reverse" }],
    ["flex:grow", { flexGrow: 1 }],
    ["flex:grow-0", { flexGrow: 0 }],
    ["flex:shrink", { flexShrink: 1 }],
    ["flex:shrink-0", { flexShrink: 0 }],
    ["flex:wrap", { flexWrap: "wrap" }],
    ["flex:wrap-reverse", { flexWrap: "wrap-reverse" }],
    ["flex:nowrap", { flexWrap: "nowrap" }],
  ];

  it.each(cases)("styles(%s) equals %s", (cn, expectedOutput) => {
    expect(styles(cn)).toEqual(expectedOutput);
  });
});
