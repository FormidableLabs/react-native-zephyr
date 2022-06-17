import * as React from "react";
import { StyledImage, StyledText, StyledView } from "./styled";

export const AppBody = () => {
  return (
    <StyledView classes={["flex:1", "justify:center", "items:center"]}>
      <StyledImage
        source={require("./bg.png")}
        classes={["absolute", "inset:0", "resize:cover"]}
      />
      <StyledView
        classes={[
          "px:8",
          "py:6",
          "bg:gray-500",
          "rounded:lg",
          "shadow:lg",
          "bg-opacity:50",
        ]}
      >
        <StyledText classes={["text:5xl", "color:gray-200"]}>
          Hey world
        </StyledText>
      </StyledView>
    </StyledView>
  );
};
