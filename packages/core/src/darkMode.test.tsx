import * as React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { createStyleBuilder } from "./createStyleBuilder";
import { StyleProvider } from "./StyleProvider";
import { PropsWithChildren, ComponentProps } from "react";
import { renderHook } from "@testing-library/react-hooks";
import { DefaultConstraints } from "./theme";

let colorScheme = "light";
vi.mock("react-native", () => ({
  StyleSheet: {
    hairlineWidth: 0.5,
  },
  useColorScheme: () => colorScheme,
}));

const { useStyles } = createStyleBuilder();

const makeWrapper =
  (colorScheme: ComponentProps<typeof StyleProvider>["colorScheme"]) =>
  ({ children }: PropsWithChildren) => {
    return <StyleProvider colorScheme={colorScheme}>{children}</StyleProvider>;
  };

describe("Dark mode support", () => {
  beforeEach(() => {
    colorScheme = "light";
  });

  it("returns only base styles in light mode", () => {
    colorScheme = "light";
    const { result } = renderHook(
      () => {
        return useStyles({
          classes: ["p:0"],
          darkClasses: ["m:3"],
        });
      },
      { wrapper: makeWrapper("auto") }
    );

    expect(result.current).toEqual({ padding: 0 });
  });

  it("returns base+dark styles in dark mode", () => {
    colorScheme = "dark";
    const { result } = renderHook(
      () => {
        return useStyles({
          classes: ["p:0"],
          darkClasses: ["p:3", "m:3"],
        });
      },
      { wrapper: makeWrapper("auto") }
    );

    expect(result.current).toEqual({
      padding: DefaultConstraints.spacing["3"],
      margin: DefaultConstraints.spacing["3"],
    });
  });

  it("allows StyleProvider to override system default (dark system, light override)", () => {
    colorScheme = "dark";
    const { result } = renderHook(
      () => {
        return useStyles({
          classes: ["p:0"],
          darkClasses: ["p:3", "m:3"],
        });
      },
      { wrapper: makeWrapper("light") } // 👈 override system default
    );

    expect(result.current).toEqual({ padding: 0 });
  });

  it("allows StyleProvider to override system default (light system, dark override)", () => {
    colorScheme = "light";
    const { result } = renderHook(
      () => {
        return useStyles({
          classes: ["p:0"],
          darkClasses: ["m:3"],
        });
      },
      { wrapper: makeWrapper("dark") } // 👈 override system default
    );

    expect(result.current).toEqual({
      padding: 0,
      margin: DefaultConstraints.spacing["3"],
    });
  });
});
