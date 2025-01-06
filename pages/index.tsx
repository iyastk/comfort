import Link from "next/link";
import Image from "next/image";
import pillow1 from "../public/images/pillow1.png";
import pillow2 from "../public/images/pillow2.png";
import Portfolio from "@/components/portfolio";
import Services from "@/components/services";
import ImageCollage from "@/components/imageCollage";
import InfoSection from "@/components/InfoSection";
import Footer from "@/components/footer";
import Navigation from "@/components/Navigation/mainNavigation";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";

// import hangLight from "../public/images/hang-light.png";

// import iconImage from "../public/images/";
export default function Home() {
  return (
    <div className="grid grid-cols-[1fr_20fr_1fr] ">
      <div className=" hidden  md:flex md:items-center md:justify-center  ">
        <p>&nbsp; </p>
      </div>
      <div className="  bg-orange-50	 text-gray-800 ">
        {/* Navigation Bar */}
        <header className="flex flex-col items-between justify-center px-8">
          <div className="flex items-center justify-center text-6xl p-4 font-serif text-gray-800 tracking-widest ">
            {/* <Image src={iconImage} alt="icon" width={100} height={100} /> */}
            COMFORT
          </div>
          <div className="flex items-center justify-between">
            <div className=" gap-6 hidden md:flex">
              <FaLinkedin className="text-2xl " />
              <FaInstagram className="text-2xl " />
            </div>
            <div className="flex gap-2 md:flex md:justify-center md:gap-4">
              <Navigation></Navigation>
            </div>
            <div className=" gap-6 hidden md:flex">
              <FaWhatsapp className="text-2xl " />
              <FaYoutube className="text-2xl " />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex flex-col h-screen gap-2 md:flex-row md:justify-around md:items-center md:p-8 md:relative">
          {/* Video Section */}
          <div className="mt-4 h-1/2 md:h-full md:flex-1 flex justify-center items-center md:mt-0 ">
            <video
              src="/images/video_4.mp4"
              autoPlay
              loop
              muted
              className="w-full h-full object-cover"
            />
          </div>

          {/* Overlay Section */}
          <div className="flex-1 flex flex-col justify-center text-center h-full bg-black opacity-80  p-6 ">
            <div className="flex justify-center mb-4">
              <Image src={pillow1} width={100} alt="pillow1" />
              <Image src={pillow2} width={100} alt="pillow2" />
            </div>

            <h2 className="text-4xl text-white font-serif mb-4">
              Modern & Innovative
            </h2>
            <h3 className="text-stone-200">FURNITURE INTERIOR & EXTERIOR</h3>
            <p className="text-stone-200 mb-4">
              We will make your life more comfortable...
            </p>
            <Link href="/portfolio">
              <div className="inline-block px-6 py-2 mt-2 text-lg font-medium text-white bg-teal-900 rounded-full hover:bg-gray-700">
                View More
              </div>
            </Link>
          </div>

          {/* Secondary Video Section */}
          <div className="hidden md:flex-1 md:flex md:justify-center md:items-center md:h-full ">
            <video
              src="/images/video_7.mp4"
              autoPlay
              loop
              muted
              className="w-full h-full object-cover"
            />
          </div>
        </main>

        <Services></Services>
        <Portfolio></Portfolio>
        <ImageCollage></ImageCollage>
        <InfoSection></InfoSection>
      </div>
      <div className=" hidden md:rounded-lg  md:items-center md:justify-center  md:block">
        <p>&nbsp; </p>
      </div>
      <Footer></Footer>
    </div>
  );
}
