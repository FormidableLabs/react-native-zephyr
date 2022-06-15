import * as React from "react";
import { Animated } from "react-native";
import { StyleProvider } from "react-native-style-buddy";
import { AppBody } from "./AppBody";

export default function App() {
  const [colorScheme, setColorScheme] = React.useState(
    "light" as "light" | "dark"
  );
  return (
    <StyleProvider>
      <AppBody />
    </StyleProvider>
  );
}
