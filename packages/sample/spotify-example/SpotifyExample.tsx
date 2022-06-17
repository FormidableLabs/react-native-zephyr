import * as React from "react";
import {
  StyledSafeAreaView,
  StyledScrollView,
  StyledView,
  useStyles,
} from "./styles";
import { Tabs } from "./Tabs";
import { NowPlaying } from "./NowPlaying";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Header } from "./Header";
import { RecentlyPlayed } from "./RecentlyPlayed";

export const SpotifyExample = () => {
  return (
    <SafeAreaProvider>
      <SpotifyExampleBody />
    </SafeAreaProvider>
  );
};

const SpotifyExampleBody = () => {
  const { top } = useSafeAreaInsets();
  const p = useStyles({ classes: ["flex:1", "p:2"] });

  return (
    <StyledView classes={["flex:1", "bg:gray-800"]}>
      <StyledScrollView contentContainerStyle={[p, { paddingTop: top }]}>
        <Header />
        <StyledView classes={["h:1"]} />
        <RecentlyPlayed />
      </StyledScrollView>
      <StyledView classes={["absolute", "bottom:0", "inset-x:0"]}>
        <NowPlaying />
        <StyledSafeAreaView classes={["bg:black", "bg-opacity:50"]}>
          <Tabs />
        </StyledSafeAreaView>
      </StyledView>
    </StyledView>
  );
};
