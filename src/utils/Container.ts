export type Awaited<T> = T extends PromiseLike<infer U> ? U : T;
export type ImportToDefault<T extends Promise<{ default: Function }>> = Promise<
  Awaited<T>["default"]
>;
export type Module = () => Promise<{ default: Function }>;
export type ServicesShape = { [key: string]: Module };

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
