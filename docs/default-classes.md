---
sidebar_position: 4
---

# Default Classes

Perhaps the biggest perk of using Zephyr is that it provides a suite of style "style classes" out of the box that you can use to style your UI elements. The available style classes are created from the set of default "style handlers" (outlined here) and your theme. 

This page outlines the available style classes shipped with Zephyr out of the box. The examples here are using [the default theme](./default-theme.md) with no customizations, but see [Extending the Theme](./extending-the-theme.md) for more info on how to customize the theme. Also note that these docs indicate which styles classes are "[overridable](#overrides)" using the `[x]` syntax.

## Overrides

Before getting into the default handlers, we should discuss "constraint overrides". Most of the default handlers restrict you to using values from your theme constraints (this is in general a good thing!). However, sometimes you need to break free from your theme/scales and use a one-off value. 

Many of the default handlers offer you an escape hatch to handle these one-off cases by using `[x]` syntax. For example, if you need to "nudge" a single element 3 pixels you could use a class like `left:[3]` to apply `{ left: 3 }`, even if `3` is not in your theme's `spacing` constraints.

## Margin 

Zephyr uses your [spacing constraints](./default-theme.md#default-spacing-constraints) to generate margin helpers. You can set all margins with `m:`, horizontal/vertical margins with `mx:` and `my:` (respectively), and individual side margins with `ml:`, `mr:`, `mt:`, and `mb:`.

| Prefix | Argument                 | Overridable | Properties Set              | Example           |
|--------|--------------------------|-------------|-----------------------------|-------------------|
| `m:`   | `keyof theme['spacing']` | ✅           | `margin`                    | `m:2`, `m:[32]`   |
| `mx:`  | `keyof theme['spacing']` | ✅           | `marginLeft`, `marginRight` | `mx:2`, `mx:[32]` |
| `my:`  | `keyof theme['spacing']` | ✅           | `marginTop`, `marginBottom` | `my:2`, `my:[32]` |
| `ml:`  | `keyof theme['spacing']` | ✅           | `marginLeft`                | `ml:2`, `ml:[32]` |
| `mr:`  | `keyof theme['spacing']` | ✅           | `marginRight`               | `mr:2`, `mr:[32]` |
| `mt:`  | `keyof theme['spacing']` | ✅           | `marginTop`                 | `mt:2`, `mt:[32]` |
| `mb:`  | `keyof theme['spacing']` | ✅           | `marginBottom`              | `mb:2`, `mb:[32]` |

Each of these margin style classes comes with a "negative" counterpart. E.g., something like `m:3` will generally apply _positive_ margin. You can use `-m:3` to apply the same amount of margin but in the _negative_ direction. This gives us an additional set of classes:

| Prefix | Argument                 | Overridable | Properties Set                | Example             |
|--------|--------------------------|-------------|-------------------------------|---------------------|
| `-m:`  | `keyof theme['spacing']` | ✅           | `-margin`                     | `-m:2`, `-m:[32]`   |
| `-mx:` | `keyof theme['spacing']` | ✅           | `-marginLeft`, `-marginRight` | `-mx:2`, `-mx:[32]` |
| `-my:` | `keyof theme['spacing']` | ✅           | `-marginTop`, `-marginBottom` | `-my:2`, `-my:[32]` |
| `-ml:` | `keyof theme['spacing']` | ✅           | `-marginLeft`                 | `-ml:2`, `-ml:[32]` |
| `-mr:` | `keyof theme['spacing']` | ✅           | `-marginRight`                | `-mr:2`, `-mr:[32]` |
| `-mt:` | `keyof theme['spacing']` | ✅           | `-marginTop`                  | `-mt:2`, `-mt:[32]` |
| `-mb:` | `keyof theme['spacing']` | ✅           | `-marginBottom`               | `-mb:2`, `-mb:[32]` |


## Padding

The padding classes in Zephyr behave like their respective margin classes, but setting padding properties instead of margin. There are no "negative" padding classes.

| Prefix | Argument                 | Overridable | Properties Set                | Example           |
|--------|--------------------------|-------------|-------------------------------|-------------------|
| `p:`   | `keyof theme['spacing']` | ✅           | `padding`                     | `p:2`, `p:[32]`   |
| `px:`  | `keyof theme['spacing']` | ✅           | `paddingLeft`, `paddingRight` | `px:2`, `px:[32]` |
| `py:`  | `keyof theme['spacing']` | ✅           | `paddingTop`, `paddingBottom` | `py:2`, `py:[32]` |
| `pl:`  | `keyof theme['spacing']` | ✅           | `paddingLeft`                 | `pl:2`, `pl:[32]` |
| `pr:`  | `keyof theme['spacing']` | ✅           | `paddingRight`                | `pr:2`, `pr:[32]` |
| `pt:`  | `keyof theme['spacing']` | ✅           | `paddingTop`                  | `pt:2`, `pt:[32]` |
| `pb:`  | `keyof theme['spacing']` | ✅           | `paddingBottom`               | `pb:2`, `pb:[32]` |


## Sizing

Zephyr uses your spacing constraints to generate sizing helpers, allowing you to control the width and height of an element. You can control width (`w:`), minimum width (`min-w:`), maximum width (`max-w:`) &ndash; as well as the respective height properties (`h:`, `min-h:`, and `max-h:`).

The `aspect:` classes allow you to set the aspect ratio of an element, which is convenient when you need an element with a fixed aspect ratio (e.g., presenting an image in a 16:9 format).

| Prefix    | Argument                      | Overridable | Properties Set | Example                       |
|-----------|-------------------------------|-------------|----------------|-------------------------------|
| `w:`      | `keyof theme['spacing']`      | ✅           | `width`        | `w:2`, `w:[32]`               |
| `min-w:`  | `keyof theme['spacing']`      | ✅           | `minWidth`     | `min-w:2`, `min-w:[32]`       |
| `max-w:`  | `keyof theme['spacing']`      | ✅           | `maxWidth`     | `max-w:2`, `max-w:[32]`       |
| `h:`      | `keyof theme['spacing']`      | ✅           | `height`       | `h:2`, `h:[32]`               |
| `min-h:`  | `keyof theme['spacing']`      | ✅           | `minHeight`    | `min-h:2`, `min-h:[32]`       |
| `max-h:`  | `keyof theme['spacing']`      | ✅           | `maxHeight`    | `max-h:2`, `max-h:[32]`       |
| `aspect:` | `keyof theme['aspectRatios']` | ✅           | `aspectRatio`  | `aspect:16-9`, `aspect:[1.3]` |


## Positioning

You can set positioning type with `relative` and `absolute`. When using `absolute`, use the `inset:`, `inset-x:`, `inset-y:`, `left:`, `right:`, `top:`, and `bottom:` classes to position your element (based on spacing constraints).

| Prefix     | Argument                 | Overridable | Properties Set                   | Example                     |
|------------|--------------------------|-------------|----------------------------------|-----------------------------|
| `relative` | N/A                      | ❌           | `{ position: "relative" }`       | `relative`                  |
| `absolute` | N/A                      | ❌           | `{ position: "absolute" }`       | `absolute`                  |
| `inset:`   | `keyof theme['spacing']` | ✅           | `top`, `bottom`, `left`, `right` | `inset:0`, `inset:[32]`     |
| `inset-x:` | `keyof theme['spacing']` | ✅           | `left`, `right`                  | `inset-x:0`, `inset-x:[32]` |
| `inset-y:` | `keyof theme['spacing']` | ✅           | `top`, `bottom`                  | `inset-y:0`, `inset-y:[32]` |
| `left:`    | `keyof theme['spacing']` | ✅           | `left`                           | `left:0`, `left:[32]`       |
| `right:`   | `keyof theme['spacing']` | ✅           | `right`                          | `right:0`, `right:[32]`     |
| `top:`     | `keyof theme['spacing']` | ✅           | `top`                            | `top:0`, `top:[32]`         |
| `bottom:`  | `keyof theme['spacing']` | ✅           | `bottom`                         | `bottom:0`, `bottom:[32]`   |

Like with [the margin classes](#margin), the positioning classes have "negative" counterparts. This allows for things like `-inset:3` to "overflow" content out of its parent. This then gives us the following set of classes:

| Prefix      | Argument                 | Overridable | Properties Set                       | Example                       |
|-------------|--------------------------|-------------|--------------------------------------|-------------------------------|
| `-inset:`   | `keyof theme['spacing']` | ✅           | `-top`, `-bottom`, `-left`, `-right` | `-inset:3`, `-inset:[32]`     |
| `-inset-x:` | `keyof theme['spacing']` | ✅           | `-left`, `-right`                    | `-inset-x:3`, `-inset-x:[32]` |
| `-inset-y:` | `keyof theme['spacing']` | ✅           | `-top`, `-bottom`                    | `-inset-y:3`, `-inset-y:[32]` |
| `-left:`    | `keyof theme['spacing']` | ✅           | `-left`                              | `-left:3`, `-left:[32]`       |
| `-right:`   | `keyof theme['spacing']` | ✅           | `-right`                             | `-right:3`, `-right:[32]`     |
| `-top:`     | `keyof theme['spacing']` | ✅           | `-top`                               | `-top:3`, `-top:[32]`         |
| `-bottom:`  | `keyof theme['spacing']` | ✅           | `-bottom`                            | `-bottom:3`, `-bottom:[32]`   |


## Visibility

Use the `hidden` class to hide an element. The `overflow:` classes allow you to dictate overflow behavior.

| Prefix      | Argument                        | Overridable | Properties Set        | Example                              |
|-------------|---------------------------------|-------------|-----------------------|--------------------------------------|
| `hidden`    | N/A                             | ❌           | `{ display: "none" }` | `hidden`                             |
| `overflow:` | `"visible", "hidden", "scroll"` | ❌           | `overflow`            | `overflow:hidden`, `overflow:scroll` |


## Background Color (and Opacity)

Based on your color constraints, Zephyr provides classes for setting the background color of elements via the `bg:` classes. The `bg-opacity:` classes can be used to set the background opacity of the element (values based on your opacities constraints). You can set the general opacity of an element with the `opacity:` classes.

| Prefix        | Argument                   | Overridable | Properties Set    | Example                              |
|---------------|----------------------------|-------------|-------------------|--------------------------------------|
| `bg:`         | `keyof theme['colors']`    | ✅           | `backgroundColor` | `bg:red-300`, `bg:[#ff00ff]`         |
| `bg-opacity:` | `keyof theme['opacities']` | ✅           | NA                | `bg-opacity:50`, `bg-opacity:[0.32]` |
| `opacity:`    | `keyof theme['opacities']` | ✅           | `opacity`         | `opacity:50`, `opacity:[0.32]`       |


## Borders (Width, Color, Radius)

Zephyr provides classes for styling borders, including border width, border color, and border radius. The `border:`, `border-t:`, `border-b:`, `border-l:`, and `border-r:` use your border width constraints to generate classes that control border width. The `border-color:` classes allow you to color your borders (based on your color constraints). The `rounded:`, `rounded-t:`, `rounded-b:`, `rounded-l:`, `rounded-r:` classes allow you to add border radii to your element (based on your border radii constraints).

| Prefix          | Argument                     | Overridable | Properties Set                                      | Example                                       |
|-----------------|------------------------------|-------------|-----------------------------------------------------|-----------------------------------------------|
| `border:`       | `keyof theme['borderSizes']` | ✅           | `borderWidth`                                       | `border:hairline`, `border:[3]`               |
| `border-t:`     | `keyof theme['borderSizes']` | ✅           | `borderTopWidth`                                    | `border-t:hairline`, `border-t:[3]`           |
| `border-b:`     | `keyof theme['borderSizes']` | ✅           | `borderBottomWidth`                                 | `border-b:hairline`, `border-b:[3]`           |
| `border-l:`     | `keyof theme['borderSizes']` | ✅           | `borderLeftWidth`                                   | `border-l:hairline`, `border-l:[3]`           |
| `border-r:`     | `keyof theme['borderSizes']` | ✅           | `borderRightWidth`                                  | `border-r:hairline`, `border-r:[3]`           |
| `border-color:` | `keyof theme['colors']`      | ✅           | `borderColor`                                       | `border-color:red-300`, `border-color:[blue]` |
| `rounded:`      | `keyof theme['borderRadii']` | ✅           | `borderRadius`                                      | `rounded:lg`, `rounded:[3]`                   |
| `rounded-t:`    | `keyof theme['borderRadii']` | ✅           | `borderTopLeftRadius`, `borderTopRightRadius`       | `rounded-t:lg`, `rounded-t:[3]`               |
| `rounded-b:`    | `keyof theme['borderRadii']` | ✅           | `borderBottomLeftRadius`, `borderBottomRightRadius` | `rounded-b:lg`, `rounded-b:[3]`               |
| `rounded-l:`    | `keyof theme['borderRadii']` | ✅           | `borderBottomLeftRadius`, `borderTopLeftRadius`     | `rounded-l:lg`, `rounded-l:[3]`               |
| `rounded-r:`    | `keyof theme['borderRadii']` | ✅           | `borderBottomRightRadius`, `borderTopRightRadius`   | `rounded-r:lg`, `rounded-r:[3]`               |


## Flex Properties

Zephyr provides some helpful flexbox helpers out of the box. Of note:

- `flex:1`, `flex:auto`, `flex:initial`, `flex:auto`, and `flex:none` provide some presets for flex sizing. (E.g., `flex:1` is often used to make an element fill all of its available space.)
- `justify:` and `items:` classes let you control the `justifyContent` and `alignItems` properties (respectively).
- `flex:row`, `flex:row-reverse`, `flex:col`, and `flex:col-reverse` let you control flex direction.
- `flex:wrap`, `flex:wrap-reverse`, and `flex:nowrap` let you control the wrapping behavior of your element.

| Prefix              | Argument                                                  | Overridable | Properties Set                                      | Example             |
|---------------------|-----------------------------------------------------------|-------------|-----------------------------------------------------|---------------------|
| `justify:`          | `"start", "end", "center", "between", "around", "evenly"` | ❌           | `justifyContent`                                    | `justify:center`    |
| `items:`            | `"start", "end", "center", "baseline", "stretch"`         | ❌           | `alignItems`                                        | `items:center`      |
| `flex:1`            | N/A                                                       | ❌           | `{ flexGrow: 1, flexShrink: 1, flexBasis: "0%" }`   | `flex:1`            |
| `flex:auto`         | N/A                                                       | ❌           | `{ flexGrow: 1, flexShrink: 1, flexBasis: "auto" }` | `flex:auto`         |
| `flex:initial`      | N/A                                                       | ❌           | `{ flexGrow: 0, flexShrink: 1, flexBasis: "auto" }` | `flex:initial`      |
| `flex:none`         | N/A                                                       | ❌           | `{ flexGrow: 0, flexShrink: 0, flexBasis: "auto" }` | `flex:none`         |
| `flex:row`          | N/A                                                       | ❌           | `{ flexDirection: "row" }`                          | `flex:row`          |
| `flex:row-reverse`  | N/A                                                       | ❌           | `{ flexDirection: "row" }`                          | `flex:row-reverse`  |
| `flex:col`          | N/A                                                       | ❌           | `{ flexDirection: "column" }`                       | `flex:col`          |
| `flex:col-reverse`  | N/A                                                       | ❌           | `{ flexDirection: "column-reverse" }`               | `flex:col-reverse`  |
| `flex:grow`         | N/A                                                       | ❌           | `{ flexGrow: 1 }`                                   | `flex:grow`         |
| `flex:grow-0`       | N/A                                                       | ❌           | `{ flexGrow: 0 }`                                   | `flex:grow-0`       |
| `flex:shrink`       | N/A                                                       | ❌           | `{ flexShrink: 1 }`                                 | `flex:shrink`       |
| `flex:shrink-0`     | N/A                                                       | ❌           | `{ flexShrink: 0 }`                                 | `flex:shrink-0`     |
| `flex:wrap`         | N/A                                                       | ❌           | `{ flexWrap: "wrap" }`                              | `flex:wrap`         |
| `flex:wrap-reverse` | N/A                                                       | ❌           | `{ flexWrap: "wrap-reverse" }`                      | `flex:wrap-reverse` |
| `flex:nowrap`       | N/A                                                       | ❌           | `{ flexWrap: "nowrap" }`                            | `flex:nowrap`       |


## Z Index

The `z:` classes allow you to set the z-index of an element.

| Prefix | Argument  | Overridable | Properties Set | Example       |
|--------|-----------|-------------|----------------|---------------|
| `z:`   | `integer` | ❌           | `zIndex`       | `z:0`, `z:10` |



## Text Styling

The `text:` classes adjust the font size of your text. Use the `color:` classes to change your text color. Use the `font-weight:` classes to adjust the weight of your text (e.g., bold text). The `italic`, `uppercase`, `lowercase`, `capitalize`, `underline`, and `line-through` classes are one-off classes that apply transforms/decorations to your text. Use `text-align:` classes to align your text.

| Prefix         | Argument                                       | Overridable | Properties Set                           | Example                                       |
|----------------|------------------------------------------------|-------------|------------------------------------------|-----------------------------------------------|
| `text:`        | `keyof theme['fontSizes']`                     | ❌           | `fontSize`, `lineHeight`                 | `text:sm`, `text:3xl`                         |
| `color:`       | `keyof theme['colors']`                        | ✅           | `color`                                  | `color:red-300`, `color:[#ff00ff]`            |
| `font-weight:` | `keyof theme['fontWeights']`                   | ❌           | `fontWeight`                             | `font-weight:normal`, `font-weight:extrabold` |
| `italic`       | N/A                                            | ❌           | `{ fontStyle: "italic" }`                | `italic`                                      |
| `text-align:`  | `"auto", "left", "right", "center", "justify"` | ❌           | `textAlign`                              | `text-align:center`, `text-align:left`        |
| `uppercase`    | N/A                                            | ❌           | `{ textTransform: "uppercase" }`         | `uppercase`                                   |
| `lowercase`    | N/A                                            | ❌           | `{ textTransform: "lowercase" }`         | `lowercase`                                   |
| `capitalize`   | N/A                                            | ❌           | `{ textTransform: "capitalize" }`        | `capitalize`                                  |
| `underline`    | N/A                                            | ❌           | `{ textDecorationLine: "underline" }`    | `underline`                                   |
| `line-through` | N/A                                            | ❌           | `{ textDecorationLine: "line-through" }` | `line-through`                                |


## Shadows

Shadows are a bit trickier in React Native than on the web, and Android and iOS handle them differently. We provide some default shadows out of the box, but you can configure them yourself if you so please. To use shadows, simply use the `shadow:` classes.

| Prefix    | Argument                 | Overridable | Properties Set                                                                 | Example                  |
|-----------|--------------------------|-------------|--------------------------------------------------------------------------------|--------------------------|
| `shadow:` | `keyof theme['shadows']` | ❌           | `elevation` on Android; `shadowOffset`, `shadowRadius`, `shadowOpacity` on iOS | `shadow:sm`, `shadow:lg` |

## Image Styling

React Native has some built-in styling controls for images. Use [the width](#sizing) classes to control sizing. You can control the resize mode with the `resize:` classes. The `tint:` classes allow you to use your color constraints to set the tint color of the image.

| Prefix    | Argument                                            | Overridable | Properties Set | Example                          |
|-----------|-----------------------------------------------------|-------------|----------------|----------------------------------|
| `resize:` | `"cover", "contain", "stretch", "repeat", "center"` | ❌           | `resizeMode`   | `resize:cover`, `resize:contain` |
| `tint:`   | `keyof theme['colors']`                             | ✅           | `tintColor`    | `tint:red-300`, `tint:[#ff00ff]` |
