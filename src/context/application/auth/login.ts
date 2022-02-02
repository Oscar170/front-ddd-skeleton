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
    const validUsername = Username(username);
    const validPassword = Password(password);

    if (Either.isLeft(validUsername)) {
      return sanitizeUseCase(
        Promise.reject(Either.getLeft(validUsername).message)
      );
    }

    if (Either.isLeft(validPassword)) {
      return sanitizeUseCase(
        Promise.reject(Either.getLeft(validPassword).message)
      );
    }

    return sanitizeUseCase(
      Either.fold(
        (err) => Promise.reject(err.message),
        (token) => Promise.resolve(token),
        getLogin(Either.getRight(validUsername), Either.getRight(validPassword))
      )
    );
  };
