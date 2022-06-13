import { TextStyle } from "react-native";

export const createTypographyHandlers = <
  FontSizeKey extends string | number,
  FontWeightKey extends string | number
>(constraints: {
  fontSizes: Record<FontSizeKey, readonly [number, number]>;
  fontWeights: Record<FontWeightKey, TextStyle["fontWeight"]>;
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
      const [fontSize, lineHeight] = constraints.fontSizes[inp];
      return <TextStyle>{ fontSize, lineHeight };
    },
    "font-weight": (inp: FontWeightKey) => {
      const fontWeight = constraints.fontWeights[inp];
      return <TextStyle>{ fontWeight };
    },
  };
};
