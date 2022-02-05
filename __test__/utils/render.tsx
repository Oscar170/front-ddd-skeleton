import { render as tlRender, RenderOptions } from "@testing-library/react";
import { AppContainer } from "@/context/workflow";
import { ContainerProvider } from "@/hooks/useContainer";
import Container from "@/utils/Container";

export const render = (
  component: React.ReactElement,
  options: Omit<RenderOptions, "queries"> & {
    serviceContainer: AppContainer;
  } = {
    serviceContainer: Container.of({}),
  }
) => {
  const { serviceContainer, ...testingLibraryOptions } = options;
  return tlRender(
    <ContainerProvider value={options.serviceContainer}>
      {component}
    </ContainerProvider>,
    testingLibraryOptions
  );
};
