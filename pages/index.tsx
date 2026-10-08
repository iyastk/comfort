import Hero from "@/components/Hero";
import Portfolio from "@/components/portfolio";
import Services from "@/components/services";
import ImageCollage from "@/components/imageCollage";
import InfoSection from "@/components/InfoSection";
import Footer from "@/components/footer";
import Header from "@/components/Navigation/header";
import Head from "next/head";

const SITE_URL = "https://www.comfortsplus.com";
const OG_IMAGE = `${SITE_URL}/images/og-cover.jpg`;

const homeStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/#webpage`,
  "url": SITE_URL,
  "name": "Comfort | Modern & Innovative Furniture Solutions in Dubai",
  "description": "Discover modern and innovative furniture for your space. Comfort Furniture Factory specializes in bespoke solutions for hospitality and residential needs in Dubai, UAE.",
  "inLanguage": "en-US",
  "about": { "@id": `${SITE_URL}/#organization` },
  "potentialAction": {
    "@type": "ReadAction",
    "target": [SITE_URL]
  }
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Head>
        <title>Comfort | Modern &amp; Innovative Furniture Solutions in Dubai</title>
        <meta name="description" content="Discover modern and innovative furniture for your space. Comfort Furniture Factory specializes in bespoke solutions for hospitality and residential needs in Dubai, UAE." />
        <link rel="canonical" href={SITE_URL} />

        {/* Open Graph */}
        <meta property="og:title" content="Comfort | Modern & Innovative Furniture Solutions in Dubai" />
        <meta property="og:description" content="Premium contract furniture and custom interior solutions in Dubai. Majlis designs, hotel furnishing, residential & commercial fit-outs." />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:image" content={OG_IMAGE} />

        {/* Twitter */}
        <meta name="twitter:title" content="Comfort | Modern & Innovative Furniture Solutions in Dubai" />
        <meta name="twitter:description" content="Premium contract furniture and custom interior solutions in Dubai." />
        <meta name="twitter:image" content={OG_IMAGE} />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(homeStructuredData) }}
        />
      </Head>

      {/* Skip to main content for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg"
      >
        Skip to main content
      </a>

      {/* Header / Navigation */}
      <Header />

      <main id="main-content">
        <Hero />

        {/* Content Sections */}
        <div className="relative z-10 bg-background">
          <Services />
          <Portfolio />
          <ImageCollage />
          <InfoSection />
        </div>
      </main>

      <Footer />
    </div>
  );
}
