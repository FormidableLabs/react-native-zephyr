import { vi, describe, it, expect } from "vitest";
import { createStyleBuilder } from "../createStyleBuilder";
import { DefaultConstraints } from "../theme";

vi.mock("react-native", () => ({
  StyleSheet: {
    hairlineWidth: 0.5,
  },
}));

const { styles: sb } = createStyleBuilder({});
const C = DefaultConstraints.spacing;

describe.only("defaultSpacingHandlers", () => {
  const cases: [object, object][] = [
    // m:
    [sb("m:1"), { margin: C["1"] }],
    [sb("m:1/2"), { margin: C["1/2"] }],
    [sb("m:[3]"), { margin: 3 }],
    // -m:
    [sb("-m:1"), { margin: -C["1"] }],
    [sb("-m:1/2"), { margin: `-${C["1/2"]}` }],
    [sb("-m:[3]"), { margin: -3 }],
    // mx:
    [sb("mx:1"), { marginHorizontal: C["1"] }],
    [sb("mx:1/2"), { marginHorizontal: C["1/2"] }],
    [sb("mx:[3]"), { marginHorizontal: 3 }],
    // -mx:
    [sb("-mx:1"), { marginHorizontal: -C["1"] }],
    [sb("-mx:1/2"), { marginHorizontal: `-${C["1/2"]}` }],
    [sb("-mx:[3]"), { marginHorizontal: -3 }],
    // my:
    [sb("my:1"), { marginVertical: C["1"] }],
    [sb("my:1/2"), { marginVertical: C["1/2"] }],
    [sb("my:[3]"), { marginVertical: 3 }],
    // -my:
    [sb("-my:1"), { marginVertical: -C["1"] }],
    [sb("-my:1/2"), { marginVertical: `-${C["1/2"]}` }],
    [sb("-my:[3]"), { marginVertical: -3 }],
    // ml:
    [sb("ml:1"), { marginLeft: C["1"] }],
    [sb("ml:1/2"), { marginLeft: C["1/2"] }],
    [sb("ml:[3]"), { marginLeft: 3 }],
    // -ml:
    [sb("-ml:1"), { marginLeft: -C["1"] }],
    [sb("-ml:1/2"), { marginLeft: `-${C["1/2"]}` }],
    [sb("-ml:[3]"), { marginLeft: -3 }],
    // mr:
    [sb("mr:1"), { marginRight: C["1"] }],
    [sb("mr:1/2"), { marginRight: C["1/2"] }],
    [sb("mr:[3]"), { marginRight: 3 }],
    // -mr:
    [sb("-mr:1"), { marginRight: -C["1"] }],
    [sb("-mr:1/2"), { marginRight: `-${C["1/2"]}` }],
    [sb("-mr:[3]"), { marginRight: -3 }],
    // mt:
    [sb("mt:1"), { marginTop: C["1"] }],
    [sb("mt:1/2"), { marginTop: C["1/2"] }],
    [sb("mt:[3]"), { marginTop: 3 }],
    // -mt:
    [sb("-mt:1"), { marginTop: -C["1"] }],
    [sb("-mt:1/2"), { marginTop: `-${C["1/2"]}` }],
    [sb("-mt:[3]"), { marginTop: -3 }],
    // mb:
    [sb("mb:1"), { marginBottom: C["1"] }],
    [sb("mb:1/2"), { marginBottom: C["1/2"] }],
    [sb("mb:[3]"), { marginBottom: 3 }],
    // -mb:
    [sb("-mb:1"), { marginBottom: -C["1"] }],
    [sb("-mb:1/2"), { marginBottom: `-${C["1/2"]}` }],
    [sb("-mb:[3]"), { marginBottom: -3 }],

    // p:
    [sb("p:1"), { padding: C["1"] }],
    [sb("p:1/2"), { padding: C["1/2"] }],
    [sb("p:[3]"), { padding: 3 }],
    // px:
    [sb("px:1"), { paddingHorizontal: C["1"] }],
    [sb("px:1/2"), { paddingHorizontal: C["1/2"] }],
    [sb("px:[3]"), { paddingHorizontal: 3 }],
    // py:
    [sb("py:1"), { paddingVertical: C["1"] }],
    [sb("py:1/2"), { paddingVertical: C["1/2"] }],
    [sb("py:[3]"), { paddingVertical: 3 }],
    // pl:
    [sb("pl:1"), { paddingLeft: C["1"] }],
    [sb("pl:1/2"), { paddingLeft: C["1/2"] }],
    [sb("pl:[3]"), { paddingLeft: 3 }],
    // pr:
    [sb("pr:1"), { paddingRight: C["1"] }],
    [sb("pr:1/2"), { paddingRight: C["1/2"] }],
    [sb("pr:[3]"), { paddingRight: 3 }],
    // pt:
    [sb("pt:1"), { paddingTop: C["1"] }],
    [sb("pt:1/2"), { paddingTop: C["1/2"] }],
    [sb("pt:[3]"), { paddingTop: 3 }],
    // pb:
    [sb("pb:1"), { paddingBottom: C["1"] }],
    [sb("pb:1/2"), { paddingBottom: C["1/2"] }],
    [sb("pb:[3]"), { paddingBottom: 3 }],

    // inset:
    [
      sb("inset:2"),
      { left: C["2"], right: C["2"], top: C["2"], bottom: C["2"] },
    ],
    [sb("inset:[3]"), { left: 3, right: 3, top: 3, bottom: 3 }],
    // inset-x:
    [sb("inset-x:2"), { left: C["2"], right: C["2"] }],
    [sb("inset-x:[3]"), { left: 3, right: 3 }],
    // inset-y:
    [sb("inset-y:2"), { top: C["2"], bottom: C["2"] }],
    [sb("inset-y:[3]"), { top: 3, bottom: 3 }],

    // left:
    [sb("left:2"), { left: C["2"] }],
    [sb("left:[3]"), { left: 3 }],
    // -left:
    [sb("-left:2"), { left: -C["2"] }],
    [sb("-left:[3]"), { left: -3 }],
    // right:
    [sb("right:2"), { right: C["2"] }],
    [sb("right:[3]"), { right: 3 }],
    // -right:
    [sb("-right:2"), { right: -C["2"] }],
    [sb("-right:[3]"), { right: -3 }],
    // top:
    [sb("top:2"), { top: C["2"] }],
    [sb("top:[3]"), { top: 3 }],
    // -top:
    [sb("-top:2"), { top: -C["2"] }],
    [sb("-top:[3]"), { top: -3 }],
    // bottom:
    [sb("bottom:2"), { bottom: C["2"] }],
    [sb("bottom:[3]"), { bottom: 3 }],
    // -bottom:
    [sb("-bottom:2"), { bottom: -C["2"] }],
    [sb("-bottom:[3]"), { bottom: -3 }],

    // w:
    [sb("w:2"), { width: C["2"] }],
    [sb("w:1/3"), { width: C["1/3"] }],
    [sb("w:[3]"), { width: 3 }],
    // min-w:
    [sb("min-w:2"), { minWidth: C["2"] }],
    [sb("min-w:1/3"), { minWidth: C["1/3"] }],
    [sb("min-w:[3]"), { minWidth: 3 }],
    // max-w:
    [sb("max-w:2"), { maxWidth: C["2"] }],
    [sb("max-w:1/3"), { maxWidth: C["1/3"] }],
    [sb("max-w:[3]"), { maxWidth: 3 }],
    // h:
    [sb("h:2"), { height: C["2"] }],
    [sb("h:1/3"), { height: C["1/3"] }],
    [sb("h:[3]"), { height: 3 }],
    // min-h:
    [sb("min-h:2"), { minHeight: C["2"] }],
    [sb("min-h:1/3"), { minHeight: C["1/3"] }],
    [sb("min-h:[3]"), { minHeight: 3 }],
    // max-h:
    [sb("max-h:2"), { maxHeight: C["2"] }],
    [sb("max-h:1/3"), { maxHeight: C["1/3"] }],
    [sb("max-h:[3]"), { maxHeight: 3 }],
  ];

  it.each(cases)(
    "builder(%s^-1) returns %s",
    (actualOutput, expectedOutput) => {
      expect(actualOutput).toEqual(expectedOutput);
    }
  );

  it("allows for custom constraints", () => {
    const { styles } = createStyleBuilder({
      theme: {
        spacing: { sm: 3 },
      },
    });

    expect(styles("m:sm")).toEqual({ margin: 3 });
    // @ts-expect-error
    expect(styles("m:3")).toEqual({});
  });
});
