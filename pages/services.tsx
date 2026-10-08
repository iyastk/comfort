import React from "react";
import Link from "next/link";
import Head from "next/head";
import {
  HiOutlineCog,
  HiOutlineTable,
  HiOutlineTemplate,
  HiOutlineHome,
  HiOutlineOfficeBuilding,
  HiOutlineShoppingBag,
  HiOutlinePuzzle,
  HiArrowNarrowRight,
} from "react-icons/hi";
import RotatableImage from "@/components/rotate";
import { useServiceContext } from "@/store/serviceContext";
import Header from "@/components/Navigation/header";
import Footer from "@/components/footer";

const SITE_URL = "https://www.comfortsplus.com";
const OG_IMAGE = `${SITE_URL}/images/og-cover.jpg`;

// Pick icon based on slug
const getIcon = (slug: string) => {
  if (slug.includes("upholstery")) return <HiOutlineCog className="w-7 h-7" />;
  if (slug.includes("joinery")) return <HiOutlineTable className="w-7 h-7" />;
  if (slug.includes("curtains")) return <HiOutlineTemplate className="w-7 h-7" />;
  if (slug.includes("shop") || slug.includes("Fittings")) return <HiOutlineShoppingBag className="w-7 h-7" />;
  if (slug.includes("Hotel") || slug.includes("hospitality")) return <HiOutlineOfficeBuilding className="w-7 h-7" />;
  if (slug.includes("office")) return <HiOutlineOfficeBuilding className="w-7 h-7" />;
  if (slug.includes("Majlis")) return <HiOutlineHome className="w-7 h-7" />;
  if (slug.includes("home") || slug.includes("Furnishing")) return <HiOutlineHome className="w-7 h-7" />;
  return <HiOutlinePuzzle className="w-7 h-7" />;
};

const servicesStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/services#webpage`,
  "url": `${SITE_URL}/services`,
  "name": "Our Services | Bespoke Furniture & Joinery Dubai",
  "description": "Explore our wide range of services including upholstery, joinery, fit-out solutions, curtains, and bespoke furniture manufacturing for hospitality and homes in Dubai.",
  "inLanguage": "en-US",
  "about": { "@id": `${SITE_URL}/#organization` },
};

const ServicesPage = () => {
  const { serviceData, isDarkMode } = useServiceContext();

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? "bg-[#0c0a09]" : "bg-background"}`}>
      <Head>
        <title>Our Services | Bespoke Furniture &amp; Joinery Dubai</title>
        <meta name="description" content="Explore our wide range of services including upholstery, joinery, fit-out solutions, curtains, and bespoke furniture manufacturing for hospitality and homes in Dubai, UAE." />
        <link rel="canonical" href={`${SITE_URL}/services`} />

        {/* Open Graph */}
        <meta property="og:title" content="Our Services | Bespoke Furniture & Joinery Dubai" />
        <meta property="og:description" content="Upholstery, joinery, fit-out, curtains, and bespoke furniture manufacturing for hospitality and homes in Dubai, UAE." />
        <meta property="og:url" content={`${SITE_URL}/services`} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:title" content="Our Services | Bespoke Furniture & Joinery Dubai" />
        <meta name="twitter:description" content="Upholstery, joinery, fit-out, and bespoke furniture manufacturing in Dubai, UAE." />
        <meta name="twitter:image" content={OG_IMAGE} />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesStructuredData) }}
        />
      </Head>

      {/* Skip Link */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg">
        Skip to main content
      </a>

      <Header />

      <main id="main-content" className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Hero Section with 360 View */}
          <div className="relative mb-32 group animate-fade-in">
            <div className={`absolute inset-0 rounded-[3rem] -z-10 transition-colors duration-500 ${isDarkMode ? "bg-white/5" : "bg-primary/5"}`} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-8 md:p-16">
              <div className="space-y-8">
                <span className="text-sm font-bold uppercase tracking-[0.3em] text-primary">Interactive Showcase</span>
                <h1 className={`text-5xl md:text-7xl font-serif leading-tight transition-colors ${isDarkMode ? "text-white" : "text-black"}`}>
                  Mastering every <span className="text-primary italic">dimension</span>.
                </h1>
                <p className={`text-lg leading-relaxed max-w-md transition-colors ${isDarkMode ? "text-white/60" : "text-black/60"}`}>
                  Experience our craftsmanship from every angle. Drag to rotate and explore the precision in our details.
                </p>
                <div className="flex items-center gap-4 text-sm font-semibold text-primary animate-pulse">
                  <span className="w-12 h-px bg-primary/30" />
                  DRAG TO ROTATE 360°
                </div>
              </div>

              <div className="relative aspect-square lg:aspect-auto h-[400px] lg:h-[500px] flex items-center justify-center cursor-grab active:cursor-grabbing">
                <div className={`absolute inset-0 rounded-full blur-3xl -z-10 animate-pulse transition-colors ${isDarkMode ? "bg-primary/5" : "bg-primary/10"}`} />
                <RotatableImage />
              </div>
            </div>
          </div>

          {/* Services Section Header */}
          <div className="text-center mb-20">
            <p className="text-primary font-bold text-xs uppercase tracking-[0.3em] mb-4">What We Offer</p>
            <h2 className={`text-4xl md:text-5xl font-serif mb-6 transition-colors ${isDarkMode ? "text-white" : "text-black"}`}>Our Capabilities</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
          </div>

          {/* Services Grid */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            role="list"
            aria-label="List of services"
          >
            {serviceData.map((service, index) => (
              <article
                key={index}
                role="listitem"
                className={`group flex flex-col p-8 rounded-3xl border transition-all duration-500 hover:-translate-y-2 animate-slide-up hover:shadow-2xl ${isDarkMode ? "bg-white/5 border-white/10 hover:border-primary/30 hover:bg-white/8" : "bg-black/[0.03] border-black/5 hover:border-primary/20 hover:bg-primary/[0.03]"}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-8 w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 transform group-hover:rotate-12">
                  {getIcon(service.slug)}
                </div>

                <h3 className={`text-xl font-serif font-bold mb-4 group-hover:text-primary transition-colors ${isDarkMode ? "text-white" : "text-black"}`}>
                  {service.title}
                </h3>

                <p className={`text-sm leading-relaxed mb-8 flex-grow transition-colors ${isDarkMode ? "text-white/50" : "text-black/60"}`}>
                  {service.description}
                </p>

                <Link
                  href={`/portfolio/${service.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary group-hover:gap-4 transition-all duration-300"
                  aria-label={`Explore ${service.title} portfolio`}
                >
                  Explore Work <HiArrowNarrowRight className="text-xl" />
                </Link>
              </article>
            ))}
          </div>

          {/* CTA Section */}
          <div className={`mt-32 p-8 sm:p-16 rounded-[3rem] border text-center space-y-6 animate-slide-up shadow-2xl transition-colors ${isDarkMode ? "bg-white/5 border-primary/20" : "bg-primary/5 border-primary/10"}`}>
            <span className="text-primary font-bold text-xs uppercase tracking-[0.3em] block">
              Start Your Project
            </span>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-serif transition-colors ${isDarkMode ? "text-white" : "text-black"}`}>
              Ready to transform your space?
            </h2>
            <p className={`max-w-xl mx-auto text-base sm:text-lg font-light transition-colors ${isDarkMode ? "text-white/60" : "text-black/60"}`}>
              Our team of master craftsmen and interior architects are ready to bring your vision to life with unmatched precision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-primary text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-primary/80 transition-all duration-300 hover:scale-105 shadow-xl active:scale-95"
              >
                Get Free Consultation <HiArrowNarrowRight />
              </Link>
              <Link
                href="/portfolio"
                className={`inline-flex items-center justify-center gap-2 px-10 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs border transition-all duration-300 hover:scale-105 active:scale-95 ${isDarkMode ? "border-white/20 text-white hover:bg-white/10" : "border-black/20 text-black hover:bg-black/5"}`}
              >
                View Our Portfolio
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ServicesPage;
