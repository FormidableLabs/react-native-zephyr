// import { rgbStringToRgb } from "./rgbStringToRgb";
//
// describe("rgbStringToRgb", () => {
//   it.each`
//     rgbString              | r      | g      | b
//     ${"rgb(0, 0, 0)"}      | ${0}   | ${0}   | ${0}
//     ${"rgb(100, 50, 232)"} | ${100} | ${50}  | ${232}
//     ${"rgb(100,50,232)"}   | ${100} | ${50}  | ${232}
//     ${"rgb(32, 255, 255)"} | ${32}  | ${255} | ${255}
//   `("Converts $rgbString to rgb($r, $g, $b)", ({ rgbString, r, g, b }) => {
//     expect(rgbStringToRgb(rgbString)).toEqual({ r, g, b });
//   });
//
//   it("should throw on non-rgb value", () => {
//     expect(() => {
//       rgbStringToRgb("#fff");
//     }).toThrow();
//   });
//
//   it("should throw if r, g, or b is not between 0 and 255", () => {
//     expect(() => {
//       rgbStringToRgb("rgb(-3, 5, 5)");
//     }).toThrow();
//
//     expect(() => {
//       rgbStringToRgb("rgb(5, -3, 5)");
//     }).toThrow();
//
//     expect(() => {
//       rgbStringToRgb("rgb(5, 5, -3)");
//     }).toThrow();
//   });
// });
