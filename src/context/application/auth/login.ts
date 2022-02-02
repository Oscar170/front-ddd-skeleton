import { Either } from "../../../utils/Either";
import { sanitizeUseCase, UseCase } from "../../shared/useCase";
import { Username } from "../../domain/auth/Username";
import { Token } from "../../domain/auth/Token";
import { Password } from "../../domain/auth/Password";
import { LoginRepository } from "../../domain/auth/LoginRepository";

type loginDeps = { getLogin: LoginRepository };
type loginCommand = { username: string; password: string };

export const login =
  ({ getLogin }: loginDeps): UseCase<loginCommand, Token> =>
  ({ username, password }) => {
    const validations = Either.compress([
      Username(username),
      Password(password),
    ]);

    if (Either.isLeft(validations)) {
      return sanitizeUseCase(
        Promise.reject(Either.getLeft(validations).message)
      );
    }

    const [validUsername, validPassword] = Either.getRight(validations);

    return sanitizeUseCase(
      Either.fold(
        (err) => Promise.reject(err.message),
        (token) => Promise.resolve(token),
        getLogin(validUsername, validPassword)
      )
    );
  };
