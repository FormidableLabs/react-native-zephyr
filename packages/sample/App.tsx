import { StatusBar } from "expo-status-bar";
import { SafeAreaView, Text, View, ViewStyle } from "react-native";
import { createStyleBuilder } from "../core/src/createStyleBuilder";
import { StyleProvider } from "../core/src/StyleProvider";

const { makeStyledComponent } = createStyleBuilder({
  handlers: {
    p: (x: "1" | "2") => ({ padding: 10 * +x } as ViewStyle),
    bgColor: (c: "red" | "blue") => ({ backgroundColor: c } as ViewStyle),
  },
});

const StyledView = makeStyledComponent(View);

export default function App() {
  return (
    <StyleProvider>
      <SafeAreaView>
        <StyledView p="2" bgColor="red" bgColor__dark="blue">
          <Text>Open up App.tsx to start working on your app!</Text>
          <StatusBar style="auto" />
        </StyledView>
      </SafeAreaView>
    </StyleProvider>
  );
}
