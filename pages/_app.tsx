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
          <title>Comfort | Modern & Innovative Furniture Solutions Dubai</title>
          <meta 
            name="viewport" 
            content="width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover" 
          />
          <meta
            name="description"
            content="Comfort offers premium contract furniture, custom majlis designs, hotel furnishing, and commercial fit-out interior solutions in Dubai, UAE."
          />
          <meta
            name="keywords"
            content="furniture Dubai, custom majlis design, hospitality furniture, hotel furnishing, contract furniture UAE, office interior, shop fitting Dubai"
          />
          <meta name="author" content="Comfort Contract Furniture Factory" />
          <meta name="robots" content="index, follow, max-image-preview:large" />
          
          {/* iOS Safari Mobile App Metadata */}
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          <meta name="apple-mobile-web-app-title" content="Comfort Furniture" />
          <meta name="format-detection" content="telephone=no" />

          {/* Open Graph Tags */}
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Comfort Contract Furniture" />
          <meta property="og:locale" content="en_US" />
          <link rel="canonical" href="https://www.comfortsplus.com" />
        </Head>

        <Component {...pageProps} />
      </Fragment>
    </ServiceProvider>
  );
}

export default MyApp;
