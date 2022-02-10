import { BaseError } from "@/utils/BaseError";
import { Brand } from "@/utils/Brand";
import { Either } from "@/utils/Either";

export type PasswordValue = Brand<string, "password">;

export class WeakPasswordError extends BaseError<"WeakPasswordError"> {
  constructor() {
    super(
      "Weak password is short, common, a system default, or something that could be rapidly guessed"
    );
  }
}

export const Password = (
  password: string
): Either<WeakPasswordError, PasswordValue> =>
  Either.of(password as PasswordValue);
