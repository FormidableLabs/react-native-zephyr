import { FlexibleClassName } from "../types";

export const flattenClassNameArgs = <Cn extends string>(
  ...args: FlexibleClassName<Cn>[]
): Cn[] => {
  const cns = [] as Cn[];

  for (const arg of args) {
    if (!arg) continue;

    if (typeof arg === "string") {
      cns.push(arg);
    } else {
      for (const key in arg) {
        if (arg[key]) {
          cns.push(key);
        }
      }
    }
  }

  return cns;
};
