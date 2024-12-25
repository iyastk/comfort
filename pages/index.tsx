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
import useCheckScreen from "@/components/utils/checkScreen";

// import hangLight from "../public/images/hang-light.png";

// import iconImage from "../public/images/";
export default function Home() {
  const isAboveSm = useCheckScreen();

  return (
    <div className="grid grid-cols-[1fr_20fr_1fr] ">
      <div className=" hidden  sm:flex sm:items-center sm:justify-center  ">
        <p>&nbsp; </p>
      </div>
      <div className="  bg-orange-50	 text-gray-800 min-h-screen">
        {/* Navigation Bar */}
        <header className="flex flex-col items-between justify-center px-8">
          <div className="flex items-center justify-center text-6xl p-4 font-serif text-gray-800 tracking-widest ">
            {/* <Image src={iconImage} alt="icon" width={100} height={100} /> */}
            COMFORT
          </div>
          <div className="flex items-center justify-between">
            <div className=" gap-6 hidden sm:flex">
              <FaLinkedin className="text-2xl " />
              <FaInstagram className="text-2xl " />
            </div>
            <div className="flex gap-2 sm:flex sm:justify-center sm:gap-4">
              <Navigation></Navigation>
            </div>
            <div className=" gap-6 hidden sm:flex">
              <FaWhatsapp className="text-2xl " />
              <FaYoutube className="text-2xl " />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className=" flex flex-col sm:flex   sm:justify-center sm:p-8 sm:relative">
          <div className="  sm:h-screen mt-4 ">
            {/* Video Component */}
            <video
              src="/images/video_7.mp4"
              autoPlay
              loop
              muted
              className=" w-full h-5/6	 object-cover"
            />
          </div>
          <div
            className="hidden  sm:block sm:absolute sm:top-12 sm:right-0 sm:mr-8 sm:w-3/5    sm:bg-black sm:opacity-50  "
            style={isAboveSm ? { height: "75%" } : { height: "0" }}
          ></div>

          <div className="flex p-6 flex-col justify-center text-center sm:absolute sm:top-40 sm:right-60  sm:p-2 sm:flex sm:flex-col sm:justify-center sm:text-center md:text-left md:flex md:flex-col md:justify-center md:items-center">
            <div className=" flex justify-center  sm:mb-4">
              <Image src={pillow1} width={100} alt="pillow1" className="" />
              <Image src={pillow2} width={100} alt="pillow2" />
            </div>

            <h2 className="text-4xl text-gray-800 sm:text-white font-serif mb-4">
              Modern & Innovative
            </h2>
            <h3 className=" text-gray-800 sm:text-stone-200">
              FURNITURE INTERIOR & EXTERIOR
            </h3>
            <p className="text-gray-800 sm:text-stone-200 mb-4">
              We will make your life more comfortable...
            </p>
            <Link href="/portfolio">
              <div className="inline-block px-6 py-2 mt-2 text-lg font-medium text-white bg-teal-900 rounded-full hover:bg-gray-700">
                View More
              </div>
            </Link>
          </div>
        </main>
        <Services></Services>
        <Portfolio></Portfolio>
        <ImageCollage></ImageCollage>
        <InfoSection></InfoSection>
      </div>
      <div className=" hidden sm:rounded-lg  sm:items-center sm:justify-center  sm:block">
        <p>&nbsp; </p>
      </div>
      <Footer></Footer>
    </div>
  );
}
