import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useServiceContext } from "@/store/serviceContext";
import Navigation from "@/components/Navigation/mainNavigation";
import Footer from "@/components/footer";
import Image from "next/image";
import Head from "next/head";
import {
  HiPlus,
  HiTrash,
  HiSave,
  HiLink,
  HiPhotograph,
  HiPlay,
  HiPencil,
  HiCheck,
  HiX,
  HiInformationCircle,
  HiOutlineHome,
  HiOutlineOfficeBuilding,
  HiOutlinePuzzle,
  HiOutlineShoppingBag,
  HiOutlinePhotograph,
  HiOutlineVideoCamera,
  HiOutlineSun,
  HiOutlineMoon,
  HiCloudUpload,
  HiCog,
  HiSparkles,
  HiCheckCircle,
  HiOutlineDatabase,
  HiExclamationCircle,
  HiLightningBolt,
  HiSearch,
  HiArrowRight,
  HiRefresh
} from "react-icons/hi";

import {
  compressAndOptimizeImage,
  QUALITY_PRESETS,
  CompressionResult,
  formatBytes
} from "@/lib/imageOptimizer";

import {
  getFirebaseConfig,
  saveFirebaseConfig,
  isFirebaseConfigured,
  uploadToFirebaseStorage,
  FirebaseConfig
} from "@/lib/firebase";

import Portfolio from "@/components/portfolio";
import Services from "@/components/services";
import ImageCollage from "@/components/imageCollage";
import InfoSection from "@/components/InfoSection";
import Hero from "@/components/Hero";
import ContactCard from "@/components/contactCard";
import ImageGallery from "@/components/imageGallary";

// Preview Assets
import AboutHero from "../../public/images/Portfolio/sample-22.webp";
import AboutPhoto from "../../public/images/Icon/decoration.png";
import Scanner from "../../public/new whatsapp.jpeg";

export interface WorkItemAdmin {
  id: string;
  slug?: string;
  url: string;
  type: "image" | "video";
  title?: string;
  category?: string;
  categoryName?: string;
  description?: string;
  client?: string;
  location?: string;
  year?: string;
  features?: string[];
  gallery?: string[];
}

const categoryNames: Record<string, string> = {
  MajlisDesigns: "Majlis Design",
  HotelFurnishing: "Hospitality & Hotel",
  homeFurnishing: "Residential & Home",
  shopFittings: "Retail & Shop"
};

export default function AdminDashboard() {
  const router = useRouter();
  const {
    serviceData,
    updatePortfolio,
    categories: contextCategories,
    setIsAdmin,
    isDarkMode,
    toggleDarkMode
  } = useServiceContext();

  const [activeCategory, setActiveCategory] = useState<string>("homeFurnishing");
  const [viewMode, setViewMode] = useState<'inventory' | 'preview' | 'firebase'>('inventory');
  const [activePreviewPage, setActivePreviewPage] = useState<'Home' | 'About' | 'Contact' | 'Portfolio'>('Home');

  // Auth lock
  const [isLocked, setIsLocked] = useState(true);
  const [password, setPassword] = useState("");

  // Firebase Config State
  const [firebaseCfg, setFirebaseCfg] = useState<FirebaseConfig>({});
  const [firebaseConnected, setFirebaseConnected] = useState(false);
  const [isTestingFirebase, setIsTestingFirebase] = useState(false);

  // Local Categories State
  const [localCategories, setLocalCategories] = useState<Record<string, WorkItemAdmin[]> | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Editor Form State
  const [editingItem, setEditingItem] = useState<WorkItemAdmin | null>(null);
  const [formTitle, setFormTitle] = useState("");
  const [formUrl, setFormUrl] = useState("");
  const [formType, setFormType] = useState<"image" | "video">("image");
  const [formDescription, setFormDescription] = useState("");
  const [formClient, setFormClient] = useState("");
  const [formLocation, setFormLocation] = useState("");
  const [formYear, setFormYear] = useState("2026");
  const [formFeatureInput, setFormFeatureInput] = useState("");
  const [formFeatures, setFormFeatures] = useState<string[]>([]);
  const [formGallery, setFormGallery] = useState<string[]>([]);

  // Optimization & Upload State
  const [selectedPreset, setSelectedPreset] = useState<'balanced' | 'ultra' | 'compact'>('balanced');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [lastOptimization, setLastOptimization] = useState<CompressionResult | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // UI State
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryFileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Load initial data and Firebase config
  useEffect(() => {
    const cfg = getFirebaseConfig();
    setFirebaseCfg(cfg);
    setFirebaseConnected(isFirebaseConfigured(cfg));

    if (contextCategories) {
      setLocalCategories(contextCategories);
    }
  }, [contextCategories]);

  // Deep linking
  useEffect(() => {
    const { category, edit } = router.query;
    if (category && typeof category === 'string' && contextCategories?.[category]) {
      setActiveCategory(category);
    }
    if (edit && typeof edit === 'string' && contextCategories?.[category as string]) {
      const itemToEdit = contextCategories[category as string].find((i: WorkItemAdmin) => i.id === edit);
      if (itemToEdit) {
        populateForm(itemToEdit);
      }
    }
  }, [router.query, contextCategories]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "comfort2026") {
      setIsLocked(false);
      setIsAdmin(true);
      showToast("Access Granted. Welcome to Comfort Admin Portal", "success");
    } else {
      alert("Invalid Management Key. Please enter the correct passcode.");
    }
  };

  const populateForm = (item: WorkItemAdmin) => {
    setEditingItem(item);
    setFormTitle(item.title || "");
    setFormUrl(item.url || "");
    setFormType(item.type || (item.url?.includes(".mp4") ? "video" : "image"));
    setFormDescription(item.description || "");
    setFormClient(item.client || "");
    setFormLocation(item.location || "");
    setFormYear(item.year || "2026");
    setFormFeatures(item.features || []);
    setFormGallery(item.gallery || []);
    setLastOptimization(null);
    editorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const resetForm = () => {
    setEditingItem(null);
    setFormTitle("");
    setFormUrl("");
    setFormType("image");
    setFormDescription("");
    setFormClient("");
    setFormLocation("");
    setFormYear("2026");
    setFormFeatures([]);
    setFormGallery([]);
    setLastOptimization(null);
    setUploadProgress(null);
  };

  const handleSaveFirebaseConfig = (e: React.FormEvent) => {
    e.preventDefault();
    setIsTestingFirebase(true);
    try {
      saveFirebaseConfig(firebaseCfg);
      const isOk = isFirebaseConfigured(firebaseCfg);
      setFirebaseConnected(isOk);
      if (isOk) {
        showToast("Firebase Credentials Saved & Activated Successfully!", "success");
      } else {
        showToast("Configuration saved. Complete all credentials for full storage connection.", "info");
      }
    } catch (err) {
      showToast("Error saving Firebase configuration", "error");
    } finally {
      setIsTestingFirebase(false);
    }
  };

  // Image Upload and Compression Processor
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const isVideo = file.type.startsWith("video/") || file.name.endsWith(".mp4");

    if (isVideo) {
      setFormType("video");
      uploadFileMedia(file, file.name);
      return;
    }

    setFormType("image");
    setIsOptimizing(true);
    showToast(`Optimizing image with canvas (${QUALITY_PRESETS[selectedPreset].maxDimension}px @ ${QUALITY_PRESETS[selectedPreset].quality * 100}% WebP)...`, "info");

    try {
      const result = await compressAndOptimizeImage(file, QUALITY_PRESETS[selectedPreset]);
      setLastOptimization(result);
      setIsOptimizing(false);
      showToast(`Optimized! Size reduced from ${result.formattedOriginalSize} to ${result.formattedCompressedSize} (${result.savingsPercentage}% saved)`, "success");

      // Auto Upload optimized file
      await uploadFileMedia(result.file, result.fileName, result.dataUrl);
    } catch (error) {
      console.error("Image optimization failed:", error);
      setIsOptimizing(false);
      showToast("Client optimization fallback: uploading raw file...", "info");
      await uploadFileMedia(file, file.name);
    }
  };

  const uploadFileMedia = async (file: File | Blob, fileName: string, fallbackDataUrl?: string) => {
    setIsUploading(true);
    setUploadProgress(10);

    try {
      let finalUrl = "";

      if (firebaseConnected) {
        showToast("Uploading directly to Firebase Storage...", "info");
        finalUrl = await uploadToFirebaseStorage(file, `portfolio/${activeCategory}`, fileName, (prog) => {
          setUploadProgress(prog);
        });
        showToast("Uploaded to Firebase Storage!", "success");
      } else {
        showToast("Uploading to static server uploads directory...", "info");
        // Convert to base64 if needed for local endpoint
        let base64Data = fallbackDataUrl;
        if (!base64Data) {
          base64Data = await new Promise<string>((resolve) => {
            const r = new FileReader();
            r.onloadend = () => resolve(r.result as string);
            r.readAsDataURL(file);
          });
        }

        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fileData: base64Data, fileName })
        });

        if (res.ok) {
          const data = await res.json();
          finalUrl = data.url;
          setUploadProgress(100);
          showToast("Saved to local uploads folder!", "success");
        } else {
          // Fallback to base64 directly
          finalUrl = base64Data;
          setUploadProgress(100);
        }
      }

      setFormUrl(finalUrl);
    } catch (err) {
      console.error("Upload error:", err);
      showToast("Upload failed. Using data URL preview.", "error");
      if (fallbackDataUrl) setFormUrl(fallbackDataUrl);
    } finally {
      setIsUploading(false);
      setTimeout(() => setUploadProgress(null), 2000);
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    showToast(`Processing ${files.length} gallery image(s)...`, "info");
    const newGalleryUrls: string[] = [...formGallery];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const result = await compressAndOptimizeImage(file, QUALITY_PRESETS[selectedPreset]);
        let uploadedUrl = "";
        if (firebaseConnected) {
          uploadedUrl = await uploadToFirebaseStorage(result.file, `portfolio/${activeCategory}/gallery`, result.fileName);
        } else {
          const res = await fetch("/api/upload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fileData: result.dataUrl, fileName: result.fileName })
          });
          if (res.ok) {
            const d = await res.json();
            uploadedUrl = d.url;
          } else {
            uploadedUrl = result.dataUrl;
          }
        }
        newGalleryUrls.push(uploadedUrl);
      } catch (err) {
        console.error("Gallery file processing error:", err);
      }
    }

    setFormGallery(newGalleryUrls);
    showToast("Gallery photos added!", "success");
  };

  const handleAddFeature = () => {
    if (!formFeatureInput.trim()) return;
    setFormFeatures([...formFeatures, formFeatureInput.trim()]);
    setFormFeatureInput("");
  };

  const handleRemoveFeature = (index: number) => {
    setFormFeatures(formFeatures.filter((_, i) => i !== index));
  };

  const handleRemoveGalleryImage = (index: number) => {
    setFormGallery(formGallery.filter((_, i) => i !== index));
  };

  const handleSaveItem = () => {
    if (!formUrl) {
      alert("Please upload or enter a media URL first.");
      return;
    }

    const titleToUse = formTitle.trim() || "New Bespoke Project";
    const slugToUse = titleToUse.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || `work-${Date.now()}`;
    const categoryNameVal = categoryNames[activeCategory] || "Custom Work";

    const newItem: WorkItemAdmin = {
      id: editingItem ? editingItem.id : Math.random().toString(36).substring(2, 11),
      slug: slugToUse,
      url: formUrl,
      type: formType,
      title: titleToUse,
      category: activeCategory,
      categoryName: categoryNameVal,
      description: formDescription.trim() || `Custom manufacturing and interior fit-out project for ${categoryNameVal} in Dubai.`,
      client: formClient.trim() || "Private Client",
      location: formLocation.trim() || "Dubai, UAE",
      year: formYear.trim() || "2026",
      features: formFeatures.length > 0 ? formFeatures : [
        "Bespoke High-Density Comfort Cushioning",
        "Commercial Grade Flame-Retardant Fabric",
        "Hand-finished Precision Framing"
      ],
      gallery: formGallery.length > 0 ? formGallery : [formUrl]
    };

    const currentCatItems = localCategories?.[activeCategory] || [];
    let updatedCatItems: WorkItemAdmin[];

    if (editingItem) {
      updatedCatItems = currentCatItems.map((item) => item.id === editingItem.id ? newItem : item);
      showToast(`Updated "${newItem.title}"`, "success");
    } else {
      updatedCatItems = [newItem, ...currentCatItems];
      showToast(`Added "${newItem.title}" to local draft`, "success");
    }

    const updated = {
      ...(localCategories || {}),
      [activeCategory]: updatedCatItems
    };

    setLocalCategories(updated);
    resetForm();
  };

  const handleDeleteItem = (id: string) => {
    if (!confirm("Are you sure you want to delete this work item?")) return;
    if (!localCategories || !localCategories[activeCategory]) return;

    const updated = {
      ...localCategories,
      [activeCategory]: localCategories[activeCategory].filter((item) => item.id !== id)
    };
    setLocalCategories(updated);
    showToast("Media item removed from local draft", "info");
  };

  const handleCommitAll = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          categories: localCategories,
          serviceInfo: serviceData
        }),
      });

      if (response.ok) {
        updatePortfolio(localCategories);
        showToast("PLATFORM SYNCHRONIZED SUCCESSFULLY! Live website updated.", "success");
      } else {
        throw new Error('Sync failed');
      }
    } catch (error) {
      console.error(error);
      alert("Synchronization error. Check server status.");
    } finally {
      setIsSaving(false);
    }
  };

  // Filter items for search
  const currentCategoryItems = (localCategories?.[activeCategory] || []).filter(item => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.title?.toLowerCase().includes(q) ||
      item.client?.toLowerCase().includes(q) ||
      item.location?.toLowerCase().includes(q) ||
      item.description?.toLowerCase().includes(q)
    );
  });

  if (isLocked) {
    return (
      <div className="min-h-screen bg-[#0c0a09] flex items-center justify-center p-6 selection:bg-primary">
        <Head>
          <title>Admin Terminal | Comfort Contract Furniture</title>
        </Head>
        <div className="w-full max-w-md glass animate-fade-in p-1 rounded-[2.5rem] bg-gradient-to-b from-white/10 to-transparent border border-white/10">
          <div className="bg-[#0c0a09]/90 backdrop-blur-3xl p-10 rounded-[2.4rem] space-y-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/20 mx-auto mb-6 shadow-[0_0_30px_rgba(var(--primary-rgb),0.15)]">
                <HiOutlineOfficeBuilding size={32} />
              </div>
              <h2 className="text-[10px] font-black tracking-[0.4em] uppercase text-primary/80 mb-3">Management Gate</h2>
              <h1 className="text-4xl font-serif text-white tracking-tight">Studio Login</h1>
              <p className="text-white/40 text-xs mt-4 font-medium tracking-wide">Enter management password to access the portal</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-white/30 tracking-widest ml-4">Access Key</label>
                <input
                  type="password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-6 focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all text-center tracking-[0.5em] placeholder:text-white/10 text-white text-lg"
                />
              </div>
              <button className="w-full py-5 bg-white text-black font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-primary hover:text-white transition-all active:scale-95 shadow-xl shadow-black/20 text-[11px]">
                Unlock Terminal
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#0c0a09] text-white' : 'bg-[#fafaf9] text-black'} selection:bg-primary`}>
      <Head>
        <title>Admin Portal & Firebase Image Storage Manager | Comfort Furniture</title>
      </Head>

      <Navigation />

      {/* Top Header Control Bar */}
      <header className="fixed top-[90px] left-0 right-0 z-[60] bg-black/70 backdrop-blur-3xl border-y border-white/10 py-4 px-6 md:px-12 transition-all">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 md:gap-4 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-[0_0_40px_rgba(var(--primary-rgb),0.1)]">
                <HiSave size={22} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg md:text-2xl font-serif text-white">Studio Admin Portal</h1>
                  <span className="text-[8px] bg-primary/20 text-primary px-2.5 py-0.5 rounded-full font-bold uppercase border border-primary/20 tracking-widest">v2.4</span>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={`w-2 h-2 rounded-full ${firebaseConnected ? 'bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]' : 'bg-amber-400'}`} />
                  <p className="text-[9px] text-white/50 uppercase tracking-widest font-mono">
                    {firebaseConnected ? "Firebase Storage Active" : "Local Server Storage Mode"}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setViewMode(viewMode === 'firebase' ? 'inventory' : 'firebase')}
              className={`px-3 py-1.5 rounded-xl border text-[9px] font-bold uppercase tracking-widest flex items-center gap-1.5 transition-all ${
                viewMode === 'firebase' 
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                  : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
              }`}
            >
              <HiCog size={14} />
              <span>Firebase Config</span>
            </button>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <div className="flex items-center gap-1 p-1 bg-black/60 border border-white/10 rounded-xl">
              <button
                onClick={() => setViewMode('inventory')}
                className={`px-4 py-2 rounded-lg transition-all text-[9px] font-bold uppercase tracking-widest flex items-center gap-1.5 ${
                  viewMode === 'inventory' ? 'bg-primary text-white shadow-lg' : 'text-white/40 hover:text-white'
                }`}
              >
                <HiPencil size={12} />
                <span>Works Inventory</span>
              </button>
              <button
                onClick={() => setViewMode('preview')}
                className={`px-4 py-2 rounded-lg transition-all text-[9px] font-bold uppercase tracking-widest flex items-center gap-1.5 ${
                  viewMode === 'preview' ? 'bg-primary text-white shadow-lg' : 'text-white/40 hover:text-white'
                }`}
              >
                <HiOutlinePhotograph size={12} />
                <span>Live Preview</span>
              </button>
            </div>

            <button
              onClick={handleCommitAll}
              disabled={isSaving}
              className="flex items-center justify-center px-6 py-2.5 bg-white text-black rounded-xl font-black tracking-[0.15em] hover:bg-primary hover:text-white transition-all disabled:opacity-50 text-[10px] active:scale-95 shadow-xl border border-white/20"
            >
              <HiSave className="mr-2 text-sm" />
              <span>{isSaving ? "SYNCHRONIZING..." : "COMMIT CHANGES"}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="pt-52 pb-24 px-4 md:px-8 max-w-7xl mx-auto relative z-10">

        {/* FIREBASE CONFIGURATION MODAL / PANEL */}
        {viewMode === 'firebase' && (
          <div className="space-y-8 animate-fade-in max-w-3xl mx-auto">
            <div className="bg-[#141211] p-8 md:p-12 rounded-[2.5rem] border border-white/10 shadow-2xl space-y-8 relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                      <HiCloudUpload size={24} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-serif text-white">Firebase Storage Credentials</h2>
                      <p className="text-xs text-white/50">Enter your Firebase project details to enable direct cloud uploads</p>
                    </div>
                  </div>
                </div>

                <div className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider border flex items-center gap-2 ${
                  firebaseConnected 
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                    : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                }`}>
                  {firebaseConnected ? <HiCheckCircle size={14} /> : <HiExclamationCircle size={14} />}
                  <span>{firebaseConnected ? "Storage Connected" : "Local Mode active"}</span>
                </div>
              </div>

              <form onSubmit={handleSaveFirebaseConfig} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-white/60">API Key (apiKey)</label>
                    <input
                      type="text"
                      placeholder="AIzaSy..."
                      value={firebaseCfg.apiKey || ""}
                      onChange={(e) => setFirebaseCfg({ ...firebaseCfg, apiKey: e.target.value })}
                      className="w-full bg-black/60 border border-white/10 rounded-xl py-3 px-4 text-xs font-mono text-white focus:border-primary focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-white/60">Project ID (projectId)</label>
                    <input
                      type="text"
                      placeholder="comfort-furniture-app"
                      value={firebaseCfg.projectId || ""}
                      onChange={(e) => setFirebaseCfg({ ...firebaseCfg, projectId: e.target.value })}
                      className="w-full bg-black/60 border border-white/10 rounded-xl py-3 px-4 text-xs font-mono text-white focus:border-primary focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-white/60">Storage Bucket (storageBucket)</label>
                    <input
                      type="text"
                      placeholder="comfort-furniture.appspot.com"
                      value={firebaseCfg.storageBucket || ""}
                      onChange={(e) => setFirebaseCfg({ ...firebaseCfg, storageBucket: e.target.value })}
                      className="w-full bg-black/60 border border-white/10 rounded-xl py-3 px-4 text-xs font-mono text-white focus:border-primary focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-white/60">Auth Domain (authDomain)</label>
                    <input
                      type="text"
                      placeholder="comfort-furniture.firebaseapp.com"
                      value={firebaseCfg.authDomain || ""}
                      onChange={(e) => setFirebaseCfg({ ...firebaseCfg, authDomain: e.target.value })}
                      className="w-full bg-black/60 border border-white/10 rounded-xl py-3 px-4 text-xs font-mono text-white focus:border-primary focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-white/60">Messaging Sender ID</label>
                    <input
                      type="text"
                      placeholder="123456789012"
                      value={firebaseCfg.messagingSenderId || ""}
                      onChange={(e) => setFirebaseCfg({ ...firebaseCfg, messagingSenderId: e.target.value })}
                      className="w-full bg-black/60 border border-white/10 rounded-xl py-3 px-4 text-xs font-mono text-white focus:border-primary focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-white/60">App ID (appId)</label>
                    <input
                      type="text"
                      placeholder="1:123456789:web:abc123"
                      value={firebaseCfg.appId || ""}
                      onChange={(e) => setFirebaseCfg({ ...firebaseCfg, appId: e.target.value })}
                      className="w-full bg-black/60 border border-white/10 rounded-xl py-3 px-4 text-xs font-mono text-white focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div className="p-6 bg-white/5 rounded-2xl border border-white/10 space-y-3">
                  <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider">
                    <HiInformationCircle size={18} />
                    <span>How to get your Firebase Credentials:</span>
                  </div>
                  <ol className="list-decimal list-inside text-xs text-white/70 space-y-1.5 font-light leading-relaxed">
                    <li>Go to <a href="https://console.firebase.google.com/" target="_blank" rel="noreferrer" className="text-primary underline">Firebase Console</a> and select your project.</li>
                    <li>Click the <strong>Gear Icon ⚙️ ➡️ Project Settings</strong>.</li>
                    <li>Scroll down to <strong>Your apps ➡️ Web app (&lt;/&gt;)</strong>.</li>
                    <li>Copy the values from the <code>const firebaseConfig</code> object and paste them above.</li>
                    <li>Ensure <strong>Firebase Storage</strong> is enabled in Firebase Console under Build ➡️ Storage.</li>
                  </ol>
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={isTestingFirebase}
                    className="flex-1 py-4 bg-primary text-white font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-white hover:text-black transition-all shadow-xl active:scale-95"
                  >
                    Save & Test Firebase Connection
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('inventory')}
                    className="px-6 py-4 bg-white/5 text-white/60 font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-white/10 transition-all"
                  >
                    Back to Inventory
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* INVENTORY MANAGEMENT & WORK ITEM EDITOR */}
        {viewMode === 'inventory' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Sidebar: Categories & Search */}
            <div className="lg:col-span-3 space-y-6">
              <div className="bg-[#141211] border border-white/10 rounded-[2rem] p-6 space-y-6 shadow-2xl">
                <div>
                  <p className="text-[9px] font-black text-primary uppercase tracking-[0.3em] mb-4">Content Categories</p>
                  <div className="space-y-2">
                    {serviceData.map((service) => {
                      const count = localCategories?.[service.slug]?.length || 0;
                      const isActive = activeCategory === service.slug;

                      return (
                        <button
                          key={service.slug}
                          onClick={() => {
                            setActiveCategory(service.slug);
                            resetForm();
                          }}
                          className={`w-full text-left px-4 py-3.5 rounded-xl transition-all duration-300 flex items-center justify-between border ${
                            isActive
                              ? "bg-primary/15 text-primary border-primary/40 shadow-lg"
                              : "text-white/60 hover:bg-white/5 hover:text-white border-transparent"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-lg">
                              {service.slug === 'homeFurnishing' ? <HiOutlineHome /> :
                               service.slug === 'HotelFurnishing' ? <HiOutlineOfficeBuilding /> :
                               service.slug === 'MajlisDesigns' ? <HiOutlinePuzzle /> : <HiOutlineShoppingBag />}
                            </span>
                            <span className="text-xs font-bold uppercase tracking-wider">{service.title}</span>
                          </div>
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${isActive ? 'bg-primary/30 text-primary' : 'bg-white/10 text-white/40'}`}>
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Search Bar */}
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <label className="text-[9px] font-black uppercase text-white/40 tracking-widest">Filter Cluster</label>
                  <div className="relative">
                    <HiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                    <input
                      type="text"
                      placeholder="Search title, client..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 rounded-xl py-2.5 pl-10 pr-3 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50"
                    />
                  </div>
                </div>
              </div>

              {/* Image Quality Protocol Spec Card */}
              <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-[2rem] p-6 space-y-4">
                <div className="flex items-center gap-2.5 text-primary">
                  <HiLightningBolt size={20} />
                  <h3 className="text-xs font-black uppercase tracking-widest">Image Quality Protocol</h3>
                </div>
                <p className="text-xs text-white/70 leading-relaxed font-light">
                  Images are automatically converted to compressed <strong>WebP</strong> format right inside your browser before upload.
                </p>
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between items-center text-[10px] font-mono text-white/60">
                    <span>Portfolio Cards:</span>
                    <span className="text-primary font-bold">1200px @ 80%</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-mono text-white/60">
                    <span>Hero Banners:</span>
                    <span className="text-primary font-bold">1920px @ 85%</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-mono text-white/60">
                    <span>Target Size:</span>
                    <span className="text-emerald-400 font-bold">100 - 250 KB</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Main Column: Add/Edit Work Item Form & Inventory Grid */}
            <div ref={editorRef} className="lg:col-span-9 space-y-12">
              
              {/* WORK ITEM EDITOR FORM */}
              <div className="bg-[#141211] p-6 md:p-10 rounded-[2.5rem] border border-white/10 space-y-8 shadow-2xl relative">
                <div className="flex items-center justify-between border-b border-white/10 pb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                      {editingItem ? <HiPencil size={20} /> : <HiPlus size={20} />}
                    </div>
                    <div>
                      <h2 className="text-2xl font-serif text-white">
                        {editingItem ? `Edit Work: "${editingItem.title}"` : `Add New Work Image / Photo`}
                      </h2>
                      <p className="text-xs text-white/50 uppercase tracking-widest mt-0.5">
                        Category: <span className="text-primary font-bold">{categoryNames[activeCategory]}</span>
                      </p>
                    </div>
                  </div>

                  {editingItem && (
                    <button
                      onClick={resetForm}
                      className="px-4 py-2 bg-white/5 border border-white/10 text-white/60 hover:text-white text-xs rounded-xl flex items-center gap-1.5 transition-all"
                    >
                      <HiX /> Cancel Edit
                    </button>
                  )}
                </div>

                {/* Form Fields Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* Left Column: Media Upload Zone & Quality Presets */}
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-[10px] font-black uppercase text-white/60 tracking-wider">
                          1. Select Image Quality Preset
                        </label>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {(['balanced', 'ultra', 'compact'] as const).map((presetKey) => (
                          <button
                            key={presetKey}
                            type="button"
                            onClick={() => setSelectedPreset(presetKey)}
                            className={`p-3 rounded-xl border text-left transition-all ${
                              selectedPreset === presetKey
                                ? 'bg-primary/20 border-primary text-white shadow-lg'
                                : 'bg-black/40 border-white/10 text-white/50 hover:border-white/20'
                            }`}
                          >
                            <p className="text-xs font-bold capitalize">{presetKey}</p>
                            <p className="text-[9px] font-mono text-white/40 mt-1">
                              {QUALITY_PRESETS[presetKey].maxDimension}px @ {QUALITY_PRESETS[presetKey].quality * 100}%
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* File Upload Drop Zone */}
                    <div>
                      <label className="text-[10px] font-black uppercase text-white/60 tracking-wider block mb-2">
                        2. Upload Work Image or Video File
                      </label>

                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        accept="image/*,video/mp4"
                        className="hidden"
                      />

                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                          formUrl 
                            ? 'border-primary/40 bg-primary/5 hover:border-primary/60' 
                            : 'border-white/20 bg-black/40 hover:border-primary/50 hover:bg-white/5'
                        }`}
                      >
                        {isOptimizing || isUploading ? (
                          <div className="space-y-3 py-4">
                            <HiRefresh className="animate-spin text-3xl text-primary mx-auto" />
                            <p className="text-xs font-bold uppercase tracking-wider text-primary">
                              {isOptimizing ? "Optimizing & Resizing Image..." : "Uploading Asset..."}
                            </p>
                            {uploadProgress !== null && (
                              <div className="w-full bg-white/10 rounded-full h-2 max-w-xs mx-auto overflow-hidden">
                                <div className="bg-primary h-full transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                              </div>
                            )}
                          </div>
                        ) : formUrl ? (
                          <div className="space-y-3">
                            <div className="relative aspect-[16/9] max-h-44 mx-auto rounded-xl overflow-hidden border border-white/10 bg-black">
                              {formType === 'video' ? (
                                <video src={formUrl} className="w-full h-full object-cover" />
                              ) : (
                                <Image src={formUrl} fill alt="Uploaded preview" className="object-cover" />
                              )}
                              <span className="absolute top-2 right-2 bg-emerald-500 text-black text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                                Ready
                              </span>
                            </div>
                            <p className="text-[10px] font-mono text-white/50 truncate max-w-xs mx-auto">{formUrl}</p>
                            <button
                              type="button"
                              className="px-4 py-1.5 bg-white/10 text-white text-xs font-bold rounded-lg hover:bg-primary transition-colors inline-flex items-center gap-1.5"
                            >
                              <HiCloudUpload /> Replace Media
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-3 py-4">
                            <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mx-auto">
                              <HiCloudUpload size={28} />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-white">Click or Drop Photo / Video Here</p>
                              <p className="text-xs text-white/40 mt-1">Supports WebP, JPG, PNG, MP4. Auto-compressed before upload.</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Compression Metrics Feedback */}
                    {lastOptimization && (
                      <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl space-y-1.5 text-xs">
                        <div className="flex items-center justify-between text-emerald-400 font-bold">
                          <span>✨ Client Optimization Complete</span>
                          <span>{lastOptimization.savingsPercentage}% Size Savings</span>
                        </div>
                        <div className="flex justify-between font-mono text-[10px] text-white/70">
                          <span>Original: {lastOptimization.formattedOriginalSize}</span>
                          <span>➜</span>
                          <span className="text-emerald-300 font-bold">Optimized: {lastOptimization.formattedCompressedSize}</span>
                        </div>
                        <p className="text-[9px] text-white/40 font-mono">
                          Dimensions: {lastOptimization.width} × {lastOptimization.height} px ({QUALITY_PRESETS[selectedPreset].mimeType})
                        </p>
                      </div>
                    )}

                    {/* Or URL Input */}
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase text-white/40 tracking-widest">Or Media URL</label>
                      <div className="relative">
                        <HiLink className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                        <input
                          type="text"
                          placeholder="https://... or /images/..."
                          value={formUrl}
                          onChange={(e) => setFormUrl(e.target.value)}
                          className="w-full bg-black/60 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs text-white font-mono placeholder:text-white/20 focus:outline-none focus:border-primary/50"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Work Metadata Details */}
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-white/60 tracking-wider">Project Title *</label>
                      <input
                        type="text"
                        placeholder="e.g. Royal Arabic Majlis Lounge"
                        value={formTitle}
                        onChange={(e) => setFormTitle(e.target.value)}
                        className="w-full bg-black/60 border border-white/10 rounded-xl py-3 px-4 text-xs font-bold text-white placeholder:text-white/20 focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-white/60 tracking-wider">Client Venue</label>
                        <input
                          type="text"
                          placeholder="e.g. Palace Resort & Spa"
                          value={formClient}
                          onChange={(e) => setFormClient(e.target.value)}
                          className="w-full bg-black/60 border border-white/10 rounded-xl py-3 px-4 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-primary"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-white/60 tracking-wider">Location</label>
                        <input
                          type="text"
                          placeholder="e.g. Palm Jumeirah, Dubai"
                          value={formLocation}
                          onChange={(e) => setFormLocation(e.target.value)}
                          className="w-full bg-black/60 border border-white/10 rounded-xl py-3 px-4 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-primary"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-white/60 tracking-wider">Project Description</label>
                      <textarea
                        rows={3}
                        placeholder="Describe craftsmanship, upholstery materials, frame details..."
                        value={formDescription}
                        onChange={(e) => setFormDescription(e.target.value)}
                        className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-primary leading-relaxed"
                      />
                    </div>

                    {/* Craftsmanship Feature Tags */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-white/60 tracking-wider">Craftsmanship Highlights</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="e.g. Flame-Retardant Fabric"
                          value={formFeatureInput}
                          onChange={(e) => setFormFeatureInput(e.target.value)}
                          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddFeature(); } }}
                          className="flex-1 bg-black/60 border border-white/10 rounded-xl py-2 px-3 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-primary"
                        />
                        <button
                          type="button"
                          onClick={handleAddFeature}
                          className="px-4 py-2 bg-white/10 text-white rounded-xl text-xs font-bold hover:bg-primary transition-colors"
                        >
                          Add
                        </button>
                      </div>

                      {formFeatures.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {formFeatures.map((feat, idx) => (
                            <span key={idx} className="bg-primary/20 text-primary border border-primary/30 text-[10px] px-2.5 py-1 rounded-full flex items-center gap-1">
                              {feat}
                              <button type="button" onClick={() => handleRemoveFeature(idx)} className="hover:text-red-400">
                                <HiX size={12} />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Additional Gallery Photos */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-black uppercase text-white/60 tracking-wider">Project Sub-Gallery Photos</label>
                        <button
                          type="button"
                          onClick={() => galleryFileInputRef.current?.click()}
                          className="text-[10px] font-bold text-primary hover:underline flex items-center gap-1"
                        >
                          <HiPlus /> Add Photos
                        </button>
                      </div>

                      <input
                        type="file"
                        ref={galleryFileInputRef}
                        onChange={handleGalleryUpload}
                        accept="image/*"
                        multiple
                        className="hidden"
                      />

                      {formGallery.length > 0 && (
                        <div className="flex gap-2 overflow-x-auto pb-2">
                          {formGallery.map((gUrl, idx) => (
                            <div key={idx} className="relative w-16 h-16 rounded-lg overflow-hidden border border-white/10 flex-shrink-0 group">
                              <Image src={gUrl} fill alt="Gallery" className="object-cover" />
                              <button
                                type="button"
                                onClick={() => handleRemoveGalleryImage(idx)}
                                className="absolute inset-0 bg-black/70 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                              >
                                <HiTrash size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Form Action Buttons */}
                <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={handleSaveItem}
                    className="flex-1 py-4 bg-primary text-white font-black uppercase tracking-[0.2em] rounded-xl hover:bg-white hover:text-black transition-all shadow-xl active:scale-95 text-xs flex items-center justify-center gap-2"
                  >
                    <HiCheck size={18} />
                    <span>{editingItem ? "Update Work Item" : "Add Work to Category"}</span>
                  </button>

                  {editingItem && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-6 py-4 bg-white/5 border border-white/10 text-white/60 hover:text-white rounded-xl text-xs font-bold uppercase tracking-wider"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* LIVE INVENTORY VAULT GRID */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-serif text-white">Category Vault Inventory</h3>
                    <p className="text-xs text-white/50">
                      Showing {currentCategoryItems.length} works in <span className="text-primary font-bold">{categoryNames[activeCategory]}</span>
                    </p>
                  </div>
                  <span className="text-[10px] font-mono bg-white/5 px-3 py-1.5 rounded-full border border-white/10 text-white/40">
                    Staged locally
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {currentCategoryItems.map((item) => (
                    <div
                      key={item.id}
                      className="group relative rounded-2xl overflow-hidden bg-[#141211] border border-white/10 hover:border-primary/50 transition-all duration-500 shadow-xl flex flex-col justify-between"
                    >
                      {/* Media Thumbnail */}
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/60">
                        {item.type === 'video' ? (
                          <video src={item.url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                          <Image src={item.url} fill alt={item.title || "Work"} className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        )}
                        <span className={`absolute top-3 left-3 text-[9px] font-bold uppercase px-3 py-1 rounded-full backdrop-blur-md border ${
                          item.type === 'video' ? 'bg-primary/30 text-primary border-primary/40' : 'bg-black/60 text-white border-white/20'
                        }`}>
                          {item.type}
                        </span>

                        {item.gallery && item.gallery.length > 1 && (
                          <span className="absolute top-3 right-3 text-[9px] font-bold bg-black/70 text-white px-2.5 py-0.5 rounded-full border border-white/20">
                            📷 {item.gallery.length}
                          </span>
                        )}
                      </div>

                      {/* Info & Actions */}
                      <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="text-sm font-serif font-bold text-white group-hover:text-primary transition-colors">
                            {item.title || "Untitled Project"}
                          </h4>
                          <p className="text-xs text-white/60 line-clamp-2 mt-1 font-light">
                            {item.description}
                          </p>
                          <div className="flex items-center gap-4 mt-3 text-[10px] font-mono text-white/40 border-t border-white/5 pt-2">
                            <span>📍 {item.location || "Dubai"}</span>
                            <span>👤 {item.client || "Private"}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 pt-2">
                          <button
                            onClick={() => populateForm(item)}
                            className="flex-1 py-2 bg-white/5 hover:bg-primary hover:text-white border border-white/10 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all"
                          >
                            <HiPencil size={14} /> Edit Details
                          </button>
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            className="px-3 py-2 bg-white/5 hover:bg-red-500 text-white/50 hover:text-white border border-white/10 rounded-xl transition-all"
                            title="Delete"
                          >
                            <HiTrash size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {currentCategoryItems.length === 0 && (
                  <div className="py-24 text-center border-2 border-dashed border-white/10 rounded-[2.5rem] bg-white/[0.01]">
                    <HiOutlineShoppingBag size={40} className="mx-auto text-white/20 mb-3" />
                    <p className="text-white/40 text-xs uppercase font-bold tracking-widest">No work items found in this cluster</p>
                    <p className="text-white/20 text-[10px] mt-1">Use the form above to add a new project image or photo.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* LIVE PREVIEW MODE */}
        {viewMode === 'preview' && (
          <div className="space-y-12 animate-fade-in">
            <div className="bg-[#141211] p-8 rounded-[2.5rem] border border-white/10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl font-serif text-white">Live Website Preview</h2>
                <p className="text-xs text-white/60">Inspect how newly added photos and work items look across the website</p>
              </div>

              <div className="flex items-center gap-3">
                {(['Home', 'Portfolio', 'About', 'Contact'] as const).map((page) => (
                  <button
                    key={page}
                    onClick={() => setActivePreviewPage(page)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                      activePreviewPage === page ? 'bg-primary text-white shadow-lg' : 'bg-white/5 text-white/50 hover:text-white'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>

            {/* Frame Container */}
            <div className={`w-full min-h-[700px] overflow-y-auto rounded-[2.5rem] border-8 transition-all scrollbar-hide relative shadow-2xl ${
              isDarkMode ? 'bg-[#0c0a09] border-[#1a1716]' : 'bg-[#fafaf9] border-[#e7e5e4]'
            }`}>
              <div className="p-4">
                {activePreviewPage === 'Home' && (
                  <>
                    <Hero />
                    <Services />
                    <Portfolio />
                    <ImageCollage />
                    <InfoSection />
                  </>
                )}

                {activePreviewPage === 'Portfolio' && (
                  <div className="pt-24 pb-16 px-6 max-w-7xl mx-auto">
                    <div className="mb-12 text-center">
                      <h1 className="text-5xl font-serif mb-4">Masterpiece Collection</h1>
                      <p className="text-foreground/70">Browse through custom contract furniture fit-outs in Dubai</p>
                    </div>
                    <ImageGallery selectedImages={(localCategories?.[activeCategory] || []) as any} />
                  </div>
                )}

                {activePreviewPage === 'About' && (
                  <div className="pt-20 space-y-16 max-w-7xl mx-auto px-6">
                    <h1 className="text-5xl font-serif text-center">About Comfort Furniture</h1>
                    <p className="text-center text-foreground/70 max-w-2xl mx-auto">
                      Artisanal craftsmanship manufacturing bespoke luxury furniture for hotels, majlises, and executive villas in Dubai & the GCC.
                    </p>
                  </div>
                )}

                {activePreviewPage === 'Contact' && (
                  <div className="pt-20 pb-16 px-6 max-w-7xl mx-auto text-center space-y-6">
                    <h1 className="text-5xl font-serif">Get In Touch</h1>
                    <p className="text-foreground/70">Dubai, UAE | +971 50 168 4151 | info@comfortsplus.com</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] animate-slide-up">
          <div className={`px-8 py-4 rounded-2xl flex items-center gap-4 border shadow-2xl backdrop-blur-3xl transition-all ${
            toast.type === 'success' ? 'bg-primary/20 border-primary/40 text-primary' :
            toast.type === 'error' ? 'bg-red-500/20 border-red-500/40 text-red-500' :
            'bg-white/10 border-white/20 text-white'
          }`}>
            <div className={`w-2.5 h-2.5 rounded-full animate-pulse ${
              toast.type === 'success' ? 'bg-primary' : toast.type === 'error' ? 'bg-red-500' : 'bg-white'
            }`} />
            <span className="text-xs font-bold uppercase tracking-wider">{toast.message}</span>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
