import { vi, describe, it, expect } from "vitest";
import { createStyleBuddy } from "../createStyleBuddy";
import { createBorderHandlers } from "./createBorderHandlers";
import { DefaultConstraints } from "../theme";

vi.mock("react-native", () => ({
  StyleSheet: {
    hairlineWidth: 0.5,
  },
}));

const { styles } = createStyleBuddy({});
const C = DefaultConstraints.borderSizes;

describe("createBorderHandlers", () => {
  const cases: [Parameters<typeof styles>[0], object][] = [
    // border:
    ["border:0", { borderWidth: C["0"] }],
    ["border:hairline", { borderWidth: 0.5 }],
    ["border:2", { borderWidth: C["2"] }],
    ["border:[17]", { borderWidth: 17 }],
    // border-l:
    ["border-l:hairline", { borderLeftWidth: 0.5 }],
    ["border-l:2", { borderLeftWidth: C["2"] }],
    ["border-l:[17]", { borderLeftWidth: 17 }],
    // border-r:
    ["border-r:hairline", { borderRightWidth: 0.5 }],
    ["border-r:2", { borderRightWidth: C["2"] }],
    ["border-r:[17]", { borderRightWidth: 17 }],
    // border-t:
    ["border-t:hairline", { borderTopWidth: 0.5 }],
    ["border-t:2", { borderTopWidth: C["2"] }],
    ["border-t:[17]", { borderTopWidth: 17 }],
    // border-b:
    ["border-b:hairline", { borderBottomWidth: 0.5 }],
    ["border-b:2", { borderBottomWidth: C["2"] }],
    ["border-b:[17]", { borderBottomWidth: 17 }],
  ];

  it.each(cases)("styles(%s) equals %s", (cn, expectedOutput) => {
    expect(styles(cn)).toEqual(expectedOutput);
  });

  it("allows for custom constraints", () => {
    const { styles } = createStyleBuddy({
      theme: {
        borderSizes: { foo: 6, bar: 9 },
      },
    });

    expect(styles("border:foo")).toEqual({ borderWidth: 6 });
    expect(styles("border:bar")).toEqual({ borderWidth: 9 });
    // @ts-expect-error
    expect(styles("border:baz")).toEqual({});
  });

  it("allows extending constraints", () => {
    const { styles } = createStyleBuddy({
      extendTheme: { borderSizes: { foo: 6 } },
    });

    expect(styles("border:1")).toEqual({ borderWidth: C["1"] });
    expect(styles("border:foo")).toEqual({ borderWidth: 6 });
  });
});
