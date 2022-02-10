// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Fn = (...args: any) => any;

export type ImportToDefault<T extends Promise<{ default: Fn }>> = Promise<
  Awaited<T>["default"]
>;
export type Module = () => Promise<{ default: Fn }>;
export type ServicesShape = { [key: string]: Module };

export const toFakeImport =
  <T extends Fn>(fn: T) =>
  () =>
    Promise.resolve({ default: fn });

const Container = {
  of: <Services extends ServicesShape>(services: Services) => {
    return {
      get: <Key extends keyof Services>(
        key: Key
      ): ImportToDefault<ReturnType<Services[Key]>> =>
        services[key]().then((mod) => mod.default),
    };
  },
};

export default Container;
