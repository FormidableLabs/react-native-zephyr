import { isNamedColor, namedColors } from "./namedColors";
/**
 * Apply a given opacity (between 0 and 1) to a color string.
 */
export const applyOpacityToColor = (color: string, opacity: number) => {
  const trimmedColor = color.replace(colorStrip, "");

  if (rgbReg.test(trimmedColor))
    return applyOpacityToRgb(trimmedColor, opacity);

  if (hslReg.test(trimmedColor))
    return applyOpacityToHsl(trimmedColor, opacity);

  if (hexReg.test(trimmedColor))
    return applyOpacityToHex(trimmedColor, opacity);

  if (isNamedColor(trimmedColor)) {
    return applyOpacityToHex(namedColors[trimmedColor], opacity);
  }

  return trimmedColor;
};

/**
 * Applying to rgb(a)
 * - Scales current opacity if already present
 */
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

/**
 * Applying to hsl(a)
 * - Scales current opacity if already present
 */
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

/**
 * Apply opacity to hex of the form #rgb, #rgba, #rrggbb, or #rrggbbaa
 * - Scales opacity if already present.
 */
const applyOpacityToHex = (hexString: string, opacity: number) => {
  const hex = hexString.match(hexReg)?.[1];
  if (hex) {
    // If length is 3 or 6, no opacity present – so just expand the short version
    //  if necessary, and add opacity (as hex) to the end.
    if (hex.length === 3 || hex.length === 6) {
      return `#${hex.length === 3 ? expandShortHex(hex) : hex}${decimalToHex(
        opacity
      )}`;
    }

    // If length is 4 or 8, opacity *is* present.
    // Expand out to 8-digit, grab the last two digits (opacity) and then scale that.
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

// #rgb is equivalent to #rrggbb. This expands a 3 or 4-digit hex to a 6 or 8-digit.
const expandShortHex = (str: string) =>
  [...str].reduce<string>((acc, char) => acc + `${char}${char}`, "");

// Convert a decimal (between 0 and 1) to hex value.
const decimalToHex = (decimal: number) => {
  const clampedDecimal = Math.max(0, Math.min(1, decimal));
  const intValue = Math.round(clampedDecimal * 255);
  const hexValue = intValue.toString(16);
  return hexValue.padStart(2, "0");
};

// Convert hex to decimal (a simplified reversal of decimalToHex)
const hexToDecimal = (hex: string) => parseInt(hex, 16) / 255;

const colorStrip = / /g;
// RGB RegExp – grab r, g, b, and a by name
const rgbReg = /^rgba?\((?<r>\d+),(?<g>\d+),(?<b>\d+),?(?<a>0?\.?\d+)?\)$/;
// HSL RegExp – grab h, s, l, and a by name.
const hslReg = /^hsla?\((?<h>\d+),(?<s>\d+%?),(?<l>\d+%?),?(?<a>0?\.?\d+)?\)$/;
// Hex RegExp is simpler. Handle grouping in fn.
const hexReg = /^#([0-9a-fA-F]{3,8})$/;
