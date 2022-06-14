import { describe, it, expect, vi } from "vitest";
import { createStyleBuilder } from "../createStyleBuilder";
import { createAspectRatioHandlers } from "./createAspectRatioHandlers";

vi.mock("react-native", () => ({
  StyleSheet: {
    hairlineWidth: 0.5,
  },
}));

describe("createAspectRatioHandlers", () => {
  const { styles } = createStyleBuilder({});

  const cases: [string, object, object][] = [
    ["aspect:1", styles("aspect:1"), { aspectRatio: 1 }],
    ["aspect:2-1", styles("aspect:2-1"), { aspectRatio: 2 }],
    ["aspect:1-2", styles("aspect:1-2"), { aspectRatio: 1 / 2 }],
    ["aspect:[1.3]", styles("aspect:[1.3]"), { aspectRatio: 1.3 }],
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
        aspectRatios: { foo: [1, 1], bar: [3, 7] },
      },
    });

    expect(styles("aspect:foo")).toEqual({ aspectRatio: 1 });
    expect(styles("aspect:bar")).toEqual({ aspectRatio: 3 / 7 });
  });
});
