import Hero from "@/components/Hero";
import Portfolio from "@/components/portfolio";
import Services from "@/components/services";
import ImageCollage from "@/components/imageCollage";
import InfoSection from "@/components/InfoSection";
import Footer from "@/components/footer";
import Header from "@/components/Navigation/header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Comfort | Modern & Innovative Furniture",
  description: "Discover modern and innovative decoration for your space with Comfort Furniture Factory.",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
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
