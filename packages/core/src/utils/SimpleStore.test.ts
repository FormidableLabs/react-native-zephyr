import { describe, expect, it } from "vitest";
import { SimpleStore } from "./SimpleStore";
import { renderHook } from "@testing-library/react-hooks";

describe("SimpleStore", () => {
  it("takes a getValue function and offers a hook that can be triggered", () => {
    const s = new SimpleStore({ initialValue: "foo", transformer: (v) => v });
    const { result } = renderHook(s.useStoreValue);

    // Initial result should be "foo"
    expect(result.current).toEqual("foo");

    // Update the value, and trigger emit, hook should now return "bar"
    s.updateValue("bar");
    expect(result.current).toEqual("bar");
  });

  it("transforms values", () => {
    const s = new SimpleStore({
      initialValue: "foo" as "foo" | "bar",
      transformer: (v) => v === "foo",
    });
    const { result } = renderHook(s.useStoreValue);

    // Initial result should be "foo"
    expect(result.current).toEqual(true);

    // Update the value, and trigger emit, hook should now return "bar"
    s.updateValue("bar");
    expect(result.current).toEqual(false);
  });
});
