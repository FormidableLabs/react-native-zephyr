import { FlexStyle } from "react-native";
import { extractFromBrackets } from "../utils/extractFromBrackets";
import { NonSymbol } from "../types";

export const createSpacingHandlers = <
  Constraints extends Record<string | number, string | number>
>(
  constraints: Constraints
) => {
  const spacingHandler =
    (properties: (keyof FlexStyle)[], isNegative?: boolean) =>
    (val: NonSymbol<keyof typeof constraints> | `[${string}]`) => {
      const isConstraintKey = (
        val: keyof typeof constraints | `[${string}]`
      ): val is keyof typeof constraints => Boolean(constraints?.[val]);

      const spaceVal = isConstraintKey(val)
        ? constraints[val]
        : extractFromBrackets(val);

      return properties.reduce<FlexStyle>((acc, prop) => {
        // TODO: Figure out why TS no likey
        // @ts-ignore
        acc[prop] = isNegative
          ? typeof spaceVal === "number"
            ? -spaceVal
            : `-${spaceVal}`
          : spaceVal;
        return acc;
      }, {});
    };

  return {
    // Margin
    m: spacingHandler(["margin"]),
    "-m": spacingHandler(["margin"], true),
    mx: spacingHandler(["marginHorizontal"]),
    "-mx": spacingHandler(["marginHorizontal"], true),
    my: spacingHandler(["marginVertical"]),
    "-my": spacingHandler(["marginVertical"], true),
    ml: spacingHandler(["marginLeft"]),
    "-ml": spacingHandler(["marginLeft"], true),
    mr: spacingHandler(["marginRight"]),
    "-mr": spacingHandler(["marginRight"], true),
    mt: spacingHandler(["marginTop"]),
    "-mt": spacingHandler(["marginTop"], true),
    mb: spacingHandler(["marginBottom"]),
    "-mb": spacingHandler(["marginBottom"], true),
    // Padding
    p: spacingHandler(["padding"]),
    px: spacingHandler(["paddingHorizontal"]),
    py: spacingHandler(["paddingVertical"]),
    pl: spacingHandler(["paddingLeft"]),
    pr: spacingHandler(["paddingRight"]),
    pt: spacingHandler(["paddingTop"]),
    pb: spacingHandler(["paddingBottom"]),
    // Inset/position
    inset: spacingHandler(["top", "bottom", "left", "right"]),
    "-inset": spacingHandler(["top", "bottom", "left", "right"], true),
    "inset-x": spacingHandler(["left", "right"]),
    "-inset-x": spacingHandler(["left", "right"], true),
    "inset-y": spacingHandler(["top", "bottom"]),
    "-inset-y": spacingHandler(["top", "bottom"], true),
    left: spacingHandler(["left"]),
    "-left": spacingHandler(["left"], true),
    right: spacingHandler(["right"]),
    "-right": spacingHandler(["right"], true),
    top: spacingHandler(["top"]),
    "-top": spacingHandler(["top"], true),
    bottom: spacingHandler(["bottom"]),
    "-bottom": spacingHandler(["bottom"], true),
    // Sizing
    w: spacingHandler(["width"]),
    "min-w": spacingHandler(["minWidth"]),
    "max-w": spacingHandler(["maxWidth"]),
    h: spacingHandler(["height"]),
    "min-h": spacingHandler(["minHeight"]),
    "max-h": spacingHandler(["maxHeight"]),
  } as const;
};
