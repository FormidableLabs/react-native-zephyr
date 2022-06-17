---
sidebar_position: 9
---

# Dynamic Class Name Lists

[clsx](https://github.com/lukeed/clsx#readme) provides a utility function that makes it easier to generate a className list in CSS-styled projects, which is very useful when applying dynamic classes to a UI element.

Zephyr provides a similar, slimmed-down version of this functionality out of the box. When providing a list of style classes (to `styles`, `useStyles`, or the `styled`/`darkStyled` props), you can pass in an array of the following type:

```ts
type ClassNameArg = Cn | { [key in Cn]?: boolean } | null | undefined | false;
```

where `Cn` is the type of the class names defined by your instance from `createStyleBuilder`.

This is better portrayed by an example.

```ts
import { createStyleBuilder } from "react-native-zephyr";

const { styles } = createStyleBuilder();

// Use strings
styles("px:2", "py:3");

// False values are fine
styles("px:2", false, undefined, null, 3 % 2 === 0 && "py:3");

// Object with class names as key, boolean as value
styles("px:2", { "py:3": 4 % 2 === 0 }); // same as px:2, py:3
```
