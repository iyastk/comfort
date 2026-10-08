import { AppProps } from "next/app";
import { ServiceProvider } from "@/store/serviceContext";
import "../styles/globals.css";
import { Fragment } from "react";
import Head from "next/head";

const SITE_URL = "https://www.comfortsplus.com";
const OG_IMAGE = `${SITE_URL}/images/og-cover.jpg`;

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#organization`,
  "name": "Comfort Contract Furniture Factory",
  "alternateName": "Comfortsplus",
  "url": SITE_URL,
  "logo": `${SITE_URL}/logo.png`,
  "image": OG_IMAGE,
  "description": "Comfort Contract Furniture Factory is a leading manufacturer and supplier of bespoke contract furniture, luxury majlis designs, hotel furnishing, and retail shop fittings in Dubai, UAE.",
  "telephone": "+971501684151",
  "email": "info@comfortsplus.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Main Street, Industrial Area 1",
    "addressLocality": "Dubai",
    "addressCountry": "AE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "25.2048",
    "longitude": "55.2708"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  ],
  "sameAs": [
    "https://www.instagram.com/furniturecomfortplus",
    "https://www.facebook.com/share/1BKcaybAW4/",
    "https://wa.me/971501684151"
  ]
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ServiceProvider>
      <Fragment>
        <Head>
          <title>Comfort | Modern &amp; Innovative Furniture Solutions Dubai</title>
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
            content="furniture Dubai, custom majlis design, hospitality furniture, hotel furnishing, contract furniture UAE, office interior, shop fitting Dubai, luxury furniture UAE"
          />
          <meta name="author" content="Comfort Contract Furniture Factory" />
          <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

          {/* Geo Tags */}
          <meta name="geo.region" content="AE-DU" />
          <meta name="geo.placename" content="Dubai" />
          <meta name="geo.position" content="25.2048;55.2708" />
          <meta name="ICBM" content="25.2048, 55.2708" />

          {/* iOS Safari Mobile App Metadata */}
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          <meta name="apple-mobile-web-app-title" content="Comfort Furniture" />
          <meta name="format-detection" content="telephone=no" />

          {/* Open Graph Tags */}
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Comfort Contract Furniture" />
          <meta property="og:locale" content="en_US" />
          <meta property="og:image" content={OG_IMAGE} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:alt" content="Comfort Contract Furniture Factory — Luxury Furniture Dubai" />

          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@comfortsplus" />
          <meta name="twitter:creator" content="@comfortsplus" />
          <meta name="twitter:image" content={OG_IMAGE} />

          {/* Organization Structured Data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
          />
        </Head>

        <Component {...pageProps} />
      </Fragment>
    </ServiceProvider>
  );
}

export default MyApp;
