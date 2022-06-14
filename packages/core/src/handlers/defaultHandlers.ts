import { FlexStyle, ImageStyle, StyleSheet } from "react-native";
import { flattenColor } from "./twColors";
import { createColorHandlers } from "./createColorHandlers";
import { createBorderHandlers } from "./createBorderHandlers";
import { createRoundedHandlers } from "./createRoundedHandlers";
import { createShadowHandlers } from "./createShadowHandlers";
import { cleanMaybeNumberString } from "../utils/cleanMaybeNumberString";
import { createOpacityHandlers } from "./createOpacityHandlers";
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
  /**
   * Generated from https://ethercreative.github.io/react-native-shadow-generator/
   * android prop represents elevation.
   * ios is [shadowOffset.width, shadowOffset.height, shadowRadius, shadowOpacity]
   */
  SHADOWS: {
    sm: { android: 1, ios: [0, 1, 1, 0.18] },
    base: { android: 2, ios: [0, 1, 1.41, 0.2] },
    md: { android: 5, ios: [0, 2, 3.84, 0.25] },
    lg: { android: 8, ios: [0, 4, 4.65, 0.3] },
    xl: { android: 12, ios: [0, 6, 7.49, 0.37] },
    "2xl": { android: 16, ios: [0, 8, 10.32, 0.44] },
  } as const,
  ASPECT_RATIOS: {
    "1": [1, 1],
    "16-9": [16, 9],
    "9-16": [9, 16],
    "3-4": [3, 4],
    "4-3": [4, 3],
    "1-2": [1, 2],
    "2-1": [2, 1],
    "2-3": [2, 3],
    "3-2": [3, 2],
  } as const,
};

export const defaultShadowHandlers = createShadowHandlers(
  DEFAULT_CONSTRAINTS.SHADOWS
);

export const defaultPositioningHandlers = {
  relative: () => <FlexStyle>{ position: "relative" },
  absolute: () => <FlexStyle>{ position: "absolute" },
  hidden: () => <FlexStyle>{ display: "none" },
  visible: () => <FlexStyle>{ display: "flex" },
  overflow: (overflow: NonNullable<FlexStyle["overflow"]>) =>
    <FlexStyle>{ overflow },
  z: (zIndex: NonNullable<FlexStyle["zIndex"]>) =>
    <FlexStyle>{ zIndex: cleanMaybeNumberString(`${zIndex}`) },
};
export const defaultFlexHandlers = {
  flex: (
    inp:
      | "1"
      | "auto"
      | "initial"
      | "none"
      | "row"
      | "row-reverse"
      | "col"
      | "col-reverse"
      | "grow"
      | "grow-0"
      | "shrink"
      | "shrink-0"
      | "wrap"
      | "wrap-reverse"
      | "nowrap"
  ) => {
    return {
      1: { flexGrow: 1, flexShrink: 1, flexBasis: "0%" },
      auto: { flexGrow: 1, flexShrink: 1, flexBasis: "auto" },
      initial: { flexGrow: 0, flexShrink: 1, flexBasis: "auto" },
      none: { flexGrow: 0, flexShrink: 0, flexBasis: "auto" },
      row: { flexDirection: "row" },
      "row-reverse": { flexDirection: "row-reverse" },
      col: { flexDirection: "column" },
      "col-reverse": { flexDirection: "column-reverse" },
      grow: { flexGrow: 1 },
      "grow-0": { flexGrow: 0 },
      shrink: { flexShrink: 1 },
      "shrink-0": { flexShrink: 0 },
      wrap: { flexWrap: "wrap" },
      "wrap-reverse": { flexWrap: "wrap-reverse" },
      nowrap: { flexWrap: "nowrap" },
    }[inp] as FlexStyle;
  },
  justify: (
    inp: "start" | "end" | "center" | "between" | "around" | "evenly"
  ) => {
    return <FlexStyle>{
      justifyContent: {
        start: "flex-start",
        end: "flex-end",
        center: "center",
        between: "space-between",
        around: "space-around",
        evenly: "space-evenly",
      }[inp] as FlexStyle["justifyContent"],
    };
  },
  items: (inp: "start" | "end" | "center" | "baseline" | "stretch") => {
    return <FlexStyle>{
      alignItems: {
        start: "flex-start",
        end: "flex-end",
        center: "center",
        baseline: "baseline",
        stretch: "stretch",
      }[inp] as FlexStyle["alignItems"],
    };
  },
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
  ...defaultShadowHandlers,
  ...defaultPositioningHandlers,
  ...defaultFlexHandlers,
  ...defaultImageHandlers,
  ...defaultTypographyHandlers,
};
