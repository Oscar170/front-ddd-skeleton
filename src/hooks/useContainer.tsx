import { createContext, FC, useContext } from "react";
import { AppContainer } from "../context/workflow";

const ContainerContext = createContext<AppContainer | null>(null);

export const ContainerProvider: FC<{ value: AppContainer }> = ({
  value,
  ...props
}) => <ContainerContext.Provider {...props} value={value} />;

export const useContainer = (): AppContainer => {
  const container = useContext(ContainerContext);

  if (container === null) {
    throw new Error("ContainerProvider should be used with useContainer");
  }

  return container;
};
