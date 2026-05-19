import React from "react";
import Image from "next/image";
import { HiOutlinePhone, HiOutlineLocationMarker } from "react-icons/hi";
import Scanner from "../public/whatsapp contact.jpg";
import ContactCard from "@/components/contactCard";
import Header from "@/components/Navigation/header";
import Footer from "@/components/footer";
import { useServiceContext } from "@/store/serviceContext";

const Contact = () => {
  const { isDarkMode } = useServiceContext();

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'bg-[#0c0a09] text-white' : 'bg-[#fafaf9] text-black'}`}>
      <Header />
      
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header Section */}
          <div className="text-center mb-20 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-serif mb-6 transition-colors duration-500">Let&apos;s <span className="text-primary italic">Connect</span></h1>
            <p className={`max-w-2xl mx-auto text-lg leading-relaxed transition-colors duration-500 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
              Whether you&apos;re starting a new project or looking to upgrade your space, our team is here to help.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Contact Info & Forms */}
            <div className="lg:col-span-7 space-y-12">
              {/* Modern Form Mockup */}
              <div className={`p-8 md:p-12 rounded-[2.5rem] border transition-all duration-500 animate-slide-up shadow-2xl ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/5'}`}>
                <h2 className="text-3xl font-serif mb-8 text-center lg:text-left">Send a Message</h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className={`text-xs font-bold uppercase tracking-wider px-1 transition-colors duration-500 ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>Name</label>
                      <input type="text" className={`w-full border-none rounded-2xl p-4 focus:ring-2 focus:ring-primary transition-all outline-none ${isDarkMode ? 'bg-white/5 text-white placeholder:text-white/20' : 'bg-black/5 text-black placeholder:text-black/20'}`} placeholder="Your Name" />
                    </div>
                    <div className="space-y-2">
                      <label className={`text-xs font-bold uppercase tracking-wider px-1 transition-colors duration-500 ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>Email</label>
                      <input type="email" className={`w-full border-none rounded-2xl p-4 focus:ring-2 focus:ring-primary transition-all outline-none ${isDarkMode ? 'bg-white/5 text-white placeholder:text-white/20' : 'bg-black/5 text-black placeholder:text-black/20'}`} placeholder="your@email.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className={`text-xs font-bold uppercase tracking-wider px-1 transition-colors duration-500 ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>Subject</label>
                    <input type="text" className={`w-full border-none rounded-2xl p-4 focus:ring-2 focus:ring-primary transition-all outline-none ${isDarkMode ? 'bg-white/5 text-white placeholder:text-white/20' : 'bg-black/5 text-black placeholder:text-black/20'}`} placeholder="Project Inquiry" />
                  </div>
                  <div className="space-y-2">
                    <label className={`text-xs font-bold uppercase tracking-wider px-1 transition-colors duration-500 ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>Message</label>
                    <textarea className={`w-full border-none rounded-2xl p-4 h-32 focus:ring-2 focus:ring-primary transition-all outline-none resize-none ${isDarkMode ? 'bg-white/5 text-white placeholder:text-white/20' : 'bg-black/5 text-black placeholder:text-black/20'}`} placeholder="Tell us about your project..."></textarea>
                  </div>
                  <button className={`w-full py-5 rounded-2xl font-bold uppercase tracking-widest transition-colors duration-300 ${isDarkMode ? 'bg-white text-black hover:bg-primary hover:text-white' : 'bg-black text-white hover:bg-primary'}`}>
                    Send Inquiry
                  </button>
                </form>
              </div>

              {/* Quick Contact Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`flex items-center gap-4 p-6 rounded-2xl border transition-all duration-500 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/5'}`}>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <HiOutlinePhone size={24} />
                  </div>
                  <div>
                    <p className={`text-xs font-bold uppercase transition-colors duration-500 ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>Phone</p>
                    <p className="font-semibold">+971 50 168 4151</p>
                  </div>
                </div>
                <div className={`flex items-center gap-4 p-6 rounded-2xl border transition-all duration-500 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/5'}`}>
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                    <HiOutlineLocationMarker size={24} />
                  </div>
                  <div>
                    <p className={`text-xs font-bold uppercase transition-colors duration-500 ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>Location</p>
                    <p className="font-semibold">Dubai, United Arab Emirates</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Side Column: Cards & WhatsApp */}
            <div className="lg:col-span-5 space-y-8 animate-fade-in delay-200">
              <div className="space-y-6">
                <h3 className={`text-xl font-serif font-bold px-2 italic transition-colors duration-500 ${isDarkMode ? 'text-white/80' : 'text-black/80'}`}>Direct Contacts</h3>
                <ContactCard
                  name="Shafi Muhammed"
                  role="Business Development Manager"
                  email="shafi@comfortsplus.com"
                />
                <ContactCard
                  name="Support Team"
                  role="Administration"
                  email="info@comfortsplus.com"
                />
              </div>

              {/* WhatsApp Scanner Section */}
              <div className={`p-12 md:p-16 rounded-[3.5rem] border transition-all duration-500 text-center space-y-10 animate-slide-up shadow-2xl ${isDarkMode ? 'bg-primary/5 border-primary/30' : 'bg-primary/5 border-primary/10'}`}>
                <div className={`mx-auto w-64 h-64 md:w-80 md:h-80 relative overflow-hidden rounded-[2.5rem] border-8 shadow-2xl transition-all duration-500 group cursor-zoom-in ${isDarkMode ? 'border-white/10' : 'border-white'}`}>
                  <Image
                    src={Scanner}
                    alt="WhatsApp QR Code"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="space-y-4">
                  <h4 className={`text-3xl md:text-4xl font-serif font-bold transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-black'}`}>WhatsApp Us Directly</h4>
                  <p className={`text-lg leading-relaxed max-w-sm mx-auto transition-colors duration-500 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                    Scan the QR code to start a conversation with our specialists instantly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
