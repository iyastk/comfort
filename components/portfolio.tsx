import React from "react";
import Link from "next/link";
import Image from "next/image";
import chair from "../public/images/chair_3.png";
import { useServiceContext, MediaItem } from "@/store/serviceContext";
import { HiPencil } from "react-icons/hi";

interface PortfolioProps {
  onEdit?: (item: MediaItem, category: string) => void;
}

const Portfolio = ({ onEdit }: PortfolioProps) => {
  const { selectedImages, activeCategorySlug, isAdmin, isDarkMode } = useServiceContext();
  
  // Take first 2 as featured
  const featured = (selectedImages || []).slice(0, 2);

  return (
    <section className={`py-24 relative overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-[#0c0a09]' : 'bg-[#fafaf9]'}`}>
      {/* Decorative Blur */}
      <div className={`absolute -top-24 -right-24 w-96 h-96 blur-[120px] rounded-full transition-colors duration-500 ${isDarkMode ? 'bg-primary/10' : 'bg-primary/5'}`} />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-stretch">
          {/* Info Card - High-End Glassmorphism */}
          <div className={`md:col-span-12 lg:col-span-4 p-8 md:p-12 rounded-[3.5rem] flex flex-col justify-center items-center text-center animate-slide-up border transition-all duration-500 shadow-2xl ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/5 text-black'}`}>
            <div className="relative w-40 h-40 mb-8 group">
              <Image
                src={chair}
                alt="Modern Handcrafted Chair - Comfort Contract Furniture"
                fill
                className="object-contain transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-primary/5 blur-3xl -z-10 animate-pulse" />
            </div>
            <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">
              Modern & <span className="text-primary italic">Innovative</span>
            </h2>
            <div className="w-12 h-1 bg-primary/30 mb-8 rounded-full" />
            <p className="text-foreground/60 mb-10 leading-relaxed text-lg font-light tracking-wide">
              We transform luxury spaces by blending artisanal quality, commercial durability, and contemporary interior design excellence.
            </p>
            <Link 
              href="/portfolio"
              className="group flex items-center gap-4 px-10 py-4 bg-foreground text-background rounded-2xl hover:bg-primary hover:text-white transition-all duration-300 font-bold uppercase tracking-widest text-xs active:scale-95"
            >
              Explore Portfolio
              <span className="group-hover:translate-x-2 transition-transform">→</span>
            </Link>
          </div>

          {/* Dynamic Featured Image 1 */}
          <div className="md:col-span-6 lg:col-span-4 space-y-10">
            {featured.slice(0, 1).map((item: any) => {
              const itemSlug = item.slug || item.id;
              return (
                <div key={item.id} className="relative aspect-[4/5] md:aspect-square group rounded-[3rem] overflow-hidden shadow-2xl animate-fade-in border-white/20 border-4 bg-black/5">
                  {item.type === "video" ? (
                    <video
                      src={item.url}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                  ) : (
                    <Image
                      src={item.url}
                      alt={item.title || "Featured Contract Furniture Work"}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  )}
                  <Link
                    href={`/portfolio/work/${itemSlug}`}
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-10 z-10"
                  >
                    <span className="text-primary font-extrabold text-[10px] tracking-widest uppercase mb-2">Featured Project</span>
                    <p className="text-white font-serif text-2xl font-bold">{item.title}</p>
                    <span className="text-white/70 text-xs font-semibold mt-2 inline-flex items-center gap-2">View Case Study →</span>
                  </Link>

                  {/* Admin Shortcut */}
                  {isAdmin && (
                    <button 
                      onClick={() => onEdit ? onEdit(item, activeCategorySlug) : window.location.href = `/admin?category=${activeCategorySlug}&edit=${item.id}`}
                      className="absolute top-8 right-8 w-12 h-12 rounded-xl bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary hover:text-white shadow-xl z-20"
                      title="Edit in Studio"
                    >
                      <HiPencil size={20} />
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Dynamic Featured Image 2 */}
          <div className="md:col-span-6 lg:col-span-4 flex flex-col justify-end">
            {featured.slice(1, 2).map((item: any) => {
              const itemSlug = item.slug || item.id;
              return (
                <div key={item.id} className="relative aspect-[4/5] group rounded-[3rem] overflow-hidden shadow-2xl animate-fade-in delay-200 border-white/20 border-4 bg-black/5">
                  {item.type === "video" ? (
                    <video
                      src={item.url}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                  ) : (
                    <Image
                      src={item.url}
                      alt={item.title || "Trendsetting Interior Project"}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  )}
                  <Link
                    href={`/portfolio/work/${itemSlug}`}
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-10 z-10"
                  >
                    <span className="text-primary font-extrabold text-[10px] tracking-widest uppercase mb-2">Trendsetting Interior</span>
                    <p className="text-white font-serif text-2xl font-bold">{item.title}</p>
                    <span className="text-white/70 text-xs font-semibold mt-2 inline-flex items-center gap-2">View Case Study →</span>
                  </Link>

                  {/* Admin Shortcut */}
                  {isAdmin && (
                    <button 
                      onClick={() => onEdit ? onEdit(item, activeCategorySlug) : window.location.href = `/admin?category=${activeCategorySlug}&edit=${item.id}`}
                      className="absolute top-8 right-8 w-12 h-12 rounded-xl bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary hover:text-white shadow-xl z-20"
                      title="Edit in Studio"
                    >
                      <HiPencil size={20} />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
