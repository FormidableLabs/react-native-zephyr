export const applyOpacityToColor = (color: string, opacity: number) => {
  const trimmedColor = color.replace(colorStrip, "");

  if (rgbReg.test(trimmedColor))
    return applyOpacityToRgb(trimmedColor, opacity);

  if (hslReg.test(trimmedColor))
    return applyOpacityToHsl(trimmedColor, opacity);

  if (hexReg.test(trimmedColor))
    return applyOpacityToHex(trimmedColor, opacity);

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

const applyOpacityToHex = (hexString: string, opacity: number) => {
  const hex = hexString.match(hexReg)?.[1];
  if (hex) {
    if (hex.length === 3 || hex.length === 6) {
      return `#${hex.length === 3 ? expandShortHex(hex) : hex}${decimalToHex(
        opacity
      )}`;
    }

    if (hex.length === 4 || hex.length === 8) {
      // Force out to 8-digit hex
      const hex8 = hex.length === 4 ? expandShortHex(hex) : hex;
      // grab first-6 and last-2, so we can add opacity to last-2
      const first6 = hex8.substring(0, 6);
      const last2 = hex8.substring(6, 8);

      return `#${first6}${decimalToHex(opacity * hexToDecimal(last2))}`;
    }

    return hexString;
  } else {
    return hexString;
  }
};

const expandShortHex = (str: string) =>
  [...str].reduce<string>((acc, char) => acc + `${char}${char}`, "");

const decimalToHex = (decimal: number) => {
  const clampedDecimal = Math.max(0, Math.min(1, decimal));
  const intValue = Math.round(clampedDecimal * 255);
  const hexValue = intValue.toString(16);
  return hexValue.padStart(2, "0");
};

const hexToDecimal = (hex: string) => parseInt(hex, 16) / 255;

const colorStrip = / /g;
const rgbReg = /^rgba?\((?<r>\d+),(?<g>\d+),(?<b>\d+),?(?<a>0?\.?\d+)?\)$/;
const hslReg = /^hsla?\((?<h>\d+),(?<s>\d+%?),(?<l>\d+%?),?(?<a>0?\.?\d+)?\)$/;
const hexReg = /^#([0-9a-fA-F]{3,8})$/;
