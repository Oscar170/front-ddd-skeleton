import { render as tlRender, RenderOptions } from "@testing-library/react";
import { AppContainer } from "@/context/workflow";
import { ContainerProvider } from "@/hooks/useContainer";
import Container from "@/utils/Container";

export const render = (
  ui: React.ReactElement,
  options: Omit<RenderOptions, "queries"> & {
    serviceContainer: AppContainer;
  } = {
    serviceContainer: Container.of({}),
  }
) => {
  const {
    serviceContainer,
    wrapper: Wrapper = ({ children }) => children,
    ...testingLibraryOptions
  } = options;
  const wrapper: React.FC = ({ children }) => (
    <Wrapper>
      <ContainerProvider value={serviceContainer}>{children}</ContainerProvider>
    </Wrapper>
  );
  return tlRender(ui, { ...testingLibraryOptions, wrapper });
};
