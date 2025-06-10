import React from "react";
// import video from '../../../app/assets/video.mp4';
const VedioSec = () => {
  const data = [
    "Choose from our collection of luxury hotels",
    "Personalize your daycay and book in peace: our offers have free cancellation",
    "Pay at the hotel and enjoy your day",
  ];
  return (
    <div className="p-3">
      <div className="container  mx-auto rounded-2xl bg-gradient-to-b md:bg-gradient-to-r from-primary via-primary to-lightGray flex max-md:flex-col gap-6 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Heading */}
        <div className="md:w-1/2 text-white">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl max-md:text-center font-bold  mb-8 sm:mb-12 lg:mb-16">
            Book a hotel during the day in three steps
          </h1>

          <div className="flex flex-col gap-4">
            {data.map((item, index) => (
              <div
                key={index}
                className="flex gap-5 items-center font-bold text-xl"
              >
                <div className="w-8 h-8 flex  justify-center items-center border border-white rounded-full ">
                  {index + 1}
                </div>
                <p className="flex-1">{item}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="md:w-1/2 ">
          {/* <video className='rounded-2xl' muted loop autoPlay src={video}></video> */}
        </div>
      </div>
    </div>
  );
};

export default VedioSec;
