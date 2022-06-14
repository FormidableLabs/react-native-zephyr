import { createStyleBuilder, defaultHandlers } from "react-native-style-buddy";
import { View, Text } from "react-native";

export const { makeStyledComponent, styles } = createStyleBuilder({
  theme: {
    // spacing: { sm: 4, md: 8, lg: 12 },
  },
  extendTheme: {
    spacing: { huge: 24 },
    colors: { poop: "brown" },
    opacities: { meh: 0.7 },
  },
  extraHandlers: {
    baz: () => ({ backgroundColor: "red" }),
  },
});

export const StyledView = makeStyledComponent(View);
export const StyledText = makeStyledComponent(Text);

const f = styles("m:2/3", "m:[32]");
