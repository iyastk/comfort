import React, { useState } from "react";
import Image from "next/image";
import Head from "next/head";
import { HiOutlinePhone, HiOutlineLocationMarker, HiOutlineMail, HiCheckCircle, HiOutlineExclamationCircle } from "react-icons/hi";
import Scanner from "../public/new whatsapp.jpeg";
import ContactCard from "@/components/contactCard";
import Header from "@/components/Navigation/header";
import Footer from "@/components/footer";
import { useServiceContext } from "@/store/serviceContext";
import Link from "next/link";

const SITE_URL = "https://www.comfortsplus.com";
const OG_IMAGE = `${SITE_URL}/images/og-cover.jpg`;

const contactStructuredData = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${SITE_URL}/contact#webpage`,
  "url": `${SITE_URL}/contact`,
  "name": "Contact Us | Comfort Contract Furniture Dubai",
  "description": "Get in touch with Comfort Contract Furniture Factory in Dubai. Contact our specialists for bespoke furniture, shop fittings, or interior solutions.",
  "inLanguage": "en-US",
  "about": { "@id": `${SITE_URL}/#organization` },
};

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const Contact = () => {
  const { isDarkMode } = useServiceContext();

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!form.message.trim() || form.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", subject: "", message: "" });
        setErrors({});
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputCls = `w-full border rounded-2xl p-4 focus:ring-2 focus:ring-primary focus:outline-none transition-all text-sm ${
    isDarkMode
      ? "bg-white/5 text-white placeholder:text-white/30 border-white/10 focus:border-primary/50"
      : "bg-black/5 text-black placeholder:text-black/30 border-black/10 focus:border-primary/50"
  }`;

  const labelCls = `block text-[10px] font-bold uppercase tracking-wider mb-2 ${
    isDarkMode ? "text-white/40" : "text-black/40"
  }`;

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? "bg-[#0c0a09] text-white" : "bg-[#fafaf9] text-black"}`}>
      <Head>
        <title>Contact Us | Comfort Contract Furniture Dubai</title>
        <meta name="description" content="Get in touch with Comfort Contract Furniture Factory. Contact our specialists for bespoke furniture inquiries, shop fittings, or interior solutions in Dubai, UAE." />
        <link rel="canonical" href={`${SITE_URL}/contact`} />

        {/* Open Graph */}
        <meta property="og:title" content="Contact Us | Comfort Contract Furniture Dubai" />
        <meta property="og:description" content="Get in touch with our specialists for bespoke furniture, shop fittings, or interior solutions in Dubai, UAE." />
        <meta property="og:url" content={`${SITE_URL}/contact`} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:title" content="Contact Us | Comfort Contract Furniture Dubai" />
        <meta name="twitter:description" content="Get in touch with our specialists for bespoke furniture in Dubai, UAE." />
        <meta name="twitter:image" content={OG_IMAGE} />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(contactStructuredData) }}
        />
      </Head>

      {/* Skip Link */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg">
        Skip to main content
      </a>

      <Header />

      <main id="main-content" className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header Section */}
          <div className="text-center mb-20 animate-fade-in">
            <p className="text-primary font-bold text-xs uppercase tracking-[0.3em] mb-4">Get In Touch</p>
            <h1 className="text-5xl md:text-7xl font-serif mb-6 transition-colors duration-500">
              Let&apos;s <span className="text-primary italic">Connect</span>
            </h1>
            <p className={`max-w-2xl mx-auto text-lg leading-relaxed transition-colors duration-500 ${isDarkMode ? "text-white/60" : "text-black/60"}`}>
              Whether you&apos;re starting a new project or looking to upgrade your space, our team is here to help.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Contact Form */}
            <div className="lg:col-span-7 space-y-12">
              <div className={`p-8 md:p-12 rounded-[2.5rem] border transition-all duration-500 animate-slide-up shadow-2xl ${isDarkMode ? "bg-white/5 border-white/10" : "bg-black/5 border-black/5"}`}>
                <h2 className="text-3xl font-serif mb-8 text-center lg:text-left">Send a Message</h2>

                {/* Success State */}
                {status === "success" && (
                  <div className="mb-8 flex items-start gap-4 p-5 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-500 animate-fade-in">
                    <HiCheckCircle size={24} className="flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-sm">Message Sent Successfully!</p>
                      <p className="text-xs mt-1 opacity-80">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                    </div>
                  </div>
                )}

                {/* Error State */}
                {status === "error" && (
                  <div className="mb-8 flex items-start gap-4 p-5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 animate-fade-in">
                    <HiOutlineExclamationCircle size={24} className="flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-sm">Something went wrong.</p>
                      <p className="text-xs mt-1 opacity-80">Please try again or reach us directly at <a href="mailto:info@comfortsplus.com" className="underline">info@comfortsplus.com</a></p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6" noValidate aria-label="Contact form">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="contact-name" className={labelCls}>
                        Name <span className="text-primary">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        autoComplete="name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className={inputCls}
                        placeholder="Your Full Name"
                        aria-required="true"
                        aria-describedby={errors.name ? "name-error" : undefined}
                      />
                      {errors.name && (
                        <p id="name-error" role="alert" className="text-red-500 text-xs mt-1">{errors.name}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="contact-email" className={labelCls}>
                        Email <span className="text-primary">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={inputCls}
                        placeholder="your@email.com"
                        aria-required="true"
                        aria-describedby={errors.email ? "email-error" : undefined}
                      />
                      {errors.email && (
                        <p id="email-error" role="alert" className="text-red-500 text-xs mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="contact-phone" className={labelCls}>Phone (Optional)</label>
                      <input
                        id="contact-phone"
                        type="tel"
                        name="phone"
                        autoComplete="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className={inputCls}
                        placeholder="+971 50 000 0000"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="contact-subject" className={labelCls}>Subject</label>
                      <input
                        id="contact-subject"
                        type="text"
                        name="subject"
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className={inputCls}
                        placeholder="Project Inquiry"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact-message" className={labelCls}>
                      Message <span className="text-primary">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className={`${inputCls} h-36 resize-none`}
                      placeholder="Tell us about your project..."
                      aria-required="true"
                      aria-describedby={errors.message ? "message-error" : undefined}
                    />
                    {errors.message && (
                      <p id="message-error" role="alert" className="text-red-500 text-xs mt-1">{errors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className={`w-full py-5 rounded-2xl font-bold uppercase tracking-widest text-sm transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed ${
                      isDarkMode
                        ? "bg-white text-black hover:bg-primary hover:text-white"
                        : "bg-black text-white hover:bg-primary"
                    }`}
                  >
                    {status === "loading" ? (
                      <>
                        <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      "Send Inquiry"
                    )}
                  </button>
                </form>
              </div>

              {/* Quick Contact Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <a
                  href="tel:+971501684151"
                  className={`flex items-center gap-4 p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 ${isDarkMode ? "bg-white/5 border-white/10" : "bg-black/5 border-black/5"}`}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <HiOutlinePhone size={22} />
                  </div>
                  <div>
                    <p className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? "text-white/40" : "text-black/40"}`}>Phone</p>
                    <p className="font-semibold text-sm">+971 50 168 4151</p>
                  </div>
                </a>
                <a
                  href="mailto:info@comfortsplus.com"
                  className={`flex items-center gap-4 p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 ${isDarkMode ? "bg-white/5 border-white/10" : "bg-black/5 border-black/5"}`}
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
                    <HiOutlineMail size={22} />
                  </div>
                  <div>
                    <p className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? "text-white/40" : "text-black/40"}`}>Email</p>
                    <p className="font-semibold text-xs">info@comfortsplus.com</p>
                  </div>
                </a>
                <div className={`flex items-center gap-4 p-6 rounded-2xl border transition-all duration-300 ${isDarkMode ? "bg-white/5 border-white/10" : "bg-black/5 border-black/5"}`}>
                  <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500 flex-shrink-0">
                    <HiOutlineLocationMarker size={22} />
                  </div>
                  <div>
                    <p className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? "text-white/40" : "text-black/40"}`}>Location</p>
                    <p className="font-semibold text-xs">Dubai, UAE</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Side Column */}
            <div className="lg:col-span-5 space-y-8 animate-fade-in delay-200">
              <div className="space-y-6">
                <h3 className={`text-xl font-serif font-bold px-2 italic transition-colors duration-500 ${isDarkMode ? "text-white/80" : "text-black/80"}`}>
                  Direct Contacts
                </h3>
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
              <div className={`p-10 md:p-14 rounded-[3.5rem] border transition-all duration-500 text-center space-y-8 animate-slide-up shadow-2xl ${isDarkMode ? "bg-primary/5 border-primary/30" : "bg-primary/5 border-primary/10"}`}>
                <div className={`mx-auto w-56 h-56 md:w-72 md:h-72 relative overflow-hidden rounded-[2.5rem] border-8 shadow-2xl transition-all duration-500 group cursor-zoom-in ${isDarkMode ? "border-white/10" : "border-white"}`}>
                  <Image
                    src={Scanner}
                    alt="WhatsApp QR Code to contact Comfort Contract Furniture"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 224px, 288px"
                  />
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="space-y-3">
                  <h3 className={`text-2xl md:text-3xl font-serif font-bold transition-colors duration-500 ${isDarkMode ? "text-white" : "text-black"}`}>
                    WhatsApp Us Directly
                  </h3>
                  <p className={`text-base leading-relaxed max-w-xs mx-auto transition-colors duration-500 ${isDarkMode ? "text-white/60" : "text-black/60"}`}>
                    Scan the QR code to start a conversation with our specialists instantly.
                  </p>
                  <a
                    href="https://wa.me/971501684151"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 px-8 py-3 bg-green-500 text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-green-600 transition-colors duration-300 shadow-lg hover:shadow-green-500/30"
                    aria-label="Open WhatsApp chat with Comfort Furniture"
                  >
                    Open WhatsApp
                  </a>
                </div>
              </div>

              {/* Map Embed Placeholder */}
              <div className={`p-6 rounded-[2rem] border transition-all duration-500 ${isDarkMode ? "bg-white/5 border-white/10" : "bg-black/[0.03] border-black/5"}`}>
                <p className={`text-[10px] font-black uppercase tracking-[0.3em] mb-3 ${isDarkMode ? "text-white/30" : "text-black/30"}`}>Find Us</p>
                <p className={`text-sm leading-relaxed mb-4 ${isDarkMode ? "text-white/60" : "text-black/70"}`}>
                  Main Street, Industrial Area 1<br />
                  Dubai, United Arab Emirates
                </p>
                <Link
                  href="https://maps.google.com/?q=Industrial+Area+Dubai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary text-xs font-bold uppercase tracking-widest hover:underline"
                >
                  Get Directions →
                </Link>
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
