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
   * Fundamental styling function, used by the useStyle hook
   */
  const styled = <Cn extends ClassName<StyleHandlers>>(...classNames: Cn[]) => {
    const cacheKey = classNames.join(",");

    const styles = {} as ReturnStyle<
      StyleHandlers,
      InvertClassName<StyleHandlers, Cn>
    > & {
      "--bg-opacity"?: number;
    };

    // First, check the cache
    if (cache.has(cacheKey)) return cache.get(cacheKey);

    // Start to aggregate styles
    for (let c of classNames || []) {
      const m = c.match(/^(.+):(.+)$/); // TODO: Extract regex out of fn
      const prop = m?.[1];
      const value = m?.[2];
      const handler =
        handlers?.[prop as NonSymbol<keyof typeof handlers>] || handlers?.[c];

      // TODO: BUTTON THIS SHIT UP
      if (handler) {
        // @ts-ignore
        Object.assign(styles, handler(value));
      }
    }

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
  };

  /**
   * Core hook to apply styles based on props/style object
   */
  const useStyled = <Cn extends ClassName<StyleHandlers>>({
    baseClasses = [],
    darkClasses = [],
  }: {
    baseClasses?: Cn[];
    darkClasses?: Cn[];
  }) => {
    const { isDarkMode } = React.useContext(StyleContext);
    const classes = baseClasses.concat(isDarkMode ? darkClasses : []);
    const cacheKey = classes.join(",");

    return React.useMemo(() => styled(...classes), [cacheKey]);
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
      const addedStyles = useStyled({
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

  return { styled, useStyle: useStyled, makeStyledComponent };
};
