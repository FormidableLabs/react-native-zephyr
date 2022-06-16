---
sidebar_position: 2
---

# Installation

In your React Native/Expo project, install `react-native-style-buddy` using your favorite package registry tool such as `npm`, `yarn`, or `pnpm`.

```shell
npm install react-native-style-buddy # npm, or
yarn add react-native-style-buddy # yarn, or
pnpm add react-native-style-buddy # pnpm
```

Note that `react-native-style-buddy` is a JS library with no native dependencies, and therefore installation involves no more than installing the JS package into your repository.

:::note
Style Buddy's type-safety and style-name inference is possible due to [template literal types](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html) in TypeScript. Template literal types were released in TypeScript 4.1, and therefore for you to get type safety/inference – your project will need to be using at least `typescript: "4.1.0"`.
:::
