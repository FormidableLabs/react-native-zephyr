import { vi, describe, it, expect } from "vitest";
import { createStyleBuilder } from "./createStyleBuilder";

vi.mock("react-native", () => ({
  StyleSheet: {
    hairlineWidth: 0.5,
  },
}));

describe("createStyleBuilder", () => {
  // it("creates simple builder", () => {
  //   const { styles } = createStyleBuilder({
  //     handlers: {
  //       p: (x: "1" | "2" | "3") => ({ padding: 10 * +x } as FlexStyle),
  //     },
  //   });
  //
  //   expect(styled("p:1")).toEqual({ padding: 10 });
  //   // @ts-expect-error
  //   expect(styled("m:1")).toEqual({});
  // });

  // it("handles no-arg handlers", () => {
  //   const { styled } = createStyleBuilder({
  //     handlers: {
  //       capitalize: () => ({ textTransform: "capitalize" } as TextStyle),
  //     },
  //   });
  //
  //   expect(styled("capitalize")).toEqual({ textTransform: "capitalize" });
  // });

  it("maintains referential equality", () => {
    const { styles } = createStyleBuilder({});

    const s1 = styles("mx:3", "my:12");
    const s2 = styles("mx:3", "my:12");
    const s3 = styles("mx:3", "my:10");

    expect(s1).toBe(s2);
    expect(s1).not.toBe(s3);
  });
});
