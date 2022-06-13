import { createStyleBuilder, defaultHandlers } from "rn-styler-core";
import { View, Text } from "react-native";

export const { makeStyledComponent } = createStyleBuilder({
  handlers: defaultHandlers,
});

export const StyledView = makeStyledComponent(View);
export const StyledText = makeStyledComponent(Text);
