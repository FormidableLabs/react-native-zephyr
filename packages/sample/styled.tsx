import * as React from "react";
import { createStyleBuilder, extractTwColor } from "react-native-zephyr";
import { View, Text, TouchableOpacity, Animated, Image } from "react-native";

export const { makeStyledComponent, styles, styled, useStyles } =
  createStyleBuilder({
    extendTheme: () => ({
      colors: {
        ...extractTwColor({ twColor: "fuchsia", name: "brown" }),
      },
    }),
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
  });

  return <View style={styles} />;
};
