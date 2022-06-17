import * as React from "react";
import { SafeAreaView } from "react-native";
import {
  StyledSafeAreaView,
  StyledScrollView,
  StyledText,
  StyledView,
  styles,
  useStyles,
} from "./styles";
import { Ionicons } from "@expo/vector-icons";

export const SpotifyExample = () => {
  // const { top, bottom } = useSafeAreaInsets();
  const p = useStyles({ classes: ["bg:green-300", "flex:1"] });

  return (
    <StyledView style={styles("flex:1", "bg:red-300")}>
      <StyledScrollView contentContainerStyle={p}></StyledScrollView>
      <StyledView classes={["absolute", "bottom:0", "inset-x:0"]}>
        <NowPlaying />
        <StyledSafeAreaView classes={["bg:black", "bg-opacity:50"]}>
          <Tabs />
        </StyledSafeAreaView>
      </StyledView>
    </StyledView>
  );
};

const TABS;
const Tabs = () => {
  return <StyledText>Bottom bar</StyledText>;
};

const NowPlaying = () => {
  return <StyledText>Now playing</StyledText>;
};
