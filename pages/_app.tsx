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
          <title>Comfortsplus | Premium Furniture & Interior Solutions Dubai</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta
            name="description"
            content="Comfortsplus offers premium contract furniture and custom interior solutions for hospitality, residential, and commercial spaces in Dubai, UAE."
          />
          <meta
            name="keywords"
            content="furniture Dubai, custom furniture, hospitality furniture, interior solutions, upholstery services, contract furniture UAE"
          />
          <meta name="author" content="Comfortsplus" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Comfortsplus" />
          <link rel="canonical" href="https://www.comfortsplus.com" />
        </Head>

        <Component {...pageProps} />
      </Fragment>
    </ServiceProvider>
  );
}

export default MyApp;
