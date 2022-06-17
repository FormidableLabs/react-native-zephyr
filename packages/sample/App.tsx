import * as React from "react";
import { StyleProvider } from "react-native-zephyr";
import { SpotifyExample } from "./spotify-example/SpotifyExample";

export default function App() {
  return (
    <StyleProvider>
      <SpotifyExample />
    </StyleProvider>
  );
}
