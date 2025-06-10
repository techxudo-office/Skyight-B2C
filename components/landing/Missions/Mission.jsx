import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import './style.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';


// import required modules
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { AnimateTitle } from '../component';

export default function Mission() {
    const featuresData = [
        {
            id: 1,
            category: "SEARCH AND COMPARE",
            title: "Find Your Perfect Flight",
            description: "Search for flights by various parameters like departure and arrival dates",
            icon: "🔍",
            bgImage: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80"
        },
        {
            id: 2,
            category: "CUSTOMER REVIEWS",
            title: "Verified Experiences",
            description: "Read genuine customer reviews and ratings to make informed decisions",
            icon: "⭐",
            bgImage: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
        },
        {
            id: 3,
            category: "ONLINE CHECK-IN",
            title: "Digital Convenience",
            description: "Manage your bookings with easy online check-in and seat selection",
            icon: "📱",
            bgImage: "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
        },
        {
            id: 4,
            category: "MULTI-CITY ROUTES",
            title: "Complex Itineraries",
            description: "Book sophisticated routes involving multiple cities and stopovers",
            icon: "🌍",
            bgImage: "https://images.unsplash.com/photo-1500835556837-99ac94a94552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
        },
        {
            id: 5,
            category: "FLIGHT TRACKING",
            title: "Real-Time Updates",
            description: "Receive instant notifications about delays and schedule changes",
            icon: "🛰️",
            bgImage: "https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
        },
        {
            id: 6,
            category: "BEST VALUE",
            title: "Price Assurance",
            description: "Guaranteed best prices with our price match policy",
            icon: "💰",
            bgImage: "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
        }
    ];
    return (
        <section className='py-16 bg-center bg-cover ' style={{ backgroundImage: `url("https://ex-coders.com/html/turmet/assets/img/testimonial/testimonial-bg.jpg")` }} >
            <div className='container mx-auto' >
                <AnimateTitle title={"We Provide The Best"} text={" Embrace an adventure with our affordable flights to popular destinations"} />
                <Swiper

                    effect={'coverflow'}
                    slidesPerView={3}
                    loop={true}
                    grabCursor={true}
                    speed={1600}
                    centeredSlides={true}
                    autoplay={{
                        delay: 2400,   // 3 second delay between slides
                        disableOnInteraction: false,
                    }}
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    // pagination={true}
                    modules={[EffectCoverflow, Pagination, Autoplay]}
                    breakpoints={{
                        // when window width is >= 320px
                        200: {
                            slidesPerView: 1,
                        },
                        // when window width is >= 768px
                        768: {
                            slidesPerView: 2,
                        },
                        // when window width is >= 1024px
                        1024: {
                            slidesPerView: 3,
                        }
                    }}
                    style={{
                        padding: ' 30px 0px',
                    }}
                >{
                        featuresData.map((feature) => (

                            <SwiperSlide className=' group overflow-hidden'>
                                <img src={feature.bgImage} className='absolute inset-0 h-full w-full object-cover' />
                                <div className='translate-y-full group-hover:translate-y-0 transition-all duration-500 ease-in-out relative h-full max-md:translate-y-0  '>
                                    <div className="relative z-10 h-72 flex flex-col justify-center items-center text-white text-center p-6">
                                        <motion.h3
                                            initial={{ y: 20, opacity: 0 }}
                                            whileInView={{ y: 0, opacity: 1 }}
                                            transition={{ duration: 0.6, ease: [0.16, 0.77, 0.47, 0.97], delay: 0.3 }}
                                            className="text-xl font-semibold mb-2">{feature.category}</motion.h3>
                                        <motion.h2
                                            initial={{ y: 20, opacity: 0 }}
                                            whileInView={{ y: 0, opacity: 1 }}
                                            transition={{ duration: 0.6, ease: [0.16, 0.77, 0.47, 0.97], delay: 0.5 }}
                                            className="text-2xl font-bold mb-4">{feature.title}</motion.h2>
                                        <motion.p
                                            initial={{ y: 20, opacity: 0 }}
                                            whileInView={{ y: 0, opacity: 1 }}
                                            transition={{ duration: 0.6, ease: [0.16, 0.77, 0.47, 0.97], delay: 0.7 }}
                                            className="text-gray-200 mb-6">{feature.description}</motion.p>
                                    </div>
                                    <div className='absolute inset-0 bg-black/20 z-0 border-t-2 border-white '>
                                        <div></div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </section>

    );
}
