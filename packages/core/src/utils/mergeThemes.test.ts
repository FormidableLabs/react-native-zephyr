import { describe, expect, it, vi } from "vitest";
import { mergeThemes } from "./mergeThemes";
import { DefaultConstraints } from "../theme";

vi.mock("react-native", () => ({
  StyleSheet: {
    hairlineWidth: 0.5,
  },
}));

describe("mergeThemes", () => {
  it("replaces default constraints with new ones, only if provided", () => {
    const newTheme = mergeThemes({ theme: { spacing: { sm: 4 } } });
    expect(newTheme.spacing).toEqual({ sm: 4 });
    expect(newTheme.shadows).toEqual(DefaultConstraints.shadows);
  });

  it("allows for constraints to be extended", () => {
    const newTheme = mergeThemes({ extendTheme: { spacing: { sm: 4 } } });
    expect(newTheme.spacing).toEqual({ ...DefaultConstraints.spacing, sm: 4 });
  });

  it("allows for constraints to be overwritten _and_ extended", () => {
    const newTheme = mergeThemes({
      theme: { spacing: { sm: 4 } },
      extendTheme: { spacing: { md: 8 } },
    });
    expect(newTheme.spacing).toEqual({ sm: 4, md: 8 });
  });
});
