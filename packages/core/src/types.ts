import { FlexStyle } from "react-native";

export type ValueOf<T> = T[keyof T];
export type StyleHandler = (...args: any[]) => object;
export type StyleHandlerSet = {
  [key: string]: StyleHandler;
};
export type Optional<T> = { [Key in keyof T]?: T[Key] };

export type ClassName<P extends StyleHandlerSet> = ValueOf<{
  [K in keyof P]: Parameters<P[K]>[0] extends undefined
    ? `${NonSymbol<K>}`
    : `${NonSymbol<K>}:${Parameters<P[K]>[0]}`;
}>;

/**
 * ------
 */

export type NonSymbol<T> = Exclude<T, symbol>;

export type BgOpacityRecord = { "--bg-opacity"?: number };

/**
 * THEME TYPES
 */

export type ThemeConstraints = {
  spacing?: Record<string | number, string | number>;
  colors?: Record<string, string> | undefined;
  opacities?: Record<string | number, number>;
};

export type NonOptional<T> = { [Key in keyof T]-?: T[Key] };

export type NumOrString = number | string;
