import { Either } from "../../../utils/Either";
import { sanitizeUseCase, UseCase } from "../../shared/useCase";
import { Username } from "../../domain/auth/Username";
import { Token } from "../../domain/auth/Token";
import { LoginRepository } from "../../domain/auth/LoginRepository";

type loginDeps = { getLogin: LoginRepository };
type loginCommand = { username: string; password: string };

export const login =
  ({ getLogin }: loginDeps): UseCase<loginCommand, Token> =>
  ({ username, password }) => {
    const validUsername = Username(username);
    const validPassword = Either.of(password);

    if (Either.isLeft(validUsername)) {
      return sanitizeUseCase(
        Promise.reject(Either.getLeft(validUsername).message)
      );
    }

    return sanitizeUseCase(
      getLogin(Either.getRight(validUsername))
        ? Promise.reject("Error in email")
        : Promise.resolve("sdaKsdaoOP9" as Token)
    );
  };
