import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "../../utils/render";
import Login from "@/sections/Login";
import Container, { toFakeImport } from "@/utils/Container";
import { login } from "@/context/application/auth/login";
import {
  emptyGetLoginMock,
  errorGetLoginMock,
  succesGetLoginMock,
} from "../../context/infra/__mock__/LoginRepositoryMock";

test("should render", async () => {
  render(<Login />);
});

test("short username results in an error'", async () => {
  render(<Login />, {
    serviceContainer: Container.of({
      login: toFakeImport(login({ getLogin: emptyGetLoginMock() })),
    }),
  });

  userEvent.type(screen.getByLabelText(/username/i), "so");
  userEvent.click(screen.getByRole("button", { name: /login/i }));

  await waitForElementToBeRemoved(() => screen.queryByTestId("login-waiting"));

  expect(screen.getByTestId("login-error")).toBeInTheDocument();
});

test("username isn't mail format results in an error'", async () => {
  render(<Login />, {
    serviceContainer: Container.of({
      login: toFakeImport(login({ getLogin: emptyGetLoginMock() })),
    }),
  });

  userEvent.type(screen.getByLabelText(/username/i), "some");
  userEvent.click(screen.getByRole("button", { name: /login/i }));

  await waitForElementToBeRemoved(() => screen.queryByTestId("login-waiting"));

  expect(screen.getByTestId("login-error")).toBeInTheDocument();
});

test("logging in without problems displays success message", async () => {
  render(<Login />, {
    serviceContainer: Container.of({
      login: toFakeImport(login({ getLogin: succesGetLoginMock() })),
    }),
  });

  userEvent.type(screen.getByLabelText(/username/i), "some@some");
  userEvent.click(screen.getByRole("button", { name: /login/i }));

  await waitForElementToBeRemoved(() => screen.queryByTestId("login-waiting"));

  expect(screen.getByTestId("login-success")).toBeInTheDocument();
});

test("logging in with problems displays success message", async () => {
  render(<Login />, {
    serviceContainer: Container.of({
      login: toFakeImport(login({ getLogin: errorGetLoginMock() })),
    }),
  });

  userEvent.type(screen.getByLabelText(/username/i), "some@some");
  userEvent.click(screen.getByRole("button", { name: /login/i }));

  await waitForElementToBeRemoved(() => screen.queryByTestId("login-waiting"));

  expect(screen.getByTestId("login-error")).toBeInTheDocument();
});
