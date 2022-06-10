import * as React from "react";
import { useColorScheme } from "react-native";

export const StyleContext = React.createContext({ isDarkMode: false });

export const StyleProvider = ({ children }: React.PropsWithChildren) => {
  const colorScheme = useColorScheme();

  const value = React.useMemo(() => {
    return {
      isDarkMode: colorScheme === "dark",
    };
  }, [colorScheme]);

  return (
    <StyleContext.Provider value={value}>{children}</StyleContext.Provider>
  );
};
