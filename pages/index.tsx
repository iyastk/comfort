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
// import hangLight from "../public/images/hang-light.png";

// import iconImage from "../public/images/";
export default function Home() {
  return (
    <div className="grid grid-cols-[1fr_20fr_1fr] ">
      <div className=" bg-[]  flex items-center justify-center">
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
            <div className="flex gap-6">
              <svg
                width="25"
                height="25"
                viewBox="0 0 24 25"
                fill="#343C54"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2.53906C17.5229 2.53906 22 7.01621 22 12.5391C22 17.5304 18.3431 21.6674 13.5625 22.4176V15.4297H15.8926L16.3359 12.5391L13.5625 12.5387V10.6632C13.5625 10.657 13.5625 10.6509 13.5626 10.6447C13.5626 10.6354 13.5628 10.6262 13.5629 10.6169C13.578 9.84259 13.9742 9.10156 15.1921 9.10156H16.4531V6.64062C16.4531 6.64062 15.3087 6.44492 14.2146 6.44492C11.966 6.44492 10.4842 7.78652 10.4386 10.2193C10.4379 10.2578 10.4375 10.2965 10.4375 10.3355V12.5387H7.89844V15.4293L10.4375 15.4297V22.4172C5.65686 21.667 2 17.5304 2 12.5391C2 7.01621 6.47715 2.53906 12 2.53906Z"
                  fill="#343C54"
                />
              </svg>
              <svg
                width="25"
                height="25"
                viewBox="0 0 24 24"
                fill="#343C54"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.22581 20.1937C15.8387 20.1937 19.9677 13.9034 19.9677 8.4518C19.9677 8.32277 19.9677 8.09696 19.9355 7.90341C20.7419 7.32277 21.4516 6.58083 22 5.77438C21.2258 6.12922 20.4516 6.32277 19.6452 6.41954C20.5161 5.90341 21.1613 5.09696 21.4516 4.12922C20.6452 4.58083 19.8065 4.93567 18.8065 5.12922C18.0323 4.32277 17 3.80664 15.8065 3.80664C13.5161 3.80664 11.6452 5.67761 11.6452 7.96793C11.6452 8.29051 11.6774 8.61309 11.7419 8.93567C8.41935 8.70986 5.3871 7.0647 3.32258 4.58083C2.96774 5.22599 2.77419 5.90341 2.77419 6.64535C2.77419 8.09696 3.51613 9.32277 4.64516 10.0647C3.96774 10.0324 3.32258 9.8389 2.77419 9.54857C2.77419 9.58083 2.77419 9.58083 2.77419 9.58083C2.77419 11.5486 4.19355 13.2583 6.06452 13.6453C5.70968 13.7421 5.32258 13.7744 5.03226 13.7744C4.77419 13.7744 4.48387 13.7421 4.25806 13.6776C4.80645 15.3228 6.32258 16.5163 8.12903 16.5486C6.70968 17.6453 4.93548 18.3228 3.03226 18.3228C2.64516 18.3873 2.32258 18.3228 2 18.2905C3.74194 19.5163 5.90323 20.1937 8.22581 20.1937Z"
                  fill="#343C54"
                />
              </svg>
              <svg
                width="25"
                height="25"
                viewBox="0 0 24 24"
                fill="#343C54"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.7065 3H4.34844C3.62264 3 3.04199 3.58065 3.04199 4.30645V19.6935C3.04199 20.3903 3.62264 21 4.34844 21H19.6485C20.3743 21 20.9549 20.4194 20.9549 19.6935V4.27742C21.013 3.58065 20.4323 3 19.7065 3ZM8.35491 18.3H5.71297V9.73548H8.35491V18.3ZM7.01942 8.54516C6.14846 8.54516 5.4807 7.84839 5.4807 7.00645C5.4807 6.16452 6.17749 5.46774 7.01942 5.46774C7.86136 5.46774 8.55813 6.16452 8.55813 7.00645C8.55813 7.84839 7.91942 8.54516 7.01942 8.54516ZM18.371 18.3H15.7291V14.1484C15.7291 13.1613 15.7001 11.8548 14.3356 11.8548C12.942 11.8548 12.7388 12.9581 12.7388 14.0613V18.3H10.0968V9.73548H12.6807V10.9258H12.7097C13.0872 10.229 13.9291 9.53226 15.2356 9.53226C17.9356 9.53226 18.4291 11.2742 18.4291 13.6548V18.3H18.371Z"
                  fill="#343C54"
                />
              </svg>
            </div>
            <nav className="space-x-8 text-gray-600">
              <Navigation></Navigation>
            </nav>
            <div className="flex gap-6">
              <svg
                width="25"
                height="25"
                viewBox="0 0 24 25"
                fill="#343C54"
                xmlns="http://www.w3.org/2000/svg"
                transform="rotate(90 0 0)"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M11.25 2.75C6.14154 2.75 2 6.89029 2 11.998C2 17.1056 6.14154 21.2459 11.25 21.2459C13.5335 21.2459 15.6238 20.4187 17.2373 19.0475L20.7182 22.5287C21.011 22.8216 21.4859 22.8217 21.7788 22.5288C22.0717 22.2359 22.0718 21.761 21.7789 21.4681L18.2983 17.9872C19.6714 16.3736 20.5 14.2826 20.5 11.998C20.5 6.89029 16.3585 2.75 11.25 2.75ZM3.5 11.998C3.5 7.71905 6.96962 4.25 11.25 4.25C15.5304 4.25 19 7.71905 19 11.998C19 16.2769 15.5304 19.7459 11.25 19.7459C6.96962 19.7459 3.5 16.2769 3.5 11.998Z"
                  fill="#343C54"
                />
              </svg>
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 24"
                fill="#343C54"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.5625 6C3.5625 5.58579 3.89829 5.25 4.3125 5.25H20.3125C20.7267 5.25 21.0625 5.58579 21.0625 6C21.0625 6.41421 20.7267 6.75 20.3125 6.75L4.3125 6.75C3.89829 6.75 3.5625 6.41422 3.5625 6Z"
                  fill="#343C54"
                />
                <path
                  d="M3.5625 18C3.5625 17.5858 3.89829 17.25 4.3125 17.25L20.3125 17.25C20.7267 17.25 21.0625 17.5858 21.0625 18C21.0625 18.4142 20.7267 18.75 20.3125 18.75L4.3125 18.75C3.89829 18.75 3.5625 18.4142 3.5625 18Z"
                  fill="#343C54"
                />
                <path
                  d="M4.3125 11.25C3.89829 11.25 3.5625 11.5858 3.5625 12C3.5625 12.4142 3.89829 12.75 4.3125 12.75L20.3125 12.75C20.7267 12.75 21.0625 12.4142 21.0625 12C21.0625 11.5858 20.7267 11.25 20.3125 11.25L4.3125 11.25Z"
                  fill="#343C54"
                />
              </svg>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex flex-wrap justify-center p-8 relative">
          <div className="w-full h-screen  ">
            {/* Video Component */}
            <video
              src="/images/video_7.mp4" // Replace with the actual path of your video in the public folder
              autoPlay
              loop
              muted
              className=" w-full h-5/6	 object-cover"
            />
          </div>
          <div
            className="absolute top-[39] right-0 mr-8 w-3/5   bg-black opacity-50  "
            style={{ height: "76%" }}
          ></div>

          <div className="absolute top-40 left-60  w-full  p-2 flex flex-col justify-center text-center md:text-left md:flex md:flex-col md:justify-center md:items-center">
            <div className=" flex mb-4">
              <Image src={pillow1} width={100} alt="pillow1" className="" />
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
        </main>
        <Services></Services>
        <Portfolio></Portfolio>
        <ImageCollage></ImageCollage>
        <InfoSection></InfoSection>
      </div>
      <div className="  rounded-lg flex items-center justify-center">
        <p>&nbsp; </p>
      </div>
      <Footer></Footer>
    </div>
  );
}
