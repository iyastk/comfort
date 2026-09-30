import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MediaItem } from "@/store/serviceContext";

interface ImageGalleryProps {
  selectedImages: (MediaItem & { slug?: string; categoryName?: string })[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ selectedImages }) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {(selectedImages || []).map((item, index) => {
          const workSlug = item.slug || item.id;
          const targetHref = `/portfolio/work/${workSlug}`;

          return (
            <div 
              key={item.id || index} 
              className="relative group aspect-square overflow-hidden rounded-[2rem] shadow-lg hover:shadow-2xl transition-all duration-500 animate-slide-up bg-black/5"
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
              
              {/* Overlay with direct Link to individual Work page */}
              <Link
                href={targetHref}
                className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8 z-10"
                aria-label={`View details for ${item.title || 'Work Item'}`}
              >
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-primary text-[10px] font-extrabold uppercase tracking-[0.25em] mb-2">
                    {item.categoryName || (item.type === "video" ? "Video Showcase" : "Bespoke Project")}
                  </p>
                  <div className="flex justify-between items-center">
                    <h3 className="text-white text-xl font-serif font-bold">
                      {item.title || "Exquisite Detail"}
                    </h3>
                    <span className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white group-hover:bg-white group-hover:text-primary transition-colors duration-300 flex-shrink-0">
                      <span className="text-lg">→</span>
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImageGallery;
