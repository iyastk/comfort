import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MediaItem } from "@/store/serviceContext";

interface ImageGalleryProps {
  selectedImages: MediaItem[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ selectedImages }) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {(selectedImages || []).map((item, index) => (
          <div 
            key={item.id || index} 
            className="relative group aspect-square overflow-hidden rounded-[2rem] shadow-lg hover:shadow-2xl transition-all duration-500 animate-slide-up"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {item.type === "video" ? (
              <video
                src={item.url}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            ) : (
              <Image
                src={item.url}
                alt={item.title || `Portfolio Work ${index + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            )}
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
              <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-2">
                  {item.type === "video" ? "Video Showcase" : "Project Showcase"}
                </p>
                <div className="flex justify-between items-center">
                  <h4 className="text-white text-xl font-serif">
                    {item.title || "Exquisite Detail"}
                  </h4>
                  <Link 
                    href="/contact"
                    className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white hover:bg-white hover:text-primary transition-colors duration-300"
                  >
                    <span className="text-xl">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
