export const applyOpacityToColor = (color: string, opacity: number) => {
  const trimmedColor = color.replace(colorStrip, "");

  if (rgbReg.test(trimmedColor))
    return applyOpacityToRgb(trimmedColor, opacity);

  if (hslReg.test(trimmedColor))
    return applyOpacityToHsl(trimmedColor, opacity);

  return trimmedColor;
};

const applyOpacityToRgb = (rgbString: string, opacity: number) => {
  const match = rgbString.match(rgbReg);
  if (match?.groups) {
    const { r, g, b, a } = match.groups;
    if (a) return `rgba(${r},${g},${b},${+a * opacity})`;
    return `rgba(${r},${g},${b},${opacity})`;
  } else {
    return rgbString;
  }
};

const applyOpacityToHsl = (hslString: string, opacity: number) => {
  const match = hslString.match(hslReg);
  if (match?.groups) {
    const { h, s, l, a } = match.groups;
    if (a) return `hsla(${h},${s},${l},${+a * opacity})`;
    return `hsla(${h},${s},${l},${opacity})`;
  } else {
    return hslString;
  }
};

const applyOpacityToHex = (hexString: string, opacity: number) => {};

const decimalToHex = (decimal: number) => {
  const clampedDecimal = Math.max(0, Math.min(1, decimal));
  const intValue = Math.round(clampedDecimal * 255);
  const hexValue = intValue.toString(16);
  return hexValue.padStart(2, "0");
};

const colorStrip = / /g;
const rgbReg = /^rgba?\((?<r>\d+),(?<g>\d+),(?<b>\d+),?(?<a>0?\.?\d+)?\)$/;
const hslReg = /^hsla?\((?<h>\d+),(?<s>\d+%?),(?<l>\d+%?),?(?<a>0?\.?\d+)?\)$/;
