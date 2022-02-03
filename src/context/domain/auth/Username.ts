import { BaseError } from "../../../utils/BaseError";
import { Brand } from "../../../utils/Brand";
import { Either } from "../../../utils/Either";

export type UsernameValue = Brand<string, "username">;

export class UsernameLengthError extends BaseError<"UsernameLengthError"> {
  constructor() {
    super("Username should have min lenght of 4.");
  }
}

export class UsernameWrongFormatError extends BaseError<"UsernameWrongFormatError"> {
  constructor() {
    super("Username should have email fromat.");
  }
}

const usernameValidations = [
  {
    check: (username: string) => username.length < 4,
    error: () => new UsernameLengthError(),
  },
  {
    check: (username: string) => !username.includes("@"),
    error: () => new UsernameWrongFormatError(),
  },
];

export const Username = (
  username: string
): Either<UsernameLengthError | UsernameWrongFormatError, UsernameValue> => {
  const hasError = usernameValidations.find(({ check }) => check(username));

  if (hasError) {
    return Either.left(hasError.error());
  }

  return Either.of(username as UsernameValue);
};
