import { describe, expect, it } from "vitest";
import { createStyleBuilder } from "../createStyleBuilder";
import { DefaultTheme } from "../theme";

const { styles } = createStyleBuilder({
  extendTheme: {
    colors: {
      rgb: "rgb(10, 20, 30)",
      rgba: "rgb(10, 20, 30, 0.3)",
      hsl: "hsl(200, 50%, 50%)",
      hsla: "hsl(200, 50%, 50%, 0.3)",
      hrgb: "#f0f",
      hrgba: "#f0f2",
      hrrggbb: "#ff00ff",
      hrrggbbaa: "#ff00ff22",
    },
  },
});
const C = DefaultTheme.opacities;

describe("createOpacityHandlers", () => {
  const cases: [Parameters<typeof styles>[0][], object][] = [
    // opacity:
    [["opacity:50"], { opacity: C["50"] }],
    [["opacity:0"], { opacity: C["0"] }],
    [["opacity:[.33]"], { opacity: 0.33 }],
    // bg-opacity:
    [["bg:red-100", "bg-opacity:50"], { backgroundColor: "#fee2e280" }],
    [["bg:rgb", "bg-opacity:50"], { backgroundColor: "rgba(10,20,30,0.5)" }],
    [["bg:rgba", "bg-opacity:50"], { backgroundColor: "rgba(10,20,30,0.15)" }],
    [["bg:hsl", "bg-opacity:50"], { backgroundColor: "hsla(200,50%,50%,0.5)" }],
    [
      ["bg:hsla", "bg-opacity:50"],
      { backgroundColor: "hsla(200,50%,50%,0.15)" },
    ],
    [["bg:hrgb", "bg-opacity:50"], { backgroundColor: "#ff00ff80" }],
    [["bg:hrgba", "bg-opacity:50"], { backgroundColor: "#ff00ff11" }],
    [["bg:hrrggbb", "bg-opacity:50"], { backgroundColor: "#ff00ff80" }],
    [["bg:hrrggbbaa", "bg-opacity:50"], { backgroundColor: "#ff00ff11" }],
  ];

  it.each(cases)("styles(...%s) equals %s", (cns, expectedOutput) => {
    expect(styles(...cns)).toEqual(expectedOutput);
  });

  it("allows custom constraints", () => {
    const { styles } = createStyleBuilder({
      overrideTheme: {
        opacities: { half: 0.5, notmuch: 0.05 },
      },
    });

    expect(styles("opacity:notmuch")).toEqual({ opacity: 0.05 });
    expect(styles("bg:red-300", "bg-opacity:half")).toEqual({
      backgroundColor: "#fca5a580",
    });
    // @ts-expect-error
    expect(styles("opacity:50")).toEqual({});
  });

  it("allows extending constraints", () => {
    const { styles } = createStyleBuilder({
      extendTheme: { opacities: { half: 0.5 } },
    });

    expect(styles("opacity:10")).toEqual({ opacity: 0.1 });
    expect(styles("opacity:half")).toEqual({ opacity: 0.5 });
  });
});
