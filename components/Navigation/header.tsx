import React from "react";
import Link from "next/link";
import Navigation from "./mainNavigation";
import { useServiceContext } from "@/store/serviceContext";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi";

const Header = () => {
  const { isDarkMode, toggleDarkMode } = useServiceContext();

  return (
    <header className={`fixed top-0 left-0 right-0 z-[100] backdrop-blur-2xl border-b transition-colors duration-500 ${isDarkMode ? 'bg-[#0c0a09]/90 border-white/5' : 'bg-white/80 border-black/5'}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
        <Link href="/" className="group flex flex-col">
          <span className={`text-2xl font-serif tracking-[0.3em] transition-colors leading-none group-hover:text-primary ${isDarkMode ? 'text-white' : 'text-black'}`}>
            COMFORT
          </span>
          <span className="text-[7px] font-black tracking-[0.5em] text-primary uppercase mt-1 opacity-80">
            Contract Furniture
          </span>
        </Link>
        
        <Navigation />

        <div className="hidden lg:flex items-center gap-6">
          <button
            onClick={toggleDarkMode}
            className={`w-10 h-10 flex items-center justify-center rounded-xl border transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-black/5 border-black/10 text-black hover:bg-black/10'}`}
            aria-label="Toggle Theme"
          >
            {isDarkMode ? <HiOutlineSun size={20} /> : <HiOutlineMoon size={20} />}
          </button>
          <Link 
            href="/contact"
            className={`px-6 py-2 border rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${isDarkMode ? 'border-white/10 text-white hover:bg-white hover:text-black' : 'border-black/10 text-black hover:bg-black hover:text-white'}`}
          >
            Get Quote
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
