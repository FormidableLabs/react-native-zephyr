import { extractFromBrackets } from "../utils/extractFromBrackets";
import { ViewStyle } from "react-native";
import { BgOpacityRecord, NonSymbol } from "../types";

export const createOpacityHandlers = <
  Constraints extends Record<string | number, number>
>(
  constraints: Constraints
) => {
  type OpacityInput = NonSymbol<keyof Constraints> | `[${number}]`;
  return {
    opacity: (inp: OpacityInput) => {
      const constrainedVal = constraints[inp];
      const val =
        constrainedVal !== undefined
          ? constraints[inp]
          : extractFromBrackets(inp);
      return <ViewStyle>{ opacity: val };
    },

    "bg-opacity": (inp: OpacityInput): BgOpacityRecord => {
      const constrainedVal = constraints[inp];
      if (constrainedVal !== undefined) {
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
