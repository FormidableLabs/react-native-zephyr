import * as React from "react";
import { StyledView, StyledText } from "./styled";
import { Text } from "react-native";

export const AppBody = () => {
  return (
    <StyledView styled={["px:8", "py:16"]}>
      <StyledView
        styled={[
          "-left:3",
          "bg:blue-300",
          "bg-opacity:30",
          "p:12",
          "rounded:2xl",
          "shadow:lg",
        ]}
      >
        <StyledText styled={["text:2xl", "font-weight:bold"]}>
          Hello world!
        </StyledText>
      </StyledView>
    </StyledView>
  );
};
