import { vi, describe, it, expect } from "vitest";
import { createStyleBuilder } from "../createStyleBuilder";

vi.mock("react-native", () => ({
  StyleSheet: {
    hairlineWidth: 0.5,
  },
}));

describe("imageHandlers", () => {
  const { styles } = createStyleBuilder();

  it("sets resizeMode", () => {
    expect(styles("resize:center")).toEqual({ resizeMode: "center" });
    expect(styles("resize:cover")).toEqual({ resizeMode: "cover" });
    expect(styles("resize:contain")).toEqual({ resizeMode: "contain" });
  });
});
