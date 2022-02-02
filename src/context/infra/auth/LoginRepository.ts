import { Either } from "../../../utils/Either";
import {
  InvalidUsernameOrPasswordError,
  LoginRepository,
} from "../../domain/auth/LoginRepository";
import { Token } from "../../domain/auth/Token";

declare global {
  interface Crypto {
    randomUUID: () => string;
  }
}

export const loginRepository: LoginRepository = () =>
  Math.random() > 0.5
    ? Either.of(crypto.randomUUID() as Token)
    : Either.left(new InvalidUsernameOrPasswordError());
