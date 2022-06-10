export type StyleHandler = (...args: any[]) => object;
export type StyleHandlerSet = {
  [key: string]: StyleHandler;
};

export type BeefedStyleHandlerSet<S extends StyleHandlerSet> = {
  [K in keyof S | `${NonSymbol<keyof S>}__dark`]: S[K];
};

export type Undarken<T> = T extends `${infer C}__dark` ? C : T;
type NonSymbol<T> = Exclude<T, symbol>;

export type StyleProps<P extends StyleHandlerSet> = {
  [K in keyof P | `${NonSymbol<keyof P>}__dark`]?: Parameters<
    P[Undarken<K>]
  >[0] extends undefined
    ? boolean
    : Parameters<P[Undarken<K>]>[0];
};
