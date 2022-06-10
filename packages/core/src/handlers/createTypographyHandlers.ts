import { TextStyle } from "react-native";

type TypographyConstraints = {
  fontSizes: Record<string | number, readonly [number, number]>;
  fontWeights: Record<string | number, TextStyle["fontWeight"]>;
};

export const createTypographyHandlers = <
  Constraints extends TypographyConstraints
>(
  constraints: Constraints
) => {
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
    text: (inp: keyof typeof constraints.fontSizes) => {
      const [fontSize, lineHeight] = constraints.fontSizes[inp];
      return <TextStyle>{ fontSize, lineHeight };
    },
    "font-weight": (inp: keyof typeof constraints.fontWeights) => {
      const fontWeight = constraints.fontWeights[inp];
      return <TextStyle>{ fontWeight };
    },
  };
};
