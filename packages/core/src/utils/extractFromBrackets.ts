/**
 * Extract value from brackets, e.g. [32] -> 32
 */
import { cleanMaybeNumberString } from "./cleanMaybeNumberString";

export const extractFromBrackets = (
  val: string | number
): string | number | undefined => {
  const insideBracket = (typeof val === "string" ? val : String(val)).match(
    NumberRegexp
  )?.[1];
  if (insideBracket) {
    return cleanMaybeNumberString(insideBracket);
  } else {
    return undefined;
  }
};

const NumberRegexp = /^\[(.*)\]$/;
