import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import { useServiceContext } from "@/store/serviceContext";
import Navigation from "@/components/Navigation/mainNavigation";
import Footer from "@/components/footer";
import { HiPlus, HiTrash, HiSave, HiLink, HiPhotograph, HiPlay, HiPencil, HiCheck, HiX, HiInformationCircle, HiOutlineHome, HiOutlineOfficeBuilding, HiOutlinePuzzle, HiOutlineShoppingBag, HiOutlinePhotograph, HiOutlineVideoCamera, HiOutlineEye, HiOutlineDatabase, HiOutlineSun, HiOutlineMoon } from "react-icons/hi";
import Portfolio from "@/components/portfolio";
import Services from "@/components/services";
import ImageCollage from "@/components/imageCollage";
import InfoSection from "@/components/InfoSection";
import Hero from "@/components/Hero";
import ContactCard from "@/components/contactCard";
import ImageGallery from "@/components/imageGallary";
import Image from "next/image";

// Preview Assets
import AboutHero from "../../public/images/Portfolio/sample-22.webp";
import AboutPhoto from "../../public/images/Icon/decoration.png";
import Scanner from "../../public/whatsapp contact.jpg";

interface PortfolioMediaItem {
  id: string;
  url: string;
  type: "image" | "video";
  title?: string;
}

const AdminDashboard = () => {
  const router = useRouter();
  const { serviceData, updatePortfolio, categories: contextCategories, setIsAdmin, isDarkMode, toggleDarkMode } = useServiceContext();
  const [activeCategory, setActiveCategory] = useState("homeFurnishing");
  const [viewMode, setViewMode] = useState<'inventory' | 'preview'>('inventory');
  const [activePreviewPage, setActivePreviewPage] = useState<'Home' | 'About' | 'Contact' | 'Portfolio'>('Home');
  const [tempLinks, setTempLinks] = useState<{ [key: string]: string }>({});
  const [isSaving, setIsSaving] = useState(false);
  const [isLocked, setIsLocked] = useState(true);
  const [password, setPassword] = useState("");
  const [editingItem, setEditingItem] = useState<PortfolioMediaItem | null>(null);
  const [qualityHint, setQualityHint] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'info' | 'error' } | null>(null);
  const [localCategories, setLocalCategories] = useState<Record<string, PortfolioMediaItem[]> | null>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Load current categories from context on mount or when context changes
  React.useEffect(() => {
    if (contextCategories) {
      setLocalCategories(contextCategories);
      
      // Handle Deep Linking from URL parameters
      const { category, edit } = router.query;
      
      if (category && typeof category === 'string') {
        setActiveCategory(category);
      }
      
      if (edit && typeof edit === 'string' && contextCategories[category as string]) {
        const itemToEdit = contextCategories[category as string].find((i: PortfolioMediaItem) => i.id === edit);
        if (itemToEdit) {
          setEditingItem(itemToEdit);
          setTempLinks(prev => ({ ...prev, [category as string]: itemToEdit.url }));
          
          // Delayed scroll to allow render
          setTimeout(() => {
            editorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 500);
        }
      }
    }
  }, [contextCategories, router.query]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "comfort2026") {
      setIsLocked(false);
      setIsAdmin(true);
    } else {
      alert("Invalid Management Key");
    }
  };

  const handleAddLink = () => {
    const url = tempLinks[activeCategory];
    if (!url) return;

    const newItem: PortfolioMediaItem = {
      id: Math.random().toString(36).substr(2, 9),
      url,
      type: url.includes("video") || url.includes(".mp4") ? "video" : "image",
      title: "New Media Entry"
    };

    const updated = {
      ...(localCategories || {}),
      [activeCategory]: [...(localCategories?.[activeCategory] || []), newItem]
    };
    setLocalCategories(updated);
    setTempLinks({ ...tempLinks, [activeCategory]: "" });
    setQualityHint("Asset added to queue. Remember to synchronize when done.");
    showToast("Asset added to local draft", "info");
  };

  const handleEdit = (item: PortfolioMediaItem) => {
    setEditingItem(item);
    setTempLinks({ ...tempLinks, [activeCategory]: item.url });
    // Scroll to editor with smooth feedback
    editorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleUpdate = () => {
    if (!editingItem || !localCategories || !localCategories[activeCategory]) return;
    const url = tempLinks[activeCategory];
    
    const updatedCategory: PortfolioMediaItem[] = localCategories[activeCategory].map(item => 
      item.id === editingItem.id 
      ? { ...item, url, type: (url.includes("video") || url.includes(".mp4") ? "video" : "image") as "video" | "image" } 
      : item
    );

    const updated: Record<string, PortfolioMediaItem[]> = {
      ...localCategories,
      [activeCategory]: updatedCategory
    };

    setLocalCategories(updated);
    setEditingItem(null);
    setTempLinks({ ...tempLinks, [activeCategory]: "" });
    showToast("Media entry updated", "success");
  };

  const handleDelete = (id: string) => {
    if (!localCategories || !localCategories[activeCategory]) return;
    
    const updated = {
      ...localCategories,
      [activeCategory]: localCategories[activeCategory].filter((item) => item.id !== id)
    };
    setLocalCategories(updated);
  };

  const handleSave = async () => {
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
        showToast("PLATFORM SYNCHRONIZED SUCCESSFULLY", "success");
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

  if (isLocked) {
    return (
      <div className="min-h-screen bg-[#0c0a09] flex items-center justify-center p-6 selection:bg-primary">
        <div className="w-full max-w-md glass animate-fade-in p-1 rounded-[2.5rem] bg-gradient-to-b from-white/10 to-transparent border border-white/10">
          <div className="bg-[#0c0a09]/80 backdrop-blur-3xl p-10 rounded-[2.4rem] space-y-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/20 mx-auto mb-6 shadow-[0_0_30px_rgba(var(--primary-rgb),0.1)]">
                <HiOutlineOfficeBuilding size={32} />
              </div>
              <h2 className="text-[10px] font-black tracking-[0.4em] uppercase text-primary/80 mb-3">Management Gate</h2>
              <h1 className="text-4xl font-serif text-white tracking-tight">Studio Login</h1>
              <p className="text-white/40 text-xs mt-4 font-medium tracking-wide">Enter your credentials to access the terminal</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-white/30 tracking-widest ml-4">Access Key</label>
                <input 
                  type="password" 
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-6 focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all text-center tracking-[0.5em] placeholder:text-white/10 placeholder:tracking-normal"
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
    <div className="min-h-screen bg-[#0c0a09] text-white selection:bg-primary">
      <Navigation />
      
      <header className="fixed top-[90px] left-0 right-0 z-[60] bg-black/40 backdrop-blur-3xl border-y border-white/10 py-5 px-12 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-[0_0_40px_rgba(var(--primary-rgb),0.1)]">
              <HiSave size={28} />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-serif text-white">Studio Admin</h1>
                <span className="text-[9px] bg-primary/20 text-primary px-3 py-1 rounded-full font-bold uppercase border border-primary/20 tracking-widest">Live Sync</span>
              </div>
              <p className="text-[9px] text-white/40 uppercase tracking-[0.4em] font-black mt-1">Comfort Integrated Platform</p>
            </div>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="hidden sm:flex items-center gap-2 p-1 bg-black/40 border border-white/10 rounded-2xl mr-4">
              <button 
                onClick={() => setViewMode('inventory')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all text-[10px] font-black uppercase tracking-widest ${viewMode === 'inventory' ? 'bg-primary text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
              >
                <HiOutlineDatabase size={16} /> Portfolio
              </button>
              <button 
                onClick={() => setViewMode('preview')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all text-[10px] font-black uppercase tracking-widest ${viewMode === 'preview' ? 'bg-primary text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
              >
                <HiOutlineEye size={16} /> Preview
              </button>
            </div>
            
            {viewMode === 'preview' && (
              <div className="flex items-center gap-2 p-1 bg-black/40 border border-white/10 rounded-2xl">
                {(['Home', 'About', 'Contact', 'Portfolio'] as const).map((page) => (
                  <button
                    key={page}
                    onClick={() => setActivePreviewPage(page)}
                    className={`px-4 py-2 rounded-xl transition-all text-[9px] font-black uppercase tracking-widest ${activePreviewPage === page ? 'bg-white/15 text-white shadow-sm' : 'text-white/50 hover:text-white/80'}`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            )}
            <div className="hidden xl:flex flex-col items-end gap-1">
              <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em]">Environment State</span>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-bold text-white uppercase tracking-wider">Production Cluster</span>
              </div>
            </div>
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="group flex items-center gap-4 px-12 py-5 bg-white text-black rounded-2xl font-black tracking-[0.2em] hover:bg-primary hover:text-white transition-all disabled:opacity-50 text-[11px] active:scale-95 shadow-2xl shadow-primary/20 border border-white/20"
            >
              <HiSave className="text-xl group-hover:rotate-12 transition-transform" /> 
              {isSaving ? "SYNCHRONIZING..." : "COMMIT CHANGES"}
            </button>
          </div>
        </div>
      </header>

      <main className="pt-60 pb-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {viewMode === 'inventory' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              {/* Sidebar Categories */}
              <div className="lg:col-span-3 space-y-8 animate-fade-in">
                <div className="bg-[#141211] border border-white/10 rounded-[2.5rem] p-8 space-y-6 shadow-2xl">
                  <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] px-2">Content Clusters</p>
                  <div className="space-y-2">
                    {serviceData.map((service) => (
                      <button
                        key={service.slug}
                        onClick={() => setActiveCategory(service.slug)}
                        className={`w-full text-left px-5 py-4 rounded-2xl transition-all duration-300 group flex items-center gap-4 border ${
                          activeCategory === service.slug 
                          ? "bg-primary/10 text-primary border-primary/30 shadow-[0_0_30px_rgba(var(--primary-rgb),0.15)]" 
                          : "text-white/50 hover:bg-white/5 hover:text-white border-transparent"
                        }`}
                      >
                        <span className={`text-xl transition-all duration-300 ${activeCategory === service.slug ? "scale-110 opacity-100" : "opacity-40 group-hover:opacity-100 group-hover:scale-110"}`}>
                          {service.slug === 'homeFurnishing' ? <HiOutlineHome /> : 
                           service.slug === 'HotelFurnishing' ? <HiOutlineOfficeBuilding /> :
                           service.slug === 'MajlisDesigns' ? <HiOutlinePuzzle /> : <HiOutlineShoppingBag />}
                        </span>
                        <span className="text-[11px] font-bold uppercase tracking-[0.15em] truncate">{service.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="bg-primary/5 border border-primary/20 rounded-[2.5rem] p-8 space-y-5 shadow-inner">
                  <div className="flex items-center gap-3 text-primary">
                    <HiInformationCircle size={20} />
                    <p className="text-[10px] font-black uppercase tracking-[0.3em]">Studio Insight</p>
                  </div>
                  <p className="text-[11px] text-white/50 leading-relaxed font-medium">
                    Changes made here are <span className="text-white">staged locally</span>. Click &quot;Commit Changes&quot; to push updates to the live production server.
                  </p>
                </div>
              </div>

              {/* Main Editor */}
              <div ref={editorRef} className="lg:col-span-9 animate-slide-up delay-100">
                <div className="bg-[#141211] p-10 md:p-16 rounded-[3.5rem] border border-white/10 space-y-12 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
                  
                  {/* Quality / Input Container */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                    {/* Link Input Section */}
                    <div className="space-y-8">
                      <div className="flex items-center justify-between px-2">
                        <label className="text-[11px] font-black text-white/50 uppercase tracking-[0.3em]">
                          {editingItem ? "Refine Asset Link" : "Asset Core Integrator"}
                        </label>
                        {editingItem && (
                          <span className="text-[9px] bg-accent/20 text-accent px-3 py-1 rounded-full font-bold uppercase border border-accent/20">Active Session</span>
                        )}
                      </div>
                      <div className="flex flex-col gap-5">
                        <div className="relative group">
                          <HiLink className="absolute left-6 top-1/2 -translate-y-1/2 text-primary group-focus-within:scale-125 transition-transform duration-500" />
                          <input 
                            type="text" 
                            placeholder={editingItem ? "Update URL..." : "Paste Drive/Media URL..."}
                            value={tempLinks[activeCategory] || ""}
                            onChange={(e) => setTempLinks({ ...tempLinks, [activeCategory]: e.target.value })}
                            className="w-full bg-black/60 border border-white/10 rounded-2xl py-6 pl-16 pr-8 focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all font-mono text-xs tracking-tight placeholder:text-white/10 text-white shadow-inner"
                          />
                        </div>
                        <div className="flex gap-4">
                          {editingItem ? (
                            <>
                              <button 
                                onClick={handleUpdate}
                                className="flex-grow py-6 bg-primary text-white rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)] transition-all font-black uppercase tracking-[0.2em] text-[11px] active:scale-95 shadow-xl shadow-primary/10"
                              >
                                <HiCheck className="text-lg" /> Save Updates
                              </button>
                              <button 
                                onClick={() => { setEditingItem(null); setTempLinks({ ...tempLinks, [activeCategory]: "" }); }}
                                className="px-8 py-6 bg-white/5 border border-white/10 text-white/60 rounded-2xl flex items-center justify-center hover:bg-white/10 transition-all active:scale-95"
                              >
                                <HiX className="text-lg" />
                              </button>
                            </>
                          ) : (
                            <button 
                              onClick={handleAddLink}
                              className="w-full py-6 bg-white text-black rounded-2xl flex items-center justify-center gap-3 hover:bg-primary hover:text-white transition-all font-black uppercase tracking-[0.2em] text-[11px] active:scale-95 shadow-xl shadow-black/20"
                            >
                              <HiPlus className="text-lg" /> Add to Collection
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Quality Guard / Insight */}
                    <div className="p-10 bg-primary/5 border border-primary/20 rounded-[2.5rem] flex flex-col justify-between shadow-inner relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[60px] rounded-full group-hover:bg-primary/20 transition-colors duration-700" />
                      <div className="space-y-5 relative z-10">
                        <div className="flex items-center gap-4 text-primary">
                          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                            <HiInformationCircle size={24} />
                          </div>
                          <p className="text-[11px] font-black uppercase tracking-[0.3em]">Quality Protocol</p>
                        </div>
                        <p className="text-xs text-white/60 leading-relaxed font-medium">
                          Assets are intelligently categorized by extension. 
                          For <span className="text-primary font-bold">Videos</span>, use 1080p MP4. 
                          For <span className="text-accent font-bold">Images</span>, use high-res WebP or JPG.
                        </p>
                      </div>
                      {qualityHint ? (
                        <div className="mt-6 px-5 py-4 bg-black/40 rounded-2xl border border-primary/30 animate-fade-in flex items-center gap-4 relative z-10">
                          <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(var(--primary-rgb),1)]" />
                          <span className="text-[10px] font-bold uppercase tracking-widest text-primary leading-tight">{qualityHint}</span>
                        </div>
                      ) : (
                        <div className="mt-6 px-5 py-4 bg-white/5 rounded-2xl border border-white/5 animate-fade-in flex items-center gap-4 opacity-40 relative z-10 font-mono text-[9px] uppercase tracking-tighter">
                          Standing by for asset integration...
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Local Asset Discovery Panel */}
                  <div className="space-y-8 bg-black/40 p-10 rounded-[3rem] border border-white/10 shadow-inner group transition-all duration-500 hover:border-white/20">
                    <div className="flex items-center justify-between px-2">
                      <p className="text-[11px] font-black text-white/40 uppercase tracking-[0.4em] italic group-hover:text-white/60 transition-colors">Local Inventory Vault</p>
                      <span className="text-[8px] font-bold text-white/20 uppercase tracking-widest">Discovery System</span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {['video_1.mp4', 'video_2.mp4', 'video_4.mp4', 'video_7.mp4'].map((vid) => (
                        <button 
                          key={vid}
                          onClick={() => setTempLinks({ ...tempLinks, [activeCategory]: `/images/${vid}` })}
                          className="group/btn relative px-6 py-4 bg-[#1a1817] border border-white/5 rounded-2xl text-[10px] font-mono text-white/40 hover:border-primary/50 hover:text-primary transition-all flex items-center gap-3 shadow-lg active:scale-95"
                        >
                          <HiPlay className="opacity-40 group-hover/btn:opacity-100 group-hover/btn:scale-110 transition-all" />
                          {vid}
                          <div className="absolute inset-x-0 bottom-0 h-[2px] bg-primary scale-x-0 group-hover/btn:scale-x-100 transition-transform origin-left rounded-full" />
                        </button>
                      ))}
                      {['hero.png', 'chair.png', 'image_2.jpg'].map((img) => (
                        <button 
                          key={img}
                          onClick={() => setTempLinks({ ...tempLinks, [activeCategory]: `/images/${img}` })}
                          className="group/btn relative px-6 py-4 bg-[#1a1817] border border-white/5 rounded-2xl text-[10px] font-mono text-white/40 hover:border-accent/50 hover:text-accent transition-all flex items-center gap-3 shadow-lg active:scale-95"
                        >
                          <HiPhotograph className="opacity-40 group-hover/btn:opacity-100 group-hover/btn:scale-110 transition-all" />
                          {img}
                          <div className="absolute inset-x-0 bottom-0 h-[2px] bg-accent scale-x-0 group-hover/btn:scale-x-100 transition-transform origin-left rounded-full" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Media Preview Grid */}
                  <div className="space-y-8 relative z-10">
                    <div className="flex items-center justify-between px-2">
                      <p className="text-[11px] font-black text-white/50 uppercase tracking-[0.3em]">Live Preview Grid</p>
                      <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">{localCategories?.[activeCategory]?.length || 0} Assets Staged</span>
                    </div>
                    <div className="grid grid-cols-2 xl:grid-cols-3 gap-8">
                      {(localCategories?.[activeCategory] || []).map((item) => (
                        <div key={item.id} className="group relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-[#141211] border border-white/10 hover:border-primary/50 hover:shadow-[0_0_40px_rgba(var(--primary-rgb),0.2)] transition-all duration-700">
                          {/* Media Placeholder / Thumb */}
                          <div className="absolute inset-0 flex flex-col items-center justify-center p-10 bg-black/60 group-hover:scale-110 transition-transform duration-700">
                            {item.type === 'video' ? (
                              <div className="w-20 h-20 rounded-[2rem] bg-primary/15 flex items-center justify-center text-primary mb-6 group-hover:rotate-6 transition-all duration-500 border border-primary/30 shadow-[0_0_20px_rgba(var(--primary-rgb),0.1)]">
                                <HiOutlineVideoCamera size={40} />
                              </div>
                            ) : (
                              <div className="w-20 h-20 rounded-[2rem] bg-accent/15 flex items-center justify-center text-accent mb-6 group-hover:-rotate-6 transition-all duration-500 border border-accent/30 shadow-[0_0_20px_rgba(var(--accent-rgb),0.1)]">
                                <HiOutlinePhotograph size={40} />
                              </div>
                            )}
                            <div className="space-y-2 text-center">
                              <p className="text-xs font-bold text-white uppercase tracking-widest truncate max-w-[140px] drop-shadow-lg">{item.title || "New Asset"}</p>
                              <p className="text-[9px] font-mono text-white/40 uppercase tracking-tighter truncate max-w-[140px]">{item.url.split('/').pop()}</p>
                            </div>
                          </div>

                          {/* Top Badge */}
                          <div className="absolute top-6 left-6 z-20">
                            <span className={`text-[9px] font-black uppercase px-4 py-1.5 rounded-full backdrop-blur-md shadow-xl ${item.type === 'video' ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-accent/20 text-accent border border-accent/30'}`}>
                              {item.type}
                            </span>
                          </div>

                          {/* Action Overlay */}
                          <div className="absolute inset-0 bg-black/80 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-5 z-30">
                            <button 
                              onClick={() => handleEdit(item)}
                              className="w-14 h-14 rounded-2xl bg-white text-black flex items-center justify-center hover:bg-primary hover:text-white transition-all transform hover:-translate-y-2 shadow-2xl active:scale-90"
                            >
                              <HiPencil size={24} />
                            </button>
                            <button 
                              onClick={() => handleDelete(item.id)}
                              className="w-14 h-14 rounded-2xl bg-white/10 text-white flex items-center justify-center hover:bg-red-500 transition-all transform hover:-translate-y-2 border border-white/20 backdrop-blur-xl active:scale-90"
                            >
                              <HiTrash size={24} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
    
                      {(!localCategories || !localCategories[activeCategory] || localCategories[activeCategory].length === 0) && (
                        <div className="col-span-full py-40 text-center border-2 border-dashed border-white/10 rounded-[4rem] animate-pulse bg-white/[0.02]">
                          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/10">
                            <HiOutlineShoppingBag size={32} className="text-white/20" />
                          </div>
                          <p className="text-white/20 font-black uppercase tracking-[0.4em] text-xs">Inventory Cluster Empty</p>
                          <p className="text-white/10 text-[10px] uppercase tracking-[0.2em] mt-4 font-bold">Awaiting Asset Integration</p>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-24 animate-fade-in pb-40">
              <div className="bg-[#141211] p-10 rounded-[3rem] border border-white/10 shadow-2xl space-y-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-serif text-white tracking-tight">Live Studio Preview</h2>
                    <p className="text-xs text-white/60 uppercase tracking-widest mt-2 font-black">Interactive Layout Terminal</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={toggleDarkMode}
                      className={`w-12 h-12 flex items-center justify-center rounded-2xl border transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-black/5 border-black/10 text-black hover:bg-black/10'}`}
                    >
                      {isDarkMode ? <HiOutlineSun size={20} /> : <HiOutlineMoon size={20} />}
                    </button>
                    <button 
                      onClick={() => { setViewMode('inventory'); editorRef.current?.scrollIntoView({ behavior: 'smooth' }); }}
                      className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all text-white"
                    >
                      Back to Terminal
                    </button>
                  </div>
                </div>
                <div className={`w-full h-[850px] overflow-y-auto rounded-[3.5rem] border-8 transition-all duration-700 scrollbar-hide relative group/preview shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] ${isDarkMode ? 'bg-[#0c0a09] border-[#1a1716]' : 'bg-[#fafaf9] border-[#e7e5e4]'}`}>
                  <div className={`scale-[0.8] origin-top transform-gpu transition-all duration-500 px-4 pt-4 ${isDarkMode ? 'dark' : ''}`}>
                    {activePreviewPage === 'Home' && (
                      <>
                        <Hero onEdit={(item, category) => {
                          setActiveCategory(category);
                          handleEdit(item);
                          setViewMode('inventory');
                        }} />
                        <Services />
                        <Portfolio onEdit={(item, category) => {
                          setActiveCategory(category);
                          handleEdit(item);
                          setViewMode('inventory');
                        }} />
                        <ImageCollage onEdit={() => {
                          setViewMode('inventory');
                          editorRef.current?.scrollIntoView({ behavior: 'smooth' });
                        }} />
                        <InfoSection />
                      </>
                    )}

                    {activePreviewPage === 'About' && (
                      <div className="pt-24 space-y-20">
                        <section className="relative h-[50vh] overflow-hidden group">
                          <Image src={AboutHero} alt="Hero" fill className="object-cover opacity-60" />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
                            <h1 className="text-7xl font-serif text-white tracking-tight">Our Story</h1>
                          </div>
                          <div className="absolute inset-0 bg-primary/20" />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                            <button 
                              onClick={() => setViewMode('inventory')}
                              className="px-8 py-4 bg-white text-black rounded-xl font-bold uppercase tracking-widest shadow-2xl flex items-center gap-2"
                            >
                              <HiPencil size={20} /> Edit Story Assets
                            </button>
                          </div>
                        </section>
                        <section className="max-w-7xl mx-auto px-6 py-20">
                           <div className="grid grid-cols-2 gap-16 items-center">
                              <div className="relative aspect-square bg-white/5 rounded-3xl overflow-hidden">
                                <Image src={AboutPhoto} alt="About" fill className="object-cover" />
                              </div>
                              <div className="space-y-6">
                                <h2 className="text-5xl font-serif leading-tight">Crafting Excellence</h2>
                                <p className="text-xl text-foreground/60 leading-relaxed">20 years of bespoke quality for hospitality and leisure.</p>
                              </div>
                           </div>
                        </section>
                      </div>
                    )}

                    {activePreviewPage === 'Portfolio' && (
                      <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
                        <div className="mb-20 text-center">
                           <h1 className="text-6xl font-serif mb-4">Masterpiece Collection</h1>
                           <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
                        </div>
                        <ImageGallery selectedImages={contextCategories?.['homeFurnishing'] || []} />
                      </div>
                    )}

                    {activePreviewPage === 'Contact' && (
                      <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
                         <div className="text-center mb-20">
                           <h1 className="text-7xl font-serif mb-6">Let&apos;s Connect</h1>
                           <p className="text-xl text-foreground/60">Dubai, UAE | +971 50 168 4151</p>
                         </div>
                         <div className="grid grid-cols-2 gap-16">
                            <div className="relative bg-white/5 h-96 rounded-[3rem] border border-white/10 overflow-hidden">
                              <Image src={Scanner} alt="WhatsApp" fill className="object-contain p-8" />
                            </div>
                            <div className="space-y-6">
                               <ContactCard name="Shafi Muhammed" role="BM" email="shafi@comfortsplus.com" />
                               <ContactCard name="Support Team" role="Admin" email="info@comfortsplus.com" />
                            </div>
                         </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div ref={editorRef} />
            </div>
          )}
        </div>
      </main>

      {/* Real-time Status Toast */}
      {toast && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[100] animate-slide-up">
          <div className={`px-10 py-5 rounded-[2rem] flex items-center gap-5 border shadow-[0_0_50px_rgba(0,0,0,0.5)] backdrop-blur-3xl transition-all ${
            toast.type === 'success' ? 'bg-primary/20 border-primary/40 text-primary' : 
            toast.type === 'error' ? 'bg-red-500/20 border-red-500/40 text-red-500' : 
            'bg-white/10 border-white/20 text-white'
          }`}>
            <div className={`w-2.5 h-2.5 rounded-full animate-pulse shadow-[0_0_15px_currentColor] ${
              toast.type === 'success' ? 'bg-primary' : toast.type === 'error' ? 'bg-red-500' : 'bg-white'
            }`} />
            <span className="text-[11px] font-black uppercase tracking-[0.4em] drop-shadow-sm">{toast.message}</span>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default AdminDashboard;
