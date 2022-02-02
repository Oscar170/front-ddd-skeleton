import { Brand } from "../../../utils/Brand";
import { Either } from "../../../utils/Either";

export type PasswordValue = Brand<string, "password">;

export const Password = (password: string): Either<Error, PasswordValue> =>
  Either.of(password as PasswordValue);
