import * as React from "react";
import { StyledImage, StyledText, StyledView } from "./styled";
import { DefaultTracking } from "./components/DefaultTracking";

export const AppBody = () => {
  return <DefaultTracking />;
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
        <StyledText classes={["text:5xl", "color:gray-200"]}>
          Hello world!
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
