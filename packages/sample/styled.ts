import { createStyleBuilder } from "react-native-style-buddy";
import { View, Text } from "react-native";

export const { makeStyledComponent, styles } = createStyleBuilder({
  extendTheme: {
    spacing: { huge: 24 },
    colors: { poop: "brown" },
    opacities: { meh: 0.7 },
  },
  // extraHandlers: {
  //   baz: () => ({ backgroundColor: "red" }),
  // },
});

export const StyledView = makeStyledComponent(View);
export const StyledText = makeStyledComponent(Text);

const f = styles("p:3", "m:[32]");
