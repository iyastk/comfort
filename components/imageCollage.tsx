import Image from "next/image";
import React from "react";
import gallary_1 from "../public/images/gallary/gallary_1.webp";
import gallary_2 from "../public/images/gallary/gallary_2.jpeg";
import gallary_3 from "../public/images/gallary/gallary_3.jpg";
import gallary_4 from "../public/images/gallary/gallary_4.jpg";
import gallary_5 from "../public/images/gallary/gallary_5.jpg";
import gallary_6 from "../public/images/gallary/gallary_6.jpg";
import gallary_7 from "../public/images/gallary/gallary_7.jpg";
import gallary_8 from "../public/images/gallary/gallary_8.jpg";
import gallary_9 from "../public/images/gallary/gallary_9.jpg";
import gallary_10 from "../public/images/gallary/gallary_10.jpg";
import gallary_11 from "../public/images/gallary/gallary_11.jpg";
import gallary_12 from "../public/images/gallary/gallary_12.jpg";
import gallary_13 from "../public/images/gallary/gallary_13.jpg";

import image_1 from "../public/images/image_2.jpg";
import { HiPencil } from "react-icons/hi";
import { useServiceContext } from "@/store/serviceContext";

interface ImageCollageProps {
  onEdit?: () => void;
}

const ImageCollage = ({ onEdit }: ImageCollageProps) => {
  const { isAdmin } = useServiceContext();
  
  const EditOverlay = () => (
    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
      <button 
        onClick={(e) => { e.preventDefault(); onEdit?.(); }}
        className="w-10 h-10 rounded-lg bg-white text-black flex items-center justify-center hover:bg-primary hover:text-white transition-colors shadow-lg"
      >
        <HiPencil size={18} />
      </button>
    </div>
  );

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto overflow-hidden">
      <div className="text-center mb-8">
        <span className="text-primary text-xs font-bold uppercase tracking-[0.3em]">Craftsmanship Showcase</span>
        <h2 className="text-3xl md:text-5xl font-serif mt-2">Interior Inspirations</h2>
      </div>

      {/* Responsive Grid for iPhone & Desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-8 md:grid-rows-[90px] gap-3">
        <div className="col-span-1 md:col-span-2 md:row-span-2 relative aspect-square md:aspect-auto group rounded-2xl overflow-hidden shadow-md">
          <Image src={gallary_1} alt="Luxury Furniture Showcase 1" fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 50vw, 25vw" />
          {isAdmin && <EditOverlay />}
        </div>
        
        <div className="col-span-1 md:col-span-3 md:row-span-3 relative aspect-square md:aspect-auto group rounded-2xl overflow-hidden shadow-md">
          <Image src={gallary_2} alt="Luxury Interior Showcase 2" fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 50vw, 37vw" />
          {isAdmin && <EditOverlay />}
        </div>

        <div className="col-span-1 md:col-start-6 md:col-span-1 md:row-span-1 relative aspect-square md:aspect-auto group rounded-2xl overflow-hidden shadow-md">
          <Image src={gallary_3} alt="Luxury Interior Showcase 3" fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 50vw, 12vw" />
          {isAdmin && <EditOverlay />}
        </div>

        <div className="col-span-1 md:col-start-7 md:col-span-2 md:row-span-2 relative aspect-square md:aspect-auto group rounded-2xl overflow-hidden shadow-md">
          <Image src={gallary_4} alt="Luxury Interior Showcase 4" fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 50vw, 25vw" />
          {isAdmin && <EditOverlay />}
        </div>

        <div className="col-span-1 md:row-start-3 md:row-span-2 md:col-span-2 relative aspect-square md:aspect-auto group rounded-2xl overflow-hidden shadow-md">
          <Image src={gallary_5} alt="Luxury Interior Showcase 5" fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 50vw, 25vw" />
          {isAdmin && <EditOverlay />}
        </div>

        <div className="col-span-1 md:row-start-4 md:row-span-3 md:col-start-3 md:col-span-2 relative aspect-square md:aspect-auto group rounded-2xl overflow-hidden shadow-md">
          <Image src={gallary_6} alt="Luxury Interior Showcase 6" fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 50vw, 25vw" />
          {isAdmin && <EditOverlay />}
        </div>

        <div className="col-span-1 md:row-start-4 md:row-span-1 md:col-start-5 md:col-span-1 relative aspect-square md:aspect-auto group rounded-2xl overflow-hidden shadow-md">
          <Image src={gallary_7} alt="Luxury Interior Showcase 7" fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 50vw, 12vw" />
          {isAdmin && <EditOverlay />}
        </div>

        <div className="col-span-1 md:row-start-3 md:row-span-2 md:col-start-6 md:col-span-2 relative aspect-square md:aspect-auto group rounded-2xl overflow-hidden shadow-md">
          <Image src={gallary_8} alt="Luxury Interior Showcase 8" fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 50vw, 25vw" />
          {isAdmin && <EditOverlay />}
        </div>

        <div className="col-span-1 md:row-start-3 md:row-span-1 md:col-start-8 relative aspect-square md:aspect-auto group rounded-2xl overflow-hidden shadow-md">
          <Image src={gallary_9} alt="Luxury Interior Showcase 9" fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 50vw, 12vw" />
          {isAdmin && <EditOverlay />}
        </div>

        <div className="col-span-1 md:row-start-4 md:row-span-1 md:col-start-8 relative aspect-square md:aspect-auto group rounded-2xl overflow-hidden shadow-md">
          <Image src={gallary_10} alt="Luxury Interior Showcase 10" fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 50vw, 12vw" />
          {isAdmin && <EditOverlay />}
        </div>

        <div className="col-span-1 md:row-start-5 md:row-span-2 md:col-span-2 relative aspect-square md:aspect-auto group rounded-2xl overflow-hidden shadow-md">
          <Image src={gallary_11} alt="Luxury Interior Showcase 11" fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 50vw, 25vw" />
          {isAdmin && <EditOverlay />}
        </div>

        <div className="col-span-1 md:row-start-5 md:row-span-2 md:col-span-2 relative aspect-square md:aspect-auto group rounded-2xl overflow-hidden shadow-md">
          <Image src={gallary_12} alt="Luxury Interior Showcase 12" fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 50vw, 25vw" />
          {isAdmin && <EditOverlay />}
        </div>

        <div className="col-span-1 md:row-start-5 md:row-span-2 md:col-span-2 relative aspect-square md:aspect-auto group rounded-2xl overflow-hidden shadow-md">
          <Image src={gallary_13} alt="Luxury Interior Showcase 13" fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 50vw, 25vw" />
          {isAdmin && <EditOverlay />}
        </div>

        <div className="col-span-1 md:row-start-5 md:row-span-2 md:col-span-2 relative aspect-square md:aspect-auto group rounded-2xl overflow-hidden shadow-md">
          <Image src={image_1} alt="Luxury Interior Showcase 14" fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 50vw, 25vw" />
          {isAdmin && <EditOverlay />}
        </div>
      </div>
    </section>
  );
};

export default ImageCollage;
