import { rgbStringToRgb } from "./rgbStringToRgb";
import { hexToRgb } from "./hexToRgb";

const RgbRegExp = /rgb\(/;
export const colorStringToRgb = (val: string) => {
  if (RgbRegExp.test(val)) {
    return rgbStringToRgb(val);
  } else {
    return hexToRgb(val);
  }
};
