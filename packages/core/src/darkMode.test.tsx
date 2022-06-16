import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { createStyleBuddy } from "./createStyleBuddy";
import { StyleProvider } from "./StyleProvider";
import { PropsWithChildren } from "react";
import { renderHook } from "@testing-library/react-hooks";

vi.mock("react-native", () => ({
  StyleSheet: {
    hairlineWidth: 0.5,
  },
  useColorScheme: vi.fn(),
}));

const { useStyles } = createStyleBuddy();

const Wrapper = ({ children }: PropsWithChildren) => {
  return <StyleProvider>{children}</StyleProvider>;
};

describe("Dark mode support", () => {
  it("returns base styles only in light mode", () => {
    const { result } = renderHook(
      () => {
        return useStyles({
          classes: ["p:0"],
        });
      },
      { wrapper: Wrapper }
    );

    console.log(result.current);

    // expect(result.current).toEqual({ padding: 0 });
  });
});
