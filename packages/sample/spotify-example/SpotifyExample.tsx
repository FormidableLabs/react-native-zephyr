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
import { ComponentProps } from "react";
import { DefaultConstraints } from "react-native-style-buddy";

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

const TABS: { title: string; icon: ComponentProps<typeof Ionicons>["name"] }[] =
  [
    { title: "Home", icon: "ios-home" },
    { title: "Search", icon: "search" },
    { title: "Your Library", icon: "library" },
  ];
const Tabs = () => {
  return (
    <StyledView classes={["flex:row", "justify:between", "px:3"]}>
      {TABS.map(({ title, icon }) => (
        <StyledView key={title} classes={["p:2", "items:center"]}>
          <Ionicons
            name={icon}
            size={20}
            color={DefaultConstraints.colors.white}
          />
          <StyledText>{title}</StyledText>
        </StyledView>
      ))}
    </StyledView>
  );
};

const NowPlaying = () => {
  return <StyledText>Now playing</StyledText>;
};
