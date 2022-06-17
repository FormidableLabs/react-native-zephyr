import {
  StyledText,
  StyledTouchableOpacity,
  StyledView,
  theme,
} from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import * as React from "react";

export const Tabs = () => {
  return (
    <StyledView classes={["flex:row", "justify:between", "px:8"]}>
      {TABS.map(({ title, icon }, i) => (
        <StyledTouchableOpacity
          key={title}
          classes={["pt:3", "pb:2", "items:center"]}
        >
          <Ionicons name={icon} size={22} color={theme.colors.white} />
          <StyledText
            classes={[
              "color:white",
              "text:xs",
              "mt:2",
              { "font-weight:bold": i === 0 },
            ]}
          >
            {title}
          </StyledText>
        </StyledTouchableOpacity>
      ))}
    </StyledView>
  );
};
const TABS: { title: string; icon: ComponentProps<typeof Ionicons>["name"] }[] =
  [
    { title: "Home", icon: "ios-home" },
    { title: "Search", icon: "search" },
    { title: "Your Library", icon: "library" },
  ];
