import { beforeEach, describe, expect, it, vi } from "vitest";
import { createStyleBuilder } from "./createStyleBuilder";
import { renderHook } from "@testing-library/react-hooks";
import { DefaultTheme } from "./theme";

let colorScheme = "light";
vi.mock("react-native", () => ({
  Appearance: {
    getColorScheme: () => colorScheme,
    addChangeListener: () => ({
      remove: () => {
        /* ... */
      },
    }),
  },
  StyleSheet: {
    hairlineWidth: 0.5,
  },
}));

describe("Dark mode support", () => {
  beforeEach(() => {
    colorScheme = "light";
  });

  it("returns only base styles in light mode", () => {
    colorScheme = "light";
    const { useStyles } = createStyleBuilder();
    const { result } = renderHook(() => {
      return useStyles({
        classes: ["p:0"],
        darkClasses: ["m:3"],
      });
    });

    expect(result.current).toEqual({ padding: 0 });
  });

  it("returns base+dark styles in dark mode", () => {
    colorScheme = "dark";
    const { useStyles } = createStyleBuilder();
    const { result } = renderHook(() => {
      return useStyles({
        classes: ["p:0"],
        darkClasses: ["p:3", "m:3"],
      });
    });

    expect(result.current).toEqual({
      padding: DefaultTheme.spacing["3"],
      margin: DefaultTheme.spacing["3"],
    });
  });

  it("allows StyleProvider to override system default (dark system, light override)", () => {
    colorScheme = "dark";
    const { useStyles } = createStyleBuilder({ colorScheme: "light" });
    const { result } = renderHook(() => {
      return useStyles({
        classes: ["p:0"],
        darkClasses: ["p:3", "m:3"],
      });
    });

    expect(result.current).toEqual({ padding: 0 });
  });

  it("allows StyleProvider to override system default (light system, dark override)", () => {
    colorScheme = "light";
    const { useStyles } = createStyleBuilder({ colorScheme: "dark" });
    const { result } = renderHook(() => {
      return useStyles({
        classes: ["p:0"],
        darkClasses: ["m:3"],
      });
    });

    expect(result.current).toEqual({
      padding: 0,
      margin: DefaultTheme.spacing["3"],
    });
  });
});
