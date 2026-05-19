import React from "react";
import Link from "next/link";
import { 
  HiOutlineCog, 
  HiOutlineTable, 
  HiOutlineTemplate, 
  HiOutlineHome, 
  HiOutlineOfficeBuilding, 
  HiOutlineShoppingBag,
  HiOutlinePuzzle
} from "react-icons/hi";
import RotatableImage from "@/components/rotate";
import { useServiceContext } from "@/store/serviceContext";
import Header from "@/components/Navigation/header";
import Footer from "@/components/footer";

// Simple helper to pick an icon based on slug since the current icons are emojis
const getIcon = (slug: string) => {
  if (slug.includes("upholstery")) return <HiOutlineCog className="w-8 h-8" />;
  if (slug.includes("joinery")) return <HiOutlineTable className="w-8 h-8" />;
  if (slug.includes("curtains")) return <HiOutlineTemplate className="w-8 h-8" />;
  if (slug.includes("shop")) return <HiOutlineShoppingBag className="w-8 h-8" />;
  if (slug.includes("hospitality")) return <HiOutlineOfficeBuilding className="w-8 h-8" />;
  if (slug.includes("office")) return <HiOutlineOfficeBuilding className="w-8 h-8" />;
  if (slug.includes("Majlis")) return <HiOutlineHome className="w-8 h-8" />;
  if (slug.includes("home")) return <HiOutlineHome className="w-8 h-8" />;
  return <HiOutlinePuzzle className="w-8 h-8" />;
};

const ServicesPage = () => {
  const { serviceData } = useServiceContext();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Hero Section with 360 View */}
          <div className="relative mb-32 group animate-fade-in">
            <div className="absolute inset-0 bg-primary/5 rounded-[3rem] -z-10" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-8 md:p-16">
              <div className="space-y-8">
                <span className="text-sm font-bold uppercase tracking-[0.3em] text-primary">Interactive Showcase</span>
                <h1 className="text-5xl md:text-7xl font-serif leading-tight">Mastering every <span className="text-primary italic">dimension</span>.</h1>
                <p className="text-foreground/60 text-lg leading-relaxed max-w-md">
                  Experience our craftsmanship from every angle. Drag to rotate and explore the precision in our details.
                </p>
                <div className="flex items-center gap-4 text-sm font-semibold text-primary animate-pulse">
                  <span className="w-12 h-px bg-primary/30" />
                  DRAG TO ROTATE 360°
                </div>
              </div>
              
              <div className="relative aspect-square lg:aspect-auto h-[400px] lg:h-[500px] flex items-center justify-center cursor-grab active:cursor-grabbing">
                <div className="absolute inset-0 bg-white/40 rounded-full blur-3xl -z-10 animate-pulse" />
                <RotatableImage />
              </div>
            </div>
          </div>

          {/* Services Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif mb-6">Our Capabilities</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {serviceData.map((service, index) => (
              <div 
                key={index} 
                className="group flex flex-col glass p-8 rounded-3xl border border-foreground/5 hover:border-primary/20 transition-all duration-500 hover:-translate-y-2 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-8 w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 transform group-hover:rotate-12">
                  {getIcon(service.slug)}
                </div>
                
                <h3 className="text-xl font-serif font-bold mb-4 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-sm text-foreground/60 leading-relaxed mb-8 flex-grow">
                  {service.description}
                </p>

                <Link 
                  href={`/portfolio/${service.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary group-hover:gap-4 transition-all duration-300"
                >
                  Explore Work <span className="text-xl">→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ServicesPage;
