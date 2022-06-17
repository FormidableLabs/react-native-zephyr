import { createStyleBuilder } from "react-native-zephyr";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const { styles, useStyles, makeStyledComponent, theme } =
  createStyleBuilder({
    extendTheme: {},
  });

export const StyledView = makeStyledComponent(View);
export const StyledTouchableOpacity = makeStyledComponent(TouchableOpacity);
export const StyledText = makeStyledComponent(Text);
export const StyledScrollView = makeStyledComponent(ScrollView);
export const StyledSafeAreaView = makeStyledComponent(SafeAreaView);
export const StyledIcon = makeStyledComponent(Ionicons);
