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
const C = DefaultConstraints.borderRadii;

describe("createBorderHandlers", () => {
  const cases: [Parameters<typeof styles>[0], object][] = [
    // rounded:
    ["rounded:lg", { borderRadius: C["lg"] }],
    ["rounded:[17]", { borderRadius: 17 }],
    // rounded-t:
    [
      "rounded-t:lg",
      { borderTopLeftRadius: C["lg"], borderTopRightRadius: C["lg"] },
    ],
    ["rounded-t:[17]", { borderTopLeftRadius: 17, borderTopRightRadius: 17 }],
    // rounded-b:
    [
      "rounded-b:lg",
      { borderBottomLeftRadius: C["lg"], borderBottomRightRadius: C["lg"] },
    ],
    [
      "rounded-b:[17]",
      { borderBottomLeftRadius: 17, borderBottomRightRadius: 17 },
    ],
    // rounded-l:
    [
      "rounded-l:lg",
      { borderBottomLeftRadius: C["lg"], borderTopLeftRadius: C["lg"] },
    ],
    ["rounded-l:[17]", { borderBottomLeftRadius: 17, borderTopLeftRadius: 17 }],
    // rounded-r:
    [
      "rounded-r:lg",
      { borderBottomRightRadius: C["lg"], borderTopRightRadius: C["lg"] },
    ],
    [
      "rounded-r:[17]",
      { borderBottomRightRadius: 17, borderTopRightRadius: 17 },
    ],
  ];

  it.each(cases)("styles(%s) equals %s", (cn, expectedOutput) => {
    expect(styles(cn)).toEqual(expectedOutput);
  });

  it("allows for custom constraints", () => {
    const { styles } = createStyleBuilder({
      theme: {
        borderRadii: { foo: 6, bar: 9 },
      },
    });

    expect(styles("rounded:foo")).toEqual({ borderRadius: 6 });
    expect(styles("rounded:bar")).toEqual({ borderRadius: 9 });
    // @ts-expect-error
    expect(styles("rounded:baz")).toEqual({});
  });
});
