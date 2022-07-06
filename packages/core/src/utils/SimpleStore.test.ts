import { vitest, it, expect, describe } from "vitest";
import { SimpleStore } from "./SimpleStore";
import { renderHook } from "@testing-library/react-hooks";

describe("SimpleStore", () => {
  it("takes a getValue function and offers a hook that can be triggered", () => {
    let theValue = "foo";
    const s = new SimpleStore(() => theValue);
    const { result } = renderHook(s.useStoreValue);

    // Initial result should be "foo"
    expect(result.current).toEqual("foo");

    // Update the value, and trigger emit, hook should now return "bar"
    theValue = "bar";
    s.emitUpdatedValue();
    expect(result.current).toEqual("bar");
  });
});
