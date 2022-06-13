import { describe, it, expect } from "vitest";
import { extractFromBrackets } from "./extractFromBrackets";

describe("extractFromBrackets", () => {
  it("extracts numbers from brackets", () => {
    expect(extractFromBrackets("[32]")).toEqual(32);
    expect(extractFromBrackets("[-32]")).toEqual(-32);
    expect(extractFromBrackets("[17.3]")).toEqual(17.3);
    expect(extractFromBrackets("[-17.3]")).toEqual(-17.3);
  });

  it("extracts strings from brackets", () => {
    expect(extractFromBrackets("[32%]")).toEqual("32%");
    expect(extractFromBrackets("[red-ish]")).toEqual("red-ish");
  });

  it("returns undefined if no bracket pair recognized", () => {
    expect(extractFromBrackets("[nope")).toBeUndefined();
  });
});
