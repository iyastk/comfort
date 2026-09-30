import { GetStaticProps, GetStaticPaths } from "next";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import Header from "@/components/Navigation/header";
import Footer from "@/components/footer";
import { getAllWorks, getWorkBySlug, WorkItem } from "@/lib/portfolio";
import { useServiceContext } from "@/store/serviceContext";
import { HiOutlineLocationMarker, HiOutlineUser, HiOutlineCalendar, HiOutlineSparkles, HiArrowLeft, HiOutlineCheckCircle, HiOutlinePhone, HiOutlineMail } from "react-icons/hi";

interface WorkDetailProps {
  work: WorkItem;
  relatedWorks: WorkItem[];
}

export default function WorkDetailPage({ work, relatedWorks }: WorkDetailProps) {
  const { isDarkMode } = useServiceContext();
  const [activeMedia, setActiveMedia] = useState(work.url);

  if (!work) return null;

  const siteUrl = "https://www.comfortsplus.com";
  const canonicalUrl = `${siteUrl}/portfolio/work/${work.slug}`;
  const ogImageUrl = work.url.startsWith("http") ? work.url : `${siteUrl}${work.url}`;

  // JSON-LD Structured Data for Google Search
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": work.title,
    "description": work.description,
    "image": ogImageUrl,
    "author": {
      "@type": "Organization",
      "name": "Comfort Contract Furniture Dubai",
      "url": siteUrl
    },
    "locationCreated": {
      "@type": "Place",
      "name": work.location || "Dubai, UAE"
    },
    "genre": work.categoryName
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Portfolio",
        "item": `${siteUrl}/portfolio`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": work.categoryName,
        "item": `${siteUrl}/portfolio/${work.category}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": work.title,
        "item": canonicalUrl
      }
    ]
  };

  return (
    <div className={`min-h-[100dvh] transition-colors duration-500 ${isDarkMode ? 'bg-[#0c0a09] text-white' : 'bg-[#fafaf9] text-black'}`}>
      <Head>
        <title>{`${work.title} | ${work.categoryName} - Comfort Furniture Dubai`}</title>
        <meta name="description" content={work.description} />
        <meta name="keywords" content={`${work.title}, ${work.categoryName}, contract furniture Dubai, luxury interior UAE, custom upholstery`} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${work.title} | Comfort Furniture`} />
        <meta property="og:description" content={work.description} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="Comfort Contract Furniture" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={work.title} />
        <meta name="twitter:description" content={work.description} />
        <meta name="twitter:image" content={ogImageUrl} />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </Head>

      <Header />

      <main className="pt-28 md:pt-36 pb-24 px-4 sm:px-6 max-w-7xl mx-auto">
        {/* Navigation Breadcrumbs */}
        <div className="flex items-center gap-3 text-xs md:text-sm font-medium mb-8 text-foreground/60 flex-wrap">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link href="/portfolio" className="hover:text-primary transition-colors">Portfolio</Link>
          <span>/</span>
          <Link href={`/portfolio/${work.category}`} className="hover:text-primary transition-colors">{work.categoryName}</Link>
          <span>/</span>
          <span className="text-primary font-semibold truncate max-w-[200px] sm:max-w-none">{work.title}</span>
        </div>

        {/* Back Button */}
        <Link 
          href="/portfolio" 
          className="inline-flex items-center gap-2 mb-8 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-xl border border-foreground/10 hover:bg-primary hover:text-white hover:border-primary transition-all active:scale-95"
        >
          <HiArrowLeft size={16} />
          Back to Portfolio
        </Link>

        {/* Main Grid Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Hero Media & Sub Gallery */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] rounded-[2.5rem] overflow-hidden shadow-2xl border border-foreground/10 bg-black/5 group">
              {activeMedia.endsWith(".mp4") ? (
                <video
                  src={activeMedia}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={activeMedia}
                  alt={work.title}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              )}
              <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                {work.categoryName}
              </div>
            </div>

            {/* Thumbnail Gallery selector */}
            {work.gallery && work.gallery.length > 0 && (
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-3 opacity-60">Project Gallery Preview</p>
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
                  <button
                    onClick={() => setActiveMedia(work.url)}
                    className={`relative w-24 h-20 rounded-2xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                      activeMedia === work.url ? 'border-primary scale-105 shadow-lg' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    {work.url.endsWith('.mp4') ? (
                      <video src={work.url} className="w-full h-full object-cover" />
                    ) : (
                      <Image src={work.url} fill alt="Main preview" className="object-cover" />
                    )}
                  </button>
                  {work.gallery.map((gUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveMedia(gUrl)}
                      className={`relative w-24 h-20 rounded-2xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                        activeMedia === gUrl ? 'border-primary scale-105 shadow-lg' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <Image src={gUrl} fill alt={`Gallery thumbnail ${idx + 1}`} className="object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Work Details & Specifications */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-primary font-bold text-xs tracking-widest uppercase mb-2 block">
                Featured Case Study
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight mb-4 leading-tight">
                {work.title}
              </h1>
              <p className="text-base sm:text-lg font-light leading-relaxed text-foreground/80">
                {work.description}
              </p>
            </div>

            {/* Project Specs Card */}
            <div className={`p-6 sm:p-8 rounded-3xl border transition-all ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/5'}`}>
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-6">
                Project Overview
              </h2>
              <div className="grid grid-cols-2 gap-6 text-sm">
                {work.client && (
                  <div className="flex items-start gap-3">
                    <HiOutlineUser className="text-primary mt-1 text-lg flex-shrink-0" />
                    <div>
                      <p className="text-[10px] uppercase font-bold text-foreground/50">Client</p>
                      <p className="font-semibold text-foreground">{work.client}</p>
                    </div>
                  </div>
                )}
                {work.location && (
                  <div className="flex items-start gap-3">
                    <HiOutlineLocationMarker className="text-primary mt-1 text-lg flex-shrink-0" />
                    <div>
                      <p className="text-[10px] uppercase font-bold text-foreground/50">Location</p>
                      <p className="font-semibold text-foreground">{work.location}</p>
                    </div>
                  </div>
                )}
                {work.year && (
                  <div className="flex items-start gap-3">
                    <HiOutlineCalendar className="text-primary mt-1 text-lg flex-shrink-0" />
                    <div>
                      <p className="text-[10px] uppercase font-bold text-foreground/50">Completed</p>
                      <p className="font-semibold text-foreground">{work.year}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <HiOutlineSparkles className="text-primary mt-1 text-lg flex-shrink-0" />
                  <div>
                    <p className="text-[10px] uppercase font-bold text-foreground/50">Scope</p>
                    <p className="font-semibold text-foreground">{work.categoryName}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Features List */}
            {work.features && work.features.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-foreground">
                  Craftsmanship Highlights
                </h3>
                <ul className="space-y-2.5">
                  {work.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-foreground/80">
                      <HiOutlineCheckCircle className="text-primary mt-0.5 text-lg flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA Section */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="flex-1 inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-white font-bold rounded-2xl text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-xl active:scale-95"
              >
                <HiOutlineMail size={18} />
                Inquire For Similar Project
              </Link>
              <a
                href="tel:+97140000000"
                className="inline-flex items-center justify-center gap-3 px-6 py-4 border border-foreground/10 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-foreground hover:text-background transition-all active:scale-95"
              >
                <HiOutlinePhone size={18} />
                Call Direct
              </a>
            </div>
          </div>
        </div>

        {/* Related Works Grid */}
        {relatedWorks && relatedWorks.length > 0 && (
          <section className="mt-24 pt-16 border-t border-foreground/10">
            <div className="flex items-center justify-between mb-10">
              <div>
                <span className="text-primary text-xs font-bold tracking-widest uppercase block mb-1">
                  Explore More
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold">
                  Related Projects
                </h2>
              </div>
              <Link 
                href="/portfolio" 
                className="text-xs font-bold uppercase tracking-widest text-primary hover:underline"
              >
                View All Works →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedWorks.map((item) => (
                <Link
                  key={item.id}
                  href={`/portfolio/work/${item.slug}`}
                  className="group relative aspect-square rounded-3xl overflow-hidden border border-foreground/10 shadow-lg hover:shadow-2xl transition-all duration-500"
                >
                  {item.type === "video" ? (
                    <video src={item.url} autoPlay loop muted playsInline className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  ) : (
                    <Image src={item.url} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 768px) 100vw, 33vw" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">
                      {item.categoryName}
                    </span>
                    <h3 className="text-white text-lg font-serif font-bold group-hover:translate-x-1 transition-transform">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const works = getAllWorks();
  const paths = works.map((w) => ({
    params: { slug: w.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const work = getWorkBySlug(slug);

  if (!work) {
    return { notFound: true };
  }

  const allWorks = getAllWorks();
  const relatedWorks = allWorks
    .filter((w) => w.slug !== work.slug && w.category === work.category)
    .slice(0, 3);

  return {
    props: {
      work,
      relatedWorks,
    },
  };
};
