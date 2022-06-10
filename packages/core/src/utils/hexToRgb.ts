export const hexToRgb = (
  hexValue: string
): { r: number; g: number; b: number } => {
  const h = hexValue.match(/^#(\w{3,6})$/)?.[1];

  if (!h || !(h.length === 3 || h.length === 6)) {
    throw new Error("Hex value should be 3 or 6 characters long");
  }

  const isShortVal = h.length === 3;

  const reg = isShortVal ? /(\w)/g : /\w{2}/g;
  const matches = h.match(reg);

  if (matches) {
    const [r, g, b] = matches.map((x) =>
      parseInt(isShortVal ? `${x}${x}` : x, 16)
    );

    if (isNaN(r) || isNaN(g) || isNaN(b)) {
      throw new Error("Hex produces invalid r,g,b");
    }

    return { r, g, b };
  } else {
    throw new Error("Could not parse");
  }
};
