import { NonOptional, ThemeConstraints } from "../types";
import { DefaultConstraints } from "../theme";

export const mergeThemes = <
  Theme extends ThemeConstraints,
  ThemeExt extends ThemeConstraints
>({
  overrideTheme,
  extendTheme,
}: {
  overrideTheme?: Theme;
  extendTheme?: ThemeExt;
}) => {
  const newTheme = {} as NonOptional<ThemeConstraints>;

  // TODO: Try to type this, ugh
  for (const key in DefaultConstraints) {
    // @ts-ignore
    newTheme[key] = {
      // @ts-ignore
      ...(overrideTheme?.[key] || DefaultConstraints[key]),
      // @ts-ignore
      ...extendTheme?.[key],
    };
  }

  return newTheme;
};
