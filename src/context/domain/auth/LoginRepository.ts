import { BaseError } from "../../../utils/BaseError";
import { Either } from "../../../utils/Either";
import { PasswordValue } from "./Password";
import { Token } from "./Token";
import { UsernameValue } from "./Username";

export class InvalidUsernameOrPasswordError extends BaseError<"InvalidUsernameOrPasswordError"> {
  constructor() {
    super("Username or Password are invalid.");
  }
}

export type LoginRepository = (
  username: UsernameValue,
  password: PasswordValue
) => Promise<Either<InvalidUsernameOrPasswordError, Token>>;
