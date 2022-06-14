import * as React from "react";
import { StyledView, StyledText } from "./styled";
import { Text } from "react-native";

export const AppBody = () => {
  return (
    <StyledView styled={["px:8", "py:16", "baz"]}>
      <StyledView styled={["-left:3", "bg:blue-300", "p:12"]}>
        <Text>Hey world</Text>
      </StyledView>
    </StyledView>
  );
};
