import { vi, describe, it, expect } from "vitest";
import { createStyleBuilder } from "../createStyleBuilder";
import { DEFAULT_CONSTRAINTS, defaultHandlers } from "./defaultHandlers";
import { createBorderHandlers } from "./createBorderHandlers";

vi.mock("react-native", () => ({
  StyleSheet: {
    hairlineWidth: 0.5,
  },
}));

const { styled: sb } = createStyleBuilder({
  handlers: defaultHandlers,
});
const C = DEFAULT_CONSTRAINTS.BORDER_SIZES;

describe("createBorderHandlers", () => {
  const cases: [string, object, object][] = [
    // border:
    ["border:hairline", sb("border:hairline"), { borderWidth: 0.5 }],
    ["border:2", sb("border:2"), { borderWidth: C["2"] }],
    ["border:[17]", sb("border:[17]"), { borderWidth: 17 }],
    // border-l:
    ["border-l:hairline", sb("border-l:hairline"), { borderLeftWidth: 0.5 }],
    ["border-l:2", sb("border-l:2"), { borderLeftWidth: C["2"] }],
    ["border-l:[17]", sb("border-l:[17]"), { borderLeftWidth: 17 }],
    // border-r:
    ["border-r:hairline", sb("border-r:hairline"), { borderRightWidth: 0.5 }],
    ["border-r:2", sb("border-r:2"), { borderRightWidth: C["2"] }],
    ["border-r:[17]", sb("border-r:[17]"), { borderRightWidth: 17 }],
    // border-t:
    ["border-t:hairline", sb("border-t:hairline"), { borderTopWidth: 0.5 }],
    ["border-t:2", sb("border-t:2"), { borderTopWidth: C["2"] }],
    ["border-t:[17]", sb("border-t:[17]"), { borderTopWidth: 17 }],
    // border-b:
    ["border-b:hairline", sb("border-b:hairline"), { borderBottomWidth: 0.5 }],
    ["border-b:2", sb("border-b:2"), { borderBottomWidth: C["2"] }],
    ["border-b:[17]", sb("border-b:[17]"), { borderBottomWidth: 17 }],
  ];

  it.each(cases)(
    "builder(...%s)=%s equals %s",
    (_, actualOutput, expectedOutput) => {
      expect(actualOutput).toEqual(expectedOutput);
    }
  );

  it("allows for custom constraints", () => {
    const { styled } = createStyleBuilder({
      handlers: createBorderHandlers({ foo: 6, bar: 9 }),
    });

    expect(styled("border:foo")).toEqual({ borderWidth: 6 });
    expect(styled("border:bar")).toEqual({ borderWidth: 9 });
    // @ts-expect-error
    expect(styled("border:baz")).toEqual({});
  });
});
