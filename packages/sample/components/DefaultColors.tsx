import * as React from "react";
import { DefaultConstraints } from "react-native-zephyr";
import { ScrollView } from "react-native";
import { useStyles, StyledView, StyledText } from "../styled";

const getColors = (key: string) => {
  const r = new RegExp(`${key}`);
  return Object.keys(DefaultConstraints.colors)
    .filter((k) => r.test(k))
    .map((k) => [
      k,
      DefaultConstraints.colors[k as keyof typeof DefaultConstraints.colors],
    ]);
};

export const DefaultColors = () => {
  const scrollViewStyles = useStyles({ classes: ["py:4", "px:10"] });
  return (
    <ScrollView contentContainerStyle={scrollViewStyles}>
      <ColorList color="gray" />
      <ColorList color="red" />
      <ColorList color="green" />
      <ColorList color="blue" />
      <ColorList color="indigo" />
      <ColorList color="purple" />
      <ColorList color="pink" />
    </ScrollView>
  );
};

const ColorList = ({ color }: { color: string }) => (
  <StyledView
    classes={["flex:1", "flex:row", "items:center", "justify:between", "mb:4"]}
  >
    {getColors(color).map(([key]) => (
      <StyledView key={key} classes={["items:center"]}>
        <StyledText
          classes={["font-weight:bold", "text-align:center", "text:xs"]}
        >
          {key}
        </StyledText>
        <StyledView classes={["h:2"]} />
        {/* @ts-ignore */}
        <StyledView classes={["w:14", "h:8", "shadow:md", `bg:${key}`]} />
        <StyledView classes={["h:2"]} />
        <StyledView classes={["text-align:center"]} />
      </StyledView>
    ))}
  </StyledView>
);
