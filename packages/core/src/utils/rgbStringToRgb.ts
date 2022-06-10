const RgbRegExp = /rgb\((\d+),\s*(\d+),\s*(\d+)/i;
const isOutOfBounds = (x: number) => isNaN(x) || x < 0;

export const rgbStringToRgb = (
  val: string
): { r: number; g: number; b: number } => {
  const match = val.match(RgbRegExp);

  if (!match) {
    throw new Error(
      "Invalid RGB string, pass something like rgb(100, 200, 255)"
    );
  }

  const [, _r, _g, _b] = match;
  const [r, g, b] = [_r, _g, _b].map((x) => parseInt(x, 10));

  if (isOutOfBounds(r) || isOutOfBounds(g) || isOutOfBounds(b)) {
    throw new Error("Invalid r, g, or b value");
  }

  return { r, g, b };
};
