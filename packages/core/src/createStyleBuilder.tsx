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
import { createColorHandlers } from "./handlers/createColorHandlers";
import { createSpacingHandlers } from "./handlers/createSpacingHandlers";
import { createAspectRatioHandlers } from "./handlers/createAspectRatioHandler";

/**
 * Core builder fn. Takes in a set of handlers, and gives back a hook and component-builder.
 */
export const createStyleBuilder = <
  ExtraStyleHandlers extends StyleHandlerSet | undefined,
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
  type SpacingKey = NonSymbol<keyof Spacing>;

  type AspectRatio = (Theme["aspectRatios"] extends object
    ? Theme["aspectRatios"]
    : typeof DefaultConstraints.aspectRatios) &
    ThemeExt["aspectRatios"];
  type AspectRatioKey = NonSymbol<keyof AspectRatio>;

  type Colors = (Theme["colors"] extends object
    ? Theme["colors"]
    : typeof DefaultConstraints.colors) &
    ThemeExt["colors"];
  type ColorKey = NonSymbol<keyof Colors>;

  type OpacityKeys = NonSymbol<
    keyof ((Theme["opacities"] extends object
      ? Theme["opacities"]
      : typeof DefaultConstraints.opacities) &
      ThemeExt["opacities"])
  >;

  type Cn =
    // Margins
    | `m:${SpacingKey | `[${NumOrString}]`}`
    | `-m:${SpacingKey | `[${NumOrString}]`}`
    | `mx:${SpacingKey | `[${NumOrString}]`}`
    | `-mx:${SpacingKey | `[${NumOrString}]`}`
    | `my:${SpacingKey | `[${NumOrString}]`}`
    | `-my:${SpacingKey | `[${NumOrString}]`}`
    | `ml:${SpacingKey | `[${NumOrString}]`}`
    | `-ml:${SpacingKey | `[${NumOrString}]`}`
    | `mr:${SpacingKey | `[${NumOrString}]`}`
    | `-mr:${SpacingKey | `[${NumOrString}]`}`
    | `mt:${SpacingKey | `[${NumOrString}]`}`
    | `-mt:${SpacingKey | `[${NumOrString}]`}`
    | `mb:${SpacingKey | `[${NumOrString}]`}`
    | `-mb:${SpacingKey | `[${NumOrString}]`}`
    // Padding
    | `p:${SpacingKey | `[${NumOrString}]`}`
    | `px:${SpacingKey | `[${NumOrString}]`}`
    | `py:${SpacingKey | `[${NumOrString}]`}`
    | `pl:${SpacingKey | `[${NumOrString}]`}`
    | `pr:${SpacingKey | `[${NumOrString}]`}`
    | `pt:${SpacingKey | `[${NumOrString}]`}`
    | `pb:${SpacingKey | `[${NumOrString}]`}`
    // Inset
    | `inset:${SpacingKey | `[${NumOrString}]`}`
    | `-inset:${SpacingKey | `[${NumOrString}]`}`
    | `inset-x:${SpacingKey | `[${NumOrString}]`}`
    | `-inset-x:${SpacingKey | `[${NumOrString}]`}`
    | `inset-y:${SpacingKey | `[${NumOrString}]`}`
    | `-inset-y:${SpacingKey | `[${NumOrString}]`}`
    | `left:${SpacingKey | `[${NumOrString}]`}`
    | `-left:${SpacingKey | `[${NumOrString}]`}`
    | `right:${SpacingKey | `[${NumOrString}]`}`
    | `-right:${SpacingKey | `[${NumOrString}]`}`
    | `top:${SpacingKey | `[${NumOrString}]`}`
    | `-top:${SpacingKey | `[${NumOrString}]`}`
    | `bottom:${SpacingKey | `[${NumOrString}]`}`
    | `-bottom:${SpacingKey | `[${NumOrString}]`}`
    // Sizing
    | `w:${SpacingKey | `[${NumOrString}]`}`
    | `min-w:${SpacingKey | `[${NumOrString}]`}`
    | `max-w:${SpacingKey | `[${NumOrString}]`}`
    | `h:${SpacingKey | `[${NumOrString}]`}`
    | `min-h:${SpacingKey | `[${NumOrString}]`}`
    | `max-h:${SpacingKey | `[${NumOrString}]`}`
    // Aspect ratio
    | `aspect:${AspectRatioKey | `[${NumOrString}]`}`
    // Colors
    | `bg:${ColorKey | `[${string}]`}`
    | `border-color:${ColorKey | `[${string}]`}`
    | `color:${ColorKey | `[${string}]`}`
    | `tint:${ColorKey | `[${string}]`}`
    // TODO: Opacity
    | `bg-opacity:${OpacityKeys}`;

  // TODO: more
  // TODO: How do we get the extra handlers in there?
  // | (ExtraStyleHandlers extends null ? never : "fart");

  // Build out our actual handlers.
  const handlers = {
    ...createSpacingHandlers(mergedTheme.spacing),
    ...createAspectRatioHandlers(mergedTheme.aspectRatios),
    ...createColorHandlers(mergedTheme.colors),

    // TODO: More handlers here.

    ...extraHandlers,
  };

  /**
   * Fundamental styling function, used by the useStyle hook
   */
  const styles = (...classNames: Cn[]): Record<string, any> => {
    const cacheKey = classNames.join(",");

    const styles = {} as Record<string, any>;

    // First, check the cache
    const cachedValue = cache.get(cacheKey);
    if (cachedValue) return cachedValue;

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
