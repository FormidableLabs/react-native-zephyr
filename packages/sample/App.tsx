import * as React from "react";
import { StyleProvider } from "react-native-style-buddy";
import { AppBody } from "./AppBody";

export default function App() {
  return (
    <StyleProvider>
      <AppBody />
    </StyleProvider>
  );
}
