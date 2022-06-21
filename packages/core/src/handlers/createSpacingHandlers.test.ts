import { vi, describe, it, expect } from "vitest";
import { createStyleBuilder } from "../createStyleBuilder";
import { DefaultTheme } from "../theme";

vi.mock("react-native", () => ({
  StyleSheet: {
    hairlineWidth: 0.5,
  },
}));

const { styles } = createStyleBuilder({});
const C = DefaultTheme.spacing;

describe("defaultSpacingHandlers", () => {
  const cases: [Parameters<typeof styles>[0], object][] = [
    // m:
    ["m:1", { margin: C["1"] }],
    ["m:1/2", { margin: C["1/2"] }],
    ["m:[3]", { margin: 3 }],
    // -m:
    ["-m:1", { margin: -C["1"] }],
    ["-m:1/2", { margin: `-${C["1/2"]}` }],
    ["-m:[3]", { margin: -3 }],
    // mx:
    ["mx:1", { marginHorizontal: C["1"] }],
    ["mx:1/2", { marginHorizontal: C["1/2"] }],
    ["mx:[3]", { marginHorizontal: 3 }],
    // -mx:
    ["-mx:1", { marginHorizontal: -C["1"] }],
    ["-mx:1/2", { marginHorizontal: `-${C["1/2"]}` }],
    ["-mx:[3]", { marginHorizontal: -3 }],
    // my:
    ["my:1", { marginVertical: C["1"] }],
    ["my:1/2", { marginVertical: C["1/2"] }],
    ["my:[3]", { marginVertical: 3 }],
    // -my:
    ["-my:1", { marginVertical: -C["1"] }],
    ["-my:1/2", { marginVertical: `-${C["1/2"]}` }],
    ["-my:[3]", { marginVertical: -3 }],
    // ml:
    ["ml:1", { marginLeft: C["1"] }],
    ["ml:1/2", { marginLeft: C["1/2"] }],
    ["ml:[3]", { marginLeft: 3 }],
    // -ml:
    ["-ml:1", { marginLeft: -C["1"] }],
    ["-ml:1/2", { marginLeft: `-${C["1/2"]}` }],
    ["-ml:[3]", { marginLeft: -3 }],
    // mr:
    ["mr:1", { marginRight: C["1"] }],
    ["mr:1/2", { marginRight: C["1/2"] }],
    ["mr:[3]", { marginRight: 3 }],
    // -mr:
    ["-mr:1", { marginRight: -C["1"] }],
    ["-mr:1/2", { marginRight: `-${C["1/2"]}` }],
    ["-mr:[3]", { marginRight: -3 }],
    // mt:
    ["mt:1", { marginTop: C["1"] }],
    ["mt:1/2", { marginTop: C["1/2"] }],
    ["mt:[3]", { marginTop: 3 }],
    // -mt:
    ["-mt:1", { marginTop: -C["1"] }],
    ["-mt:1/2", { marginTop: `-${C["1/2"]}` }],
    ["-mt:[3]", { marginTop: -3 }],
    // mb:
    ["mb:1", { marginBottom: C["1"] }],
    ["mb:1/2", { marginBottom: C["1/2"] }],
    ["mb:[3]", { marginBottom: 3 }],
    // -mb:
    ["-mb:1", { marginBottom: -C["1"] }],
    ["-mb:1/2", { marginBottom: `-${C["1/2"]}` }],
    ["-mb:[3]", { marginBottom: -3 }],

    // p:
    ["p:0", { padding: C["0"] }],
    ["p:1", { padding: C["1"] }],
    ["p:1/2", { padding: C["1/2"] }],
    ["p:[3]", { padding: 3 }],
    // px:
    ["px:1", { paddingHorizontal: C["1"] }],
    ["px:1/2", { paddingHorizontal: C["1/2"] }],
    ["px:[3]", { paddingHorizontal: 3 }],
    // py:
    ["py:1", { paddingVertical: C["1"] }],
    ["py:1/2", { paddingVertical: C["1/2"] }],
    ["py:[3]", { paddingVertical: 3 }],
    // pl:
    ["pl:1", { paddingLeft: C["1"] }],
    ["pl:1/2", { paddingLeft: C["1/2"] }],
    ["pl:[3]", { paddingLeft: 3 }],
    // pr:
    ["pr:1", { paddingRight: C["1"] }],
    ["pr:1/2", { paddingRight: C["1/2"] }],
    ["pr:[3]", { paddingRight: 3 }],
    // pt:
    ["pt:1", { paddingTop: C["1"] }],
    ["pt:1/2", { paddingTop: C["1/2"] }],
    ["pt:[3]", { paddingTop: 3 }],
    // pb:
    ["pb:1", { paddingBottom: C["1"] }],
    ["pb:1/2", { paddingBottom: C["1/2"] }],
    ["pb:[3]", { paddingBottom: 3 }],

    // inset:
    ["inset:2", { left: C["2"], right: C["2"], top: C["2"], bottom: C["2"] }],
    ["inset:[3]", { left: 3, right: 3, top: 3, bottom: 3 }],
    // inset-x:
    ["inset-x:2", { left: C["2"], right: C["2"] }],
    ["inset-x:[3]", { left: 3, right: 3 }],
    // inset-y:
    ["inset-y:2", { top: C["2"], bottom: C["2"] }],
    ["inset-y:[3]", { top: 3, bottom: 3 }],

    // left:
    ["left:2", { left: C["2"] }],
    ["left:[3]", { left: 3 }],
    // -left:
    ["-left:2", { left: -C["2"] }],
    ["-left:[3]", { left: -3 }],
    // right:
    ["right:2", { right: C["2"] }],
    ["right:[3]", { right: 3 }],
    // -right:
    ["-right:2", { right: -C["2"] }],
    ["-right:[3]", { right: -3 }],
    // top:
    ["top:2", { top: C["2"] }],
    ["top:[3]", { top: 3 }],
    // -top:
    ["-top:2", { top: -C["2"] }],
    ["-top:[3]", { top: -3 }],
    // bottom:
    ["bottom:2", { bottom: C["2"] }],
    ["bottom:[3]", { bottom: 3 }],
    // -bottom:
    ["-bottom:2", { bottom: -C["2"] }],
    ["-bottom:[3]", { bottom: -3 }],

    // w:
    ["w:2", { width: C["2"] }],
    ["w:1/3", { width: C["1/3"] }],
    ["w:[3]", { width: 3 }],
    // min-w:
    ["min-w:2", { minWidth: C["2"] }],
    ["min-w:1/3", { minWidth: C["1/3"] }],
    ["min-w:[3]", { minWidth: 3 }],
    // max-w:
    ["max-w:2", { maxWidth: C["2"] }],
    ["max-w:1/3", { maxWidth: C["1/3"] }],
    ["max-w:[3]", { maxWidth: 3 }],
    // h:
    ["h:2", { height: C["2"] }],
    ["h:1/3", { height: C["1/3"] }],
    ["h:[3]", { height: 3 }],
    // min-h:
    ["min-h:2", { minHeight: C["2"] }],
    ["min-h:1/3", { minHeight: C["1/3"] }],
    ["min-h:[3]", { minHeight: 3 }],
    // max-h:
    ["max-h:2", { maxHeight: C["2"] }],
    ["max-h:1/3", { maxHeight: C["1/3"] }],
    ["max-h:[3]", { maxHeight: 3 }],
  ];

  it.each(cases)("builder(%s) equals %s", (cn, expectedOutput) => {
    expect(styles(cn)).toEqual(expectedOutput);
  });

  it("allows for custom constraints", () => {
    const { styles } = createStyleBuilder({
      overrideTheme: {
        spacing: { sm: 3 },
      },
    });

    expect(styles("m:sm")).toEqual({ margin: 3 });
    // @ts-expect-error
    expect(styles("m:3")).toEqual({});
  });

  it("allows extending constraints", () => {
    const { styles } = createStyleBuilder({
      extendTheme: { spacing: { sm: 4 } },
    });

    expect(styles("m:1")).toEqual({ margin: C["1"] });
    expect(styles("m:sm")).toEqual({ margin: 4 });
  });
});
