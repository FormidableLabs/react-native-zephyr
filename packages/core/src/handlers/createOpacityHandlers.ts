import { extractFromBrackets } from "../utils/extractFromBrackets";
import { ViewStyle } from "react-native";
import { BgOpacityRecord, NonSymbol } from "../types";

export const createOpacityHandlers = <
  Constraints extends Record<string | number, number>
>(
  constraints: Constraints
) => {
  type OpacityInput = NonSymbol<keyof Constraints> | `[${number}]`;
  const isConstraintKey = (
    val: OpacityInput
  ): val is NonSymbol<keyof Constraints> => constraints?.[val] !== undefined;

  return {
    opacity: (inp: OpacityInput) => {
      const val = isConstraintKey(inp)
        ? constraints[inp]
        : extractFromBrackets(inp);
      return <ViewStyle>{ opacity: val };
    },

    "bg-opacity": (inp: OpacityInput): BgOpacityRecord => {
      if (isConstraintKey(inp)) {
        return { "--bg-opacity": constraints[inp] };
      }

      const bracketVal = Number(extractFromBrackets(inp));
      if (!isNaN(bracketVal)) {
        return { "--bg-opacity": bracketVal };
      }

      return {};
    },
  };
};
