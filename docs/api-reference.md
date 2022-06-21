---
sidebar_position: 10
---

# API Reference

## `StyleProvider`

`StyleProvider` is a React component with the following props:

```ts
type StyleProviderProps = React.PropsWithChildren<{ colorScheme?: "light" | "dark" | "auto" }>;
```

- Use `StyleProvider` to wrap your entire app.
- Gives your app access to color-scheme information needed to handle light/dark modes.
- Pass `colorScheme="dark"` to force the app into "dark mode". Pass `colorScheme="light"` to force the app into "light mode". Pass `colorScheme="auto"` to use the system's color scheme preference.

## `createStyleBuilder`

```ts
const {
  styles,
  useStyles,
  makeStyledComponent,
  theme
} = createStyleBuilder({
  overrideTheme,
  extendTheme,
  extraHandlers,
});
```

### Options

- `overrideTheme?: ThemeConstraints | ((args: { baseFontSize: number }) => ThemeConstraints)`
  - Allows you to override specific sets of theme constraints. E.g., can provide your own colors and overwrite the default colors.
  - Can provide a function, giving you access to `baseFontSize` for deriving values based on the base font size.
  - See [`ThemeConstraints`](#themeconstraints) for available options.
- `extendTheme?: ThemeConstraints | ((args: { baseFontSize: number }) => ThemeConstraints)`
  - Allows you to _extend_ specific sets of theme constraints. E.g., can add your own colors on top of the default color palette.
  - Can provide a function, giving you access to `baseFontSize` for deriving values based on the base font size.
  - See [`ThemeConstraints`](#themeconstraints) for available options.
- `extraHandlers?: {[key: string]: (...args: any[]) => object}`
  - Allows you to provide your own additional style handlers. 
  - For example, `{ foo: () => ({ color: "red" }) }` will make a new style class `foo` that can be used to apply `color: "red"` to an element.

### Returns

- `styles: (...classes: ClassNameArg[]) => Record<string, any>`
  - A method to build a React Native style object based on the classes you pass it. 
  - `ClassNameArg` type is dynamic based on the options you pass to the `createStyleBuilder` function. See [dynamic class name lists](./dynamic-classname-list.md) for more details on arguments.
  - No reliance on React APIs, can be used anywhere.
  - Does **not** support dark mode.
- `useStyles: ({ classes: ClassNameArg[]; darkClasses: ClassNameArg[] }) => Record<string, any>`
  - React hook-wrapper around `styles` that accepts a list of baseline `classes`, and `darkClasses` to apply on top of `classes` when in dark mode.
  - Must be used in React function component or hook.
- `makeStyledComponent: <Props>(Component: React.Component<Props>) => React.Component<Props & { classes?: ClassNameArg[]; darkClasses?: ClassNameArg[] }>`
  - A function to turn a component (with a `style` prop) into a "styled" component that has `classes` and `darkClasses` props that will be applied to the style of the underline component.
  - Example: `const StyledView = makeStyledComponent(View)` where `View` is from React Native.
- `theme?: ThemeConstraints`
  - The final theme after overrides/extensions have been made.
  - This allows you to manually use your theme constraints if need-be, e.g. `color={theme.colors["green-500"]}`.

## `extractTwColor`

```ts
const colorRange = extractTwColor({ twColor, name });
```

### Options

- `twColor: keyof TwColors`
  - A name from the TW-inspired color palette, e.g. `blueGray`.
- `name: string`
  - The name that will be used in your style classes for this color. E.g., if `name: "brand"` then you'll have access to colors like `bg:brand-300` etc.

### Returns

Returns an object of the shape `{[key: string]: string}` which should be spread into the `colors` field of `overrideTheme` or `extendTheme` option of `createStyleBuilder`.

### Example

```ts
import { createStyleBuilder, extractTwColor } from "react-native-zephyr";

const { styles } = createStyleBuilder({
  extendTheme: {
		...extractTwColor({ twColor: "blueGray", name: "primary" }),
  }
});

// Now have access to blueGray color aliased as `primary`:
styles("bg:primary-100", "color:primary-800", /* ... */);
```

## Types

### `ThemeConstraints`

The type of the default theme, and type used for `overrideTheme` and `extendTheme` options of `createStyleBuilder`.

```ts
export type ThemeConstraints = {
  spacing?: Record<NumOrString, string | number>;
  colors?: Record<NumOrString, string> | undefined;
  opacities?: Record<NumOrString, number>;
  aspectRatios?: Record<NumOrString, readonly [number, number]>;
  borderSizes?: Record<NumOrString, number>;
  borderRadii?: Record<NumOrString, number>;
  shadows?: Record<
    NumOrString,
    { android: number; ios: readonly [number, number, number, number] }
  >;
  fontSizes?: Record<NumOrString, readonly [number, number]>;
  fontWeights?: Record<NumOrString, TextStyle["fontWeight"]>;
};

export type NumOrString = number | string;
```
