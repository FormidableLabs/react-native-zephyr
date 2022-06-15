import * as React from "react";
import { StyledView, StyledText } from "../styled";
import { DefaultConstraints } from "react-native-style-buddy";

export const DefaultBorderSizes = () => {
  return (
    <StyledView
      styled={[
        "flex:1",
        "flex:row",
        "items:center",
        "justify:between",
        "px:20",
      ]}
    >
      {Object.keys(DefaultConstraints.borderSizes).map((key) => (
        <StyledView key={key} styled={["items:center"]}>
          <StyledText styled={["text:sm", "color:gray-600"]}>
            border:{key}
          </StyledText>
          <StyledView
            styled={[
              "rounded:lg",
              "bg:white",
              "border-color:purple-700",
              // @ts-ignore
              `border:${key}`,
              "w:20",
              "h:20",
              "justify:center",
              "items:center",
            ]}
          >
            <StyledText>{key}</StyledText>
          </StyledView>
        </StyledView>
      ))}
    </StyledView>
  );
};
