import { login } from "@/context/application/auth/login";
import { InvalidUsernameOrPasswordError } from "@/context/domain/auth/LoginRepository";
import {
  UsernameLengthError,
  UsernameWrongFormatError,
} from "@/context/domain/auth/Username";
import {
  emptyGetLoginMock,
  errorGetLoginMock,
  succesGetLoginMock,
} from "../../infra/__mock__/auth/LoginRepositoryMock";
import {
  invalidFormatUsernameCommand,
  shortUsernameCommand,
  validCommand,
} from "./loginCommandMother";

test("username with less than 4 characters should fail", async () => {
  const getLogin = emptyGetLoginMock();
  const [err] = await login(getLogin)(shortUsernameCommand());

  expect(getLogin).not.toBeCalled();
  expect(err).toBe(new UsernameLengthError().message);
});

test("username without '@' should fail", async () => {
  const getLogin = emptyGetLoginMock();
  const [err] = await login(getLogin)(invalidFormatUsernameCommand());

  expect(getLogin).not.toBeCalled();
  expect(err).toBe(new UsernameWrongFormatError().message);
});

test("correct username and pasword, provider fail", async () => {
  const getLogin = errorGetLoginMock();
  const [err] = await login(getLogin)(validCommand());

  expect(getLogin).toBeCalled();
  expect(err).toBe(new InvalidUsernameOrPasswordError().message);
});

test("correct username and pasword, provider success", async () => {
  const getLogin = succesGetLoginMock();
  const [err, token] = await login(getLogin)(validCommand());

  expect(err).toBeNull();
  expect(getLogin).toBeCalled();
  expect(token).toBe("token");
});
