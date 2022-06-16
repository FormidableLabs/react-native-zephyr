import { createStyleBuddy, extractTwColor } from "react-native-style-buddy";
import { View, Text, TouchableOpacity, Animated, Image } from "react-native";

export const { makeStyledComponent, styles, useStyles } = createStyleBuddy({
  extendTheme: {
    colors: {
      ...extractTwColor({ twColor: "fuchsia", name: "brown" }),
    },
  },
});

export const StyledView = makeStyledComponent(View);
export const StyledText = makeStyledComponent(Text);
export const StyledTouchableOpacity = makeStyledComponent(
  Animated.createAnimatedComponent(TouchableOpacity)
);
export const StyledImage = makeStyledComponent(Image);

const f = styles("bg:brown-300");
