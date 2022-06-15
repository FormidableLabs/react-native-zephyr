import * as React from "react";
import { StyledView, StyledText, StyledTouchableOpacity } from "./styled";
import { Text } from "react-native";

export const AppBody = () => {
  const [x, setX] = React.useState(0);
  const increment = React.useCallback(() => {
    setX((v) => v + 1);
  }, []);

  return (
    <StyledView styled={["p:16", "bg:red-200"]}>
      <StyledTouchableOpacity
        styled={[
          "p:12",
          "rounded:2xl",
          "border:1",
          "bg:blue-300",
          {
            "shadow:lg": x % 2 === 1,
          },
        ]}
        onPress={increment}
      >
        <StyledText styled={["text:2xl", "font-weight:bold"]}>
          Hello world!
        </StyledText>
      </StyledTouchableOpacity>
    </StyledView>
  );
};
