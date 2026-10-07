import React, { forwardRef } from "react";
import Image from "next/image";
import { 
  HiUser, 
  HiHeart, 
  HiLocationMarker, 
  HiCalendar, 
  HiAcademicCap, 
  HiBookOpen, 
  HiCurrencyDollar, 
  HiSparkles,
  HiPhone,
  HiCheckCircle,
  HiShieldCheck
} from "react-icons/hi";

export interface ProposalData {
  gender: "bride" | "groom"; // 'bride' = seeking groom (വരണെ തേടുന്നു), 'groom' = seeking bride (വധുവിനെ തേടുന്നു)
  photoMode?: "full" | "half"; // 'half' for half photo (especially for girls), 'full' for full height
  profileCode: string;
  platformName: string;
  tagline: string;
  photoUrl: string;
  
  // Primary Profile Details
  statusCategory: string;
  maritalStatus: string;
  location: string;
  age: string;
  height: string;
  complexion: string;
  financialStatus: string;
  bodyBuild: string;
  disabilityStatus: string;
  education: string;
  religiousEducation: string;
  
  // Expectations
  expAge: string;
  expHeight: string;
  expLocation: string;
  expCreed: string;
  expDemands: string;
  expPriority: string;
  
  // Contact & Disclaimer
  disclaimer: string;
  contactPhone: string;
  instagramHandle: string;
  linkText: string;
  hashtags: string;
}

interface ProposalCardProps {
  data: ProposalData;
  scale?: number;
}

const ProposalCard = forwardRef<HTMLDivElement, ProposalCardProps>(({ data, scale = 1 }, ref) => {
  const isBride = data.gender === "bride";

  const cardTitle = isBride ? "വരണെ തേടുന്നു" : "വധുവിനെ തേടുന്നു";
  const detailsTitle = isBride ? "വധുവിന്റെ വിവരങ്ങൾ" : "വരന്റെ വിവരങ്ങൾ";
  const expectationsTitle = isBride ? "വരനിൽ പ്രതീക്ഷിക്കുന്നത്" : "വധുവിൽ പ്രതീക്ഷിക്കുന്നത്";

  return (
    <div
      ref={ref}
      id="proposal-card-node"
      className="relative overflow-hidden shadow-2xl rounded-3xl bg-[#091a13] text-white font-sans select-none"
      style={{
        width: "540px",
        height: "960px",
        transform: scale !== 1 ? `scale(${scale})` : "none",
        transformOrigin: "top left",
        boxSizing: "border-box",
      }}
    >
      {/* Background Graphic - Archway & Palace Garden */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d2a1d] via-[#091a13] to-[#040d0a] z-0">
        {/* Soft floral glow background overlay */}
        <div className="absolute -top-12 -left-12 w-64 h-64 bg-emerald-600/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-12 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-emerald-700/20 rounded-full blur-3xl" />
        
        {/* Decorative Gold Arch Border SVG */}
        <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <pattern id="islamic-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f59e0b" strokeWidth="0.5" opacity="0.3" />
            <circle cx="20" cy="20" r="1.5" fill="#f59e0b" opacity="0.4" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#islamic-grid)" />
        </svg>
      </div>

      {/* Main Container */}
      <div className="relative z-10 flex flex-col h-full p-4 justify-between">
        
        {/* TOP HEADER SECTION */}
        <div className="flex flex-col items-center text-center relative pt-2">
          {/* Mosque Dome Header Graphic */}
          <div className="relative mb-1">
            <div className="w-16 h-12 bg-gradient-to-b from-amber-400 to-amber-600 rounded-t-full flex items-center justify-center border border-amber-300/40 shadow-[0_0_15px_rgba(245,158,11,0.4)]">
              {/* Crescent Moon */}
              <span className="text-xl text-amber-100 font-bold -mt-2">🌙</span>
            </div>
          </div>

          {/* Platform Title */}
          <h1 className="text-2xl font-black uppercase tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 drop-shadow-md">
            {data.platformName || "NIQABI PROPOSALS"}
          </h1>
          <p className="text-[9px] font-bold tracking-[0.3em] text-amber-300/80 uppercase -mt-0.5">
            {data.tagline || "A PLATFORM FOR RIGHTEOUS ALLIANCES"}
          </p>

          {/* Profile ID Badge */}
          <div className="mt-2 inline-flex items-center px-6 py-1 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-slate-950 font-black text-lg tracking-widest rounded-full shadow-lg border border-amber-200">
            {data.profileCode || (isBride ? "G12512" : "B10482")}
          </div>

          {/* Status Badge: വരണെ തേടുന്നു / വധുവിനെ തേടുന്നു */}
          <div className="mt-2.5 px-6 py-1.5 bg-white text-slate-900 font-extrabold text-lg rounded-full border-2 border-amber-400 shadow-xl flex items-center gap-2">
            <span className="text-amber-600">🌸</span>
            <span className="tracking-wide">{cardTitle}</span>
            <span className="text-amber-600">🌸</span>
          </div>
        </div>

        {/* MIDDLE SECTION: PHOTO + DETAILS CARD */}
        <div className="grid grid-cols-12 gap-3 mt-2 my-auto items-stretch">
          
          {/* Left Column: Profile Photo (Half photo for girls / customizable) */}
          <div className="col-span-5 flex flex-col justify-between gap-2">
            
            {/* Photo Box */}
            <div className={`relative w-full rounded-3xl overflow-hidden border-2 border-amber-400/60 shadow-2xl bg-slate-900 group ${
              (data.photoMode === "half" || isBride) ? "h-[280px]" : "h-[530px]"
            }`}>
              <img
                src={data.photoUrl || (isBride ? "/images/proposals/bride_sample.png" : "/images/proposals/groom_sample.png")}
                alt={isBride ? "Bride Profile Photo" : "Groom Profile Photo"}
                className="w-full h-full object-cover object-top"
              />
              {/* Subtle Gradient Shadow at bottom of photo */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

              {/* Photo Label Pill */}
              <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 bg-emerald-950/90 backdrop-blur-md border border-amber-400/50 rounded-full text-[9px] font-bold text-amber-300 tracking-wider flex items-center gap-1 shadow-lg whitespace-nowrap">
                <HiShieldCheck className="text-amber-400 text-xs" />
                <span>{isBride ? "Verified Bride" : "Verified Groom"}</span>
              </div>
            </div>

            {/* If Half Photo (For girls), render decorative Islamic info badge box underneath */}
            {(data.photoMode === "half" || isBride) && (
              <div className="flex-1 bg-[#0f2e20]/90 backdrop-blur-md border border-amber-400/40 rounded-2xl p-2.5 flex flex-col items-center justify-center text-center space-y-1.5 shadow-xl">
                <div className="w-8 h-8 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300 text-base shadow">
                  🕌
                </div>
                <p className="text-[10px] font-black uppercase text-amber-300 tracking-wider">
                  {isBride ? "വധുവിന്റെ പ്രൊഫൈൽ" : "വരന്റെ പ്രൊഫൈൽ"}
                </p>
                <p className="text-[9px] text-emerald-200/80 leading-snug font-medium">
                  താല്പര്യമുള്ളവർ നേരിട്ട് രക്ഷിതാക്കളുമായി മാത്രം ബന്ധപ്പെടുക.
                </p>
                <div className="px-2 py-0.5 bg-amber-400 text-slate-950 rounded-md font-bold text-[8px] uppercase tracking-widest mt-1">
                  100% Verified
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Profile Details & Expectations */}
          <div className="col-span-7 flex flex-col gap-2 justify-between">
            
            {/* CARD 1: PERSON DETAILS */}
            <div className="bg-[#0f2e20]/95 backdrop-blur-md border border-amber-400/40 rounded-2xl p-2.5 shadow-xl text-xs space-y-1.5">
              
              {/* Header Pill */}
              <div className="bg-gradient-to-r from-emerald-800 to-emerald-900 border border-amber-400/50 rounded-xl px-3 py-1 text-center font-bold text-amber-200 text-xs flex items-center justify-center gap-1.5 shadow-inner">
                <span className="text-amber-300">🧕</span>
                <span>{detailsTitle}</span>
              </div>

              {/* Grid of Profile Items */}
              <div className="space-y-1 text-[11px] font-medium text-emerald-50">
                <div className="flex items-center gap-1.5">
                  <span className="text-amber-400 text-xs">👤</span>
                  <span>{data.statusCategory || (isBride ? "സുന്നി യുവതി" : "സുന്നി യുവാവ്")}</span>
                </div>
                
                <div className="flex items-center gap-1.5">
                  <span className="text-amber-400 text-xs">💍</span>
                  <span>{data.maritalStatus || "കന്യക / പുനർവിവാഹം"}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-amber-400 text-xs">📍</span>
                  <span className="truncate"><strong className="text-amber-200/90 font-semibold">സ്ഥലം:</strong> {data.location || "Payyoli, Koyilandy"}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-amber-400 text-xs">🎂</span>
                  <span><strong className="text-amber-200/90 font-semibold">വയസ്സ്:</strong> {data.age || "28"}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-amber-400 text-xs">📏</span>
                  <span><strong className="text-amber-200/90 font-semibold">ഉയരം:</strong> {data.height || "168 cm"}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-amber-400 text-xs">🎨</span>
                  <span><strong className="text-amber-200/90 font-semibold">നിറം:</strong> {data.complexion || "White"}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-amber-400 text-xs">💰</span>
                  <span className="truncate"><strong className="text-amber-200/90 font-semibold">സാമ്പത്തികം:</strong> {data.financialStatus || "Upper Middle class"}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-amber-400 text-xs">🧍</span>
                  <span><strong className="text-amber-200/90 font-semibold">ശരീരരൂപം:</strong> {data.bodyBuild || "Normal"}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-amber-400 text-xs">❤️</span>
                  <span><strong className="text-amber-200/90 font-semibold">ശാരീരിക കുറവ്:</strong> {data.disabilityStatus || "ഇല്ല (✕)"}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-amber-400 text-xs">🎓</span>
                  <span className="truncate"><strong className="text-amber-200/90 font-semibold">വിദ്യാഭ്യാസം:</strong> {data.education || "Degree"}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-amber-400 text-xs">📖</span>
                  <span className="truncate"><strong className="text-amber-200/90 font-semibold">മത പഠനം:</strong> {data.religiousEducation || "Hadiya, Mueena Diploma"}</span>
                </div>
              </div>
            </div>

            {/* CARD 2: EXPECTATIONS */}
            <div className="bg-[#0f2e20]/95 backdrop-blur-md border border-amber-400/40 rounded-2xl p-2.5 shadow-xl text-xs space-y-1.5">
              
              {/* Header Pill */}
              <div className="bg-gradient-to-r from-emerald-800 to-emerald-900 border border-amber-400/50 rounded-xl px-3 py-1 text-center font-bold text-amber-200 text-xs flex items-center justify-center gap-1.5 shadow-inner">
                <span className="text-amber-300">💍</span>
                <span>{expectationsTitle}</span>
              </div>

              {/* Grid of Expectation Items */}
              <div className="space-y-1 text-[11px] font-medium text-emerald-50">
                <div className="flex items-center gap-1.5">
                  <span className="text-amber-400 text-xs">🎂</span>
                  <span><strong className="text-amber-200/90 font-semibold">വയസ്സ്:</strong> {data.expAge || "30 - 35"}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-amber-400 text-xs">📏</span>
                  <span><strong className="text-amber-200/90 font-semibold">ഉയരം:</strong> {data.expHeight || "170 cm +"}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-amber-400 text-xs">📍</span>
                  <span><strong className="text-amber-200/90 font-semibold">ദൂരം:</strong> {data.expLocation || "കോഴിക്കോട്"}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-amber-400 text-xs">🕌</span>
                  <span><strong className="text-amber-200/90 font-semibold">ആദർശം:</strong> {data.expCreed || "AP Sunni"}</span>
                </div>

                <div className="flex items-start gap-1.5 leading-tight">
                  <span className="text-amber-400 text-xs mt-0.5">📋</span>
                  <span className="line-clamp-2"><strong className="text-amber-200/90 font-semibold">മറ്റു വിവരങ്ങൾ:</strong> {data.expDemands || "ദീനിയായ അനുയോജ്യമായ കുടുംബം."}</span>
                </div>

                <div className="flex items-start gap-1.5 leading-tight">
                  <span className="text-amber-400 text-xs mt-0.5">📊</span>
                  <span className="line-clamp-2"><strong className="text-amber-200/90 font-semibold">മുൻഗണന:</strong> {data.expPriority || "ഉസ്താദുമാർക്ക് മുൻഗണന."}</span>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* BOTTOM FOOTER SECTION */}
        <div className="space-y-2 mt-auto pt-2">
          
          {/* Disclaimer Warning Banner */}
          <div className="bg-red-950/80 border border-red-500/60 rounded-xl px-4 py-1.5 text-center text-red-200 font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg">
            <span className="text-red-400 text-sm">⚠️</span>
            <span>{data.disclaimer || "സുന്നികൾ മാത്രം കോൺടാക്ട് ചെയ്യുക"}</span>
          </div>

          {/* Contact Bar & Social */}
          <div className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 rounded-2xl px-4 py-2 flex items-center justify-between shadow-2xl border border-amber-200">
            
            {/* Instagram Profile Badge */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-slate-950 text-amber-400 font-bold flex items-center justify-center text-xs border border-amber-300 shadow">
                📷
              </div>
              <div className="leading-tight">
                <p className="text-[10px] font-black uppercase text-slate-900 tracking-wider">Instagram</p>
                <p className="text-xs font-bold text-slate-950">@{data.instagramHandle || "niqabi_proposals"}</p>
              </div>
            </div>

            {/* Phone Number Callout */}
            <div className="flex items-center gap-2 bg-slate-950 text-amber-300 px-5 py-1.5 rounded-xl border border-amber-400/50 shadow-inner">
              <HiPhone className="text-amber-400 text-base animate-pulse" />
              <span className="text-lg font-black tracking-wider font-mono">{data.contactPhone || "9037429908"}</span>
            </div>
          </div>

          {/* Bio Link & Hashtag Footer */}
          <div className="text-center space-y-0.5 pt-0.5">
            <p className="text-[10px] text-amber-300/90 font-medium">
              🔗 {data.linkText || "ബയോയിലെ ലിങ്കിലൂടെ നിങ്ങൾക്കും കൂട്ടായ്മയിൽ അംഗമാകാം"}
            </p>
            <p className="text-[9px] text-emerald-300/60 font-mono tracking-wider">
              {data.hashtags || "#niqabi #proposals #kerala #sunni #matrimony"}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
});

ProposalCard.displayName = "ProposalCard";

export default ProposalCard;
