import { Token } from "../../../../src/context/domain/auth/Token";
import { Either } from "../../../../src/utils/Either";
import {
  InvalidUsernameOrPasswordError,
  LoginRepository,
} from "../../../../src/context/domain/auth/LoginRepository";

export const emptyGetLoginMock = (): LoginRepository => jest.fn();
export const errorGetLoginMock = (): LoginRepository =>
  jest.fn(() =>
    Promise.resolve(Either.left(new InvalidUsernameOrPasswordError()))
  );
export const succesGetLoginMock = (): LoginRepository =>
  jest.fn(() => Promise.resolve(Either.of("token" as Token)));
