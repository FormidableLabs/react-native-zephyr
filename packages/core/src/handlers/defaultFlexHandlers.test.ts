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

describe("defaultFlexHandlers", () => {
  const cases: [string, object, object][] = [
    // justify:
    ["justify:start", sb("justify:start"), { justifyContent: "flex-start" }],
    ["justify:end", sb("justify:end"), { justifyContent: "flex-end" }],
    ["justify:center", sb("justify:center"), { justifyContent: "center" }],
    [
      "justify:between",
      sb("justify:between"),
      { justifyContent: "space-between" },
    ],
    [
      "justify:around",
      sb("justify:around"),
      { justifyContent: "space-around" },
    ],
    [
      "justify:evenly",
      sb("justify:evenly"),
      { justifyContent: "space-evenly" },
    ],

    // items:
    ["items:start", sb("items:start"), { alignItems: "flex-start" }],
    ["items:end", sb("items:end"), { alignItems: "flex-end" }],
    ["items:center", sb("items:center"), { alignItems: "center" }],
    ["items:baseline", sb("items:baseline"), { alignItems: "baseline" }],
    ["items:stretch", sb("items:stretch"), { alignItems: "stretch" }],

    // flex helpers
    ["flex:1", sb("flex:1"), { flexGrow: 1, flexShrink: 1, flexBasis: "0%" }],
    [
      "flex:auto",
      sb("flex:auto"),
      { flexGrow: 1, flexShrink: 1, flexBasis: "auto" },
    ],
    [
      "flex:initial",
      sb("flex:initial"),
      { flexGrow: 0, flexShrink: 1, flexBasis: "auto" },
    ],
    [
      "flex:none",
      sb("flex:none"),
      { flexGrow: 0, flexShrink: 0, flexBasis: "auto" },
    ],
    ["flex:row", sb("flex:row"), { flexDirection: "row" }],
    [
      "flex:row-reverse",
      sb("flex:row-reverse"),
      { flexDirection: "row-reverse" },
    ],
    ["flex:col", sb("flex:col"), { flexDirection: "column" }],
    [
      "flex:col-reverse",
      sb("flex:col-reverse"),
      { flexDirection: "column-reverse" },
    ],
    ["flex:grow", sb("flex:grow"), { flexGrow: 1 }],
    ["flex:grow-0", sb("flex:grow-0"), { flexGrow: 0 }],
    ["flex:shrink", sb("flex:shrink"), { flexShrink: 1 }],
    ["flex:shrink-0", sb("flex:shrink-0"), { flexShrink: 0 }],
    ["flex:wrap", sb("flex:wrap"), { flexWrap: "wrap" }],
    [
      "flex:wrap-reverse",
      sb("flex:wrap-reverse"),
      { flexWrap: "wrap-reverse" },
    ],
    ["flex:nowrap", sb("flex:nowrap"), { flexWrap: "nowrap" }],
  ];

  it.each(cases)(
    "builder(...%s)=%s equals %s",
    (_, actualOutput, expectedOutput) => {
      expect(actualOutput).toEqual(expectedOutput);
    }
  );
});
