import { StyleHandlerSet, StyleProps, Undarken } from "./types";
import type { JSXElementConstructor } from "react";

const undarken = <T extends string>(name: T) =>
  name.replace(/^dark:/, "") as Undarken<T>;

export const createStyleBuilder = <StyleHandlers extends StyleHandlerSet>({
  handlers,
}: {
  handlers: StyleHandlers;
}) => {
  const useStyle = <P extends StyleProps<StyleHandlers>>(args: P) => {};

  // Utility to make a styled component
  const makeStyledComponent = <T,>(
    WrappedComponent: JSXElementConstructor<T>
  ) => {
    const ComponentWithStyles = <P extends StyleProps<StyleHandlers>>({
      style,
      ...rest
    }: Omit<T, keyof P> & P) => {
      const aggedStyles = (() => {
        const keys = [];
        for (const key in rest) {
          const ukey = undarken(key);
          if (ukey in handlers) {
            keys.push(key);
          }
        }

        return keys;
      })();

      console.log(aggedStyles);

      // @ts-ignore
      return <WrappedComponent {...rest} />;
    };

    return ComponentWithStyles;
  };

  return { makeStyledComponent, useStyle };
};
