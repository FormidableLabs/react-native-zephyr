import type { JSXElementConstructor } from "react";
import * as React from "react";
import {
  ClassName,
  FlexibleClassName,
  NonSymbol,
  NumOrString,
  StyleHandlerSet,
  ThemeConstraints,
} from "./types";
import { StyleContext } from "./StyleProvider";
import { colorStringToRgb } from "./utils/colorStringToRgb";
import { SimpleConstrainedCache } from "./utils/SimpleConstrainedCache";
import { createDefaultTheme } from "./theme";
import { FlexStyle, ImageStyle, TextStyle } from "react-native";
import { mergeThemes } from "./utils/mergeThemes";
import { createColorHandlers } from "./handlers/createColorHandlers";
import { createSpacingHandlers } from "./handlers/createSpacingHandlers";
import { createAspectRatioHandlers } from "./handlers/createAspectRatioHandler";
import { createOpacityHandlers } from "./handlers/createOpacityHandlers";
import { createBorderHandlers } from "./handlers/createBorderHandlers";
import { createRoundedHandlers } from "./handlers/createRoundedHandlers";
import { createShadowHandlers } from "./handlers/createShadowHandlers";
import { cleanMaybeNumberString } from "./utils/cleanMaybeNumberString";
import { createTypographyHandlers } from "./handlers/createTypographyHandlers";
import { flattenClassNameArgs } from "./utils/flattenClassNameArgs";

/**
 * Core builder fn. Takes in a set of handlers, and gives back a hook and component-builder.
 */
export const createStyleBuilder = <
  Theme extends ThemeConstraints,
  ThemeExt extends ThemeConstraints,
  ExtraStyleHandlers extends StyleHandlerSet | undefined = undefined
>({
  extraHandlers,
  overrideTheme,
  extendTheme,
  baseFontSize = 14,
}: {
  extraHandlers?: ExtraStyleHandlers;
  overrideTheme?: Theme | ((args: { baseFontSize: number }) => Theme);
  extendTheme?: ThemeExt | ((args: { baseFontSize: number }) => ThemeExt);
  baseFontSize?: number;
} = {}) => {
  const cache = new SimpleConstrainedCache({ maxNumRecords: 400 });
  const baseTheme = createDefaultTheme({ baseFontSize });
  const mergedTheme = mergeThemes({
    baseTheme,
    overrideTheme:
      typeof overrideTheme === "function"
        ? overrideTheme({ baseFontSize })
        : overrideTheme,
    extendTheme:
      typeof extendTheme === "function"
        ? extendTheme({ baseFontSize })
        : extendTheme,
  });

  type DefaultTheme = typeof baseTheme;
  type GetKey<
    UserThemeConstraints,
    DefaultThemeConstraints,
    ConstraintsExtension
  > = NonSymbol<
    keyof ((UserThemeConstraints extends object
      ? UserThemeConstraints
      : DefaultThemeConstraints) &
      ConstraintsExtension)
  >;

  type SpacingKey = GetKey<
    Theme["spacing"],
    DefaultTheme["spacing"],
    ThemeExt["spacing"]
  >;
  type AspectRatioKey = GetKey<
    Theme["aspectRatios"],
    DefaultTheme["aspectRatios"],
    ThemeExt["aspectRatios"]
  >;
  type ColorKey = GetKey<
    Theme["colors"],
    DefaultTheme["colors"],
    ThemeExt["colors"]
  >;
  type OpacityKey = GetKey<
    Theme["opacities"],
    DefaultTheme["opacities"],
    ThemeExt["opacities"]
  >;
  type BorderSizeKey = GetKey<
    Theme["borderSizes"],
    DefaultTheme["borderSizes"],
    ThemeExt["borderSizes"]
  >;
  type BorderRadiiKey = GetKey<
    Theme["borderRadii"],
    DefaultTheme["borderRadii"],
    ThemeExt["borderRadii"]
  >;
  type ShadowKey = GetKey<
    Theme["shadows"],
    DefaultTheme["shadows"],
    ThemeExt["shadows"]
  >;
  type FontSizeKey = GetKey<
    Theme["fontSizes"],
    DefaultTheme["fontSizes"],
    ThemeExt["fontSizes"]
  >;
  type FontWeightKey = GetKey<
    Theme["fontWeights"],
    DefaultTheme["fontWeights"],
    ThemeExt["fontWeights"]
  >;
  type LetterSpacingKey = GetKey<
    Theme["letterSpacing"],
    DefaultTheme["letterSpacing"],
    ThemeExt["letterSpacing"]
  >;
  type LineHeightKey = GetKey<
    Theme["lineHeights"],
    DefaultTheme["lineHeights"],
    ThemeExt["lineHeights"]
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
    | `items:${"start" | "end" | "center" | "baseline" | "stretch"}`
    // Image handlers
    | `resize:${NonNullable<ImageStyle["resizeMode"]>}`
    // Typograhpy
    | "italic"
    | "uppercase"
    | "lowercase"
    | "capitalize"
    | "underline"
    | "line-through"
    | "underline-line-through"
    | `text-align:${NonNullable<TextStyle["textAlign"]>}`
    | `text:${FontSizeKey}`
    | `font-weight:${FontWeightKey}`
    | `tracking:${LetterSpacingKey}`
    | `leading:${LineHeightKey}`
    | (typeof extraHandlers extends undefined
        ? never
        : ClassName<NonNullable<typeof extraHandlers>>);

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
    // Image handlers
    resize: (resizeMode: NonNullable<ImageStyle["resizeMode"]>) =>
      ({ resizeMode } as ImageStyle),
    // Typography handlers
    ...createTypographyHandlers({
      fontSizes: mergedTheme.fontSizes,
      fontWeights: mergedTheme.fontWeights,
      letterSpacing: mergedTheme.letterSpacing,
      lineHeights: mergedTheme.lineHeights,
    }),

    // And add in the extra handlers at the end, which can overwrite the default ones
    ...extraHandlers,
  };

  type CnArg = FlexibleClassName<Cn>;

  /**
   * Fundamental styling function, used by the useStyle hook
   */
  const styles = (...args: CnArg[]): Record<string, any> => {
    const classNames = flattenClassNameArgs(...args);
    const cacheKey = classNames.join(",");

    const styles = {} as Record<string, any>;

    // First, check the cache
    const cachedValue = cache.get(cacheKey);
    if (cachedValue) return cachedValue;

    // Start to aggregate styles
    for (const c of classNames || []) {
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

    // Massage for line-height
    const __lineHeight = styles["--line-height"];
    if (__lineHeight !== undefined) {
      if (typeof __lineHeight === "number") {
        styles["lineHeight"] = __lineHeight;
      }
      if (typeof __lineHeight === "string") {
        const a = __lineHeight.match(RelativeLineHeightRegExp)?.[1];
        if (a) {
          const fs = +styles["fontSize"] || baseFontSize;
          styles["lineHeight"] = +a * fs;
        }
      }

      delete styles["--line-height"];
    }

    // Add in the cache
    cache.set(cacheKey, styles);

    return styles;
  };

  /**
   * Core hook to apply styles based on props/style object
   */
  const useStyles = ({
    classes = [],
    darkClasses = [],
  }: {
    classes?: CnArg[];
    darkClasses?: CnArg[];
  }) => {
    const { isDarkMode } = React.useContext(StyleContext);
    return React.useMemo(() => {
      const allClasses = [...classes].concat(isDarkMode ? darkClasses : []);
      return styles(...allClasses);
    }, [classes, darkClasses, isDarkMode]);
  };

  /**
   * Utility to make a styled component
   */
  const makeStyledComponent = <T extends { style?: unknown }, Ref>(
    WrappedComponent: JSXElementConstructor<T>
  ) => {
    const ComponentWithStyles = React.forwardRef<
      Ref,
      T & { classes?: CnArg[]; darkClasses?: CnArg[] }
    >(({ classes, darkClasses, style, ...rest }, ref) => {
      const addedStyles = useStyles({
        classes,
        darkClasses,
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

  /**
   * `styled` wrapper to move classnames out of render-cycle, e.g.
   *    const Container = styled(View)("flex:1", "bg:red-300");
   *  Supports just a list of classnames (no dark-mode support)
   *    or a config object like { classes, darkClasses }
   */
  const styled = <Props extends { style?: unknown }, Ref>(
    WrappedComponent: JSXElementConstructor<Props>
  ) => {
    return (
      ...args: [{ classes: CnArg[]; darkClasses: CnArg[] }] | CnArg[]
    ) => {
      // Aggregate classes/darkClasses based on the args passed
      let classes: CnArg[] = [];
      let darkClasses: CnArg[] = [];
      if (areArgsConfigObject(args)) {
        classes = args[0].classes;
        if (args[0].darkClasses) {
          darkClasses = args[0].darkClasses;
        }
      } else {
        classes = args;
      }

      // Return a component that uses useStyles with fixed classes/darkClasses
      const Component = React.forwardRef<Ref, Props>(
        ({ style, ...rest }, ref) => {
          const addedStyles = useStyles({
            classes,
            darkClasses,
          });

          return (
            // @ts-ignore
            <WrappedComponent
              ref={ref}
              {...rest}
              style={[addedStyles, ...[Array.isArray(style) ? style : [style]]]}
            />
          );
        }
      );

      return Component;
    };
  };

  return { styles, styled, useStyles, makeStyledComponent, theme: mergedTheme };
};

const HandlerArgRegExp = /^(.+):(.+)$/;
const RelativeLineHeightRegExp = /^x(.+)$/;

// Util for use in styled-utility
const areArgsConfigObject = <T,>(
  args: T[] | [{ classes: T[]; darkClasses?: T[] }]
): args is [{ classes: T[]; darkClasses?: T[] }] => {
  return (
    typeof args[0] === "object" &&
    "classes" in args[0] &&
    Array.isArray(args[0].classes)
  );
};
