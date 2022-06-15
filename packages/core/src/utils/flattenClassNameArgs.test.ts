import { describe, expect, it } from "vitest";
import { flattenClassNameArgs } from "./flattenClassNameArgs";

type FooBarBaz = "foo" | "bar" | "baz";

describe("flattenClassNameArgs", () => {
  it("handles string args", () => {
    expect(flattenClassNameArgs<FooBarBaz>("foo", "bar", "baz")).toEqual([
      "foo",
      "bar",
      "baz",
    ]);
  });

  it("handles object args", () => {
    expect(
      flattenClassNameArgs<FooBarBaz>({ foo: true, bar: true, baz: false })
    ).toEqual(["foo", "bar"]);
  });

  it("handles both string and object args together", () => {
    expect(
      flattenClassNameArgs<FooBarBaz>("foo", {
        bar: false,
        baz: true,
      })
    ).toEqual(["foo", "baz"]);
  });

  it("handles falsey values", () => {
    expect(
      flattenClassNameArgs<FooBarBaz>(null, false, undefined, "foo")
    ).toEqual(["foo"]);
  });
});
