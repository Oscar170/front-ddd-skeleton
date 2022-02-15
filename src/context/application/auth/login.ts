import { Either } from "@/utils/Either";
import { UseCase } from "../../shared/useCase";
import { Username } from "../../domain/auth/Username";
import { Token } from "../../domain/auth/Token";
import { Password } from "../../domain/auth/Password";
import { LoginRepository } from "../../domain/auth/LoginRepository";

type loginDeps = { getLogin: LoginRepository };
export type loginCommand = { username: string; password: string };

export const login = ({ getLogin }: loginDeps) =>
  UseCase<loginCommand, Token>(async ({ username, password }) => {
    const validations = Either.all([Username(username), Password(password)]);

    if (Either.isLeft(validations)) {
      return Promise.reject(validations.getValue().message);
    }

    const [validUsername, validPassword] = validations.getValue();

    return (await getLogin(validUsername, validPassword)).fold(
      (err) => Promise.reject(err.message),
      (token) => Promise.resolve(token)
    );
  });
