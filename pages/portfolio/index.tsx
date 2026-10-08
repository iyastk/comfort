import React, { useState } from "react";
import Link from "next/link";
import ImageGallery from "@/components/imageGallary";
import Header from "@/components/Navigation/header";
import Footer from "@/components/footer";
import Head from "next/head";
import { GetStaticProps } from "next";
import { getAllWorks, WorkItem } from "@/lib/portfolio";
import { useServiceContext } from "@/store/serviceContext";

interface PortfolioPageProps {
  allWorks: WorkItem[];
}

export default function PortfolioPage({ allWorks }: PortfolioPageProps) {
  const { isDarkMode } = useServiceContext();
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { key: "all", name: "All Works" },
    { key: "MajlisDesigns", name: "Majlis Design" },
    { key: "HotelFurnishing", name: "Hospitality & Hotel" },
    { key: "homeFurnishing", name: "Residential & Home" },
    { key: "shopFittings", name: "Retail & Shop" },
  ];

  const filteredWorks = activeCategory === "all"
    ? allWorks
    : allWorks.filter((w) => w.category === activeCategory);

  const siteUrl = "https://www.comfortsplus.com";
  const canonicalUrl = `${siteUrl}/portfolio`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Luxury Contract Furniture & Interior Works Portfolio | Comfort Dubai",
    "description": "Explore custom contract furniture, luxury majlis designs, hotel furnishing, and retail fit-outs in Dubai and UAE by Comfort Furniture Factory.",
    "url": canonicalUrl
  };

  return (
    <div className={`min-h-[100dvh] transition-colors duration-500 ${isDarkMode ? 'bg-[#0c0a09]' : 'bg-[#fafaf9]'}`}>
      <Head>
        <title>Our Works & Portfolio | Luxury Furniture & Interior Projects Dubai</title>
        <meta
          name="description"
          content="Explore our extensive portfolio of contract furniture, custom majlis designs, hotel room fit-outs, and luxury villa interior solutions in Dubai and across the GCC region."
        />
        <meta name="keywords" content="furniture portfolio Dubai, luxury majlis designs, hotel suite furnishing, shop fitting UAE, contract interior works" />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:title" content="Our Works & Portfolio | Comfort Contract Furniture Dubai" />
        <meta property="og:description" content="Explore custom contract furniture, luxury majlis designs, and commercial fit-out projects in Dubai." />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <Header />

      <main className="pt-32 pb-24 px-4 sm:px-6 max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
          <span className="text-primary font-bold text-xs uppercase tracking-[0.3em] block mb-2">
            Curated Excellence
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold tracking-tight mb-4">
            Our Works & Projects
          </h1>
          <p className="text-base sm:text-lg font-light text-foreground/70 leading-relaxed">
            Discover each of our custom furniture projects engineered for luxury hotels, royal private villas, and high-end commercial spaces.
          </p>
          <p className="text-xs text-foreground/40 mt-3 font-mono">
            {allWorks.length} Projects Across {categories.length - 1} Categories
          </p>
        </div>

        {/* Category Filters with counts */}
        <div className="flex justify-center items-center gap-2 sm:gap-4 mb-10 flex-wrap">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.key;
            const count =
              cat.key === "all"
                ? allWorks.length
                : allWorks.filter((w) => w.category === cat.key).length;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? "bg-primary text-white shadow-lg scale-105"
                    : isDarkMode
                    ? "bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10"
                    : "bg-black/5 border border-black/10 text-black/70 hover:text-black hover:bg-black/10"
                }`}
              >
                {cat.name}
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                    isActive ? "bg-white/20" : isDarkMode ? "bg-white/10" : "bg-black/10"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Showing count */}
        <div className="flex items-center justify-between mb-8 px-1">
          <p className="text-xs text-foreground/50 font-mono uppercase tracking-widest">
            Showing{" "}
            <span className="text-primary font-bold">{filteredWorks.length}</span>{" "}
            project{filteredWorks.length !== 1 ? "s" : ""}
            {activeCategory !== "all" && (
              <button
                onClick={() => setActiveCategory("all")}
                className="ml-3 text-foreground/40 hover:text-primary transition-colors underline underline-offset-2"
              >
                Clear filter
              </button>
            )}
          </p>
        </div>

        {/* Work Grid */}
        <ImageGallery selectedImages={filteredWorks} />

        {/* Call to Action Box */}
        <div className="mt-32 p-8 sm:p-16 glass rounded-[3rem] border border-primary/20 text-center space-y-6 animate-slide-up shadow-2xl">
          <span className="text-primary font-bold text-xs uppercase tracking-[0.3em] block">
            Custom Manufacturing & Fit-Out
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif">
            Have a vision for your space?
          </h2>
          <p className="text-foreground/70 max-w-xl mx-auto text-base sm:text-lg font-light">
            Our team of master craftsmen and interior architects are ready to turn your concept into reality with precision engineering.
          </p>
          <div className="pt-4">
            <Link
              href="/contact"
              className="inline-block px-10 py-4 bg-primary text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-foreground hover:text-background transition-all duration-300 transform hover:scale-105 shadow-xl active:scale-95"
            >
              Start a Project Inquiry
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allWorks = getAllWorks();
  return {
    props: {
      allWorks,
    },
    // ISR: revalidate every 60 seconds so Firestore changes appear without rebuilds
    revalidate: 60,
  };
};
