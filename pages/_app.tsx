import type { AppProps } from "next/app";
import { ContainerProvider } from "@/hooks/useContainer";
import { container } from "@/context/workflow";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ContainerProvider value={container}>
      <Component {...pageProps} />;
    </ContainerProvider>
  );
}

export default MyApp;
