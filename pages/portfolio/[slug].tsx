import React from "react";
import Sidebar from "@/components/sidebar";
import { useServiceContext } from "@/store/serviceContext";
import ImageGallery from "@/components/imageGallary";

const SubPage = () => {
  const { selectedImages } = useServiceContext();

  return (
    <div className="container mx-auto p-4 flex bg-slate-100">
      <Sidebar></Sidebar>
      <ImageGallery selectedImages={selectedImages}></ImageGallery>
    </div>
  );
};

export default SubPage;
