import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Carousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const carouselData = [
        {
            title: "Our Activities in Netherlands",
            text: "From our Dutch roots to global sites, we're proud to extend our flight services worldwide from the heart of the NetherlandsFrom our Dutch roots to global sites, we're proud to extend our flight services worldwide from the heart of the Netherlands",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAzHeZ9YsdC0EKMr_KlJN9Rt9JeuPOb1uU0g&s"
        },
        {
            title: "Our Activities ",
            text: "From our Dutch roots to global sites, we're proud to extend our flight services worldwide from the heart of the Netherlands From our Dutch roots to global sites, we're proud to extend our flight services worldwide from the heart of the Netherlands",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAxnHwKtqA4D4CEiTfwnNBoubEBjngvmvUFYH2tIk-tdPaXnLH3ZkAj1q8-KtRmccJasQ&usqp=CAU"
        },
        {
            title: " in Netherlands",
            text: "From our Dutch roots to global sites, we're proud to extend our flight services worldwide from the heart of the Netherlands From our Dutch roots to global sites, we're proud to extend our flight services worldwide from the heart of the Netherlands",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3PRNH613Ub7obt_5CvBypnD4CRW_QYxg2imbu-R4iTuYqx-rXFrNhPiZvIJvmIMgF6GA&usqp=CAU"
        },
        // Add more slides as needed
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % carouselData.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + carouselData.length) % carouselData.length);
    };

    return (
        <div className="container mx-auto px-4 py-16 relative">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-bold text-text mb-4">
                    Our Travel Journey
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Embrace an adventure with our affordable flights to popular destinations
                </p>
            </div>
            <div className="flex flex-col md:flex-row gap-8">
                {/* Text Content */}
                <div className="md:w-1/2 z-10 ">
                    <img className='w-full h-[400px] object-cover rounded-3xl shadow-3xl' src={carouselData[currentSlide].img} alt="" />

                </div>

                {/* Carousel */}
                <div className="md:w-1/2 ">
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.3 }}
                            className="relative"
                        >
                            <h2 className="text-4xl font-bold text-gray-800">
                                {carouselData[currentSlide].title}
                            </h2>
                            <p className="text-gray-600 text-lg mt-3">
                                {carouselData[currentSlide].text}
                            </p>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className=" flex gap-2 mt-10">
                        <button
                            onClick={prevSlide}
                            className="p-2 bg-secondary rounded-full shadow-lg hover:bg-primary transition-colors cursor-pointer"
                            aria-label="Previous slide"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={nextSlide}
                            className="p-2 bg-secondary rounded-full shadow-lg hover:bg-primary transition-colors cursor-pointer"
                            aria-label="Next slide"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Additional Text */}
            {/* <div className="mt-8 text-gray-600 max-w-2xl">
                <p>
                    As we soar globally, our operations in the Netherlands remain the
                    heartbeat of our journey. From our Dutch origins, we've extended our wings,
                    establishing a reputable flight network that spans continents. Yet, amidst
                    this expansive growth, we stay true to our core values and commitment to
                    quality, ensuring that every flight, no matter the destination, carries a
                </p>
            </div> */}
        </div>
    );
};

export default Carousel;