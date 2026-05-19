import React from "react";
import Image from "next/image";
import { HiOutlinePhone, HiOutlineLocationMarker } from "react-icons/hi";
import Scanner from "../public/whatsapp contact.jpg";
import ContactCard from "@/components/contactCard";
import Header from "@/components/Navigation/header";
import Footer from "@/components/footer";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header Section */}
          <div className="text-center mb-20 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-serif mb-6">Let&apos;s <span className="text-primary italic">Connect</span></h1>
            <p className="text-foreground/60 max-w-2xl mx-auto text-lg leading-relaxed">
              Whether you&apos;re starting a new project or looking to upgrade your space, our team is here to help.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Contact Info & Forms */}
            <div className="lg:col-span-7 space-y-12">
              {/* Modern Form Mockup */}
              <div className="glass p-8 md:p-12 rounded-[2.5rem] border border-foreground/5 animate-slide-up">
                <h2 className="text-3xl font-serif mb-8 text-center lg:text-left">Send a Message</h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-foreground/40 px-1">Name</label>
                      <input type="text" className="w-full bg-foreground/5 border-none rounded-2xl p-4 focus:ring-2 focus:ring-primary transition-all outline-none" placeholder="Your Name" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-foreground/40 px-1">Email</label>
                      <input type="email" className="w-full bg-foreground/5 border-none rounded-2xl p-4 focus:ring-2 focus:ring-primary transition-all outline-none" placeholder="your@email.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-foreground/40 px-1">Subject</label>
                    <input type="text" className="w-full bg-foreground/5 border-none rounded-2xl p-4 focus:ring-2 focus:ring-primary transition-all outline-none" placeholder="Project Inquiry" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-foreground/40 px-1">Message</label>
                    <textarea className="w-full bg-foreground/5 border-none rounded-2xl p-4 h-32 focus:ring-2 focus:ring-primary transition-all outline-none resize-none" placeholder="Tell us about your project..."></textarea>
                  </div>
                  <button className="w-full py-5 bg-foreground text-background rounded-2xl font-bold uppercase tracking-widest hover:bg-primary transition-colors duration-300">
                    Send Inquiry
                  </button>
                </form>
              </div>

              {/* Quick Contact Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-4 p-6 glass rounded-2xl border border-foreground/5">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <HiOutlinePhone size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase text-foreground/40">Phone</p>
                    <p className="font-semibold">+971 50 168 4151</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-6 glass rounded-2xl border border-foreground/5">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                    <HiOutlineLocationMarker size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase text-foreground/40">Location</p>
                    <p className="font-semibold">Dubai, United Arab Emirates</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Side Column: Cards & WhatsApp */}
            <div className="lg:col-span-5 space-y-8 animate-fade-in delay-200">
              <div className="space-y-6">
                <h3 className="text-xl font-serif font-bold text-foreground/80 px-2 italic">Direct Contacts</h3>
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
              <div className="p-12 md:p-16 glass rounded-[3.5rem] border border-primary/30 bg-primary/5 text-center space-y-10 animate-slide-up shadow-2xl">
                <div className="mx-auto w-64 h-64 md:w-80 md:h-80 relative overflow-hidden rounded-[2.5rem] border-8 border-white shadow-[0_0_50px_rgba(var(--primary-rgb),0.2)] group cursor-zoom-in">
                  <Image
                    src={Scanner}
                    alt="WhatsApp QR Code"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="space-y-4">
                  <h4 className="text-3xl md:text-4xl font-serif font-bold">WhatsApp Us Directly</h4>
                  <p className="text-foreground/60 text-lg leading-relaxed max-w-sm mx-auto">
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
