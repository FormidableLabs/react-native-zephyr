import { describe, it, expect, vi } from "vitest";
import { SimpleEventEmitter } from "./SimpleEventEmitter";

describe("SimpleEventEmitter", () => {
  it("should register listeners", () => {
    const ee = new SimpleEventEmitter<number>();
    const listener1 = vi.fn();
    const listener2 = vi.fn();

    ee.subscribe(listener1);
    ee.subscribe(listener2);

    ee.emit(3);

    expect(listener1).toHaveBeenCalledWith(3);
    expect(listener2).toHaveBeenCalledWith(3);
  });

  it("should unsubscribe listeners", () => {
    const ee = new SimpleEventEmitter<number>();
    const listener1 = vi.fn();
    const listener2 = vi.fn();

    // Subscribe both listeners
    const { unsubscribe: unsubscribe1 } = ee.subscribe(listener1);
    ee.subscribe(listener2);

    // First emit should be picked up by both
    ee.emit(3);
    expect(listener1).toHaveBeenCalledTimes(1);
    expect(listener2).toHaveBeenCalledTimes(1);

    // Unsubscribe the first
    unsubscribe1();

    // Second emit should only be picked up by second
    ee.emit(5);
    expect(listener1).toHaveBeenCalledTimes(1);
    expect(listener2).toHaveBeenCalledTimes(2);
  });
});
