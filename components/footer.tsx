import React from "react";
import Link from "next/link";
import { useServiceContext } from "@/store/serviceContext";

const Footer = () => {
  const { isDarkMode } = useServiceContext();
  return (
    <footer className={`transition-colors duration-500 border-t ${isDarkMode ? 'bg-[#0c0a09] border-white/5 pt-24 pb-12' : 'bg-[#fafaf9] border-black/5 pt-24 pb-12'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20 animate-fade-in">
          {/* Brand/About */}
          <div className="space-y-8">
            <h2 className={`text-3xl font-serif tracking-tight transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-black'}`}>Comfort <span className="text-primary italic">Contract</span></h2>
            <p className={`leading-relaxed font-light transition-colors duration-500 ${isDarkMode ? 'text-white/40' : 'text-black/60'}`}>
              Crafting premium interior solutions since 1994. Elevating spaces through artisanal craftsmanship and modern innovation.
            </p>
            <div className="flex gap-4">
              {['FB', 'IG', 'LI'].map((social) => (
                <div key={social} className={`w-10 h-10 rounded-full border flex items-center justify-center text-[10px] font-bold transition-all cursor-pointer ${isDarkMode ? 'border-white/10 text-white/40 hover:border-primary hover:text-primary' : 'border-black/10 text-black/40 hover:border-primary hover:text-primary'}`}>
                  {social}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-8 lg:ml-12">
            <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${isDarkMode ? 'text-white/20' : 'text-black/30'}`}>Navigation</p>
            <ul className="space-y-4">
              {['Home', 'Services', 'Portfolio', 'About'].map((item) => (
                <li key={item}>
                  <a href={`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`} className={`text-sm hover:text-primary transition-colors duration-300 font-medium ${isDarkMode ? 'text-white/40' : 'text-black/60'}`}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${isDarkMode ? 'text-white/20' : 'text-black/30'}`}>Contact</p>
            <ul className="space-y-4 text-sm transition-colors duration-500">
              <li className="flex flex-col gap-1">
                <span className={`text-[10px] uppercase font-bold ${isDarkMode ? 'text-white/20' : 'text-black/30'}`}>Email</span>
                <span className={isDarkMode ? 'text-white/60' : 'text-black/80'}>info@comfortcontract.com</span>
              </li>
              <li className="flex flex-col gap-1">
                <span className={`text-[10px] uppercase font-bold ${isDarkMode ? 'text-white/20' : 'text-black/30'}`}>Inquiry</span>
                <span className={isDarkMode ? 'text-white/60' : 'text-black/80'}>+971 50 123 4567</span>
              </li>
            </ul>
          </div>

          {/* Location */}
          <div className="space-y-8">
            <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${isDarkMode ? 'text-white/20' : 'text-black/30'}`}>Studio</p>
            <p className={`text-sm leading-relaxed transition-colors duration-500 ${isDarkMode ? 'text-white/40' : 'text-black/60'}`}>
              Main Street, Industrial Area 1<br />
              Dubai, United Arab Emirates
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`pt-12 border-t flex flex-col md:flex-row justify-between items-center gap-6 ${isDarkMode ? 'border-white/5' : 'border-black/5'}`}>
          <p className={`text-[10px] font-bold uppercase tracking-[0.25em] ${isDarkMode ? 'text-white/20' : 'text-black/30'}`}>
            © 2026 Comfort Contract. All Absolute Rights Reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-[10px] font-bold text-white/10 hover:text-white transition-colors uppercase tracking-widest">Privacy</a>
            <a href="#" className="text-[10px] font-bold text-white/10 hover:text-white transition-colors uppercase tracking-widest">Terms</a>
            {/* Extremely discrete management entry */}
            <Link href="/admin" className="text-[10px] font-bold text-transparent hover:text-white/5 transition-colors uppercase tracking-widest cursor-default select-none">.</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
