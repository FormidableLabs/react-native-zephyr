import * as React from "react";
import { Animated } from "react-native";
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
const StyledTouchableOpacity = makeStyledComponent(
  Animated.createAnimatedComponent(TouchableOpacity)
);
const StyledText = makeStyledComponent(Text);
const StyledSafeAreaView = makeStyledComponent(SafeAreaView);

export default function App() {
  const x = React.useRef(new Animated.Value(0)).current;

  const startAnim = React.useCallback(() => {
    x.setValue(0);
    Animated.timing(x, {
      toValue: 300,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, []);

  const [colorScheme, setColorScheme] = React.useState(
    "light" as "light" | "dark"
  );

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
          onPress={startAnim}
          style={{ transform: [{ translateY: x }] }}
        >
          <StyledText color="gray-800" color__dark="gray-300">
            Open up App.tsx to start working on your app!
          </StyledText>
        </StyledTouchableOpacity>
      </StyledSafeAreaView>
    </StyleProvider>
  );
}
