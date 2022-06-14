import { vi, describe, it, expect } from "vitest";
import { createStyleBuilder } from "../createStyleBuilder";
import { DefaultConstraints } from "../theme";

vi.mock("react-native", () => ({
  StyleSheet: {
    hairlineWidth: 0.5,
  },
}));

const { styles } = createStyleBuilder({});
const C = DefaultConstraints.opacities;

describe("createOpacityHandlers", () => {
  const cases: [Parameters<typeof styles>[0][], object][] = [
    // opacity:
    [["opacity:50"], { opacity: C["50"] }],
    [["opacity:0"], { opacity: C["0"] }],
    [["opacity:[.33]"], { opacity: 0.33 }],
    // bg-opacity:
    [
      ["bg:red-100", "bg-opacity:50"],
      { backgroundColor: "rgba(254, 226, 226, 0.5)" },
    ],
  ];

  it.each(cases)("styles(...%s) equals %s", (cns, expectedOutput) => {
    expect(styles(...cns)).toEqual(expectedOutput);
  });

  it("allows custom constraints", () => {
    const { styles } = createStyleBuilder({
      theme: {
        opacities: { half: 0.5, notmuch: 0.05 },
      },
    });

    expect(styles("opacity:notmuch")).toEqual({ opacity: 0.05 });
    expect(styles("bg:red-300", "bg-opacity:half")).toEqual({
      backgroundColor: "rgba(252, 165, 165, 0.5)",
    });
    // @ts-expect-error
    expect(styles("opacity:50")).toEqual({});
  });
});
