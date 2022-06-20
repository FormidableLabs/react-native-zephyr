# React Native Zephyr
[![github][github-static-analysis-image]][github-url]
[![github][github-unit-test-image]][github-url]
[![npm][npm-image]][npm-url]
[![docs][docs-image]][docs-url]
[![Maintenance Status][maintenance-image]](#maintenance-status)

### STATUS: In development

This project is actively under development. We're approaching v1.0.0, in which the API will be stable and non-breaking. Until then, there are *no guarantees* that the API will not undergo minor changes.

## Overview

React Native Zephyr is a [TailwindCSS](https://tailwindcss.com)-inspired styling library for React Native.

TailwindCSS is a brilliant library, but it's built for CSS and the web browser – and these are tools that are not available in React Native projects. This project aims to borrow some of the core ideas of TailwindCSS and implement them in the context of React Native applications.

React Native Zephyr, out of the box, provides:

- a thorough set of [built-in styling utilities](./docs/default-classes.md) (spacing, colors, typography, etc.);
- an [extendable and overridable theming system](./docs/extending-the-theme.md);
- **type-safety** for speedy and confident development;
- [dark-mode support](./docs/dark-mode.mdx) out of the box;
- [clsx-like syntax](./docs/dynamic-classname-list.md) for applying dynamic style classes.

Head over to [the docs](https://react-native-zephyr.vercel.app) to learn more.

[github-unit-test-image]: https://github.com/FormidableLabs/react-native-zephyr/workflows/Unit%20Test/badge.svg
[github-static-analysis-image]: https://github.com/FormidableLabs/react-native-zephyr/workflows/Static%20Analysis/badge.svg
[github-url]: https://github.com/FormidableLabs/react-native-zephyr/actions
[npm-image]: https://img.shields.io/npm/v/react-native-zephyr
[npm-url]: https://www.npmjs.com/package/react-native-zephyr
[docs-image]: https://img.shields.io/badge/docs-visit%20site-blue
[docs-url]: https://react-native-zephyr.vercel.app/
[maintenance-image]: https://img.shields.io/badge/maintenance-active-green.svg?color=brightgreen&style=flat
