import Sidebar from "@/components/sidebar";
import React from "react";
// import Light from "../public/images/hang-light.png";
import Scanner from "../public/whatsapp contact.jpg";
import ContactCard from "@/components/contactCard";
import Image from "next/image";

const contact = () => {
  return (
    <div className="container mx-auto  flex">
      <Sidebar></Sidebar>
      <div className="w-full bg-slate-100  ">
        <div className=" sticky top-0 bg-slate-100 flex items-center justify-between gap-4 p-6 ">
          <div className="flex items-center justify-center">
            <div className="text-6xl">☎️</div>
            <div className="text-3xl ">CONTACT US</div>
          </div>
          <div className="flex flex-col gap-1 text-right">
            <div className="text-md justify-self-end"> 7501684151 📞</div>
            <div className="text-md justify-self-end">
              P.O. BOX 391804, Dubai - UAE 📍
            </div>
          </div>

          {/* <Image src={Pillow} width={70} alt="pillow2" /> */}
        </div>
        <div className="flex  mx-6 rounded bg-white justify-between">
          <div className=" flex flex-col gap-4 justify-center items-center w-full">
            <ContactCard
              name={"Shafi Muhammed"}
              role={"Business Development Manager"}
              email={"shafi@comfortplus.com"}
              image={"👨🏻"}
            ></ContactCard>
            <ContactCard
              name={"Najeeb"}
              role={"Administrator"}
              email={"Najeeb@comfortplus.com"}
              image={"👨🏻"}
            ></ContactCard>
          </div>
          <Image src={Scanner} width={350} alt="Whatsapp scanner" />
        </div>
      </div>
    </div>
  );
};

export default contact;
