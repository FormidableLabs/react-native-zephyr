import { ViewStyle } from "react-native";
import { extractFromBrackets } from "../utils/extractFromBrackets";
import { NonSymbol } from "../types";

export const createRoundedHandlers = <
  Constraints extends Record<string | number, number>
>(
  constraints: Constraints
) => {
  const isConstraintKey = (
    val: keyof Constraints | `[${string}]`
  ): val is keyof typeof constraints => Boolean(constraints?.[val]);
  const borderRadiusHandler =
    (...properties: Array<keyof ViewStyle>) =>
    (inp: NonSymbol<keyof Constraints> | `[${string}]`) => {
      const val = isConstraintKey(inp)
        ? constraints[inp]
        : extractFromBrackets(inp);

      return properties.reduce<ViewStyle>((acc, prop) => {
        // @ts-ignore
        acc[prop] = val;
        return acc;
      }, {});
    };

  return {
    rounded: borderRadiusHandler("borderRadius"),
    "rounded-t": borderRadiusHandler(
      "borderTopLeftRadius",
      "borderTopRightRadius"
    ),
    "rounded-b": borderRadiusHandler(
      "borderBottomLeftRadius",
      "borderBottomRightRadius"
    ),
    "rounded-l": borderRadiusHandler(
      "borderBottomLeftRadius",
      "borderTopLeftRadius"
    ),
    "rounded-r": borderRadiusHandler(
      "borderBottomRightRadius",
      "borderTopRightRadius"
    ),
  };
};
