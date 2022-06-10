// import { hexToRgb } from "./hexToRgb";
//
// describe("hexToRgb", () => {
//   it.each`
//     hex          | r      | g      | b
//     ${"#000"}    | ${0}   | ${0}   | ${0}
//     ${"#000000"} | ${0}   | ${0}   | ${0}
//     ${"#fff"}    | ${255} | ${255} | ${255}
//     ${"#ffffff"} | ${255} | ${255} | ${255}
//     ${"#f00"}    | ${255} | ${0}   | ${0}
//     ${"#ff0000"} | ${255} | ${0}   | ${0}
//     ${"#0f0"}    | ${0}   | ${255} | ${0}
//     ${"#00ff00"} | ${0}   | ${255} | ${0}
//     ${"#00f"}    | ${0}   | ${0}   | ${255}
//     ${"#0000ff"} | ${0}   | ${0}   | ${255}
//     ${"#3c5e2d"} | ${60}  | ${94}  | ${45}
//     ${"#964ae3"} | ${150} | ${74}  | ${227}
//     ${"#e2ae92"} | ${226} | ${174} | ${146}
//   `("Converts $hex to rgb($r, $g, $b)", ({ hex, r, g, b }) => {
//     expect(hexToRgb(hex)).toEqual({ r, g, b });
//   });
//
//   it("throws on no leading #", () => {
//     expect(() => {
//       hexToRgb("fff");
//     }).toThrow();
//   });
//
//   it("throws on nonsense hex", () => {
//     expect(() => {
//       console.log(hexToRgb("#foobar"));
//     }).toThrow();
//   });
// });
