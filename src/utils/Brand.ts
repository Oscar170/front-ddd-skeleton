export type Primitive =
  | string
  | number
  | bigint
  | boolean
  | symbol
  | null
  | undefined;

export type Brand<T extends Primitive, U> = T & { __brand: U; base: T };
