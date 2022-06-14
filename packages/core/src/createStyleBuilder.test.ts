import { vi, describe, it, expect } from "vitest";
import { createStyleBuilder } from "./createStyleBuilder";
import { DefaultConstraints } from "./theme";

vi.mock("react-native", () => ({
  StyleSheet: {
    hairlineWidth: 0.5,
  },
}));

describe("createStyleBuilder", () => {
  it("creates builder with default constraints/handlers", () => {
    const { styles } = createStyleBuilder();
    expect(styles("p:1")).toEqual({ padding: DefaultConstraints.spacing["1"] });
    // @ts-expect-error
    expect(styles("nope?")).toEqual({});
  });

  it("maintains referential equality", () => {
    const { styles } = createStyleBuilder({});

    const s1 = styles("mx:3", "my:12");
    const s2 = styles("mx:3", "my:12");
    const s3 = styles("mx:3", "my:10");

    expect(s1).toBe(s2);
    expect(s1).not.toBe(s3);
  });

  it("allows overriding theme values", () => {
    const { styles } = createStyleBuilder({
      theme: {
        spacing: { sm: 4, md: 8 },
      },
    });

    expect(styles("p:sm")).toEqual({ padding: 4 });
    expect(styles("p:md")).toEqual({ padding: 8 });
    // @ts-expect-error
    expect(styles("p:0")).toEqual({});
  });

  it("allows extending theme values", () => {
    const { styles } = createStyleBuilder({
      extendTheme: {
        spacing: { sm: 4, md: 8 },
      },
    });

    expect(styles("p:sm")).toEqual({ padding: 4 });
    expect(styles("p:md")).toEqual({ padding: 8 });
    expect(styles("p:1")).toEqual({ padding: DefaultConstraints.spacing["1"] });
  });

  it("allows for extra handlers", () => {
    const { styles } = createStyleBuilder({
      extraHandlers: {
        foo: () => ({ color: "brown" }),
      },
    });

    expect(styles("foo")).toEqual({ color: "brown" });
  });
});
