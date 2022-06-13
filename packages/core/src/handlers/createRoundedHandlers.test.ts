import { vi, describe, it, expect } from "vitest";
import { createStyleBuilder } from "../createStyleBuilder";
import { DEFAULT_CONSTRAINTS, defaultHandlers } from "./defaultHandlers";
import { createBorderHandlers } from "./createBorderHandlers";
import { createRoundedHandlers } from "./createRoundedHandlers";

vi.mock("react-native", () => ({
  StyleSheet: {
    hairlineWidth: 0.5,
  },
}));

const { styled: sb } = createStyleBuilder({
  handlers: defaultHandlers,
});
const C = DEFAULT_CONSTRAINTS.BORDER_RADII;

describe("createBorderHandlers", () => {
  const cases: [string, object, object][] = [
    // rounded:
    ["rounded:lg", sb("rounded:lg"), { borderRadius: C["lg"] }],
    ["rounded:[17]", sb("rounded:[17]"), { borderRadius: 17 }],
    // rounded-t:
    [
      "rounded-t:lg",
      sb("rounded-t:lg"),
      { borderTopLeftRadius: C["lg"], borderTopRightRadius: C["lg"] },
    ],
    [
      "rounded-t:[17]",
      sb("rounded-t:[17]"),
      { borderTopLeftRadius: 17, borderTopRightRadius: 17 },
    ],
    // rounded-b:
    [
      "rounded-b:lg",
      sb("rounded-b:lg"),
      { borderBottomLeftRadius: C["lg"], borderBottomRightRadius: C["lg"] },
    ],
    [
      "rounded-b:[17]",
      sb("rounded-b:[17]"),
      { borderBottomLeftRadius: 17, borderBottomRightRadius: 17 },
    ],
    // rounded-l:
    [
      "rounded-l:lg",
      sb("rounded-l:lg"),
      { borderBottomLeftRadius: C["lg"], borderTopLeftRadius: C["lg"] },
    ],
    [
      "rounded-l:[17]",
      sb("rounded-l:[17]"),
      { borderBottomLeftRadius: 17, borderTopLeftRadius: 17 },
    ],
    // rounded-r:
    [
      "rounded-r:lg",
      sb("rounded-r:lg"),
      { borderBottomRightRadius: C["lg"], borderTopRightRadius: C["lg"] },
    ],
    [
      "rounded-r:[17]",
      sb("rounded-r:[17]"),
      { borderBottomRightRadius: 17, borderTopRightRadius: 17 },
    ],
  ];

  it.each(cases)(
    "builder(...%s)=%s equals %s",
    (_, actualOutput, expectedOutput) => {
      expect(actualOutput).toEqual(expectedOutput);
    }
  );

  it("allows for custom constraints", () => {
    const { styled } = createStyleBuilder({
      handlers: createRoundedHandlers({ foo: 6, bar: 9 }),
    });

    expect(styled("rounded:foo")).toEqual({ borderRadius: 6 });
    expect(styled("rounded:bar")).toEqual({ borderRadius: 9 });
    // @ts-expect-error
    expect(styled("rounded:baz")).toEqual({});
  });
});
