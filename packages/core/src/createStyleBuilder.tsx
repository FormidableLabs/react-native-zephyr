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
import { createOpacityHandlers } from "./handlers/createOpacityHandlers";
import { createBorderHandlers } from "./handlers/createBorderHandlers";
import { createRoundedHandlers } from "./handlers/createRoundedHandlers";
import { createShadowHandlers } from "./handlers/createShadowHandlers";
import { cleanMaybeNumberString } from "./utils/cleanMaybeNumberString";

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
  type SpacingKey = NonSymbol<
    keyof (Theme["spacing"] extends object
      ? Theme["spacing"]
      : typeof DefaultConstraints.spacing) &
      ThemeExt["spacing"]
  >;
  type AspectRatioKey = NonSymbol<
    keyof (Theme["aspectRatios"] extends object
      ? Theme["aspectRatios"]
      : typeof DefaultConstraints.aspectRatios) &
      ThemeExt["aspectRatios"]
  >;
  type ColorKey = NonSymbol<
    keyof (Theme["colors"] extends object
      ? Theme["colors"]
      : typeof DefaultConstraints.colors) &
      ThemeExt["colors"]
  >;
  type OpacityKey = NonSymbol<
    keyof ((Theme["opacities"] extends object
      ? Theme["opacities"]
      : typeof DefaultConstraints.opacities) &
      ThemeExt["opacities"])
  >;
  type BorderSizeKey = NonSymbol<
    keyof ((Theme["borderSizes"] extends object
      ? Theme["borderSizes"]
      : typeof DefaultConstraints.borderSizes) &
      ThemeExt["borderSizes"])
  >;
  type BorderRadiiKey = NonSymbol<
    keyof ((Theme["borderRadii"] extends object
      ? Theme["borderRadii"]
      : typeof DefaultConstraints.borderRadii) &
      ThemeExt["borderRadii"])
  >;
  type ShadowKey = NonSymbol<
    keyof ((Theme["shadows"] extends object
      ? Theme["shadows"]
      : typeof DefaultConstraints.shadows) &
      ThemeExt["shadows"])
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
    // Opacity
    | `bg-opacity:${OpacityKey | `[${number}]`}`
    | `opacity:${OpacityKey | `[${number}]`}`
    // Borders
    | `border:${BorderSizeKey | `[${number}]`}`
    | `border-t:${BorderSizeKey | `[${number}]`}`
    | `border-b:${BorderSizeKey | `[${number}]`}`
    | `border-l:${BorderSizeKey | `[${number}]`}`
    | `border-r:${BorderSizeKey | `[${number}]`}`
    // Border radii
    | `rounded:${BorderRadiiKey | `[${number}]`}`
    | `rounded-t:${BorderRadiiKey | `[${number}]`}`
    | `rounded-b:${BorderRadiiKey | `[${number}]`}`
    | `rounded-l:${BorderRadiiKey | `[${number}]`}`
    | `rounded-r:${BorderRadiiKey | `[${number}]`}`
    // Shadows
    | `shadow:${ShadowKey}`
    | "relative"
    | "absolute"
    | "hidden"
    | "visible"
    | "overflow:visible"
    | "overflow:hidden"
    | "overflow:scroll"
    | `z:${NonNullable<FlexStyle["zIndex"]>}`
    // Flex handlers
    | `flex:${
        | "1"
        | "auto"
        | "initial"
        | "none"
        | "row"
        | "row-reverse"
        | "col"
        | "col-reverse"
        | "grow"
        | "grow-0"
        | "shrink"
        | "shrink-0"
        | "wrap"
        | "wrap-reverse"
        | "nowrap"}`
    | `justify:${"start" | "end" | "center" | "between" | "around" | "evenly"}`
    | `items:${"start" | "end" | "center" | "baseline" | "stretch"}`;

  // TODO: more
  // TODO: How do we get the extra handlers in there?
  // | (ExtraStyleHandlers extends null ? never : "fart");

  // Build out our actual handlers.
  const handlers = {
    ...createSpacingHandlers(mergedTheme.spacing),
    ...createAspectRatioHandlers(mergedTheme.aspectRatios),
    ...createColorHandlers(mergedTheme.colors),
    ...createOpacityHandlers(mergedTheme.opacities),
    ...createBorderHandlers(mergedTheme.borderSizes),
    ...createRoundedHandlers(mergedTheme.borderRadii),
    ...createShadowHandlers(mergedTheme.shadows),
    // Position handlers
    relative: () => ({ position: "relative" } as FlexStyle),
    absolute: () => ({ position: "absolute" } as FlexStyle),
    hidden: () => ({ display: "none" } as FlexStyle),
    visible: () => ({ display: "flex" } as FlexStyle),
    overflow: (overflow: NonNullable<FlexStyle["overflow"]>) =>
      ({ overflow } as FlexStyle),
    z: (zIndex: NonNullable<FlexStyle["zIndex"]>) =>
      ({ zIndex: cleanMaybeNumberString(`${zIndex}`) } as FlexStyle),
    // Flex handlers
    flex: (
      inp:
        | "1"
        | "auto"
        | "initial"
        | "none"
        | "row"
        | "row-reverse"
        | "col"
        | "col-reverse"
        | "grow"
        | "grow-0"
        | "shrink"
        | "shrink-0"
        | "wrap"
        | "wrap-reverse"
        | "nowrap"
    ) => {
      return {
        1: { flexGrow: 1, flexShrink: 1, flexBasis: "0%" },
        auto: { flexGrow: 1, flexShrink: 1, flexBasis: "auto" },
        initial: { flexGrow: 0, flexShrink: 1, flexBasis: "auto" },
        none: { flexGrow: 0, flexShrink: 0, flexBasis: "auto" },
        row: { flexDirection: "row" },
        "row-reverse": { flexDirection: "row-reverse" },
        col: { flexDirection: "column" },
        "col-reverse": { flexDirection: "column-reverse" },
        grow: { flexGrow: 1 },
        "grow-0": { flexGrow: 0 },
        shrink: { flexShrink: 1 },
        "shrink-0": { flexShrink: 0 },
        wrap: { flexWrap: "wrap" },
        "wrap-reverse": { flexWrap: "wrap-reverse" },
        nowrap: { flexWrap: "nowrap" },
      }[inp] as FlexStyle;
    },
    justify: (
      inp: "start" | "end" | "center" | "between" | "around" | "evenly"
    ) => {
      return {
        justifyContent: {
          start: "flex-start",
          end: "flex-end",
          center: "center",
          between: "space-between",
          around: "space-around",
          evenly: "space-evenly",
        }[inp] as FlexStyle["justifyContent"],
      };
    },
    items: (inp: "start" | "end" | "center" | "baseline" | "stretch") => {
      return {
        alignItems: {
          start: "flex-start",
          end: "flex-end",
          center: "center",
          baseline: "baseline",
          stretch: "stretch",
        }[inp] as FlexStyle["alignItems"],
      };
    },

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
