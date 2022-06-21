---
sidebar_position: 6
---

# Extending the Theme

Zephyr ships with [a default theme](./default-theme.md), but gives you the flexibility to override and extend the theme as your heart desires.

Zephyr's theme constraints are of the following shape:

```ts
type ThemeConstraints = {
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

type NumOrString = number | string;
```

The default theme conforms to this shape, and this is the shape you'll use to override/extend certain parts of the theme.

## Overriding specific constraints

The `createStyleBuilder` function takes an argument named `overrideTheme`, which can be of the shape `ThemeConstraints` or `(args: { baseFontSize: number }) => ThemeConstraints`. Each sub-field you pass to (or return from) that object (such as `spacing`, `colors`, and so on) will override the default theme's respective set of constraints. Here's an example.

```ts
import { createStyleBuilder } from "react-native-zephyr";

const { styles } = createStyleBuilder({
  overrideTheme: {
    // Override the default colors
    colors: {
      red: "#ff0000",
      green: "#00ff00",
      blue: "#0000ff"
    }
  }
});

// Now, the only colors you have access to are red, green, and blue (defined above).
styles("bg:red", "color:blue", /* ... */);
```

Note that if you do _not_ specify a field in `overrideTheme`, `createStyleBuilder` will use the default theme constraints for that field.

You can also use the function version of this property, which gives you access to the base font size (think of this like 1REM). See [here](#changing-the-base-font-size) for more details on base font size.

```ts
import { createStyleBuilder } from "react-native-zephyr";

const { styles } = createStyleBuilder({
  overrideTheme: ({ baseFontSize }) => ({
    spacing: {
      tiny: 0.3 * baseFontSize
    }
  })
});

// p:tiny gives a padding of 0.3 * (the base font size)
styles("p:tiny", /* ... */);
```

## Extending specific constraints

If you don't want to overwrite a specific set of theme constraints, but rather just extend the default constraints, you can use the `extendTheme` parameter of the `createStyleBuilder` function. This has the same signature as the `overrideTheme` property.

```ts
import { createStyleBuilder } from "react-native-zephyr";

const { styles } = createStyleBuilder({
  extendTheme: {
    // _Add_ some more colors
    colors: {
      brand: "#f04d21"
    }
  }
});

// Now, you have access to all default colors, and the `brand` color defined above
styles("bg:white", "color:brand", /* ... */);
```

If you need access to [the base font size](#changing-the-base-font-size) in your extension values, pass a function to the `extendTheme` property: 

```ts
import { createStyleBuilder } from "react-native-zephyr";

const { styles } = createStyleBuilder({
  extendTheme: ({ baseFontSize }) => ({
    spacing: {
      tiny: 0.3 * baseFontSize
    }
  })
});

// p:tiny gives a padding of 0.3 * (the base font size)
styles("p:tiny", /* ... */);
```

It's worth noting that you can override a theme constraint _and_ extend the constraint. This will result in extending the constraint that you provide (instead of the default theme constraint).


## Changing the base font size

In the land of CSS, [the REM unit](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units) represents the font size of the root element, and can be used as a relative size unit for other elements. For example, text with a font size of `2rem` will have a font size that is twice as large as the root element's font size, and so on.

The REM is an incredibly useful construct for theming, but React Native does not have such a construct. Zephyr's theming system hand-rolls this construct to ensure the theming feels as close to TailwindCSS's as possible. We use a "base font size" (think of this as `1rem`) of 14pt, and then derive some other theme value from this base font size. A (default) base font-size of 14pt will mean your `text:base` class will have the same font size as a standard React Native `Text` element. However, we provide the option to override this base font size via the `baseFontSize` option of the `createStyleBuilder` function.

```ts
import { createStyleBuilder } from "react-native-zephyr";

const { styles } = createStyleBuilder({
  // 👇 Use a base font size of 16 instead of 14
  baseFontSize: 16,
});

// Now has a fontSize of 16 instead of 14.
styles("text:base");
```

### Using the base font size in your theme

Some of the [default theme constraints](./default-theme.md) use the `baseFontSize` in their values. If you'd like to do the same when overriding/extending your theme, you can do so by passing a _function_ to the `overrideTheme` or `extendTheme` properties – where the function has access to a `baseFontSize` argument, and returns a theme override/extension object. This is best illustrated with an example.

```ts
import { createStyleBuilder } from "react-native-zephyr";

const { styles } = createStyleBuilder({
  // 👇 Use a base font size of 12 instead of 14
  baseFontSize: 12,
  
  extendTheme: ({ baseFontSize }) => ({
    fontSizes: {
      superHuge: [10 * baseFontSize, 9 * baseFontSize]
    }
  })
});

// text:superHuge now has fontSize of 10 * 12 (with lineHeight of 9 * 12)
styles("text:superHuge", /* ... */);
```
