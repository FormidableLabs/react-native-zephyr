import { vi, describe, expect, it } from "vitest";
import { DEFAULT_CONSTRAINTS, defaultHandlers } from "./defaultHandlers";
import { createStyleBuilder } from "../createStyleBuilder";
import { createColorHandlers } from "./createColorHandlers";

vi.mock("react-native", () => ({
  StyleSheet: {
    hairlineWidth: 0.5,
  },
}));

const { styles } = createStyleBuilder({});
const C = DEFAULT_CONSTRAINTS.COLORS;

describe("createColorHandlers", () => {
  const cases: [string, object, object][] = [
    // bg:
    ["bg:red-300", styles("bg:red-300"), { backgroundColor: C["red-300"] }],
    ["bg:black", styles("bg:black"), { backgroundColor: C["black"] }],
    ["bg:[pink]", styles("bg:[pink]"), { backgroundColor: "pink" }],
    // border-color:
    [
      "border-color:red-300",
      styles("border-color:red-300"),
      { borderColor: C["red-300"] },
    ],
    [
      "border-color:black",
      styles("border-color:black"),
      { borderColor: C["black"] },
    ],
    [
      "border-color:[pink]",
      styles("border-color:[pink]"),
      { borderColor: "pink" },
    ],
    // color:
    ["color:red-300", styles("color:red-300"), { color: C["red-300"] }],
    ["color:black", styles("color:black"), { color: C["black"] }],
    ["color:[pink]", styles("color:[pink]"), { color: "pink" }],
  ];

  it.each(cases)(
    "builder(...%s)=%s equals %s",
    (_, actualOutput, expectedOutput) => {
      expect(actualOutput).toEqual(expectedOutput);
    }
  );

  it("allows custom constraints", () => {
    const { styles } = createStyleBuilder({
      theme: {
        colors: { black: "#000", pink: "pink" },
      },
    });

    expect(styles("bg:black")).toEqual({ backgroundColor: "#000" });
    expect(styles("color:pink")).toEqual({ color: "pink" });
    // @ts-expect-error
    expect(styles("color:red-300")).toEqual({});
  });
});
