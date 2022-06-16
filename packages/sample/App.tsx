import * as React from "react";
import { Animated } from "react-native";
import { StyleProvider } from "react-native-style-buddy";
import { AppBody } from "./AppBody";

export default function App() {
  return (
    <StyleProvider>
      <AppBody />
    </StyleProvider>
  );
}
