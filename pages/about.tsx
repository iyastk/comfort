import React from "react";
import Image from "next/image";
import Footer from "@/components/footer";
import Header from "@/components/Navigation/header";
import TeamCard from "@/components/teamCard";
import { useServiceContext } from "@/store/serviceContext";
import AboutHero from "../public/images/Portfolio/sample-22.webp";
import AboutPhoto from "../public/images/Icon/decoration.png";
import Head from "next/head";
import Link from "next/link";
import { HiOutlineAcademicCap, HiOutlineLightBulb, HiOutlineStar, HiOutlineGlobe } from "react-icons/hi";

const SITE_URL = "https://www.comfortsplus.com";
const OG_IMAGE = `${SITE_URL}/images/og-cover.jpg`;

const stats = [
  { value: "10+", label: "Years of Excellence" },
  { value: "100+", label: "Projects Delivered" },
  { value: "Top", label: "Hospitality Clients" },
  { value: "UAE", label: "Based Production" },
];

const values = [
  {
    icon: <HiOutlineAcademicCap className="w-6 h-6" />,
    title: "Bespoke Quality",
    desc: "Every piece is tailored to the client's exact specifications, ensuring a perfect fit for each unique environment.",
  },
  {
    icon: <HiOutlineLightBulb className="w-6 h-6" />,
    title: "Innovation",
    desc: "We continuously evolve our designs, materials, and manufacturing processes to stay at the forefront of interior excellence.",
  },
  {
    icon: <HiOutlineStar className="w-6 h-6" />,
    title: "Reliable Craftsmanship",
    desc: "Long-lasting performance in demanding commercial environments backed by premium materials and expert artisanship.",
  },
  {
    icon: <HiOutlineGlobe className="w-6 h-6" />,
    title: "Regional Expertise",
    desc: "Deep understanding of Gulf region aesthetics and cultural design sensibilities, from Majlis to modern hotel suites.",
  },
];

const aboutStructuredData = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${SITE_URL}/about#webpage`,
  "url": `${SITE_URL}/about`,
  "name": "About Comfort Contract Furniture Factory Dubai",
  "description": "Learn about Comfort Furniture Factory, dedicated to crafting bespoke contract furniture for hospitality and leisure industries in Dubai.",
  "inLanguage": "en-US",
  "about": { "@id": `${SITE_URL}/#organization` },
};

const About = () => {
  const { isDarkMode } = useServiceContext();

  return (
    <div className={`min-h-screen transition-colors duration-500 selection:bg-primary selection:text-primary-foreground ${isDarkMode ? "bg-[#0c0a09] text-white" : "bg-[#fafaf9] text-black"}`}>
      <Head>
        <title>About Us | Comfort Contract Furniture Factory Dubai</title>
        <meta name="description" content="Learn about Comfort Furniture Factory, dedicated to crafting bespoke contract furniture for hospitality and leisure industries in Dubai, UAE." />
        <link rel="canonical" href={`${SITE_URL}/about`} />

        {/* Open Graph */}
        <meta property="og:title" content="About Us | Comfort Contract Furniture Factory Dubai" />
        <meta property="og:description" content="Bespoke contract furniture craftsmanship in Dubai. Hospitality, Majlis, residential & commercial solutions." />
        <meta property="og:url" content={`${SITE_URL}/about`} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:title" content="About Us | Comfort Contract Furniture Factory Dubai" />
        <meta name="twitter:description" content="Bespoke contract furniture craftsmanship in Dubai." />
        <meta name="twitter:image" content={OG_IMAGE} />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutStructuredData) }}
        />
      </Head>

      {/* Skip Link */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg">
        Skip to main content
      </a>

      {/* Header / Navigation */}
      <Header />

      <main id="main-content" className="pt-24">
        {/* Hero Section */}
        <section aria-label="About hero" className="relative h-[45vh] md:h-[55vh] overflow-hidden">
          <Image
            src={AboutHero}
            alt="Comfort Furniture Factory — Luxury interior craftsmanship in Dubai"
            fill
            className="object-cover transition-transform duration-700 hover:scale-105"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60 flex flex-col items-center justify-center text-center px-6">
            <p className="text-primary font-bold text-xs uppercase tracking-[0.3em] mb-4 animate-fade-in">Est. 2004</p>
            <h1 className="text-5xl md:text-7xl font-serif text-white tracking-tight animate-fade-in drop-shadow-2xl">
              Our Story
            </h1>
            <p className="text-white/70 text-base md:text-lg mt-4 max-w-xl animate-fade-in">
              Artisanal excellence in Dubai&apos;s most iconic spaces.
            </p>
          </div>
        </section>

        {/* Stats Strip */}
        <section aria-label="Company statistics" className={`py-12 border-b transition-colors duration-500 ${isDarkMode ? "bg-white/5 border-white/5" : "bg-black/[0.03] border-black/5"}`}>
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <div key={i} className="space-y-1">
                <p className="text-4xl md:text-5xl font-serif font-bold text-primary">{stat.value}</p>
                <p className={`text-xs font-bold uppercase tracking-widest transition-colors ${isDarkMode ? "text-white/40" : "text-black/50"}`}>{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Story Content Section */}
        <section aria-label="Our story" className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className={`relative aspect-square rounded-3xl overflow-hidden p-4 animate-slide-up border transition-all duration-500 shadow-2xl ${isDarkMode ? "bg-white/5 border-white/10" : "bg-black/5 border-black/5"}`}>
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={AboutPhoto}
                  alt="Comfort Furniture Factory — Bespoke interior furniture decoration"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {/* Decorative element */}
              <div className={`absolute -bottom-6 -right-6 w-32 h-32 bg-primary rounded-full blur-3xl transition-opacity duration-500 ${isDarkMode ? "opacity-20" : "opacity-10"}`} />
            </div>

            <div className="space-y-8 animate-slide-up delay-200">
              <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-widest uppercase">
                Established Experience
              </div>
              <h2 className="text-4xl md:text-5xl font-serif leading-tight">
                Crafting Excellence in <span className="text-primary italic">Bespoke Furniture</span>
              </h2>

              <div className={`space-y-5 text-base leading-relaxed transition-colors duration-500 ${isDarkMode ? "text-white/70" : "text-black/70"}`}>
                <p>
                  <span className={`font-bold transition-colors duration-500 ${isDarkMode ? "text-white" : "text-black"}`}>Comfort Furniture Factory</span> is a leading manufacturer and supplier of custom-built contract furniture, serving the hospitality and leisure industries. We specialize in crafting both contemporary and traditional furniture solutions designed to meet the highest standards of quality and durability.
                </p>
                <p>
                  Backed by an experienced management and master craftsman team, we have earned the trust of leading hotel chains, contractors, and designers across the UAE and region.
                </p>
              </div>

              {/* Values Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {values.map((v, i) => (
                  <div key={i} className={`p-5 rounded-2xl border transition-all duration-500 group hover:-translate-y-1 ${isDarkMode ? "bg-primary/10 border-primary/20 hover:bg-primary/15" : "bg-primary/5 border-primary/10 hover:bg-primary/10"}`}>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-primary">{v.icon}</span>
                      <h3 className="font-serif font-bold text-sm">{v.title}</h3>
                    </div>
                    <p className={`text-xs leading-relaxed transition-colors duration-500 ${isDarkMode ? "text-white/50" : "text-black/60"}`}>{v.desc}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/portfolio"
                  className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-primary/80 transition-all duration-300 hover:scale-105 shadow-xl active:scale-95"
                >
                  View Our Portfolio
                </Link>
                <Link
                  href="/contact"
                  className={`inline-flex items-center justify-center px-8 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs border transition-all duration-300 hover:scale-105 active:scale-95 ${isDarkMode ? "border-white/20 text-white hover:bg-white/10" : "border-black/20 text-black hover:bg-black/5"}`}
                >
                  Get In Touch
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section aria-label="Meet our team" className={`py-24 transition-colors duration-500 ${isDarkMode ? "bg-white/[0.02]" : "bg-black/[0.02]"}`}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <p className="text-primary font-bold text-xs uppercase tracking-[0.3em] mb-3">The People Behind The Craft</p>
              <h2 className={`text-4xl md:text-5xl font-serif mb-4 transition-colors duration-500 ${isDarkMode ? "text-white" : "text-black"}`}>Meet Our Team</h2>
              <p className={`max-w-xl mx-auto transition-colors duration-500 ${isDarkMode ? "text-white/60" : "text-black/60"}`}>
                The experts dedicated to bringing your vision to life with precision and craftsmanship.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-8">
              <TeamCard
                name="Info"
                role="Administrator"
                email="info@comfortsplus.com"
                image="👨🏻"
              />
              <TeamCard
                name="Sales Team"
                role="Sales Executive"
                email="sales@comfortsplus.com"
                image="👨🏻"
              />
              <TeamCard
                name="Shafi Muhammed"
                role="Business Development Manager"
                email="shafi@comfortsplus.com"
                image="👨🏻"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
