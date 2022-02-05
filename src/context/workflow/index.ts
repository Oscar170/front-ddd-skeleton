import Container from "../../utils/Container";

export const container = Container.of({
  login: () => import("./auth/login"),
});

export type AppContainer = typeof container;
