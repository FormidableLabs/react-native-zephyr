import * as React from "react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { createStyleBuilder } from "./createStyleBuilder";
import { DefaultTheme } from "./theme";
import { Text } from "react-native";
import { render } from "@testing-library/react-native";
import { StyleProvider } from "./StyleProvider";
import { PropsWithChildren } from "react";
import { renderHook } from "@testing-library/react-hooks";

let colorScheme = "light";
const MockText = vi.fn();

vi.mock("react-native", () => ({
  StyleSheet: {
    hairlineWidth: 0.5,
  },
  Text: (...args: unknown[]) => MockText(...args),
  useColorScheme: () => colorScheme,
}));

const C = DefaultTheme.spacing;

describe("createStyleBuilder", () => {
  it("creates builder with default constraints/handlers", () => {
    const { styles } = createStyleBuilder();
    expect(styles("p:1")).toEqual({ padding: C["1"] });
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
      overrideTheme: {
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
    expect(styles("p:1")).toEqual({ padding: C["1"] });
  });

  it("allows for extra handlers", () => {
    const { styles } = createStyleBuilder({
      extraHandlers: {
        foo: () => ({ color: "brown" }),
      },
    });

    expect(styles("foo")).toEqual({ color: "brown" });
  });

  it("allows for clsx-like syntax", () => {
    const { styles } = createStyleBuilder();

    expect(styles("m:3", { "p:4": true, "w:7": false })).toEqual({
      margin: C["3"],
      padding: C["4"],
    });
  });

  it("allows for extendTheme to be a function", () => {
    const { styles } = createStyleBuilder({
      baseFontSize: 16,
      extendTheme: ({ baseFontSize }) => ({
        spacing: {
          tiny: 0.5 * baseFontSize,
        },
      }),
    });

    expect(styles("m:tiny")).toEqual({ margin: 0.5 * 16 });
  });

  it("allows for overrideTheme to be a function", () => {
    const { styles } = createStyleBuilder({
      baseFontSize: 16,
      overrideTheme: ({ baseFontSize }) => ({
        spacing: {
          tiny: 0.5 * baseFontSize,
        },
      }),
    });

    expect(styles("m:tiny")).toEqual({ margin: 0.5 * 16 });
  });
});

describe("createStyleBuilder().useStyles", () => {
  beforeEach(() => {
    colorScheme = "light";
  });

  it("should return styles based on `classes` property", () => {
    const { useStyles } = createStyleBuilder();
    const { result } = renderHook(() => useStyles({ classes: ["bg:red-100"] }));
    expect(result.current).toEqual({
      backgroundColor: DefaultTheme.colors["red-100"],
    });
  });

  it("should add darkMode styles if in dark mode", () => {
    const { useStyles } = createStyleBuilder();
    colorScheme = "dark";
    const { result } = renderHook(
      () =>
        useStyles({ classes: ["bg:red-100"], darkClasses: ["color:blue-100"] }),
      { wrapper: Wrapper }
    );

    expect(result.current).toEqual({
      backgroundColor: DefaultTheme.colors["red-100"],
      color: DefaultTheme.colors["blue-100"],
    });
  });
});

describe("createStyleBuilder().makeStyledComponent", () => {
  beforeEach(() => {
    colorScheme = "light";
  });

  it("creates a wrapped component with additional classes/darkClasses props", () => {
    const { makeStyledComponent } = createStyleBuilder();
    const StyledText = makeStyledComponent(Text);
    render(<StyledText classes={["bg:red-100"]}>Hello world</StyledText>);

    // @ts-expect-error HALP. How do I type this mock?
    expect(MockText.calls?.at(-1)?.[0].style[0]).toEqual({
      backgroundColor: DefaultTheme.colors["red-100"],
    });
    // @ts-expect-error HALP. How do I type this mock?
    expect(MockText.calls?.at(-1)?.[0].children).toEqual("Hello world");
  });

  it("creates a wrapped component that supports dark mode", () => {
    const { makeStyledComponent } = createStyleBuilder();
    const StyledText = makeStyledComponent(Text);
    colorScheme = "dark";
    render(
      <StyledText classes={["bg:red-100"]} darkClasses={["bg:blue-100"]}>
        Hello world
      </StyledText>,
      { wrapper: Wrapper }
    );

    // @ts-expect-error HALP. How do I type this mock?
    expect(MockText.calls?.at(-1)?.[0].style[0]).toEqual({
      backgroundColor: DefaultTheme.colors["blue-100"],
    });
    // @ts-expect-error HALP. How do I type this mock?
    expect(MockText.calls?.at(-1)?.[0].children).toEqual("Hello world");
  });
});

describe("createStyleBuilder().styled", () => {
  const { styled } = createStyleBuilder();
  beforeEach(() => {
    colorScheme = "light";
  });

  it("wraps a component and adds style.", () => {
    const MyText = styled(Text)("color:red-100");
    render(<MyText>Hey world</MyText>);

    // @ts-expect-error HALP. How do I type this mock?
    expect(MockText.calls?.at(-1)?.[0].style[0]).toEqual({
      color: DefaultTheme.colors["red-100"],
    });
  });

  it("accepts configuration object", () => {
    const MyText = styled(Text)({
      classes: ["color:red-200"],
    });
    render(<MyText>Hey world</MyText>);

    // @ts-expect-error HALP. How do I type this mock?
    expect(MockText.calls?.at(-1)?.[0].style[0]).toEqual({
      color: DefaultTheme.colors["red-200"],
    });
  });

  it("handles dark-mode classes", () => {
    const MyText = styled(Text)({
      classes: ["color:red-100"],
      darkClasses: ["color:blue-100"],
    });

    render(<MyText>Hey world</MyText>, { wrapper: Wrapper });
    // @ts-expect-error HALP. How do I type this mock?
    expect(MockText.calls?.at(-1)?.[0].style[0]).toEqual({
      color: DefaultTheme.colors["red-100"],
    });

    colorScheme = "dark";
    render(<MyText>Hey world</MyText>, { wrapper: Wrapper });
    // @ts-expect-error HALP. How do I type this mock?
    expect(MockText.calls?.at(-1)?.[0].style[0]).toEqual({
      color: DefaultTheme.colors["blue-100"],
    });
  });

  it("handles function as an argument to classes and darkClasses", () => {
    const MyText = styled(Text)<{ isItalic?: boolean }>({
      classes: ({ isItalic }) => [isItalic && "italic"],
      darkClasses: ({ isItalic }) => [isItalic && "color:red-100"],
    });

    // no isItalic prop
    render(<MyText>Hello world</MyText>, { wrapper: Wrapper });
    // @ts-expect-error HALP. How do I type this mock?
    expect(MockText.calls?.at(-1)?.[0].style[0]).toEqual({});

    // with isItalic prop
    render(<MyText isItalic>Hello world</MyText>, { wrapper: Wrapper });
    // @ts-expect-error HALP. How do I type this mock?
    expect(MockText.calls?.at(-1)?.[0].style[0]).toEqual({
      fontStyle: "italic",
    });

    // Dark mode
    colorScheme = "dark";
    render(<MyText isItalic>Hello world</MyText>, { wrapper: Wrapper });
    // @ts-expect-error HALP. How do I type this mock?
    expect(MockText.calls?.at(-1)?.[0].style[0]).toEqual({
      fontStyle: "italic",
      color: DefaultTheme.colors["red-100"],
    });
  });
});

const Wrapper = ({ children }: PropsWithChildren) => (
  <StyleProvider>{children}</StyleProvider>
);
