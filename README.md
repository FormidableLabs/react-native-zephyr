# React Native Styled

This repo contains a **prototype** for a React Native styling library.

The web-world has some *giants* of styling libraries, such as Styled Components/System and TailwindCSS (just to name a few!). However, React Native's styling system is fundamentally different than CSS. 

There is *some* conceptual overlap between the two technologies, but there are enough crucial differences to try to "port" an existing CSS solution to React Native. Instead, we should be identifying what is great about existing CSS libraries, how they apply to the web platform, and how we can leverage *similar* ideas on the React Native platform.

## What's this library all about?

This library is heavily inspired by TailwindCSS, and follows the following philosophy:

- Provide a foundation for *ergonomic* styling. Bring your own styling constraints or logic, and let the library make your life easier.
- Provide helpers for building your own style helpers based on your own theme constraints.
- Provide default style constraints for quick styling out of the box.
- Dark mode support, out of the box.

Here's a quick sample to whet your appetite.

```tsx
import { View, Text } from "react-native";
import {
  createStyleBuilder,
  defaultHandlers,
  StyleProvider,
} from "rn-styler-core";

// Provide style "handlers", get some goodies back
const { makeStyledComponent } = createStyleBuilder({
  handlers: defaultHandlers,
});

// Create "styled" components for easy styling.
const StyledView = makeStyledComponent(View);
const StyledText = makeStyledComponent(Text);

export const App = () => {
  return (
    <StyleProvider>
      <StyledView
        styled={['flex:1', 'justify:center', 'items:center', 'bg:blue-200']}
        darkStyled={['bg:blue-800']}
      >
        <StyledText
          styled={['font-weight:bold', 'color:gray-800']}
          darkStyled={['color:gray-200']}
        >
          What's up, world!
        </StyledText>
      </StyledView>
    </StyleProvider>
  )
}
```

## API

...
