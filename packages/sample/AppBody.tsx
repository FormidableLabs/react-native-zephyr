import * as React from "react";
import { View, Text, SafeAreaView, Animated } from "react-native";
import { DefaultColors } from "./components/DefaultColors";
import { DefaultBorderSizes } from "./components/DefaultBorderSizes";
import {
  StyledText,
  StyledTouchableOpacity,
  StyledView,
  styles,
} from "./styled";
import { DefaultOpacities } from "./components/DefaultOpacities";
import { DefaultBorderRadii } from "./components/DefaultBorderRadii";
import { DefaultFontSizes } from "./components/defaultFontSizes";
import { DefaultFontWeights } from "./components/DefaultFontWeights";
import { DefaultShadows } from "./components/DefaultShadows";
import { DefaultAspectRatios } from "./components/DefaultAspectRatios";

export const AppBody = () => {
  return (
    <StyledView
      classes={["flex:1", "bg:purple-100", "justify:center", "items:center"]}
      darkClasses={["bg:purple-800"]}
    >
      <StyledText
        classes={["text:5xl", "color:gray-800"]}
        darkClasses={["text:6xl", "color:gray-100"]}
      >
        Hey world
      </StyledText>
    </StyledView>
  );
  // return <DefaultColors />;
  // return <DefaultOpacities />;
  // return <DefaultBorderSizes />;
  // return <DefaultBorderRadii />;
  // return <DefaultFontSizes />;
  // return <DefaultFontWeights />;
  // return <DefaultShadows />;
  // return <DefaultAspectRatios />;
};
