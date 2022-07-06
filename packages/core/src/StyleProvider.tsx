import * as React from "react";

type StyleProviderProps = {
  colorScheme?: "light" | "dark" | "auto";
};

/**
 * TODO: Deprecate this. No longer needed, but leaving for now.
 */
export const StyleProvider = ({
  children,
}: React.PropsWithChildren<StyleProviderProps>) => {
  return <>{children}</>;
};
