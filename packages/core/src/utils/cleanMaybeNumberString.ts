/**
 * If string looks like number, make it number
 */
export const cleanMaybeNumberString = (val: string): string | number =>
  !isNaN(Number(val)) ? Number(val) : val;
