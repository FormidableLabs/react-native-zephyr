import { describe, it, expect, vi } from "vitest";
import { createStyleBuilder } from "../createStyleBuilder";
import { createAspectRatioHandlers } from "./createAspectRatioHandlers";

vi.mock("react-native", () => ({
  StyleSheet: {
    hairlineWidth: 0.5,
  },
}));

describe("createAspectRatioHandlers", () => {
  it("allows custom constraints", () => {
    const { styled } = createStyleBuilder({
      handlers: createAspectRatioHandlers({ foo: [1, 1], bar: [3, 7] }),
    });

    expect(styled("aspect:foo")).toEqual({ aspectRatio: 1 });
    expect(styled("aspect:bar")).toEqual({ aspectRatio: 3 / 7 });
  });
});
