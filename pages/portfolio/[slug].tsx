import React from "react";
import { useServiceContext } from "@/store/serviceContext";
import ImageGallery from "@/components/imageGallary";
import Header from "@/components/Navigation/header";
import Footer from "@/components/footer";

const SubPage = () => {
  const { selectedImages, activeButton } = useServiceContext();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-serif mb-4">
              {activeButton || "Project Gallery"}
            </h1>
            <div className="w-16 h-1 bg-primary rounded-full" />
          </div>

          {/* Gallery */}
          <ImageGallery selectedImages={selectedImages} />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SubPage;
