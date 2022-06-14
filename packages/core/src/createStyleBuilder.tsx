import type { JSXElementConstructor } from "react";
import * as React from "react";
import {
  ClassName,
  NonSymbol,
  NumOrString,
  Optional,
  StyleHandlerSet,
  ThemeConstraints,
} from "./types";
import { StyleContext } from "./StyleProvider";
import { colorStringToRgb } from "./utils/colorStringToRgb";
import { SimpleConstrainedCache } from "./utils/SimpleConstrainedCache";
import { DefaultConstraints } from "./theme";
import { FlexStyle } from "react-native";
import { extractFromBrackets } from "./utils/extractFromBrackets";
import { mergeThemes } from "./utils/mergeThemes";

/**
 * Core builder fn. Takes in a set of handlers, and gives back a hook and component-builder.
 */
export const createStyleBuilder = <
  ExtraStyleHandlers extends StyleHandlerSet,
  Theme extends ThemeConstraints,
  ThemeExt extends ThemeConstraints
>({
  extraHandlers,
  theme,
  extendTheme,
}: {
  extraHandlers?: ExtraStyleHandlers;
  theme?: Theme;
  extendTheme?: ThemeExt;
}) => {
  const cache = new SimpleConstrainedCache({ maxNumRecords: 200 });
  const mergedTheme = mergeThemes({ theme, extendTheme });

  // TODO: DRY this up.
  type Spacing = (Theme["spacing"] extends object
    ? Theme["spacing"]
    : typeof DefaultConstraints.spacing) &
    ThemeExt["spacing"];
  type SpacingKeys = NonSymbol<keyof Spacing>;

  type ColorKeys = NonSymbol<
    keyof ((Theme["colors"] extends object
      ? Theme["colors"]
      : typeof DefaultConstraints.colors) &
      ThemeExt["colors"])
  >;
  type OpacityKeys = NonSymbol<
    keyof ((Theme["opacities"] extends object
      ? Theme["opacities"]
      : typeof DefaultConstraints.opacities) &
      ThemeExt["opacities"])
  >;

  type Cn =
    // Margins
    | `m:${SpacingKeys | `[${NumOrString}]`}`
    | `-m:${SpacingKeys | `[${NumOrString}]`}`
    | `mx:${SpacingKeys | `[${NumOrString}]`}`
    | `-mx:${SpacingKeys | `[${NumOrString}]`}`
    | `my:${SpacingKeys | `[${NumOrString}]`}`
    | `-my:${SpacingKeys | `[${NumOrString}]`}`
    | `ml:${SpacingKeys | `[${NumOrString}]`}`
    | `-ml:${SpacingKeys | `[${NumOrString}]`}`
    | `mr:${SpacingKeys | `[${NumOrString}]`}`
    | `-mr:${SpacingKeys | `[${NumOrString}]`}`
    | `mt:${SpacingKeys | `[${NumOrString}]`}`
    | `-mt:${SpacingKeys | `[${NumOrString}]`}`
    | `mb:${SpacingKeys | `[${NumOrString}]`}`
    | `-mb:${SpacingKeys | `[${NumOrString}]`}`
    // Padding
    | `p:${SpacingKeys | `[${NumOrString}]`}`
    | `px:${SpacingKeys | `[${NumOrString}]`}`
    | `py:${SpacingKeys | `[${NumOrString}]`}`
    | `pl:${SpacingKeys | `[${NumOrString}]`}`
    | `pr:${SpacingKeys | `[${NumOrString}]`}`
    | `pt:${SpacingKeys | `[${NumOrString}]`}`
    | `pb:${SpacingKeys | `[${NumOrString}]`}`
    // Inset
    | `inset:${SpacingKeys | `[${NumOrString}]`}`
    | `-inset:${SpacingKeys | `[${NumOrString}]`}`
    | `inset-x:${SpacingKeys | `[${NumOrString}]`}`
    | `-inset-x:${SpacingKeys | `[${NumOrString}]`}`
    | `inset-y:${SpacingKeys | `[${NumOrString}]`}`
    | `-inset-y:${SpacingKeys | `[${NumOrString}]`}`
    | `left:${SpacingKeys | `[${NumOrString}]`}`
    | `-left:${SpacingKeys | `[${NumOrString}]`}`
    | `right:${SpacingKeys | `[${NumOrString}]`}`
    | `-right:${SpacingKeys | `[${NumOrString}]`}`
    | `top:${SpacingKeys | `[${NumOrString}]`}`
    | `-top:${SpacingKeys | `[${NumOrString}]`}`
    | `bottom:${SpacingKeys | `[${NumOrString}]`}`
    | `-bottom:${SpacingKeys | `[${NumOrString}]`}`
    // TODO: more
    | `bg:${ColorKeys}`
    | `bg-opacity:${OpacityKeys}`
    | ClassName<ExtraStyleHandlers>;

  // Helper to build spacing handler
  const spacingHandler =
    (properties: (keyof FlexStyle)[], isNegative?: boolean) =>
    (val: SpacingKeys | `[${string}]`) => {
      const isConstraintKey = (
        val: SpacingKeys | `[${string}]`
      ): val is SpacingKeys => Boolean(mergedTheme.spacing[val]);

      const spaceVal = isConstraintKey(val)
        ? mergedTheme.spacing[val]
        : extractFromBrackets(val);

      return properties.reduce<{
        [K in keyof FlexStyle]: number | string | undefined;
      }>((acc, prop) => {
        acc[prop] = isNegative
          ? typeof spaceVal === "number"
            ? -spaceVal
            : `-${spaceVal}`
          : spaceVal;
        return acc;
      }, {});
    };

  // Build out our actual handlers.
  const handlers = {
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
    p: spacingHandler(["padding"]),
    px: spacingHandler(["paddingHorizontal"]),
    py: spacingHandler(["paddingVertical"]),
    pl: spacingHandler(["paddingLeft"]),
    pr: spacingHandler(["paddingRight"]),
    pt: spacingHandler(["paddingTop"]),
    pb: spacingHandler(["paddingBottom"]),
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
    // TODO: Spacing handlers using merged theme/extension

    ...extraHandlers,
  };

  /**
   * Fundamental styling function, used by the useStyle hook
   */
  const styles = (...classNames: Cn[]) => {
    const cacheKey = classNames.join(",");

    const styles = {} as Record<string, any>;

    // First, check the cache
    if (cache.has(cacheKey)) return cache.get(cacheKey);

    // Start to aggregate styles
    for (let c of classNames || []) {
      const m = c.match(HandlerArgRegExp);
      const prop = m?.[1];
      const value = m?.[2];
      const handler =
        handlers?.[prop as NonSymbol<keyof typeof handlers>] ||
        // @ts-ignore
        handlers?.[c];

      if (handler) {
        // @ts-ignore
        Object.assign(styles, handler(value));
      }
    }

    // Massage for bg-opacity
    if (typeof styles["--bg-opacity"] === "number" && styles?.backgroundColor) {
      const { r, g, b } = colorStringToRgb(styles.backgroundColor);
      styles.backgroundColor = `rgba(${r}, ${g}, ${b}, ${styles["--bg-opacity"]})`;
    }
    delete styles["--bg-opacity"];

    // Add in the cache
    cache.set(cacheKey, styles);

    return styles;
  };

  /**
   * Core hook to apply styles based on props/style object
   */
  const useStyles = ({
    baseClasses = [],
    darkClasses = [],
  }: {
    baseClasses?: Cn[];
    darkClasses?: Cn[];
  }) => {
    const { isDarkMode } = React.useContext(StyleContext);
    const classes = baseClasses.concat(isDarkMode ? darkClasses : []);
    const cacheKey = classes.join(",");

    return React.useMemo(() => styles(...classes), [cacheKey]);
  };

  /**
   * Utility to make a styled component
   */
  const makeStyledComponent = <T extends { style?: unknown }, Ref>(
    WrappedComponent: JSXElementConstructor<T>
  ) => {
    const ComponentWithStyles = React.forwardRef<
      Ref,
      T & { styled?: Cn[]; darkStyled?: Cn[] }
    >(({ styled, darkStyled, style, ...rest }, ref) => {
      const addedStyles = useStyles({
        baseClasses: styled,
        darkClasses: darkStyled,
      });

      return (
        // @ts-ignore
        <WrappedComponent
          ref={ref}
          {...rest}
          style={[addedStyles, ...[Array.isArray(style) ? style : [style]]]}
        />
      );
    });

    if ("displayName" in WrappedComponent) {
      ComponentWithStyles["displayName"] = WrappedComponent["displayName"];
    }

    return ComponentWithStyles;
  };

  return { styles, useStyles, makeStyledComponent };
};

const HandlerArgRegExp = /^(.+):(.+)$/;
