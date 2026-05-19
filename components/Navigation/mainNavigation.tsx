import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

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
              className={`group relative text-[11px] font-extrabold tracking-[0.25em] uppercase transition-all duration-300 ${
                isActive ? "text-primary" : "text-white/80 hover:text-white"
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

      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-white active:scale-95 transition-all"
        aria-label="Toggle menu"
      >
        {isOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
      </button>

      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] md:hidden bg-[#0c0a09]/95 backdrop-blur-3xl animate-fade-in flex flex-col items-center justify-center gap-10">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-white"
            aria-label="Close menu"
          >
            <HiX size={24} />
          </button>
          
          <div className="flex flex-col items-center gap-10">
            {navLinks.map((link, idx) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-4xl font-serif text-white hover:text-primary transition-all transform hover:scale-110 tracking-widest"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
