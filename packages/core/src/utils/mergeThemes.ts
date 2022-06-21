import { NonOptional, ThemeConstraints } from "../types";

export const mergeThemes = <
  BaseTheme extends ThemeConstraints,
  Theme extends ThemeConstraints,
  ThemeExt extends ThemeConstraints
>({
  baseTheme,
  overrideTheme,
  extendTheme,
}: {
  baseTheme: BaseTheme;
  overrideTheme?: Theme;
  extendTheme?: ThemeExt;
}) => {
  const newTheme = {} as NonOptional<ThemeConstraints>;

  // TODO: Try to type this, ugh
  for (const key in baseTheme) {
    // @ts-ignore
    newTheme[key] = {
      // @ts-ignore
      ...(overrideTheme?.[key] || baseTheme[key]),

      // @ts-ignore
      ...extendTheme?.[key],
    };
  }

  return newTheme;
};
