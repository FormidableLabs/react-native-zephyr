import * as React from "react";
import { StyledText, StyledView, styles } from "../styled";
import { SafeAreaView } from "react-native";
import { DefaultTheme } from "react-native-zephyr";

export const DefaultOpacities = () => {
  return (
    <StyledView classes={["flex:1", "bg:gray-300"]}>
      <SafeAreaView style={styles("flex:1", "flex:row")}>
        {Object.keys(DefaultTheme.opacities).map((key) => (
          <StyledView
            key={key}
            style={styles(
              "flex:1",
              "bg:purple-800",
              // @ts-ignore
              `bg-opacity:${key}`,
              "justify:center",
              "items:center"
            )}
          >
            <StyledText classes={["font-weight:bold"]}>{key}</StyledText>
          </StyledView>
        ))}
      </SafeAreaView>
    </StyledView>
  );
};
