import type { AppProps } from "next/app";
import { ContainerProvider } from "@/hooks/useContainer";
import { container } from "@/context/workflow";
import ErrorBoundary, { HandleError } from "@/components/flow/ErrorBoundary";

const handleError: HandleError = ({ error, errorInfo }) => {
  console.group("app-ddd-example-ts");
  console.log(error);
  console.log(errorInfo);
  console.groupEnd();

  return Promise.resolve();
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary onError={handleError}>
      <ContainerProvider value={container}>
        <Component {...pageProps} />;
      </ContainerProvider>
    </ErrorBoundary>
  );
}

export default MyApp;
