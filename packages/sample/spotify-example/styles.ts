import { createStyleBuddy } from "react-native-style-buddy";
import { View, Text, ScrollView, SafeAreaView } from "react-native";

export const { styles, useStyles, makeStyledComponent } = createStyleBuddy({});

export const StyledView = makeStyledComponent(View);
export const StyledText = makeStyledComponent(Text);
export const StyledScrollView = makeStyledComponent(ScrollView);
export const StyledSafeAreaView = makeStyledComponent(SafeAreaView);
