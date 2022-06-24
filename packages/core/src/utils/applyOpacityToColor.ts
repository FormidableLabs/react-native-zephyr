export const applyOpacityToColor = (color: string, opacity: number) => {
  const trimmedColor = color.replace(colorStrip, "");

  if (rgbReg.test(trimmedColor))
    return applyOpacityToRgb(trimmedColor, opacity);

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

const colorStrip = / /g;
const rgbReg = /^rgba?\((?<r>\d+),(?<g>\d+),(?<b>\d+),?(?<a>0?\.?\d+)?\)$/;
