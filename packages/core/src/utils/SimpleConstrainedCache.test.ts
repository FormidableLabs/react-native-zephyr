import { describe, it, expect } from "vitest";
import { SimpleConstrainedCache } from "./SimpleConstrainedCache";

const makeCache = (numRecords = 25) =>
  new SimpleConstrainedCache({ maxNumRecords: numRecords });

describe("SimpleConstrainedCache", () => {
  it("holds records after being set", () => {
    const cache = makeCache();
    expect(cache.size).toBe(0);

    cache.set("foo", "bar");
    expect(cache.has("foo")).toBe(true);
    expect(cache.get("foo")).toBe("bar");
    expect(cache.size).toBe(1);
  });

  it("drops records once maxNumRecords exceeded", () => {
    const cache = makeCache(5);

    [1, 2, 3, 4, 5].forEach((i) => cache.set(`foo${i}`, Math.random()));
    expect(cache.has(`foo1`)).toBe(true);
    expect(cache.has(`foo2`)).toBe(true);
    expect(cache.has(`foo3`)).toBe(true);
    expect(cache.has(`foo4`)).toBe(true);
    expect(cache.has(`foo5`)).toBe(true);

    // Add a record, expect foo1 to drop
    cache.set("foo6", Math.random());
    expect(cache.has("foo1")).toBe(false);
    expect(cache.has("foo6")).toBe(true);
  });
});
