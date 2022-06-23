import * as React from "react";
import { Text, TouchableOpacity } from "react-native";
import { styled, StyledImage, StyledText, StyledView } from "./styled";

export const AppBody = () => {
  const [isPrimary, setIsPrimary] = React.useState(false);

  return (
    <StyledView classes={["flex:1", "justify:center", "items:center"]}>
      <StyledImage
        source={require("./bg.jpg")}
        classes={["absolute", "w:full", "h:full", "resize:cover"]}
      />
      <MyTouchable
        isPrimary={isPrimary}
        onPress={() => {
          setIsPrimary((v) => !v);
        }}
      >
        <StyledText classes={["text:lg", "color:gray-200", "leading:loose"]}>
          Hello world! This text is going to be long because the quick brown fox
          jumped over the lazy dog
        </StyledText>
        <MyText isPrimary={true} numberOfLines={3}>
          Hello world! This text is going to be long because the quick brown fox
          jumped over the lazy dog
        </MyText>
      </MyTouchable>
    </StyledView>
  );
};

const MyTouchable = styled(TouchableOpacity)<{ isPrimary?: boolean }>({
  classes: ({ isPrimary }) => [
    "px:8",
    "py:6",
    "rounded:lg",
    "shadow:2xl",
    "bg-opacity:50",
    isPrimary && "bg:gray-700",
  ],
});

const MyText = styled(Text)<{ isPrimary?: boolean }>({
  classes: ({ isPrimary }) => ["text:4xl", isPrimary && "color:red-200"],
  darkClasses: ({ isPrimary }) => [isPrimary && "color:red-800"],
});
