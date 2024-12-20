import Image, { StaticImageData } from "next/image";
import React, { useEffect } from "react";

interface ImageGalleryProps {
  selectedImages: StaticImageData[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ selectedImages }) => {
  console.log(" after clicking");
  console.log(selectedImages);
  console.log("end after clicking");
  useEffect(() => {
    console.log("Updated selected images:", selectedImages);
  }, [selectedImages]);

  return (
    <>
      <div className="bg-slate-100 w-full mt-10 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedImages.map((src, index) => (
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
