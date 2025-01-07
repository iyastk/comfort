import React from "react";
// import Light from "../public/images/hang-light.png";
import Scanner from "../public/whatsapp contact.jpg";
import ContactCard from "@/components/contactCard";
import Image from "next/image";
import useCheckScreen from "@/components/utils/checkScreen";
import Sidebar from "@/components/sidebar";

const Contact = () => {
  const isAboveMd = useCheckScreen();

  return (
    <div className="container mx-auto  flex bg-slate-100 font-serif">
      {isAboveMd ? <Sidebar></Sidebar> : <></>}
      <div className="w-full bg-slate-100 text-black  ">
        <div className=" sticky top-0 bg-slate-100 flex items-center justify-between gap-4 p-6 ">
          <div className="flex items-center justify-center">
            <div className="text-3xl md:text-6xl">☎️</div>
            <div className="text-xl text-black  md:text-3xl ">CONTACT US</div>
          </div>
          <div className="flex flex-col gap-1 text-right">
            <div className="text-sm text md:text-md justify-self-end">
              {" "}
              07501684151 📞
            </div>
            <div className="text-sm md:text-md justify-self-end">
              Dubai - UAE 📍
            </div>
          </div>

          {/* <Image src={Pillow} width={70} alt="pillow2" /> */}
        </div>
        <div className="flex flex-col md:flex-row  rounded bg-slate-100 md:justify-between">
          <div className=" flex flex-col gap-4 p-2 md:p-0 justify-center items-center w-full">
            <ContactCard
              name={"Shafi Muhammed"}
              role={"Business Development Manager"}
              email={"shafi@comfortsplus.com"}
              image={"👨🏻"}
            ></ContactCard>
            <ContactCard
              name={"Najeeb"}
              role={"Administrator"}
              email={"Najeeb@comfortsplus.com"}
              image={"👨🏻"}
            ></ContactCard>
          </div>
          <div>
            <Image
              src={Scanner}
              alt="Whatsapp scanner"
              className="w-full md:w-96"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
