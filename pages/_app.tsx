import { AppProps } from "next/app";
import { ServiceProvider } from "@/store/serviceContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ServiceProvider>
      <Component {...pageProps} />
    </ServiceProvider>
  );
}

export default MyApp;
