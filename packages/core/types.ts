export type StyleHandler = (...args: any[]) => object;
export type StyleHandlerSet = {
  [key: string]: StyleHandler;
};

export type Undarken<T> = T extends `dark:${infer C}` ? C : T;
type NonSymbol<T> = Exclude<T, symbol>;

export type StyleProps<P extends StyleHandlerSet> = {
  [K in keyof P | `dark:${NonSymbol<keyof P>}`]?: Parameters<
    P[Undarken<K>]
  >[0] extends undefined
    ? boolean
    : Parameters<P[Undarken<K>]>[0];
};
