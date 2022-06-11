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
  const [colorScheme, setColorScheme] = React.useState(
    "light" as "light" | "dark"
  );

  const startAnim = React.useCallback(() => {
    setColorScheme((v) => (v === "light" ? "dark" : "light"));

    x.setValue(0);
    Animated.timing(x, {
      toValue: 300,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <StyleProvider colorScheme={colorScheme}>
      <StyledSafeAreaView
        styled={[
          "bg:red-200",
          "flex:1",
          "items:center",
          "justify:center",
          "p:6",
        ]}
        darkStyled={["bg:red-800"]}
      >
        <StyledTouchableOpacity
          styled={[
            "p:6",
            "bg:pink-200",
            "bg-opacity:80",
            "rounded:lg",
            "border:1",
            "border-color:red-500",
            "shadow:2xl",
          ]}
          darkStyled={["bg:pink-800"]}
          accessibilityHint="Just to show you the rest of props are here"
          onPress={startAnim}
          style={{ transform: [{ translateY: x }] }}
        >
          <StyledText
            styled={["color:gray-800", "font-weight:bold", "italic"]}
            darkStyled={["color:gray-200"]}
          >
            Open up App.tsx to start working on your app!
          </StyledText>
        </StyledTouchableOpacity>
      </StyledSafeAreaView>
    </StyleProvider>
  );
}
