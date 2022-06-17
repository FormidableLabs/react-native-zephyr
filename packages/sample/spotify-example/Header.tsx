import * as React from "react";
import { StyledIcon, StyledText, StyledView } from "./styles";
import { ComponentProps } from "react";

export const Header = () => {
  return (
    <StyledView
      classes={["p:3", "flex:row", "justify:between", "items:center"]}
    >
      <StyledText classes={["text:2xl", "color:white", "font-weight:bold"]}>
        Good morning
      </StyledText>
      <StyledView classes={["flex:row", "items:center"]}>
        {Icons.map((name) => (
          <StyledIcon
            key={name}
            name={name}
            classes={["color:white", "px:1.5"]}
            size={22}
          />
        ))}
      </StyledView>
    </StyledView>
  );
};

const Icons: ComponentProps<typeof StyledIcon>["name"][] = [
  "notifications-outline",
  "time-outline",
  "cog",
];
