---
sidebar_position: 4
---

# Styling Methods

Zephyr has a core engine for turning a list of "style classes" into React Native style objects, and we offer a handful of different ways to apply these styles. All methods are returned from the `createStyleBuilder` method.

```ts title="styles.ts"
import { createStyleBuilder } from "react-native-zephyr";

export const { styles, useStyles, makeStyledComponent, styled } = createStyleBuilder();
```

## The `styles` method

The `styles` method is the heart of Zephyr, and transforms a list of style classes into a React Native style object. Its signature is:

```ts
styles: (...classes: ClassNameArg[]) => Record<string, any>
```

where `ClassNameArg` is a class name derived from your theme and handlers.

This method has no ties to the React component lifecycle, and therefore can be used anywhere. However, it is not aware of color scheme preference, and therefore does not support dark-mode classes out of the box. _Use this if you need a one-off style object and don't need dark-mode support._

```tsx title="StylesExample.tsx"
import { styles } from "./styles";
import { View } from "react-native";

export const UseStylesExample = () => {
  return <View style={styles("flex:1", "justify:center")} />;
}
```

## The `useStyles` hook

The `useStyles` hook is a wrapper around the `styles` method, but has support for dark mode.  

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

The `makeStyledComponent` method wraps a component and adds `classes` and `darkClasses` props to the wrapped component, to which you pass style classes to and it will take care of transforming those classes into a style. With this approach, we recommend you exporting single instances of wrapped components:

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
  );
}
```

## The `styled` component wrapper

Zephyr provides an API similar to [Styled Components](https://styled-components.com/) via the `styled` method. With the `styled` method, you pass in a component and a list of classes, and `styled` returns a new wrapped component. This can be useful if you want to avoid defining class arrays inline (which creates new arrays each re-render).

This method is best portrayed with an example.

```tsx title="StyledExample.tsx"
import { styled } from "./styles";
import { View, Text } from "react-native";

// Make a few styled components
const Wrapper = styled(View)("flex:1", "justify:center", "items:center");
const Title = styled(Text)("text:5xl", "font-weight:bold", "color:blue-800");

export const StyledExample = () => {
  return (
    <Wrapper>
      <Title>Hello world!</Title>
    </Wrapper>
  );
}
```

### Dark mode support

The `styled` method supports dark-mode out of the box. Instead of passing a list of classes to `styled()`, pass a configuration object with a shape of `{ classes: ClassNameArg[]; darkClasses: ClassNameArg[] }`, where `ClassNameArg` is the type of the classes derived from your theme configuration.

```tsx title="StyledExample.tsx"
import { styled } from "./styles";
import { View, Text } from "react-native";

const Wrapper = styled(View)("flex:1", "justify:center", "items:center");
// 👇 now has dark-mode support. 
const Title = styled(Text)({
  classes: ["text:5xl", "font-weight:bold", "color:blue-800"],
  darkClasses: ["color:blue-200"]
});

export const StyledExample = () => {
  return (
    <Wrapper>
      <Title>Hello world!</Title>
    </Wrapper>
  );
}
```

### Props-driven classes

The `styled` method also allows you to add additional props to your wrapped component to "drive" what classes are added. Instead of passing `ClassNameArg[]` to the configuration object, pass a function of the shape `(props: ComponentProps & ExtraProps) => ClassNameArg[]`. This is best portrayed with an example.

```tsx title="StyledExample.tsx"
import { styled } from "./styles";
import { View, Text } from "react-native";

// Add an optional `isRounded` prop that drives the rounded:lg class
const Wrapper = styled(View)<{ isRounded?: boolean; }>({
  classes: ({ isRounded }) => [
    "flex:1",
    "justify:center",
    "items:center",
    isRounded && "rounded:lg"
  ],
});
const Title = styled(Text)({
  classes: ["text:5xl", "font-weight:bold", "color:blue-800"],
  darkClasses: ["color:blue-200"]
});

export const StyledExample = () => {
  return (
    <Wrapper>
      <Title>Hello world!</Title>
    </Wrapper>
  );
}
```
