import { vi, describe, it, expect } from "vitest";
import { createStyleBuilder } from "../createStyleBuilder";
import { createBorderHandlers } from "./createBorderHandlers";
import { DefaultConstraints } from "../theme";

vi.mock("react-native", () => ({
  StyleSheet: {
    hairlineWidth: 0.5,
  },
}));

const { styles } = createStyleBuilder({});
const C = DefaultConstraints.borderSizes;

describe("createBorderHandlers", () => {
  const cases: [string, object, object][] = [
    // border:
    ["border:hairline", styles("border:hairline"), { borderWidth: 0.5 }],
    ["border:2", styles("border:2"), { borderWidth: C["2"] }],
    ["border:[17]", styles("border:[17]"), { borderWidth: 17 }],
    // border-l:
    [
      "border-l:hairline",
      styles("border-l:hairline"),
      { borderLeftWidth: 0.5 },
    ],
    ["border-l:2", styles("border-l:2"), { borderLeftWidth: C["2"] }],
    ["border-l:[17]", styles("border-l:[17]"), { borderLeftWidth: 17 }],
    // border-r:
    [
      "border-r:hairline",
      styles("border-r:hairline"),
      { borderRightWidth: 0.5 },
    ],
    ["border-r:2", styles("border-r:2"), { borderRightWidth: C["2"] }],
    ["border-r:[17]", styles("border-r:[17]"), { borderRightWidth: 17 }],
    // border-t:
    ["border-t:hairline", styles("border-t:hairline"), { borderTopWidth: 0.5 }],
    ["border-t:2", styles("border-t:2"), { borderTopWidth: C["2"] }],
    ["border-t:[17]", styles("border-t:[17]"), { borderTopWidth: 17 }],
    // border-b:
    [
      "border-b:hairline",
      styles("border-b:hairline"),
      { borderBottomWidth: 0.5 },
    ],
    ["border-b:2", styles("border-b:2"), { borderBottomWidth: C["2"] }],
    ["border-b:[17]", styles("border-b:[17]"), { borderBottomWidth: 17 }],
  ];

  it.each(cases)(
    "builder(...%s)=%s equals %s",
    (_, actualOutput, expectedOutput) => {
      expect(actualOutput).toEqual(expectedOutput);
    }
  );

  it("allows for custom constraints", () => {
    const { styles } = createStyleBuilder({
      theme: {
        borderSizes: { foo: 6, bar: 9 },
      },
    });

    expect(styles("border:foo")).toEqual({ borderWidth: 6 });
    expect(styles("border:bar")).toEqual({ borderWidth: 9 });
    // @ts-expect-error
    expect(styles("border:baz")).toEqual({});
  });
});
