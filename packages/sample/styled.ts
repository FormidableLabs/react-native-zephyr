import { createStyleBuddy } from "react-native-style-buddy";
import { View, Text, TouchableOpacity } from "react-native";

export const { makeStyledComponent, styles } = createStyleBuddy({});

export const StyledView = makeStyledComponent(View);
export const StyledText = makeStyledComponent(Text);
export const StyledTouchableOpacity = makeStyledComponent(TouchableOpacity);

const f = styles("p:3", 3 > 2 ? "px:4" : "py:12");
