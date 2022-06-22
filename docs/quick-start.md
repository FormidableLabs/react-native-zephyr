---
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Quick Start

## Step 1: Installation

In your React Native (or Expo) project, install the Zephyr library:


<Tabs>
<TabItem value="npm" label="NPM">

```sh
npm install react-native-zephyr
```

</TabItem>
<TabItem value="yarn" label="Yarn">

```sh
yarn add react-native-zephyr
```

</TabItem>
<TabItem value="pnpm" label="pnpm">

```sh
pnpm add react-native-zephyr
```

</TabItem>
</Tabs>

See the [Installation guide](./installation.mdx) for more details on installation.

## Step 2: Wrap your app in a `StyleProvider`

Then wrap your app in a [`StyleProvider`](./api-reference.md#styleprovider) instance, which is used by Zephyr under the hood (for things such as dark mode support).

```tsx title="App.tsx"
import { StyleProvider } from "react-native-zephyr";

export const App = () => {
  return (
    <StyleProvider>
      {/* The rest of your app body... */}
    </StyleProvider>
  );
};
```

## Step 3: Create a Style Builder

Then use the [`createStyleBuilder`](./api-reference.md#createstylebuilder) method to generate styling helpers. We recommend you have a single Zephyr instance for your entire app, so it's best to create your styling utilities in a dedicated file and export what you need for the rest of your app to consume.

```ts title="styles.ts"
import { createStyleBuilder } from "react-native-zephyr";

export const { styles, useStyles, makeStyledComponent } = createStyleBuilder();
```

These three styling helpers work similarly under the hood, and can be used in various scenarios. We'll start by wrapping some standard React Native UI components with our `makeStyledComponent` helper so that we can hit the ground running.

```ts title="styles.ts"
import { createStyleBuilder } from "react-native-zephyr";
// highlight-next-line
import { View, Text } from "react-native";

export const { styles, useStyles, makeStyledComponent, styled } = createStyleBuilder();

// Export some styled components
// highlight-start
export const StyledView = makeStyledComponent(View);
export const StyledText = makeStyledComponent(Text);
// highlight-end
```

These new, wrapped components (`StyledView` and `StyledText`) expose `classes` and `darkClasses` props that allow you to pass in baseline style classes, as well as style classes to be merged in in dark mode. 

## Step 4: Start styling!

With your new style helpers (see [Default Classes](./default-classes.md) and [Default Theme](./default-theme.md) for more info on style classes you get out of the box), you can quickly style elements.

```tsx title="MyComponent.tsx"
import * as React from "react";
import { StyledView, StyledText } from "./styles";

export const MyComponent = () => {
  return (
		// highlight-start
    <StyledView
      classes={["flex:1", "bg:purple-100", "justify:center", "items:center"]}
      darkClasses={["bg:purple-800"]}
    >
      <StyledText
        classes={["text:5xl", "color:gray-800"]}
        darkClasses={["color:gray-100"]}
      >
        // highlight-end
        Hey world
      </StyledText>
    </StyledView>
  );
}
```

This small amount of React will generate the following (left: in light mode, right: in dark mode).

![Hello world example](./img/hello-world.png)

:::tip
**IMPORTANT!** The `createStyleBuilder` function returns multiple core utilities that you can use for styling. We recommend you check out [the Styling Methods](./styling-methods.md) to learn about the different ways you can use Zephyr to style UI elements. These include:

- A raw function `styles` that transforms a list of classes to a style object.
- A hook `useStyles` that wraps `styles` and provides dark-mode support.
- The `makeStyledComponent` function shown here.
- A `styled` method that provides an API similar to [Styled Components](https://styled-components.com/) (but for React Native). 
:::

## Step 5: Customizing your theme

Zephyr ships with a suite of [default style classes](./default-classes.md) that use the [default theme](./default-theme.md) to create the applicable style "classes" (such as `"w:4"`). This default theme is overridable and extendable. To override the default theme constraints, you can pass an `overrideTheme` argument to `createStyleBuilder`.

```ts
import { createStyleBuilder } from "react-native-zephyr";

const { styles } = createStyleBuilder({
  overrideTheme: {
    spacing: { sm: 4, md: 8, lg: 16 }
  }
});

// Now the spacing helpers, like m: and p:, use the spacing constraints above.
styles("px:sm", "py:md", "m:lg");
```

Note that by passing a constraints field, such as `spacing` or `colors`, you'll override the respective default theme constraints. See [Extending the theme](./extending-the-theme.md) for more details on how this works. If you want to just _extend_ the default theme constraints, use the `extendTheme` parameter.

```ts
import { createStyleBuilder } from "react-native-zephyr";

const { styles } = createStyleBuilder({
  extendTheme: {
    colors: { brand: "#ff00ff" }
  }
});

// The default colors are available, alongside your added colors.
styles("color:red-300", "bg:brand");
```

## Step 6: See what else there is to offer!

Zephyr has a lot more to offer! Here are some things to check out:

- Check out the [default classes](./default-classes.md) and [default theme](./default-theme.md) to see what styles come for free out of the box.
- Check out the [styling methods](./styling-methods.md) that are available.
- Learn more about how to [extend the default theme](./extending-the-theme.md).
- Learn about the [dark-mode support](./dark-mode.mdx) that comes _for free_.
- Learn about the [clsx-like syntax](./dynamic-classname-list.md) for apply dynamic class names to an element.
- Learn about adding [extra style handlers](./extra-style-handlers.md) to extend the default style classes even further.
