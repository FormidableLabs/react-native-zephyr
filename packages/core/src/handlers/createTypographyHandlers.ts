import { TextStyle } from "react-native";

export const createTypographyHandlers = <
  FontSizeKey extends string | number,
  FontWeightKey extends string | number,
  LetterSpacingKey extends string | number
>(constraints: {
  fontSizes: Record<FontSizeKey, readonly [number, number]>;
  fontWeights: Record<FontWeightKey, TextStyle["fontWeight"]>;
  letterSpacing: Record<LetterSpacingKey, number>;
}) => {
  return {
    italic: () => <TextStyle>{ fontStyle: "italic" },
    uppercase: () => <TextStyle>{ textTransform: "uppercase" },
    lowercase: () => <TextStyle>{ textTransform: "lowercase" },
    capitalize: () => <TextStyle>{ textTransform: "capitalize" },
    underline: () => <TextStyle>{ textDecorationLine: "underline" },
    "line-through": () => <TextStyle>{ textDecorationLine: "line-through" },
    "underline-line-through": () =>
      <TextStyle>{ textDecorationLine: "underline line-through" },
    "text-align": (textAlign: NonNullable<TextStyle["textAlign"]>) =>
      <TextStyle>{ textAlign },
    text: (inp: FontSizeKey) => {
      const val = constraints.fontSizes[inp];
      if (!val) return {};

      const [fontSize, lineHeight] = val;
      return <TextStyle>{ fontSize, lineHeight };
    },
    "font-weight": (inp: FontWeightKey) => {
      const fontWeight = constraints.fontWeights[inp];
      return <TextStyle>{ fontWeight };
    },
    tracking: (inp: LetterSpacingKey): TextStyle => {
      const val = constraints.letterSpacing[inp];
      if (typeof val === "undefined") return {};

      return {
        letterSpacing: val,
      };
    },
  };
};
