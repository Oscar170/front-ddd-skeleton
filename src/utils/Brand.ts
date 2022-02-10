export type Primitive =
  | string
  | number
  | bigint
  | boolean
  | symbol
  | null
  | undefined;

export type Brand<T extends Primitive, U> = T & { __brand: U; base: T };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type Unbrand<MaybeBrand> = MaybeBrand extends Brand<infer Type, infer U>
  ? Type
  : MaybeBrand extends object
  ? {
      [K in keyof MaybeBrand]: Unbrand<MaybeBrand[K]>;
    }
  : MaybeBrand;
