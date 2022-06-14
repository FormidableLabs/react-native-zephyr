export const flattenClassNameArgs = <Cn extends string>(
  ...args: (Cn | { [key in Cn]?: boolean })[]
): Cn[] => {
  const cns = [] as Cn[];

  for (const arg of args) {
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
