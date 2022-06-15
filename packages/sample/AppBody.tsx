import * as React from "react";
import { View, Text } from "react-native";
import { createStyleBuddy } from "react-native-style-buddy";

const { makeStyledComponent } = createStyleBuddy({});

export const StyledView = makeStyledComponent(View);
export const StyledText = makeStyledComponent(Text);

export const AppBody = () => {
  return (
    <StyledView styled={["flex:1", "justify:center", "items:center"]}>
      <StyledText
        styled={["text:3xl", "color:re"]}
        darkStyled={["color:red-300"]}
      >
        Hello world!
      </StyledText>
    </StyledView>
  );
};
