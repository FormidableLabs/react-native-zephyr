import { createStyleBuilder, extractTwColor } from "react-native-zephyr";
import { View, Text, TouchableOpacity, Animated, Image } from "react-native";

export const { makeStyledComponent, styles, styled, useStyles } =
  createStyleBuilder({
    extendTheme: () => ({
      colors: {
        ...extractTwColor({ twColor: "fuchsia", name: "brown" }),
      },
    }),
    breakpoints: {
      sm: 300,
      md: 450,
      lg: 600,
    },
    // baseFontSize: 20,
  });

export const StyledView = makeStyledComponent(View);
export const StyledText = makeStyledComponent(Text);
export const StyledTouchableOpacity = makeStyledComponent(
  Animated.createAnimatedComponent(TouchableOpacity)
);
export const StyledImage = makeStyledComponent(Image);

export const MyComp = () => {
  const styles = useStyles({
    classes: ["p:1"],
    smClasses: ["p:2"],
    mdClasses: ["p:4"],
    lgClasses: ["p:40"],
  });

  return <View style={styles} />;
};
