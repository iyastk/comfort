import { AppProps } from "next/app";
import { ServiceProvider } from "@/store/serviceContext";
import "../styles/globals.css";
import { Fragment } from "react";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ServiceProvider>
      <Fragment>
        <Head>
          <title>Comfortsplus |Best decor for Your space </title>
          <meta
            name="description"
            content="Discover modern and innovative decoration for your space."
          />
          <meta
            name="keywords"
            content="furniture, modern furniture, home decor"
          />
          <meta name="author" content="Comfortsplus" />
        </Head>

        <Component {...pageProps} />
      </Fragment>
    </ServiceProvider>
  );
}

export default MyApp;
