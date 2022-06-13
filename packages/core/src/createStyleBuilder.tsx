import * as React from "react";
import {
  BeefedStyleHandlerSet,
  ClassName,
  InvertClassName,
  NonSymbol,
  ReturnStyle,
  StyleHandlerSet,
} from "./types";
import type { JSXElementConstructor } from "react";
import { StyleContext } from "./StyleProvider";
import { colorStringToRgb } from "./utils/colorStringToRgb";
import { SimpleConstrainedCache } from "./utils/SimpleConstrainedCache";

// const darkReg = /^dark:(.*)$/;
// const isDark = <T extends string>(name: T) => darkReg.test(name);

/**
 * Core builder fn. Takes in a set of handlers, and gives back a hook and component-builder.
 */
export const createStyleBuilder = <StyleHandlers extends StyleHandlerSet>({
  handlers: _handlers,
}: {
  handlers: StyleHandlers;
}) => {
  const handlers = Object.assign(
    {},
    _handlers
  ) as BeefedStyleHandlerSet<StyleHandlers>;
  const cache = new SimpleConstrainedCache({ maxNumRecords: 200 });

  for (const key in _handlers) {
    // @ts-ignore
    handlers[`dark:${key}`] = handlers[key];
  }

  /**
   * Core hook to apply styles based on props/style object
   */
  const useStyle = <Cn extends ClassName<StyleHandlers>>({
    baseClasses = [],
    darkClasses = [],
  }: {
    baseClasses?: Cn[];
    darkClasses?: Cn[];
  }) => {
    const { isDarkMode } = React.useContext(StyleContext);

    const baseKey = baseClasses.join(",");
    const darkKey = darkClasses.join(",");
    const cacheKey = isDarkMode ? `${baseKey},${darkKey}` : baseKey;

    return React.useMemo(() => {
      // First, check the cache
      if (cache.has(cacheKey)) return cache.get(cacheKey);

      const baseStyles = {} as ReturnStyle<
        StyleHandlers,
        InvertClassName<StyleHandlers, Cn>
      > & {
        "--bg-opacity"?: number;
      };
      const darkStyles = {} as ReturnStyle<
        StyleHandlers,
        InvertClassName<StyleHandlers, Cn>
      > & {
        "--bg-opacity"?: number;
      };

      for (let c of baseClasses || []) {
        const m = c.match(/^(.+):(.+)$/); // TODO: Extract regex out of fn
        const prop = m?.[1];
        const value = m?.[2];
        const handler =
          handlers?.[prop as NonSymbol<keyof typeof handlers>] || handlers?.[c];

        // TODO: BUTTON THIS SHIT UP
        if (handler) {
          // @ts-ignore
          Object.assign(baseStyles, handler(value));
        }
      }

      // TODO: DEDUP THIS CODE FROM ABOVE!
      for (let c of darkClasses) {
        const m = c.match(/^(.+):(.+)$/);
        const prop = m?.[1];
        const value = m?.[2];
        const handler =
          handlers?.[prop as NonSymbol<keyof typeof handlers>] || handlers?.[c];

        // TODO: BUTTON THIS SHIT UP
        if (handler) {
          // @ts-ignore
          Object.assign(darkStyles, handler(value));
        }
      }

      const styles = Object.assign(baseStyles, isDarkMode ? darkStyles : {});

      // TODO: BUTTON THIS SHIT UP
      // Massage for bg-opacity
      // @ts-ignore
      if (
        typeof styles["--bg-opacity"] === "number" &&
        // @ts-ignore
        styles?.backgroundColor
      ) {
        // @ts-ignore
        const { r, g, b } = colorStringToRgb(styles.backgroundColor);
        // @ts-ignore
        styles.backgroundColor = `rgba(${r}, ${g}, ${b}, ${styles["--bg-opacity"]})`;
      }
      delete styles["--bg-opacity"];

      // Add in the cache
      cache.set(cacheKey, styles);

      return styles;
    }, [cacheKey]);
  };

  /**
   * Utility to make a styled component
   */
  // TODO: forwardRef, and maybe try to memoize
  const makeStyledComponent = <T, Cn extends ClassName<StyleHandlers>>(
    WrappedComponent: JSXElementConstructor<T>
  ) => {
    const ComponentWithStyles = ({
      styled,
      darkStyled,
      // @ts-ignore
      style,
      ...rest
    }: T & { styled?: Cn[]; darkStyled?: Cn[] }) => {
      const addedStyles = useStyle({
        baseClasses: styled,
        darkClasses: darkStyled,
      });

      return (
        // @ts-ignore
        <WrappedComponent
          {...rest}
          style={[addedStyles, ...[Array.isArray(style) ? style : [style]]]}
        />
      );
    };

    // TODO: Probably give component a displayName

    return ComponentWithStyles;
  };

  return { makeStyledComponent, useStyle };
};
