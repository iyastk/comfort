import React from "react";
import Link from "next/link";
import Navigation from "./mainNavigation";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-[100] backdrop-blur-2xl bg-[#0c0a09]/90 border-b border-white/5 md:px-12 py-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
        <Link href="/" className="group flex flex-col">
          <span className="text-2xl font-serif tracking-[0.3em] text-white leading-none group-hover:text-primary transition-colors">
            COMFORT
          </span>
          <span className="text-[7px] font-black tracking-[0.5em] text-primary uppercase mt-1 opacity-80">
            Contract Furniture
          </span>
        </Link>
        
        <Navigation />

        <div className="hidden lg:flex items-center gap-6">
          <Link 
            href="/contact"
            className="px-6 py-2 border border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all"
          >
            Get Quote
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
