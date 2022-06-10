import { SafeAreaView, Text, View } from "react-native";
import {
  createStyleBuilder,
  defaultHandlers,
  StyleProvider,
} from "rn-styler-core";

const { makeStyledComponent } = createStyleBuilder({
  handlers: defaultHandlers,
});

const StyledView = makeStyledComponent(View);
const StyledText = makeStyledComponent(Text);
const StyledSafeAreaView = makeStyledComponent(SafeAreaView);

export default function App() {
  return (
    <StyleProvider colorScheme="auto">
      <StyledSafeAreaView
        bg="red-300"
        bg__dark="red-800"
        flex="1"
        items="center"
        justify="center"
        p="6"
      >
        <StyledView
          p="6"
          bg="blue-400"
          bg-opacity="80"
          rounded="lg"
          border="1"
          border-color="red-500"
          shadow="xl"
          accessibilityHint="Just to show you the rest of props are here"
        >
          <StyledText>Open up App.tsx to start working on your app!</StyledText>
        </StyledView>
      </StyledSafeAreaView>
    </StyleProvider>
  );
}
