import * as React from "react";
import { StyledImage, StyledText, StyledView } from "./styled";
import { DefaultTracking } from "./components/DefaultTracking";
import { DefaultLeading } from "./components/DefaultLeading";

export const AppBody = () => {
  return <DefaultLeading />;
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
        <StyledText
          classes={["color:gray-200", "text:tiny", "tracking:widest"]}
        >
          Subcaption
        </StyledText>
      </StyledView>
    </StyledView>
  );
};
