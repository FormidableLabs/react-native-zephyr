---
sidebar_position: 11
---

# Extra Style Handlers

Zephyr comes with a large set of built-in style classes (see [Default Classes](./default-classes.md) and [Default Theme](./default-theme.md)). However, if you'd like to tap into Zephyr's styling system, you can add your own custom "style handlers" on top of the default ones.

Each custom handler of the form `f: x => y` will generate a set of style classes of the form `f:x`; each handler of the form `f: () => y` will generate a single style class `f`. This is best portrayed with an example.

```ts
import { createStyleBuilder } from "react-native-zephyr";

const { styles } = createStyleBuilder({
  // Add some extra handlers
  extraHandlers: {
    size: (x: "small" | "big") => ({ width: x === "small" ? 8 : 64 }),
    foo: () => ({ backgroundColor: "brown" })
  }
});

// You now have some additional style classes, along with the default ones
styles("size:small", "size:large", "foo");
```
