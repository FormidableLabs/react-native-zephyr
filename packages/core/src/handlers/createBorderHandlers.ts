import { ViewStyle } from "react-native";
import { extractFromBrackets } from "../utils/extractFromBrackets";
import { NonSymbol } from "../types";

export const createBorderHandlers = <
  Constraints extends Record<string | number, number>
>(
  constraints: Constraints
) => {
  const borderSizeHandler =
    (...properties: Array<keyof ViewStyle>) =>
    (inp: NonSymbol<keyof Constraints> | `[${string}]`) => {
      const constrainedVal = constraints[inp];
      const val =
        constrainedVal !== undefined
          ? constraints[inp]
          : extractFromBrackets(inp);

      return properties.reduce<ViewStyle>((acc, prop) => {
        // @ts-ignore
        acc[prop] = val;
        return acc;
      }, {});
    };

  return {
    border: borderSizeHandler("borderWidth"),
    "border-t": borderSizeHandler("borderTopWidth"),
    "border-b": borderSizeHandler("borderBottomWidth"),
    "border-l": borderSizeHandler("borderLeftWidth"),
    "border-r": borderSizeHandler("borderRightWidth"),
  };
};
