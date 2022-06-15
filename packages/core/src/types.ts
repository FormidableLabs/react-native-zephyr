import { TextStyle } from "react-native";

export type ValueOf<T> = T[keyof T];
export type StyleHandler = (...args: any[]) => object;
export type StyleHandlerSet = {
  [key: string]: StyleHandler;
};

export type NonSymbol<T> = Exclude<T, symbol>;

export type BgOpacityRecord = { "--bg-opacity"?: number };

export type ClassName<P extends StyleHandlerSet> = ValueOf<{
  [K in keyof P]: Parameters<P[K]>[0] extends undefined
    ? `${NonSymbol<K>}`
    : `${NonSymbol<K>}:${Parameters<P[K]>[0]}`;
}>;

/**
 * THEME TYPES
 */

export type ThemeConstraints = {
  spacing?: Record<NumOrString, string | number>;
  colors?: Record<NumOrString, string> | undefined;
  opacities?: Record<NumOrString, number>;
  aspectRatios?: Record<NumOrString, readonly [number, number]>;
  borderSizes?: Record<NumOrString, number>;
  borderRadii?: Record<NumOrString, number>;
  shadows?: Record<
    NumOrString,
    { android: number; ios: readonly [number, number, number, number] }
  >;
  fontSizes?: Record<NumOrString, readonly [number, number]>;
  fontWeights?: Record<NumOrString, TextStyle["fontWeight"]>;
};

export type NonOptional<T> = { [Key in keyof T]-?: T[Key] };

export type NumOrString = number | string;

export type FlexibleClassName<Cn extends string> =
  | Cn
  | { [key in Cn]?: boolean }
  | null
  | undefined
  | false;
