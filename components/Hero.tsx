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
    <section className={`relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-24 pb-12 group/hero transition-colors duration-500 ${isDarkMode ? 'bg-[#0c0a09]' : 'bg-[#fafaf9]'}`}>
      {/* Background Video */}
      <div className="absolute inset-0 z-0 group">
        <video
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
          className={`w-full h-full object-cover transition-opacity duration-500 ${isDarkMode ? 'opacity-60' : 'opacity-40'}`}
        />
        <div className={`absolute inset-0 bg-gradient-to-b from-black/40 via-transparent transition-colors duration-500 ${isDarkMode ? 'to-[#0c0a09]' : 'to-[#fafaf9]'}`} />
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
        {/* Luxury Pillow Circle Cards - Cleaned White Artifacts & iPhone Optimized */}
        <div className="flex justify-center gap-6 mb-8">
          <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border border-white/30 shadow-2xl bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-md p-3 group/pillow hover:scale-105 transition-transform duration-300">
            <div className="relative w-full h-full rounded-full overflow-hidden">
              <Image 
                src={pillow1} 
                fill 
                alt="Luxury emerald decorative cushion - Comfort Contract Furniture Dubai" 
                className="object-contain p-1 group-hover/pillow:scale-110 transition-transform duration-500 drop-shadow-lg" 
                priority 
              />
            </div>
          </div>
          <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border border-white/30 shadow-2xl bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-md p-3 group/pillow hover:scale-105 transition-transform duration-300">
            <div className="relative w-full h-full rounded-full overflow-hidden">
              <Image 
                src={pillow2} 
                fill 
                alt="Premium geometric luxury pillow - Comfort Contract Furniture Dubai" 
                className="object-contain p-1 group-hover/pillow:scale-110 transition-transform duration-500 drop-shadow-lg" 
                priority 
              />
            </div>
          </div>
        </div>

        <h1 className={`text-4xl sm:text-6xl md:text-7xl font-serif mb-6 tracking-tight transition-colors duration-500 leading-tight ${isDarkMode ? 'text-white' : 'text-black'}`}>
          Modern & <span className="text-primary italic font-serif">Innovative</span>
        </h1>
        <p className={`text-lg sm:text-xl md:text-2xl font-light mb-10 max-w-2xl mx-auto tracking-wide transition-colors duration-500 leading-relaxed ${isDarkMode ? 'text-white/90' : 'text-black/80'}`}>
          CONTRACT FURNITURE INTERIOR & EXTERIOR
          <br />
          <span className="text-base md:text-lg opacity-80 block mt-2">Bespoke hospitality, residential & commercial solutions in Dubai</span>
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/portfolio"
            className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 text-sm font-bold uppercase tracking-widest text-white bg-primary rounded-full hover:scale-105 transition-transform shadow-xl hover:shadow-primary/30 active:scale-95"
          >
            View Our Works
          </Link>
          <Link 
            href="/contact"
            className={`w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-sm font-bold uppercase tracking-widest rounded-full border transition-all active:scale-95 ${
              isDarkMode ? 'border-white/20 text-white hover:bg-white/10' : 'border-black/20 text-black hover:bg-black/5'
            }`}
          >
            Get Free Consultation
          </Link>
        </div>
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
