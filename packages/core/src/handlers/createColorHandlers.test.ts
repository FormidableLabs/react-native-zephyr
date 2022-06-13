import { vi, describe, expect, it } from "vitest";
import { DEFAULT_CONSTRAINTS, defaultHandlers } from "./defaultHandlers";
import { createStyleBuilder } from "../createStyleBuilder";
import { createColorHandlers } from "./createColorHandlers";

vi.mock("react-native", () => ({
  StyleSheet: {
    hairlineWidth: 0.5,
  },
}));

const { styled: sb } = createStyleBuilder({
  handlers: defaultHandlers,
});
const C = DEFAULT_CONSTRAINTS.COLORS;

describe("createColorHandlers", () => {
  const cases: [string, object, object][] = [
    // bg:
    ["bg:red-300", sb("bg:red-300"), { backgroundColor: C["red-300"] }],
    ["bg:black", sb("bg:black"), { backgroundColor: C["black"] }],
    ["bg:[pink]", sb("bg:[pink]"), { backgroundColor: "pink" }],
    // border-color:
    [
      "border-color:red-300",
      sb("border-color:red-300"),
      { borderColor: C["red-300"] },
    ],
    [
      "border-color:black",
      sb("border-color:black"),
      { borderColor: C["black"] },
    ],
    ["border-color:[pink]", sb("border-color:[pink]"), { borderColor: "pink" }],
    // color:
    ["color:red-300", sb("color:red-300"), { color: C["red-300"] }],
    ["color:black", sb("color:black"), { color: C["black"] }],
    ["color:[pink]", sb("color:[pink]"), { color: "pink" }],
  ];

  it.each(cases)(
    "builder(...%s)=%s equals %s",
    (_, actualOutput, expectedOutput) => {
      expect(actualOutput).toEqual(expectedOutput);
    }
  );

  it("allows custom constraints", () => {
    const { styled } = createStyleBuilder({
      handlers: createColorHandlers({ black: "#000", pink: "pink" }),
    });

    expect(styled("bg:black")).toEqual({ backgroundColor: "#000" });
    expect(styled("color:pink")).toEqual({ color: "pink" });
    // @ts-expect-error
    expect(styled("color:red-300")).toEqual({});
  });
});
