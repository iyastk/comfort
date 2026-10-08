import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { useServiceContext } from "@/store/serviceContext";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode } = useServiceContext();
  const router = useRouter();

  // Prevent background scrolling when menu is open on iPhone
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "unset";
      document.body.style.touchAction = "manipulation";
    }
    return () => {
      document.body.style.overflow = "unset";
      document.body.style.touchAction = "manipulation";
    };
  }, [isOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Our Works", href: "/portfolio" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="relative">
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-10">
        {navLinks.map((link) => {
          const isActive = router.pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              aria-current={isActive ? "page" : undefined}
              className={`group relative text-[11px] font-extrabold tracking-[0.25em] uppercase transition-all duration-300 ${
                isActive ? "text-primary" : isDarkMode ? "text-white/80 hover:text-white" : "text-black/60 hover:text-black"
              }`}
            >
              {link.name}
              {/* Active Indicator Line */}
              <span className={`absolute -bottom-3 left-0 h-[2px] bg-primary transition-all duration-500 ${
                isActive ? "w-full" : "w-0 group-hover:w-1/2"
              }`} />
            </Link>
          );
        })}
      </div>

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`md:hidden w-12 h-12 flex items-center justify-center rounded-2xl border active:scale-95 transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'}`}
        aria-label="Toggle Navigation Menu"
      >
        {isOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
      </button>

      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <div className={`fixed inset-0 z-[100] md:hidden backdrop-blur-3xl transition-all duration-500 flex flex-col pt-safe pb-safe ${isDarkMode ? 'bg-[#0c0a09]/95 text-white' : 'bg-white/95 text-black'}`}>
          {/* Header in Overlay */}
          <div className="flex items-center justify-between px-6 h-20 border-b border-white/5">
            <span className="text-xl font-serif tracking-[0.3em]">
              COMFORT
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className={`w-12 h-12 flex items-center justify-center rounded-2xl border transition-all active:scale-90 ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'}`}
              aria-label="Close menu"
            >
              <HiX size={24} />
            </button>
          </div>

          <div className="flex-1 flex flex-col px-8 pt-8 pb-12 justify-between overflow-y-auto scrollbar-none">
            {/* Nav Links */}
            <div className="flex flex-col gap-6">
              {navLinks.map((link, idx) => {
                const isActive = router.pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`group flex items-center justify-between text-3xl sm:text-4xl font-serif tracking-tight transition-all duration-500 animate-slide-up ${
                      isActive 
                        ? "text-primary" 
                        : isDarkMode ? 'text-white/50 hover:text-white' : 'text-black/40 hover:text-black'
                    }`}
                    style={{ animationDelay: `${idx * 80}ms` }}
                  >
                    <span>{link.name}</span>
                    <span className={`text-xs font-sans tracking-[0.3em] uppercase transition-all ${isActive ? 'text-primary opacity-100' : 'opacity-40'}`}>
                      {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Contact Info Section */}
            <div className="mt-10 pt-8 border-t border-black/10 dark:border-white/10">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-4">Contact Us</p>
              <div className="flex flex-col gap-3">
                <a href="mailto:info@comfortsplus.com" className={`text-base font-medium transition-colors ${isDarkMode ? 'text-white/70 hover:text-white' : 'text-black/70 hover:text-black'}`}>
                  info@comfortsplus.com
                </a>
                <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
                  Main Street, Industrial Area 1<br />
                  Dubai, United Arab Emirates
                </p>
              </div>
              
              <div className="flex gap-6 mt-6">
                {[
                  {
                    name: "Instagram",
                    href: "https://www.instagram.com/furniturecomfortplus?stkn=MW5udTFtbmZ0MHVnbQ%3D%3D&utm_source=qr",
                  },
                  {
                    name: "Facebook",
                    href: "https://www.facebook.com/share/1BKcaybAW4/?mibextid=wwXIfr",
                  },
                  {
                    name: "WhatsApp",
                    href: "https://wa.me/971501684151",
                  },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow us on ${social.name}`}
                    className={`text-[10px] font-bold tracking-widest uppercase transition-colors ${isDarkMode ? "text-white/50 hover:text-white" : "text-black/50 hover:text-black"}`}
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
