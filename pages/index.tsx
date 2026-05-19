import Hero from "@/components/Hero";
import Portfolio from "@/components/portfolio";
import Services from "@/components/services";
import ImageCollage from "@/components/imageCollage";
import InfoSection from "@/components/InfoSection";
import Footer from "@/components/footer";
import Header from "@/components/Navigation/header";
import Head from "next/head";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Head>
        <title>Comfort | Modern & Innovative Furniture Solutions in Dubai</title>
        <meta name="description" content="Discover modern and innovative furniture for your space. Comfort Furniture Factory specializes in bespoke solutions for hospitality and residential needs in Dubai, UAE." />
        <meta property="og:title" content="Comfort | Modern & Innovative Furniture Solutions" />
        <meta property="og:description" content="Premium contract furniture and custom interior solutions in Dubai." />
      </Head>
      {/* Header / Navigation */}
      <Header />

      <main>
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
