import type { AppProps } from "next/app";
import { ContainerProvider } from "../src/hooks/useContainer";
import { container } from "../src/context/workflow";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ContainerProvider value={container}>
      <Component {...pageProps} />;
    </ContainerProvider>
  );
}

export default MyApp;
