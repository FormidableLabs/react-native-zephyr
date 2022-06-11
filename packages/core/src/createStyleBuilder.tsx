import * as React from "react";
import { BeefedStyleHandlerSet, StyleHandlerSet, StyleProps } from "./types";
import type { JSXElementConstructor } from "react";
import { StyleContext } from "./StyleProvider";
import { colorStringToRgb } from "./utils/colorStringToRgb";

const darkReg = /^(.*)__dark$/;
const isDark = <T extends string>(name: T) => darkReg.test(name);

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

  for (const key in _handlers) {
    // @ts-ignore
    handlers[`${key}__dark`] = handlers[key];
  }

  /**
   * Core hook to apply styles based on props/style object
   */
  const useStyle = <P extends StyleProps<StyleHandlers>>(styleProps: P) => {
    const { isDarkMode } = React.useContext(StyleContext);

    return React.useMemo(() => {
      const baseStyles = {};
      const darkStyles = {};

      // Build out base/dark styles using handler fn's
      for (const key in styleProps) {
        if (key in handlers) {
          Object.assign(
            isDark(key) ? darkStyles : baseStyles,
            handlers[key](styleProps[key])
          );
        }
      }

      // Our end-result styles are base + (dark if necessary)
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

  /**
   * Utility to make a styled component
   */
  // TODO: forwardRef, and maybe try to memoize
  const makeStyledComponent = <T,>(
    WrappedComponent: JSXElementConstructor<T>
  ) => {
    const ComponentWithStyles = <P extends StyleProps<StyleHandlers>>(
      props: Omit<T, keyof P> & P
    ) => {
      const ref = React.useRef(null);
      const styleProps = {};
      const componentProps = {};

      for (const key in props) {
        if (key in handlers) {
          // @ts-ignore
          styleProps[key] = props[key];
        } else {
          // @ts-ignore
          componentProps[key] = props[key];
        }
      }

      // TODO: Filter out non-applicable props?
      // @ts-ignore
      const addedStyles = useStyle(styleProps);

      // @ts-ignore
      ref.current?.setNativeProps?.(addedStyles);

      return (
        // @ts-ignore
        <WrappedComponent
          ref={ref}
          {...componentProps}
          // style={[addedStyles, ...[Array.isArray(style) ? style : [style]]]}
        />
      );
    };

    return ComponentWithStyles;
  };

  return { makeStyledComponent, useStyle };
};
