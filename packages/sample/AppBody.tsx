import * as React from "react";
import { StyledView, StyledText } from "./styled";

export const AppBody = () => {
  return (
    <StyledView styled={["flex:1", "justify:center", "items:center"]}>
      <StyledView
        styled={[
          "p:5",
          "shadow:2xl",
          "border:hairline",
          "rounded:lg",
          "bg:blue-100",
        ]}
      >
        <StyledText styled={["text:3xl", "color:purple-600"]}>
          Hello world!
        </StyledText>
      </StyledView>
    </StyledView>
  );
};
