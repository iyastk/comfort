import Link from "next/link";
import { useServiceContext } from "@/store/serviceContext";

const socialLinks = [
  {
    label: "Facebook",
    abbr: "FB",
    href: "https://www.facebook.com/share/1BKcaybAW4/?mibextid=wwXIfr",
  },
  {
    label: "Instagram",
    abbr: "IG",
    href: "https://www.instagram.com/furniturecomfortplus?stkn=MW5udTFtbmZ0MHVnbQ%3D%3D&utm_source=qr",
  },
  {
    label: "WhatsApp",
    abbr: "WA",
    href: "https://wa.me/971501684151",
  },
];

const Footer = () => {
  const { isDarkMode } = useServiceContext();
  return (
    <footer
      role="contentinfo"
      className={`transition-colors duration-500 border-t ${isDarkMode ? "bg-[#0c0a09] border-white/5 pt-24 pb-12" : "bg-[#fafaf9] border-black/5 pt-24 pb-12"}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20 animate-fade-in">
          {/* Brand/About */}
          <div className="space-y-8">
            <h2 className={`text-3xl font-serif tracking-tight transition-colors duration-500 ${isDarkMode ? "text-white" : "text-black"}`}>
              Comfort <span className="text-primary italic">Contract</span>
            </h2>
            <p className={`leading-relaxed font-light transition-colors duration-500 ${isDarkMode ? "text-white/40" : "text-black/60"}`}>
              Crafting premium interior solutions since 2004. Elevating spaces through artisanal craftsmanship and modern innovation.
            </p>
            <div className="flex gap-4" role="list" aria-label="Social media links">
              {socialLinks.map((social) => (
                <a
                  key={social.abbr}
                  href={social.href}
                  role="listitem"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow us on ${social.label}`}
                  className={`w-10 h-10 rounded-full border flex items-center justify-center text-[10px] font-bold transition-all cursor-pointer ${isDarkMode ? "border-white/10 text-white/40 hover:border-primary hover:text-primary" : "border-black/10 text-black/40 hover:border-primary hover:text-primary"}`}
                >
                  {social.abbr}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-8 lg:ml-12">
            <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${isDarkMode ? "text-white/20" : "text-black/30"}`}>Navigation</p>
            <nav aria-label="Footer navigation">
              <ul className="space-y-4">
                {[
                  { name: "Home", href: "/" },
                  { name: "Services", href: "/services" },
                  { name: "Portfolio", href: "/portfolio" },
                  { name: "About", href: "/about" },
                  { name: "Contact", href: "/contact" },
                ].map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`text-sm hover:text-primary transition-colors duration-300 font-medium ${isDarkMode ? "text-white/40" : "text-black/60"}`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${isDarkMode ? "text-white/20" : "text-black/30"}`}>Contact</p>
            <address className="not-italic">
              <ul className="space-y-4 text-sm transition-colors duration-500">
                <li className="flex flex-col gap-1">
                  <span className={`text-[10px] uppercase font-bold ${isDarkMode ? "text-white/20" : "text-black/30"}`}>Email</span>
                  <a
                    href="mailto:info@comfortsplus.com"
                    className={`hover:text-primary transition-colors ${isDarkMode ? "text-white/60" : "text-black/80"}`}
                  >
                    info@comfortsplus.com
                  </a>
                </li>
                <li className="flex flex-col gap-1">
                  <span className={`text-[10px] uppercase font-bold ${isDarkMode ? "text-white/20" : "text-black/30"}`}>Phone</span>
                  <a
                    href="tel:+971501684151"
                    className={`hover:text-primary transition-colors ${isDarkMode ? "text-white/60" : "text-black/80"}`}
                  >
                    +971 50 168 4151
                  </a>
                </li>
              </ul>
            </address>
          </div>

          {/* Location */}
          <div className="space-y-8">
            <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${isDarkMode ? "text-white/20" : "text-black/30"}`}>Studio</p>
            <address className="not-italic">
              <p className={`text-sm leading-relaxed transition-colors duration-500 ${isDarkMode ? "text-white/40" : "text-black/60"}`}>
                Main Street, Industrial Area 1<br />
                Dubai, United Arab Emirates
              </p>
              <a
                href="https://maps.google.com/?q=Industrial+Area+Dubai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary text-xs font-bold uppercase tracking-widest mt-3 inline-block hover:underline"
              >
                Get Directions →
              </a>
            </address>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`pt-12 border-t flex flex-col md:flex-row justify-between items-center gap-6 ${isDarkMode ? "border-white/5" : "border-black/5"}`}>
          <p className={`text-[10px] font-bold uppercase tracking-[0.25em] ${isDarkMode ? "text-white/20" : "text-black/30"}`}>
            © {new Date().getFullYear()} Comfort Contract Furniture Factory. All Rights Reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className={`text-[10px] font-bold hover:text-primary transition-colors uppercase tracking-widest ${isDarkMode ? "text-white/20" : "text-black/30"}`}>Privacy</a>
            <a href="#" className={`text-[10px] font-bold hover:text-primary transition-colors uppercase tracking-widest ${isDarkMode ? "text-white/20" : "text-black/30"}`}>Terms</a>
            {/* Extremely discrete management entry */}
            <Link href="/admin" className="text-[10px] font-bold text-transparent hover:text-white/5 transition-colors uppercase tracking-widest cursor-default select-none">.</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
