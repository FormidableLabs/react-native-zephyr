import { describe, expect, it } from "vitest";
import { flattenClassNameArgs } from "./flattenClassNameArgs";

describe("flattenClassNameArgs", () => {
  it("handles string args", () => {
    expect(flattenClassNameArgs("foo", "bar", "baz")).toEqual([
      "foo",
      "bar",
      "baz",
    ]);
  });

  it("handles object args", () => {
    expect(flattenClassNameArgs({ foo: true, bar: true, baz: false })).toEqual([
      "foo",
      "bar",
    ]);
  });

  it("handles both string and object args together", () => {
    expect(
      flattenClassNameArgs<"foo" | "bar" | "baz">("foo", {
        bar: false,
        baz: true,
      })
    ).toEqual(["foo", "baz"]);
  });
});
