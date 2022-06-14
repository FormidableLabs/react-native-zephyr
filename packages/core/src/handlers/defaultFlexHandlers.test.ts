import { vi, describe, it, expect } from "vitest";
import { createStyleBuilder } from "../createStyleBuilder";

vi.mock("react-native", () => ({
  StyleSheet: {
    hairlineWidth: 0.5,
  },
}));

const { styles } = createStyleBuilder({});

describe("defaultFlexHandlers", () => {
  const cases: [string, object, object][] = [
    // justify:
    [
      "justify:start",
      styles("justify:start"),
      { justifyContent: "flex-start" },
    ],
    ["justify:end", styles("justify:end"), { justifyContent: "flex-end" }],
    ["justify:center", styles("justify:center"), { justifyContent: "center" }],
    [
      "justify:between",
      styles("justify:between"),
      { justifyContent: "space-between" },
    ],
    [
      "justify:around",
      styles("justify:around"),
      { justifyContent: "space-around" },
    ],
    [
      "justify:evenly",
      styles("justify:evenly"),
      { justifyContent: "space-evenly" },
    ],

    // items:
    ["items:start", styles("items:start"), { alignItems: "flex-start" }],
    ["items:end", styles("items:end"), { alignItems: "flex-end" }],
    ["items:center", styles("items:center"), { alignItems: "center" }],
    ["items:baseline", styles("items:baseline"), { alignItems: "baseline" }],
    ["items:stretch", styles("items:stretch"), { alignItems: "stretch" }],

    // flex helpers
    [
      "flex:1",
      styles("flex:1"),
      { flexGrow: 1, flexShrink: 1, flexBasis: "0%" },
    ],
    [
      "flex:auto",
      styles("flex:auto"),
      { flexGrow: 1, flexShrink: 1, flexBasis: "auto" },
    ],
    [
      "flex:initial",
      styles("flex:initial"),
      { flexGrow: 0, flexShrink: 1, flexBasis: "auto" },
    ],
    [
      "flex:none",
      styles("flex:none"),
      { flexGrow: 0, flexShrink: 0, flexBasis: "auto" },
    ],
    ["flex:row", styles("flex:row"), { flexDirection: "row" }],
    [
      "flex:row-reverse",
      styles("flex:row-reverse"),
      { flexDirection: "row-reverse" },
    ],
    ["flex:col", styles("flex:col"), { flexDirection: "column" }],
    [
      "flex:col-reverse",
      styles("flex:col-reverse"),
      { flexDirection: "column-reverse" },
    ],
    ["flex:grow", styles("flex:grow"), { flexGrow: 1 }],
    ["flex:grow-0", styles("flex:grow-0"), { flexGrow: 0 }],
    ["flex:shrink", styles("flex:shrink"), { flexShrink: 1 }],
    ["flex:shrink-0", styles("flex:shrink-0"), { flexShrink: 0 }],
    ["flex:wrap", styles("flex:wrap"), { flexWrap: "wrap" }],
    [
      "flex:wrap-reverse",
      styles("flex:wrap-reverse"),
      { flexWrap: "wrap-reverse" },
    ],
    ["flex:nowrap", styles("flex:nowrap"), { flexWrap: "nowrap" }],
  ];

  it.each(cases)(
    "builder(...%s)=%s equals %s",
    (_, actualOutput, expectedOutput) => {
      expect(actualOutput).toEqual(expectedOutput);
    }
  );
});
