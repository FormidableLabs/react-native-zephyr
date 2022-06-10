import * as React from "react";
import { BeefedStyleHandlerSet, StyleHandlerSet, StyleProps } from "./types";
import type { JSXElementConstructor } from "react";
import { StyleContext } from "./StyleProvider";
import { colorStringToRgb } from "./utils/colorStringToRgb";

const darkReg = /^(.*)__dark$/;
const isDark = <T extends string>(name: T) => darkReg.test(name);

export const createStyleBuilder = <StyleHandlers extends StyleHandlerSet>({
  handlers: _handlers,
}: {
  handlers: StyleHandlers;
}) => {
  const handlers = Object.assign(
    {},
    _handlers
  ) as BeefedStyleHandlerSet<StyleHandlers>;

  for (const key in _handlers) {
    // @ts-ignore
    handlers[`${key}__dark`] = handlers[key];
  }

  const useStyle = <P extends StyleProps<StyleHandlers>>(styleProps: P) => {
    const { isDarkMode } = React.useContext(StyleContext);

    return React.useMemo(() => {
      const baseStyles = {};
      const darkStyles = {};

      for (const key in styleProps) {
        if (key in handlers) {
          Object.assign(
            isDark(key) ? darkStyles : baseStyles,
            handlers[key](styleProps[key])
          );
        }
      }

      const styles = Object.assign(
        baseStyles,
        isDarkMode ? darkStyles : {}
      ) as Record<string, unknown>;

      // Massage for bg-opacity
      if (
        typeof styles["--bg-opacity"] === "number" &&
        typeof styles.backgroundColor === "string"
      ) {
        const { r, g, b } = colorStringToRgb(styles.backgroundColor);
        styles.backgroundColor = `rgba(${r}, ${g}, ${b}, ${styles["--bg-opacity"]})`;
      }
      delete styles["--bg-opacity"];

      return styles;
    }, [styleProps]);
  };

  // Utility to make a styled component
  const makeStyledComponent = <T,>(
    WrappedComponent: JSXElementConstructor<T>
  ) => {
    const ComponentWithStyles = <P extends StyleProps<StyleHandlers>>({
      style,
      ...rest
    }: Omit<T, keyof P> & P) => {
      // TODO: Filter out non-applicable props?
      // @ts-ignore
      const addedStyles = useStyle(rest);

      return (
        // @ts-ignore
        <WrappedComponent
          {...rest}
          style={[addedStyles, ...[Array.isArray(style) ? style : [style]]]}
        />
      );
    };

    return ComponentWithStyles;
  };

  return { makeStyledComponent, useStyle };
};
