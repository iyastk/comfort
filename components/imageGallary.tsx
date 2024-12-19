import Image, { StaticImageData } from "next/image";
import React from "react";

const ImageGallery = ({ items }: { items: StaticImageData[] }) => {
  return (
    <>
      <div className="bg-slate-100 w-full mt-10 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((src, index) => (
            <div key={index} className="relative group">
              <Image
                src={src}
                alt={`Portfolio item ${index + 1}`}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white font-semibold text-lg">Contact Us</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ImageGallery;
