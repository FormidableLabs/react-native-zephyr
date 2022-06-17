import * as React from "react";
import { StyleProvider } from "react-native-zephyr";
import { AppBody } from "./AppBody";

export default function App() {
  return (
    <StyleProvider>
      <AppBody />
    </StyleProvider>
  );
}
