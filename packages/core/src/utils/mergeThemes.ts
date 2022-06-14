import { NonOptional, ThemeConstraints } from "../types";
import { DefaultConstraints } from "../theme";

export const mergeThemes = <
  Theme extends ThemeConstraints,
  ThemeExt extends ThemeConstraints
>({
  theme,
  extendTheme,
}: {
  theme?: Theme;
  extendTheme?: ThemeExt;
}) => {
  const newTheme = {} as NonOptional<ThemeConstraints>;

  // TODO: Try to type this, ugh
  for (const key in DefaultConstraints) {
    // @ts-ignore
    newTheme[key] = {
      // @ts-ignore
      ...(theme?.[key] || DefaultConstraints[key]),
      // @ts-ignore
      ...extendTheme?.[key],
    };
  }

  return newTheme;
};
