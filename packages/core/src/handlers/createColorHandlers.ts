import { ImageStyle, TextStyle, ViewStyle } from "react-native";
import { extractFromBrackets } from "../utils/extractFromBrackets";
import { NonSymbol } from "../types";

export const createColorHandlers = <
  Constraints extends Record<string | number, string>
>(
  constraints: Constraints
) => {
  type ColorInput = NonSymbol<keyof Constraints> | `[${string}]`;

  const getColorValue = (val: ColorInput): string | undefined => {
    const constrainedValue = constraints[val];
    if (constrainedValue !== undefined) return constrainedValue;

    const bracketValue = extractFromBrackets(val);
    if (bracketValue) {
      return String(bracketValue);
    }

    return undefined;
  };

  const colorHandler =
    <S>(...properties: Array<keyof S>) =>
    (inp: ColorInput) => {
      const val = getColorValue(inp);
      return properties.reduce<S>((acc, prop) => {
        // @ts-ignore
        acc[prop] = val;
        return acc;
      }, {} as S);
    };

  return {
    bg: colorHandler<ViewStyle>("backgroundColor"),
    "border-color": colorHandler<ViewStyle>("borderColor"),
    color: colorHandler<TextStyle>("color"),
    tint: colorHandler<ImageStyle>("tintColor"),
  };
};
