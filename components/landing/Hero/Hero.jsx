import React from "react";
import heroBg from "../../../app/assets/heroBg.svg";
export default function Hero() {
  return (
    <div
      style={{ backgroundImage: `url(${heroBg})` }}
      className="bg-cover bg-no-repeat bg-center "
    >
      <div className="container mx-auto pt-28 flex flex-col-reverse lg:flex-row items-center py-12 justify-between gap-8 lg:gap-20 ">
        {/* Left Text Section */}
        <div className="flex flex-col justify-between items-center text-center gap-6 lg:gap-10 w-full ">
          <div className="">
            <h1
              className="text-4xl max-w-2xl mx-auto  sm:text-5xl md:text-6xl font-sans font-semibold leading-tight mb-6 
                    "
            >
              Wherever You Go,
              <br /> Let Us{" "}
              <span className="font-bold text-primary">Make It Happen</span>
            </h1>
            <p className=" text-base md:text-xl max-w-xl mx-auto  mb-6">
              Take the unique chance to get the most unforgettable experience.
              These are the emotions you will never forget.
            </p>
          </div>

          {/* Search Bar */}
          <div className="w-9/10  grid grid-cols-1 md:grid-cols-3 mx-auto  md:items-center sm:justify-between gap-4 bg-white border rounded-2xl  border-lightGray shadow-2xl ">
            <div className="p-3  ">
              <p className="font-semibold mb-4 w-fit uppercase font-sans">
                {/* <TiLocation className="text-2xl text-white " /> */}
                Destination
              </p>
              <input
                type="text"
                placeholder="Where? City, hotel, airport..."
                className="flex-1 outline-none text-sm  w-full"
              />
            </div>
            <div className="p-3  ">
              <p className="font-semibold mb-4 w-fit uppercase font-sans ">
                {/* <TiLocation className="text-2xl text-white " /> */}
                Data
              </p>
              <input
                type="text"
                placeholder="When it will start."
                className="flex-1 outline-none text-sm  w-full"
              />
            </div>
            <button className="bg-primary h-full max-md:py-5 md:rounded-r-2xl max-md:rounded-b-2xl flex justify-center items-center text-xl font-bold text-white ">
              Lets Explore
            </button>
          </div>
        </div>

        {/* Right Image Section */}
        {/* <div className="w-full lg:w-1/2 flex justify-center md:justify-end">
                <img
                    src="https://dayuse.twic.pics/home/hero-sunrise-brand-desktop.jpg?twic=v1/cover=640/quality=75" // Replace with actual image path
                    alt="Hotel Experience"
                    className="rounded-3xl w-full max-w-md sm:max-w-lg "
                />
            </div> */}
      </div>
    </div>
  );
}
