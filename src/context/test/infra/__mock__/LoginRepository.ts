import { Token } from "../../../domain/auth/Token";
import { Either } from "../../../../utils/Either";
import {
  LoginRepository,
  InvalidUsernameOrPasswordError,
} from "../../../domain/auth/LoginRepository";

export const emptyGetLoginMock = (): LoginRepository => jest.fn();
export const errorGetLoginMock = (): LoginRepository =>
  jest.fn(() =>
    Promise.resolve(Either.left(new InvalidUsernameOrPasswordError()))
  );
export const succesGetLoginMock = (): LoginRepository =>
  jest.fn(() => Promise.resolve(Either.of("token" as Token)));
