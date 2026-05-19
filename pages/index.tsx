import Link from "next/link";
import Image from "next/image";
import pillow1 from "../public/images/pillow1.png";
import pillow2 from "../public/images/pillow2.png";
import Portfolio from "@/components/portfolio";
import Services from "@/components/services";
import ImageCollage from "@/components/imageCollage";
import InfoSection from "@/components/InfoSection";
import Footer from "@/components/footer";
import Header from "@/components/Navigation/header";
import { useServiceContext } from "@/store/serviceContext";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Comfort | Modern & Innovative Furniture",
  description: "Discover modern and innovative decoration for your space with Comfort Furniture Factory.",
};

export default function Home() {
  const { selectedImages } = useServiceContext();
  
  // Get Hero assets from the first available category if needed, 
  // or use the first video from the default selection.
  const heroVideo = selectedImages?.find(item => item.type === 'video')?.url || "/images/video_4.mp4";
  const floatingVideo = selectedImages?.filter(item => item.type === 'video')[1]?.url || "/images/video_7.mp4";

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* Header / Navigation */}
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden pt-20">
          <div className="absolute inset-0 z-0">
            <video
              src={heroVideo}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-background/90" />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center animate-slide-up">
            <div className="flex justify-center gap-4 mb-8">
              <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-white/20 shadow-2xl">
                <Image src={pillow1} fill alt="Pillow deco 1" className="object-cover" />
              </div>
              <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-white/20 shadow-2xl">
                <Image src={pillow2} fill alt="Pillow deco 2" className="object-cover" />
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 tracking-tight">
              Modern & <span className="text-accent italic">Innovative</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-light mb-10 max-w-2xl mx-auto tracking-wide">
              FURNITURE INTERIOR & EXTERIOR
              <br />
              <span className="text-lg opacity-80">We will make your life more comfortable...</span>
            </p>

            <Link 
              href="/portfolio"
              className="inline-flex items-center px-10 py-4 text-lg font-medium text-white bg-primary rounded-full hover:scale-105 transition-transform shadow-xl hover:shadow-primary/20"
            >
              View Our Work
            </Link>
          </div>

          {/* Floating Image/Video Element for Desktop */}
          <div className="hidden xl:block absolute right-12 bottom-12 w-64 h-80 rounded-2xl overflow-hidden glass border-white/10 shadow-2xl p-2 animate-fade-in delay-500">
            <div className="relative w-full h-full rounded-xl overflow-hidden">
              <video
                src={floatingVideo}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

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
