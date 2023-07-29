import { FC, useCallback, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import PerfTestComponent from "./components/PerfTestComponent";
import PerfTestComponentBaseline from "./components/PerfTestComponentBaseline";
import TimedRender from "./components/TimedRender";
import {
  StyledImage,
  StyledText,
  StyledTouchableOpacity,
  StyledView,
  styled,
} from "./styled";

type PerformanceTestType = "React Native" | "Zephyr";

export const AppBody = () => {
  const [isPrimary, setIsPrimary] = useState(false);
  const [styleType, setStyleType] = useState<PerformanceTestType | undefined>(
    undefined
  );

  const onStyleTypePress = useCallback(
    (type: PerformanceTestType) => setStyleType(type),
    []
  );

  const renderPerfTest = useCallback(() => {
    switch (styleType) {
      case "React Native":
        return <PerfTestComponentBaseline />;
      case "Zephyr":
        return <PerfTestComponent />;
      default:
        return null;
    }
  }, [styleType]);

  return (
    <StyledView classes={["flex:1", "justify:center", "items:center"]}>
      <StyledImage
        source={require("./bg.jpg")}
        classes={["absolute", "w:full", "h:full", "resize:cover"]}
      />
      <MyTouchable
        isPrimary={isPrimary}
        onPress={() => {
          setIsPrimary((v) => !v);
        }}
      >
        <StyledText classes={["text:lg", "color:gray-200", "leading:loose"]}>
          Hello world! This text is going to be long because the quick brown fox
          jumped over the lazy dog
        </StyledText>
        <MyText isPrimary={true} numberOfLines={3}>
          Hello world! This text is going to be long because the quick brown fox
          jumped over the lazy dog
        </MyText>
      </MyTouchable>

      <StyledView
        classes={[
          "bg:white",
          "bg-opacity:80",
          "p:3",
          "m:3",
          "rounded:xl",
          "justify:center",
          "items:center",
          "overflow:hidden",
        ]}
        style={{ rowGap: 24 }}
      >
        <StyledText
          classes={[
            "text:3xl",
            "color:indigo-600",
            "leading:loose",
            "font-weight:medium",
          ]}
        >
          Rendering performance test
        </StyledText>
        <StyledView classes={["flex:row"]}>
          <PerfTestButton
            label="React Native"
            onPress={() => onStyleTypePress("React Native")}
          />
          <PerfTestButton
            label="Zephyr"
            onPress={() => onStyleTypePress("Zephyr")}
          />
        </StyledView>

        {styleType ? (
          <TimedRender key={styleType}>
            <StyledText
              classes={["text:sm", "color:gray-600", "font-weight:semibold"]}
            >
              Rendered with {styleType}
            </StyledText>
          </TimedRender>
        ) : null}
        {renderPerfTest()}
      </StyledView>
    </StyledView>
  );
};

const MyTouchable = styled(TouchableOpacity)<{ isPrimary?: boolean }>({
  classes: ({ isPrimary }) => [
    "px:8",
    "py:6",
    "rounded:lg",
    "shadow:2xl",
    "bg-opacity:50",
    isPrimary && "bg:gray-700",
  ],
});

const MyText = styled(Text)<{ isPrimary?: boolean }>({
  classes: ({ isPrimary }) => ["text:4xl", isPrimary && "color:red-200"],
  darkClasses: ({ isPrimary }) => [isPrimary && "color:red-800"],
});

const PerfTestButton: FC<{ label: string; onPress: () => void }> = ({
  label,
  onPress,
}) => (
  <StyledTouchableOpacity
    classes={[
      "px:3",
      "py:3",
      "mx:3",
      "rounded:lg",
      "shadow:2xl",
      "bg:indigo-600",
    ]}
    onPress={onPress}
  >
    <StyledText classes={["color:white"]}>{label}</StyledText>
  </StyledTouchableOpacity>
);
