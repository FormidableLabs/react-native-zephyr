import * as React from "react";
import { View, Text } from "react-native";
import { styled, StyledImage, StyledText, StyledView } from "./styled";

export const AppBody = () => {
  return (
    <StyledView classes={["flex:1", "justify:center", "items:center"]}>
      <StyledImage
        source={require("./bg.jpg")}
        classes={["absolute", "w:full", "h:full", "resize:cover"]}
      />
      <StyledView
        classes={[
          "px:8",
          "py:6",
          "bg:gray-900",
          "rounded:lg",
          "shadow:2xl",
          "bg-opacity:50",
        ]}
      >
        <StyledText classes={["text:lg", "color:gray-200", "leading:loose"]}>
          Hello world! This text is going to be long because the quick brown fox
          jumped over the lazy dog
        </StyledText>
        <MyText isPrimary={true} numberOfLines={3}>
          Hello world! This text is going to be long because the quick brown fox
          jumped over the lazy dog
        </MyText>
      </StyledView>
    </StyledView>
  );
};

const MyText = styled(Text)<{ isPrimary?: boolean }>({
  classes: ({ isPrimary }) => ["text:4xl", isPrimary && "color:red-200"],
  darkClasses: ({ isPrimary }) => [isPrimary && "color:red-800"],
});
