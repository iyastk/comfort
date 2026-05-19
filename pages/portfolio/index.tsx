import React from "react";
import Link from "next/link";
import ImageGallery from "@/components/imageGallary";
import { useServiceContext } from "@/store/serviceContext";
import Header from "@/components/Navigation/header";
import Footer from "@/components/footer";

const PortfolioPage = () => {
  const { selectedImages } = useServiceContext();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <ImageGallery selectedImages={selectedImages} />

          {/* Call to Action */}
          <div className="mt-32 p-12 md:p-20 glass rounded-[3rem] border border-primary/20 text-center space-y-8 animate-slide-up">
            <h2 className="text-3xl md:text-5xl font-serif">Have a vision for your space?</h2>
            <p className="text-foreground/60 max-w-xl mx-auto">
              Our designers and craftsmen are ready to bring your ideas to life with unparalleled quality.
            </p>
            <Link 
              href="/contact" 
              className="inline-block px-12 py-5 bg-foreground text-background rounded-2xl font-bold uppercase tracking-widest hover:bg-primary transition-all duration-300 transform hover:scale-105"
            >
              Start a Project
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PortfolioPage;
