import * as React from "react";
import { Animated } from "react-native";
import { StyleProvider } from "rn-styler-core";
import { AppBody } from "./AppBody";

export default function App() {
  const [colorScheme, setColorScheme] = React.useState(
    "light" as "light" | "dark"
  );
  return (
    <StyleProvider colorScheme={colorScheme}>
      <AppBody />
    </StyleProvider>
  );
}
