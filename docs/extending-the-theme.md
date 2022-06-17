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

The `createStyleBuilder` function takes an argument named `overrideTheme`, which is of the shape `ThemeConstraints`. Each sub-field you pass to that object (such as `spacing`, `colors`, and so on) will override the default theme's respective set of constraints. Here's an example.

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

## Extending specific constraints

If you don't want to overwrite a specific set of theme constraints, but rather just extend the default constraints, you can use the `extendTheme` parameter of the `createStyleBuilder` function.

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

It's worth noting that you can override a theme constraint _and_ extend the constraint. This will result in extending the constraint that you provide (instead of the default theme constraint).
