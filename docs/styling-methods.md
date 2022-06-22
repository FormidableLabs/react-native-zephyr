---
sidebar_position: 4
---

# Styling Methods

Zephyr has a core engine for turning a list of "style classes" into React Native style objects, and we offer a handful of different ways to apply these styles. All methods are returned from the `createStyleBuilder` method.

```ts title="styles.ts"
import { createStyleBuilder } from "react-native-zephyr";

export const { styles, useStyles, makeStyledComponent, styled } = createStyleBuilder();
```

## The `styles` function

The `styles` function is the heart of Zephyr, and transforms a list of style classes into a React Native style object. Its signature is:

```ts
styles: (...classes: ClassNameArg[]) => Record<string, any>
```

where `ClassNameArg` is a class name derived from your theme and handlers.

This function has no ties to the React component lifecycle, and therefore can be used anywhere. However, it is not aware of color scheme preference, and therefore does not support dark-mode classes out of the box. _Use this if you need a one-off style object and don't need dark-mode support._

```tsx title="StylesExample.tsx"
import { styles } from "./styles";
import { View } from "react-native";

export const UseStylesExample = () => {
  return <View style={styles("flex:1", "justify:center")} />;
}
```

## The `useStyles` hook

The `useStyles` hook is a wrapper around the `styles` function, but has support for dark mode.  

```ts
useStyles: ({ classes: ClassNameArg[]; darkClasses: ClassNameArg[] }) => Record<string, any>
```

This hook must be used with a React component (or another hook), and returns a style object for you to pass on to an element. Here's an example.

```tsx title="UseStylesExample.tsx"
import { useStyles } from "./styles";
import { View } from "react-native";

export const UseStylesExample = () => {
  const wrapperStyles = useStyles({
    classes: ["flex:1", "justify:center", "bg:gray-100"],
    darkClasses: ["bg:gray-800"]
  });
  
  return <View style={wrapperStyles} />;
}
```

## The `makeStyledComponent` component wrapper

The `makeStyledComponent` function wraps a component and adds `classes` and `darkClasses` props to the wrapped component, to which you pass style classes to and it will take care of transforming those classes into a style. With this approach, we recommend you exporting single instances of wrapped components:

```ts title="styles.ts"
import { createStyleBuilder } from "react-native-zephyr";
import { View, Text } from "react-native";

export const { styles, useStyles, makeStyledComponent, styled } = createStyleBuilder();

export const StyledView = makeStyledComponent(View);
export const StyledText = makeStyledComponent(Text);
```

Then you can import and use these components across your app:

```tsx title="MakeStyledComponentExample.tsx
import { StyledView, StyledText } from "./styles";

export const MakeStyledComponentExample = () => {
  return (
    <StyledView
      classes={["flex:1", "justify:center", "items:center", "bg:blue-100"]}
      darkClasses={["bg:blue-800"]}
    >
      <StyledText
        classes={["text:4xl", "color:gray-800"]}
        darkClasses={["color:gray-200"]}
      >
        Hello world!
      </StyledText>
    </StyledView>
  )
}
```

## The `styled` component wrapper

