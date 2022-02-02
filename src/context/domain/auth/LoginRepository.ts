import { Brand } from "../../../utils/Brand";
import { Either } from "../../../utils/Either";
import { PasswordValue } from "./Password";
import { Token } from "./Token";
import { UsernameValue } from "./Username";

export class InvalidUsernameOrPasswordError extends Error {
  eid!: Brand<string, "InvalidUsernameOrPasswordError">;
  constructor() {
    super("Username or Password are invalid.");
  }
}

export type LoginRepository = (
  username: UsernameValue,
  password: PasswordValue
) => Promise<Either<InvalidUsernameOrPasswordError, Token>>;
