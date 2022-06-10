import * as React from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import {
  createStyleBuilder,
  defaultHandlers,
  StyleProvider,
} from "rn-styler-core";

const { makeStyledComponent } = createStyleBuilder({
  handlers: defaultHandlers,
});

const StyledView = makeStyledComponent(View);
const StyledTouchableOpacity = makeStyledComponent(TouchableOpacity);
const StyledText = makeStyledComponent(Text);
const StyledSafeAreaView = makeStyledComponent(SafeAreaView);

export default function App() {
  const [colorScheme, setColorScheme] = React.useState(
    "light" as "light" | "dark"
  );

  console.log(colorScheme);

  return (
    <StyleProvider colorScheme={colorScheme}>
      <StyledSafeAreaView
        bg="red-200"
        bg__dark="red-800"
        flex="1"
        items="center"
        justify="center"
        p="6"
      >
        <StyledTouchableOpacity
          p="6"
          bg="pink-200"
          bg__dark="pink-800"
          bg-opacity="80"
          rounded="lg"
          border="1"
          border-color="red-500"
          shadow="2xl"
          accessibilityHint="Just to show you the rest of props are here"
          onPress={() => {
            setColorScheme((v) => (v === "light" ? "dark" : "light"));
          }}
        >
          <StyledText color="gray-800" color__dark="gray-300">
            Open up App.tsx to start working on your app!
          </StyledText>
        </StyledTouchableOpacity>
      </StyledSafeAreaView>
    </StyleProvider>
  );
}
