import React from "react";
import Link from "next/link";
import Image from "next/image";
import chair from "/public/images/chair_3.png";
import { useServiceContext } from "@/store/serviceContext";
import { HiPencil } from "react-icons/hi";

interface PortfolioProps {
  onEdit?: (item: any, category: string) => void;
}

const Portfolio = ({ onEdit }: PortfolioProps) => {
  const { selectedImages, activeCategorySlug, isAdmin } = useServiceContext();
  
  // Take first 2 as featured
  const featured = (selectedImages || []).slice(0, 2);

  return (
    <section className="py-24 bg-primary/5 relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 blur-[120px] rounded-full" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-stretch">
          {/* Info Card - High-End Glassmorphism */}
          <div className="md:col-span-12 lg:col-span-4 glass p-12 rounded-[3.5rem] flex flex-col justify-center items-center text-center animate-slide-up border-white/40 shadow-2xl">
            <div className="relative w-40 h-40 mb-8 group">
              <Image
                src={chair}
                alt="Modern Chair"
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
              We transform spaces by blending artisanal quality, durability, and contemporary design excellence.
            </p>
            <Link 
              href="/portfolio"
              className="group flex items-center gap-4 px-10 py-4 bg-foreground text-background rounded-2xl hover:bg-primary transition-all duration-300 font-bold uppercase tracking-widest text-sm"
            >
              Our Gallery
              <span className="group-hover:translate-x-2 transition-transform">→</span>
            </Link>
          </div>

          {/* Dynamic Featured Images */}
          <div className="md:col-span-6 lg:col-span-4 space-y-10">
            {featured.slice(0, 1).map((item) => (
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
                    alt={item.title || "Featured Work"}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-10">
                  <span className="text-primary font-bold text-xs tracking-widest uppercase mb-2">Featured Project</span>
                  <p className="text-white font-serif text-2xl">{item.title}</p>
                </div>
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
            ))}
          </div>

          <div className="md:col-span-6 lg:col-span-4 flex flex-col justify-end">
            {featured.slice(1, 2).map((item) => (
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
                    alt={item.title || "Featured Work"}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-10">
                  <span className="text-primary font-bold text-xs tracking-widest uppercase mb-2">Trendsetting Interior</span>
                  <p className="text-white font-serif text-2xl">{item.title}</p>
                </div>
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
