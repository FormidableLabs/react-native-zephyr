import * as React from "react";
import { DefaultConstraints } from "react-native-style-buddy";
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
  const scrollViewStyles = useStyles({ baseClasses: ["py:4", "px:10"] });
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
    styled={["flex:1", "flex:row", "items:center", "justify:between", "mb:4"]}
  >
    {getColors(color).map(([key, color]) => (
      <StyledView key={key} styled={["items:center"]}>
        <StyledText
          styled={["font-weight:bold", "text-align:center", "text:xs"]}
        >
          {key}
        </StyledText>
        <StyledView styled={["h:2"]} />
        {/* @ts-ignore */}
        <StyledView styled={["w:14", "h:8", "shadow:md", `bg:${key}`]} />
        <StyledView styled={["h:2"]} />
        <StyledView styled={["text-align:center"]} />
      </StyledView>
    ))}
  </StyledView>
);
