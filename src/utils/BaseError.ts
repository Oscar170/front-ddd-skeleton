import { Brand } from "./Brand";

export abstract class BaseError<UniqueName extends string> extends Error {
  uid!: Brand<string, UniqueName>;
}
