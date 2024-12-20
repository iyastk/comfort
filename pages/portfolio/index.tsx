// components/PortfolioGrid.js
import React, { useEffect } from "react";
import ImageGallery from "@/components/imageGallary";
import Sidebar from "@/components/sidebar";
import { useServiceContext } from "@/store/serviceContext";

const PortfolioPage = () => {
  const { selectedImages } = useServiceContext();
  console.log("from-------------");
  console.log(selectedImages);
  useEffect(() => {
    console.log("Selected Images:", selectedImages);
  }, [selectedImages]);

  return (
    <div className="container mx-auto p-6 flex">
      <Sidebar />
      <ImageGallery selectedImages={selectedImages} />
    </div>
  );
};

export default PortfolioPage;
