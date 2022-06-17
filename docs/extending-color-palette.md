---
sidebar_position: 7
---

# Extending the Color Palette

TailwindCSS has [a beautiful color palette](https://tailwindcss.com/docs/customizing-colors). We have used that same color palette for Zephyr, but we only ship a select handful of these colors in the default theme.

However, we provide an easy way to access the other colors in this color palette using the `extractTwColor` helper function. This helper function accepts a TW color name via `twColor` and a new name for the color constraints that will be added to your theme via the `name` field.

```ts
import { createStyleBuddy, extractTwColor } from "react-native-zephyr";

const { styles } = createStyleBuddy({
  extendTheme: {
    colors: {
      // Add amber to your palette, named as `primary`
      ...extractTwColor({ twColor: "amber", name: "primary" })
    }
  }
});

// Can now use `primary-50` and so on as a color
styles("bg:primary-100", "color:primary-800", /* ... */);
```

The full list of available colors can be found [here](https://github.com/FormidableLabs/react-native-zephyr/blob/master/packages/core/src/handlers/twColors.ts).
