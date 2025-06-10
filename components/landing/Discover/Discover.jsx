import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from '../component';

const Discover = () => {
    return (
        <section style={{ backgroundImage: `url("https://ex-coders.com/html/turmet/assets/img/testimonial/testimonial-bg.jpg")` }} className='bg-cover bg-center bg-no-repeat'>
            <div className=" container mx-auto max-md:pt-36 py-16 px-4 md:px-24 flex flex-col lg:flex-row items-center gap-12 relative bg-cover">
                {/* Left Side - Images */}



                <div className="relative flex-1 flex flex-wrap justify-center items-center gap-4">
                    <img src="https://ex-coders.com/html/turmet/assets/img/about/plane-shape2.png" alt="Hikers" className="w-56 h-72 absolute top-[-150px] left-[35%] object-contain " />
                    <div className="w-56 h-96 rounded-lg overflow-hidden shadow-lg mt-[-100px] z-10">
                        <img src="https://ex-coders.com/html/turmet/assets/img/about/03.jpg" alt="Hikers" className="w-full h-full object-cover" />
                    </div>


                    <div className="w-48 h-64 rounded-lg overflow-hidden shadow-lg z-10 ">
                        <img src="https://ex-coders.com/html/turmet/assets/img/about/05.jpg" alt="Boat Ride" className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute top-[120px] left-[20px] w-32 h-24 rounded-lg overflow-hidden shadow-md border-4 border-white z-20 ">
                        <img src="https:/ex-coders.com/html/turmet/assets/img/about/04.png" alt="Small pose" className="w-full h-full object-cover" />
                    </div>

                    <div className="absolute top-[200px] left-[150px] bg-white rounded-full p-4 shadow-xl text-center text-teal-600 font-bold text-sm z-20">
                        <div className="text-xl">1992</div>
                        <div>Since In Our Company</div>
                    </div>
                </div>

                {/* Right Side - Text Content */}
                <div className="flex-1 max-w-xl">
                    <p className="text-teal-600 font-semibold mb-2">Get About Us</p>
                    <h2 className="text-4xl font-bold text-gray-900 leading-tight mb-6">
                        We're Strived Only For The Best In The World
                    </h2>
                    <p className="text-gray-600 mb-8">
                        There are many variations of passages of available, but the majority have suffered
                        alteration in some form, by injected humour words which don't look even slightly
                        believable injected humour words which
                    </p>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <CheckCircle className="text-teal-600 w-6 h-6 mt-1" />
                            <div>
                                <h4 className="font-semibold text-lg text-gray-800">Easy Booking System</h4>
                                <p className="text-gray-600">Our hotel also prides itself on offering exceptional services.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <CheckCircle className="text-teal-600 w-6 h-6 mt-1" />
                            <div>
                                <h4 className="font-semibold text-lg text-gray-800">Easy Booking System</h4>
                                <p className="text-gray-600">Our hotel also prides itself on offering exceptional services.</p>
                            </div>
                        </div>
                    </div>


                    <Button className={"mt-4"}>
                        Discover More →
                    </Button>


                </div>
            </div>
        </section>
    );
};

export default Discover;
