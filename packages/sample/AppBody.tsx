import * as React from "react";
import { StyledView, StyledText } from "./styled";

export const AppBody = () => {
  return (
    <StyledView
      styled={["flex:1", "justify:center", "items:center", "bg:purple-300"]}
    >
      <StyledView
        styled={[
          "p:5",
          "shadow:2xl",
          "border:hairline",
          "rounded:lg",
          "bg:pink-200",
          "opacity:75",
        ]}
      >
        <StyledText styled={["text:4xl", "color:purple-600", "fon"]}>
          Hello world!
        </StyledText>
      </StyledView>
    </StyledView>
  );
};
