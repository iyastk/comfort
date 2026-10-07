import React, { useState, useRef } from "react";
import Head from "next/head";
import Header from "@/components/Navigation/header";
import Footer from "@/components/footer";
import ProposalCard, { ProposalData } from "@/components/ProposalCard";
import html2canvas from "html2canvas";
import { 
  HiDownload, 
  HiShare, 
  HiPhotograph, 
  HiClipboardCopy, 
  HiCheck, 
  HiSparkles,
  HiUserGroup,
  HiRefresh,
  HiColorSwatch,
  HiPhone,
  HiHeart
} from "react-icons/hi";
import { FaFacebook, FaInstagram, FaWhatsapp, FaTelegram } from "react-icons/fa";

// Sample Presets for Bride and Groom
const bridePreset: ProposalData = {
  gender: "bride",
  photoMode: "half", // Half photo mode for girls
  profileCode: "B12512",
  platformName: "NIQABI PROPOSALS",
  tagline: "A PLATFORM FOR RIGHTEOUS ALLIANCES",
  photoUrl: "/images/proposals/bride_sample.png",
  
  statusCategory: "സുന്നി യുവതി",
  maritalStatus: "പുനർവിവാഹം (കുട്ടിയുണ്ട്)",
  location: "Payyoli, Koyilandy",
  age: "28",
  height: "168 cm",
  complexion: "White",
  financialStatus: "Upper Middle class",
  bodyBuild: "Normal",
  disabilityStatus: "ഇല്ല (✕)",
  education: "Degree",
  religiousEducation: "Hadiya, Mueena Diploma",
  
  expAge: "30 - 35",
  expHeight: "170 cm +",
  expLocation: "കോഴിക്കോട്",
  expCreed: "AP Sunni",
  expDemands: "ദീനിയായ അനുയോജ്യമായ കുടുംബത്തിൽ നിന്നുള്ളവർ.",
  expPriority: "ഉസ്താദുമാർക്ക് മുൻഗണന.",
  
  disclaimer: "സുന്നികൾ മാത്രം കോൺടാക്ട് ചെയ്യുക",
  contactPhone: "9037429908",
  instagramHandle: "niqabi_proposals",
  linkText: "ബയോയിലെ ലിങ്കിലൂടെ നിങ്ങൾക്കും കൂട്ടായ്മയിൽ അംഗമാകാം",
  hashtags: "#niqabi #proposals #kerala #sunni #nikah"
};

const groomPreset: ProposalData = {
  gender: "groom",
  profileCode: "G10890",
  platformName: "NIQABI PROPOSALS",
  tagline: "A PLATFORM FOR RIGHTEOUS ALLIANCES",
  photoUrl: "/images/proposals/groom_sample.png",
  
  statusCategory: "സുന്നി യുവാവ്",
  maritalStatus: "കന്യകൻ",
  location: "Vadakara, Kozhikode",
  age: "29",
  height: "175 cm",
  complexion: "Fair",
  financialStatus: "Good Business / Employed UAE",
  bodyBuild: "Athletic",
  disabilityStatus: "ഇല്ല (✕)",
  education: "B.Tech Mechanical Engineering",
  religiousEducation: "Mothallam / Quran Hafiz",
  
  expAge: "21 - 25",
  expHeight: "160 - 168 cm",
  expLocation: "കോഴിക്കോട് / മലപ്പുറം / കണ്ണൂർ",
  expCreed: "Sunni / AP Sunni",
  expDemands: "ദീനിയായ, നിഖാബ് ധരിക്കുന്ന അനുയോജ്യമായ യുവതി.",
  expPriority: "മതവിദ്യാഭ്യാസം ഉള്ളവർക്ക് മുൻഗണന.",
  
  disclaimer: "സുന്നികൾ മാത്രം കോൺടാക്ട് ചെയ്യുക",
  contactPhone: "9037429908",
  instagramHandle: "niqabi_proposals",
  linkText: "ബയോയിലെ ലിങ്കിലൂടെ നിങ്ങൾക്കും കൂട്ടായ്മയിൽ അംഗമാകാം",
  hashtags: "#groom #niqabi #proposals #kerala #sunniproposal"
};

export default function ProposalGeneratorPage() {
  const [formData, setFormData] = useState<ProposalData>(bridePreset);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedCaption, setCopiedCaption] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  const cardRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Switch between Bride and Groom modes
  const handleGenderSwitch = (gender: "bride" | "groom") => {
    if (gender === "bride") {
      setFormData({
        ...bridePreset,
        // preserve contact details if already customized
        contactPhone: formData.contactPhone || bridePreset.contactPhone,
        instagramHandle: formData.instagramHandle || bridePreset.instagramHandle
      });
    } else {
      setFormData({
        ...groomPreset,
        contactPhone: formData.contactPhone || groomPreset.contactPhone,
        instagramHandle: formData.instagramHandle || groomPreset.instagramHandle
      });
    }
    showToast(`Switched to ${gender === "bride" ? "Bride Proposal (വധു)" : "Groom Proposal (വരൻ)"} template!`);
  };

  // Handle Photo Upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, photoUrl: reader.result as string }));
        showToast("Profile photo updated!");
      };
      reader.readAsDataURL(file);
    }
  };

  // Field change helper
  const handleChange = (field: keyof ProposalData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Download Image as PNG (HD Canvas Capture)
  const downloadImage = async (format: "png" | "jpeg" = "png") => {
    if (!cardRef.current) return;
    setIsGenerating(true);
    try {
      showToast("Generating high-resolution poster card...");
      const canvas = await html2canvas(cardRef.current, {
        scale: 2.5, // High DPI for Instagram & Facebook HD quality
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#091a13"
      });

      const image = canvas.toDataURL(`image/${format}`, 0.95);
      const link = document.createElement("a");
      const filename = `${formData.profileCode || "proposal"}_${formData.gender}_card.${format}`;
      link.href = image;
      link.download = filename;
      link.click();
      showToast(`Poster downloaded: ${filename}`);
    } catch (err) {
      console.error(err);
      showToast("Error generating poster image.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Facebook Share Handler
  const shareToFacebook = async () => {
    // Generate text for sharing
    const title = formData.gender === "bride" ? "വരണെ തേടുന്നു - Matrimonial Proposal" : "വധുവിനെ തേടുന്നു - Matrimonial Proposal";
    const summary = `${formData.profileCode} | ${formData.statusCategory} | ${formData.location} | Age: ${formData.age} | Contact: ${formData.contactPhone}`;
    
    // Copy caption text automatically to clipboard
    copyInstagramCaption();

    // Trigger Facebook Share Dialog
    const currentUrl = encodeURIComponent(window.location.href);
    const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}&quote=${encodeURIComponent(`${title}\n${summary}\n\n${formData.hashtags}`)}`;
    
    window.open(fbShareUrl, "_blank", "width=600,height=500");
    showToast("Opening Facebook Share! Post caption copied to clipboard.");
  };

  // Native Web Share (WhatsApp / Social Media)
  const handleNativeShare = async () => {
    if (!cardRef.current) return;
    setIsGenerating(true);

    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#091a13"
      });

      canvas.toBlob(async (blob) => {
        if (!blob) {
          setIsGenerating(false);
          return;
        }

        const file = new File([blob], `${formData.profileCode}_proposal.png`, { type: "image/png" });
        const shareData = {
          title: `${formData.platformName} - ${formData.profileCode}`,
          text: `*${formData.gender === "bride" ? "വരണെ തേടുന്നു" : "വധുവിനെ തേടുന്നു"}*\nProfile ID: ${formData.profileCode}\nContact: ${formData.contactPhone}\n${formData.hashtags}`,
          files: [file]
        };

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share(shareData);
          showToast("Shared successfully!");
        } else {
          // Fallback to downloading image and copying text
          downloadImage();
          copyInstagramCaption();
          showToast("Poster downloaded & text copied for direct sharing!");
        }
        setIsGenerating(false);
      }, "image/png");

    } catch (error) {
      console.error(error);
      setIsGenerating(false);
      downloadImage();
    }
  };

  // Copy Instagram Caption text with hashtags
  const copyInstagramCaption = () => {
    const captionText = `🌸 *${formData.platformName}* 🌸
📌 *${formData.gender === "bride" ? "വരണെ തേടുന്നു (Seeking Groom)" : "വധുവിനെ തേടുന്നു (Seeking Bride)"}*
🆔 Profile ID: ${formData.profileCode}

📋 *വിവരങ്ങൾ (Profile Details):*
👤 ${formData.statusCategory}
💍 status: ${formData.maritalStatus}
📍 സ്ഥലം: ${formData.location}
🎂 വയസ്സ്: ${formData.age}
📏 ഉയരം: ${formData.height}
🎓 വിദ്യാഭ്യാസം: ${formData.education}
📖 മത പഠനം: ${formData.religiousEducation}

💍 *പ്രതീക്ഷിക്കുന്നത് (Expectations):*
🎂 വയസ്സ്: ${formData.expAge}
📏 ഉയരം: ${formData.expHeight}
📍 സ്ഥലം: ${formData.expLocation}
🕌 ആദർശം: ${formData.expCreed}

⚠️ ${formData.disclaimer}
📞 Contact WhatsApp: ${formData.contactPhone}
📷 Instagram: @${formData.instagramHandle}

${formData.hashtags}`;

    navigator.clipboard.writeText(captionText);
    setCopiedCaption(true);
    showToast("Caption & Hashtags copied to clipboard! Ready to paste on Facebook / Instagram.");
    setTimeout(() => setCopiedCaption(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#07120c] text-white selection:bg-amber-500 font-sans">
      <Head>
        <title>Matrimonial Proposal Card Builder & Social Media Sharer | Niqabi Proposals</title>
        <meta name="description" content="Generate separate high quality matrimonial proposal cards for Groom and Bride in Malayalam. Easily share to Facebook and Instagram." />
      </Head>

      <Header />

      {/* Main Container */}
      <main className="pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest">
            <HiSparkles className="text-amber-400 text-sm animate-spin" />
            <span>Matrimonial Social Media Card Generator</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100">
            Create & Share Proposal Posts
          </h1>
          <p className="text-sm md:text-base text-emerald-100/70 leading-relaxed font-light">
            Generate customized proposal posters for <strong>Groom</strong> and <strong>Bride</strong> formatted for Instagram & Facebook with instant 1-click sharing buttons.
          </p>
        </div>

        {/* Gender Selection Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-[#0f271d] p-1.5 rounded-2xl border border-amber-400/30 flex items-center gap-2 shadow-2xl">
            <button
              onClick={() => handleGenderSwitch("bride")}
              className={`px-8 py-3 rounded-xl font-bold text-xs md:text-sm uppercase tracking-wider transition-all flex items-center gap-2 ${
                formData.gender === "bride"
                  ? "bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-lg scale-105"
                  : "text-emerald-200/70 hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="text-base">🧕</span>
              <span>Bride Proposal (വധു)</span>
            </button>

            <button
              onClick={() => handleGenderSwitch("groom")}
              className={`px-8 py-3 rounded-xl font-bold text-xs md:text-sm uppercase tracking-wider transition-all flex items-center gap-2 ${
                formData.gender === "groom"
                  ? "bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-lg scale-105"
                  : "text-emerald-200/70 hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="text-base">👳‍♂️</span>
              <span>Groom Proposal (വരൻ)</span>
            </button>
          </div>
        </div>

        {/* Main Grid: Form Controls (Left) vs Live Card Preview (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Customization Controls */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Action Bar / Share to Facebook & Social Media */}
            <div className="bg-[#0d2219] border border-amber-400/40 rounded-3xl p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <HiShare className="text-amber-400 text-xl" />
                  <h2 className="text-lg font-bold text-amber-200">Share & Export Options</h2>
                </div>
                <span className="text-[10px] font-mono bg-emerald-950 text-emerald-300 px-3 py-1 rounded-full border border-emerald-500/30 uppercase font-bold">
                  {formData.gender === "bride" ? "Bride Poster" : "Groom Poster"}
                </span>
              </div>

              {/* Primary Facebook Share Button */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                
                {/* SHARE TO FACEBOOK BUTTON */}
                <button
                  onClick={shareToFacebook}
                  className="w-full py-3.5 px-4 bg-[#1877F2] hover:bg-[#166fe5] text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2.5 shadow-lg active:scale-95 transition-all"
                >
                  <FaFacebook size={18} />
                  <span>Share to Facebook</span>
                </button>

                {/* INSTAGRAM DOWNLOAD & CAPTION */}
                <button
                  onClick={() => {
                    downloadImage("png");
                    copyInstagramCaption();
                  }}
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:opacity-95 text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2.5 shadow-lg active:scale-95 transition-all"
                >
                  <FaInstagram size={18} />
                  <span>Instagram Download</span>
                </button>
              </div>

              {/* Secondary Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => downloadImage("png")}
                  disabled={isGenerating}
                  className="py-3 px-3 bg-emerald-900/80 hover:bg-emerald-800 text-amber-200 border border-amber-400/40 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all"
                >
                  <HiDownload size={16} />
                  <span>{isGenerating ? "Generating..." : "Download HD"}</span>
                </button>

                <button
                  onClick={copyInstagramCaption}
                  className="py-3 px-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all"
                >
                  {copiedCaption ? <HiCheck className="text-emerald-400" /> : <HiClipboardCopy size={16} />}
                  <span>{copiedCaption ? "Copied!" : "Copy Caption"}</span>
                </button>

                <button
                  onClick={handleNativeShare}
                  className="py-3 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all shadow"
                >
                  <FaWhatsapp size={16} />
                  <span>Native Share</span>
                </button>
              </div>
            </div>

            {/* FORM INPUTS */}
            <div className="bg-[#0d2219] border border-white/10 rounded-3xl p-6 shadow-2xl space-y-6">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-base font-bold text-amber-200 flex items-center gap-2">
                  <HiColorSwatch className="text-amber-400" />
                  <span>Customize Profile Details</span>
                </h3>
                <button
                  onClick={() => handleGenderSwitch(formData.gender)}
                  className="text-xs text-amber-400/80 hover:text-amber-300 flex items-center gap-1 underline font-mono"
                >
                  <HiRefresh /> Reset to Defaults
                </button>
              </div>

              {/* SECTION 1: PHOTO & BASIC INFO */}
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-wider text-amber-400/90">1. Photo & Header</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Photo Upload */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-emerald-200/80">
                      Upload Photo
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full py-2 px-3 bg-emerald-950 border border-amber-400/40 rounded-xl text-xs text-amber-300 font-bold hover:bg-emerald-900 transition-all flex items-center justify-center gap-2"
                      >
                        <HiPhotograph size={16} />
                        <span>Choose Photo</span>
                      </button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handlePhotoUpload}
                        accept="image/*"
                        className="hidden"
                      />
                    </div>
                  </div>

                  {/* Photo Height Mode (Half for girls vs Full stretch) */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-emerald-200/80">
                      Photo Height
                    </label>
                    <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-white/10">
                      <button
                        onClick={() => handleChange("photoMode", "half")}
                        className={`flex-1 py-1.5 px-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${
                          (formData.photoMode || "half") === "half"
                            ? "bg-amber-400 text-slate-950 shadow"
                            : "text-white/60 hover:text-white"
                        }`}
                      >
                        Half Photo
                      </button>
                      <button
                        onClick={() => handleChange("photoMode", "full")}
                        className={`flex-1 py-1.5 px-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${
                          formData.photoMode === "full"
                            ? "bg-amber-400 text-slate-950 shadow"
                            : "text-white/60 hover:text-white"
                        }`}
                      >
                        Full Stretch
                      </button>
                    </div>
                  </div>

                  {/* Profile Code */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-emerald-200/80">
                      Profile ID Code
                    </label>
                    <input
                      type="text"
                      value={formData.profileCode}
                      onChange={(e) => handleChange("profileCode", e.target.value)}
                      placeholder="G12512"
                      className="w-full bg-slate-950 border border-white/10 rounded-xl py-2 px-3 text-xs text-amber-300 font-bold font-mono focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 2: PERSONAL DETAILS */}
              <div className="space-y-4 pt-2 border-t border-white/10">
                <h4 className="text-xs font-black uppercase tracking-wider text-amber-400/90">
                  2. {formData.gender === "bride" ? "Bride Details (വധുവിന്റെ വിവരങ്ങൾ)" : "Groom Details (വരന്റെ വിവരങ്ങൾ)"}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-[10px] text-emerald-200/70 uppercase">Status Category</label>
                    <input
                      type="text"
                      value={formData.statusCategory}
                      onChange={(e) => handleChange("statusCategory", e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl py-2 px-3 text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-emerald-200/70 uppercase">Marital Status</label>
                    <input
                      type="text"
                      value={formData.maritalStatus}
                      onChange={(e) => handleChange("maritalStatus", e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl py-2 px-3 text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-emerald-200/70 uppercase">Location (സ്ഥലം)</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => handleChange("location", e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl py-2 px-3 text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-emerald-200/70 uppercase">Age (വയസ്സ്)</label>
                    <input
                      type="text"
                      value={formData.age}
                      onChange={(e) => handleChange("age", e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl py-2 px-3 text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-emerald-200/70 uppercase">Height (ഉയരം)</label>
                    <input
                      type="text"
                      value={formData.height}
                      onChange={(e) => handleChange("height", e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl py-2 px-3 text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-emerald-200/70 uppercase">Complexion (നിറം)</label>
                    <input
                      type="text"
                      value={formData.complexion}
                      onChange={(e) => handleChange("complexion", e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl py-2 px-3 text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-emerald-200/70 uppercase">Financial Status (സാമ്പത്തികം)</label>
                    <input
                      type="text"
                      value={formData.financialStatus}
                      onChange={(e) => handleChange("financialStatus", e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl py-2 px-3 text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-emerald-200/70 uppercase">Education (വിദ്യാഭ്യാസം)</label>
                    <input
                      type="text"
                      value={formData.education}
                      onChange={(e) => handleChange("education", e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl py-2 px-3 text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[10px] text-emerald-200/70 uppercase">Religious Studies (മത പഠനം)</label>
                    <input
                      type="text"
                      value={formData.religiousEducation}
                      onChange={(e) => handleChange("religiousEducation", e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl py-2 px-3 text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 3: EXPECTATIONS */}
              <div className="space-y-4 pt-2 border-t border-white/10">
                <h4 className="text-xs font-black uppercase tracking-wider text-amber-400/90">
                  3. {formData.gender === "bride" ? "Expecting in Groom (വരനിൽ പ്രതീക്ഷിക്കുന്നത്)" : "Expecting in Bride (വധുവിൽ പ്രതീക്ഷിക്കുന്നത്)"}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-[10px] text-emerald-200/70 uppercase">Expected Age (വയസ്സ്)</label>
                    <input
                      type="text"
                      value={formData.expAge}
                      onChange={(e) => handleChange("expAge", e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl py-2 px-3 text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-emerald-200/70 uppercase">Expected Height (ഉയരം)</label>
                    <input
                      type="text"
                      value={formData.expHeight}
                      onChange={(e) => handleChange("expHeight", e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl py-2 px-3 text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-emerald-200/70 uppercase">Preferred Location (ദൂരം)</label>
                    <input
                      type="text"
                      value={formData.expLocation}
                      onChange={(e) => handleChange("expLocation", e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl py-2 px-3 text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-emerald-200/70 uppercase">Creed / Sect (ആദർശം)</label>
                    <input
                      type="text"
                      value={formData.expCreed}
                      onChange={(e) => handleChange("expCreed", e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl py-2 px-3 text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[10px] text-emerald-200/70 uppercase">Other Demands (മറ്റു വിവരങ്ങൾ)</label>
                    <input
                      type="text"
                      value={formData.expDemands}
                      onChange={(e) => handleChange("expDemands", e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl py-2 px-3 text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[10px] text-emerald-200/70 uppercase">Priority (മുൻഗണന)</label>
                    <input
                      type="text"
                      value={formData.expPriority}
                      onChange={(e) => handleChange("expPriority", e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl py-2 px-3 text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 4: CONTACT INFO */}
              <div className="space-y-4 pt-2 border-t border-white/10">
                <h4 className="text-xs font-black uppercase tracking-wider text-amber-400/90">4. Contact & Watermark</h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-[10px] text-emerald-200/70 uppercase">WhatsApp / Contact Phone</label>
                    <input
                      type="text"
                      value={formData.contactPhone}
                      onChange={(e) => handleChange("contactPhone", e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl py-2 px-3 text-amber-300 font-mono font-bold focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-emerald-200/70 uppercase">Instagram Handle</label>
                    <input
                      type="text"
                      value={formData.instagramHandle}
                      onChange={(e) => handleChange("instagramHandle", e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl py-2 px-3 text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[10px] text-emerald-200/70 uppercase">Disclaimer Warning</label>
                    <input
                      type="text"
                      value={formData.disclaimer}
                      onChange={(e) => handleChange("disclaimer", e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl py-2 px-3 text-red-300 focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Live Poster Preview */}
          <div className="lg:col-span-6 sticky top-24 flex flex-col items-center">
            
            <div className="w-full max-w-[540px] mb-4 flex items-center justify-between text-xs text-amber-300 font-medium">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                Live Card Preview (1080x1920 Poster)
              </span>
              <span className="font-mono text-[10px] bg-white/10 px-2 py-0.5 rounded text-white/70">
                {formData.gender === "bride" ? "വധു" : "വരൻ"}
              </span>
            </div>

            {/* Poster Card Container */}
            <div className="bg-[#030906] p-4 rounded-3xl border-2 border-amber-400/40 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden">
              <ProposalCard ref={cardRef} data={formData} />
            </div>

            {/* Quick Share Tip */}
            <div className="mt-6 text-center max-w-md p-4 bg-[#0d2219] rounded-2xl border border-white/10 text-xs text-emerald-100/80 space-y-2">
              <p className="font-bold text-amber-300">💡 Quick Sharing Tip:</p>
              <p className="leading-relaxed">
                Click <strong>Share to Facebook</strong> to open Facebook share dialog with caption auto-copied. For <strong>Instagram</strong>, download the HD image and paste the caption in your IG App!
              </p>
            </div>

          </div>

        </div>

      </main>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-amber-400 text-slate-950 font-bold text-xs px-6 py-3.5 rounded-2xl shadow-2xl border border-amber-200 flex items-center gap-2 animate-bounce">
          <HiSparkles className="text-slate-900 text-base" />
          <span>{toastMessage}</span>
        </div>
      )}

      <Footer />
    </div>
  );
}
