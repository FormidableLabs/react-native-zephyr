export type ValueOf<T> = T[keyof T];
export type StyleHandler = (...args: any[]) => object;
export type StyleHandlerSet = {
  [key: string]: StyleHandler;
};

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;
export type Override<T extends string | number> = `[${T}]`;

export type ClassName<P extends StyleHandlerSet> = ValueOf<{
  [K in keyof P]: Parameters<P[K]>[0] extends undefined
    ? `${NonSymbol<K>}`
    : `${NonSymbol<K>}:${Parameters<P[K]>[0]}`;
}>;

export type InvertClassName<
  P extends StyleHandlerSet,
  Cn extends ClassName<P>
> = Cn extends `${infer K1}:${any}`
  ? K1
  : Cn extends `${infer K2}`
  ? K2
  : never;

export type ReturnStyle<
  P extends StyleHandlerSet,
  T extends string
> = UnionToIntersection<
  ValueOf<{
    [K in T]: ReturnType<P[K]> extends BgOpacityRecord
      ? never
      : ReturnType<P[K]>;
  }>
>;

/**
 * ------
 */

export type BeefedStyleHandlerSet<S extends StyleHandlerSet> = {
  [K in keyof S | `dark:${NonSymbol<keyof S>}`]: S[K];
};

export type Undarken<T> = T extends `dark:${infer C}` ? C : T;
export type NonSymbol<T> = Exclude<T, symbol>;

export type StyleProps<P extends StyleHandlerSet> = {
  [K in keyof P | `${NonSymbol<keyof P>}__dark`]?: Parameters<
    P[Undarken<K>]
  >[0] extends undefined
    ? boolean
    : Parameters<P[Undarken<K>]>[0];
};

export type BgOpacityRecord = { "--bg-opacity"?: number };
