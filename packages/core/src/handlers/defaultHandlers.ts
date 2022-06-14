import { FlexStyle, ImageStyle, StyleSheet } from "react-native";
import { createTypographyHandlers } from "./createTypographyHandlers";

const BASE_FONT_SIZE = 14;
export const DEFAULT_CONSTRAINTS = {
  FONT_SIZES: {
    xs: [0.75 * BASE_FONT_SIZE, BASE_FONT_SIZE],
    sm: [0.875 * BASE_FONT_SIZE, 1.25 * BASE_FONT_SIZE],
    base: [BASE_FONT_SIZE, 1.5 * BASE_FONT_SIZE],
    lg: [1.125 * BASE_FONT_SIZE, 1.75 * BASE_FONT_SIZE],
    xl: [1.25 * BASE_FONT_SIZE, 1.75 * BASE_FONT_SIZE],
    "2xl": [1.5 * BASE_FONT_SIZE, 2 * BASE_FONT_SIZE],
    "3xl": [1.875 * BASE_FONT_SIZE, 2.25 * BASE_FONT_SIZE],
    "4xl": [2.25 * BASE_FONT_SIZE, 2.5 * BASE_FONT_SIZE],
    "5xl": [3 * BASE_FONT_SIZE, 3 * BASE_FONT_SIZE],
    "6xl": [3.75 * BASE_FONT_SIZE, 3.75 * BASE_FONT_SIZE],
    "7xl": [4.5 * BASE_FONT_SIZE, 4.5 * BASE_FONT_SIZE],
    "8xl": [6 * BASE_FONT_SIZE, 6 * BASE_FONT_SIZE],
    "9xl": [8 * BASE_FONT_SIZE, 8 * BASE_FONT_SIZE],
  } as const,
  FONT_WEIGHTS: {
    thin: "100",
    extralight: "200",
    light: "300",
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
    black: "900",
  } as const,
};

export const defaultTypographyHandlers = createTypographyHandlers({
  fontSizes: DEFAULT_CONSTRAINTS.FONT_SIZES,
  fontWeights: DEFAULT_CONSTRAINTS.FONT_WEIGHTS,
});

export const defaultImageHandlers = {
  resize: (resizeMode: NonNullable<ImageStyle["resizeMode"]>) =>
    <ImageStyle>{ resizeMode },
};

/**
 * Aggregate the defaults
 */
export const defaultHandlers = {
  ...defaultImageHandlers,
  ...defaultTypographyHandlers,
};
