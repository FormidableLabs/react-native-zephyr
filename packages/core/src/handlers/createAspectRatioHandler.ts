import { extractFromBrackets } from "../utils/extractFromBrackets";
import { NonSymbol } from "../types";
import { FlexStyle } from "react-native";

export const createAspectRatioHandlers = <
  Constraints extends Record<string | number, readonly [number, number]>
>(
  constraints: Constraints
) => {
  return {
    aspect: (inp: NonSymbol<keyof Constraints> | `[${string}]`): FlexStyle => {
      const cVal = constraints?.[inp];
      if (cVal) {
        return { aspectRatio: cVal[0] / cVal[1] };
      }

      const overrideVal = extractFromBrackets(inp);
      if (typeof overrideVal === "number") {
        return { aspectRatio: overrideVal };
      }

      return {};
    },
  };
};
