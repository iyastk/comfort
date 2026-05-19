import React from "react";
import Image from "next/image";
import Link from "next/link";
import { HiPencil } from "react-icons/hi";
import pillow1 from "../public/images/pillow1.png";
import pillow2 from "../public/images/pillow2.png";
import { useServiceContext, MediaItem } from "@/store/serviceContext";

interface HeroProps {
  onEdit?: (item: MediaItem, category: string) => void;
}

const Hero = ({ onEdit }: HeroProps) => {
  const { selectedImages, isAdmin, activeCategorySlug, isDarkMode } = useServiceContext();
  
  const heroVideo = selectedImages?.find(item => item.type === 'video')?.url || "/images/video_4.mp4";
  const floatingVideo = selectedImages?.filter(item => item.type === 'video')[1]?.url || "/images/video_7.mp4";


  return (
    <section className={`relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden pt-20 group/hero transition-colors duration-500 ${isDarkMode ? 'bg-black' : 'bg-[#fafaf9]'}`}>
      <div className="absolute inset-0 z-0 group">
        <video
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
          className={`w-full h-full object-cover transition-opacity duration-500 ${isDarkMode ? 'opacity-60' : 'opacity-40'}`}
        />
        <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-transparent transition-colors duration-500 ${isDarkMode ? 'to-black/90' : 'to-[#fafaf9]/90'}`} />
        {isAdmin && onEdit && (
          <button 
            onClick={() => {
              const item = selectedImages?.find(i => i.url === heroVideo);
              if (item) onEdit(item, activeCategorySlug);
            }}
            className="absolute top-32 right-12 w-14 h-14 rounded-2xl bg-white text-black shadow-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-primary hover:text-white z-30 border-2 border-white/50"
          >
            <HiPencil size={24} />
          </button>
        )}
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

        <h1 className={`text-5xl md:text-7xl font-serif mb-6 tracking-tight transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-black'}`}>
          Modern & <span className="text-accent italic">Innovative</span>
        </h1>
        <p className={`text-xl md:text-2xl font-light mb-10 max-w-2xl mx-auto tracking-wide transition-colors duration-500 ${isDarkMode ? 'text-white/90' : 'text-black/80'}`}>
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
      <div className={`hidden xl:block absolute right-12 bottom-12 w-64 h-80 rounded-2xl overflow-hidden border transition-all duration-500 shadow-2xl p-2 animate-fade-in delay-500 group ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}>
        <div className="relative w-full h-full rounded-xl overflow-hidden">
          <video
            src={floatingVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          {isAdmin && onEdit && (
            <button 
              onClick={() => {
                const item = selectedImages?.filter(i => i.type === 'video')[1];
                if (item) onEdit(item, activeCategorySlug);
              }}
              className="absolute top-4 right-4 w-12 h-12 rounded-xl bg-white text-black shadow-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-primary hover:text-white z-30 border border-white/20"
            >
              <HiPencil size={22} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
