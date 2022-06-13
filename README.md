# React Native Style Buddy

This repo contains a **prototype** for a React Native styling library. Here's a peak in action (strongly typed 🤤).

![Sample image](./docs/vsc-sample.png)

## Introduction

The web-world has some *giants* of styling libraries, such as Styled Components/System and TailwindCSS (just to name a few!). These libraries generally target CSS (and the browser). However, React Native's styling system is fundamentally different than CSS. 

There is *some* conceptual overlap between the two technologies, but there are enough crucial differences that it seems futile to try to directly "port" an existing CSS solution to React Native. Instead, we should be identifying what is great about existing CSS libraries, how they apply to the web platform, and how we can leverage *similar* ideas on the React Native platform.

## What's this library all about?

This library is heavily inspired by TailwindCSS, and follows the following philosophy:

- Provide a foundation for *ergonomic* styling. Bring your own styling constraints or logic, and let the library make your life easier.
- Provide helpers for building your own style helpers based on your own theme constraints.
- Provide default style constraints for quick styling out of the box.
- Dark mode support, out of the box.
- Strong-typing for added confidence and ease-of-development.

Here's a quick sample to whet your appetite.

```tsx
import { View, Text } from "react-native";
import {
  createStyleBuilder,
  defaultHandlers,
  StyleProvider,
} from "react-native-style-buddy";

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

## API & Usage

### Step 1: Provide styling "handlers"

First, provide some styling "handlers" to the `createStyleBuilder` function to build some styling utilities:

```ts
import { createStyleBuilder } from 'react-native-style-buddy';

export const { makeStyledComponent } = createStyleBuilder({
  handlers: {
    flex1: () => ({ flex: 1 }),
    bg: (color: "blue" | "red") => ({ backgroundColor: color }),
  }
});
```

Each "handler" is a function, with 0 or 1 parameters, that returns a style object. Each handler will map to a style "class name" that can be applied to styled components. In our example here, the following "classes" will be available

- `flex1`: from the `flex1` handler (with 0 arguments)
- `bg:blue` and `bg:red`: from the `bg` handler.

### Step 2: Create styled components

Next, generate some "styled components" that will make use of your style handlers.

```ts
import { createStyleBuilder } from 'react-native-style-buddy';
import { View } from 'react-native';

export const { makeStyledComponent } = createStyleBuilder({ /* ... */ });

export const StyledView = makeStyledComponent(View);
```

Each of these components now have a `styled` and `darkStyled` prop that will allow you to apply your handlers.

### Step 3: Wrap your app in a `StyleProvider`

Next, wrap your app in a `StyleProvider` to support dark mode (and, in the future, other features) out of the box.

```tsx
import { StyleProvider } from 'react-native-style-buddy';

export const App = () => {
  return (
    <StyleProvider>
      {/* ... */}
    </StyleProvider>
  )
}
```

### Step 4: Get to styling!

Now, you're ready to start making easy-use of your styling handlers.

```tsx
import { StyleProvider } from 'react-native-style-buddy';
import { StyledView } from './styled';

export const App = () => {
  return (
    <StyleProvider>
      <StyledView
        styled={['flex:1', 'bg:red']}
        darkStyled={['bg:blue']}
      >
        {/* ... */}
      </StyledView>
    </StyleProvider>
  )
}
```

## Out-of-the-box Styling

RN Styled, by default, is style-agnostic. You can provide all of your own handlers, and it'll just help you make use of them.

However, we also offer a suite of default handlers to make your styling journey even easier. Just use (or extend) the `defaultHandlers` object as your `handlers` config!

```tsx
import { createStyleBuilder, defaultHandlers } from 'react-native-style-buddy';
import { View } from 'react-native';

const { makeStyledComponent } = createStyleBuilder({
  handlers: defaultHandlers, // <- your life, on easy mode
});
const StyledView = makeStyledComponent(View);

export const MyComponent = () => {
  return (
    <StyledView
      styled={['flex:1', 'p:3', 'bg:red-200']}
      darkStyled={['bg:red-800']}
    >
      {/* ... */}
    </StyledView>
  )
}
```

These `flex:1`, `p:3`, `bg:red-200` and `bg:red-800` style classes are just a few examples from the many classes provided to you by default when using the default handlers.

### Default handlers, custom constraints

TODO: document using constraint-builders.
