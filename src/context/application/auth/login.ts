import { Either } from "@/utils/Either";
import { UseCase } from "../../shared/useCase";
import { Username } from "../../domain/auth/Username";
import { Token } from "../../domain/auth/Token";
import { Password } from "../../domain/auth/Password";
import { LoginRepository } from "../../domain/auth/LoginRepository";

export type loginCommand = { username: string; password: string };

export const login = (doLogin: LoginRepository) =>
  UseCase<loginCommand, Token>(async ({ username, password }) => {
    const validations = Either.all([Username(username), Password(password)]);

    if (Either.isLeft(validations)) {
      return Promise.reject(validations.getValue().message);
    }

    const [validUsername, validPassword] = validations.getValue();

    return (await doLogin(validUsername, validPassword)).fold(
      (err) => Promise.reject(err.message),
      (token) => Promise.resolve(token)
    );
  });
