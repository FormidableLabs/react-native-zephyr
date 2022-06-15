import * as React from "react";
import { useColorScheme } from "react-native";

export const StyleContext = React.createContext({
  isDarkMode: false,
});

type StyleProviderProps = {
  colorScheme?: "light" | "dark" | "auto";
};

export const StyleProvider = ({
  children,
  colorScheme = "auto",
}: React.PropsWithChildren<StyleProviderProps>) => {
  const systemColorScheme = useColorScheme();

  const value = React.useMemo<React.ContextType<typeof StyleContext>>(() => {
    return {
      isDarkMode:
        colorScheme === "dark" ||
        (colorScheme === "auto" && systemColorScheme === "dark"),
    };
  }, [colorScheme, systemColorScheme]);

  return (
    <StyleContext.Provider value={value}>{children}</StyleContext.Provider>
  );
};
