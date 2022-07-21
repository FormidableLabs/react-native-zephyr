import { describe, it, expect } from "vitest";
import { createStyleBuilder } from "../createStyleBuilder";

describe("imageHandlers", () => {
  const { styles } = createStyleBuilder();
  const cases: [Parameters<typeof styles>[0], object][] = [
    ["resize:center", { resizeMode: "center" }],
    ["resize:cover", { resizeMode: "cover" }],
    ["resize:contain", { resizeMode: "contain" }],
    ["resize:stretch", { resizeMode: "stretch" }],
  ];

  it.each(cases)("styles(%s) equals %s", (cn, expectedOutput) => {
    expect(styles(cn)).toEqual(expectedOutput);
  });
});
