// src/components/DestinationsCarousel.jsx
import React from 'react';
// Swiper ke zaroori modules import karein
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

// Swiper ki CSS import karein
import 'swiper/css';
import 'swiper/css/pagination';

import DestinationCard from './DestinationCard';

// Sample Data (bilkul video jaisa)
const destinationsData = [
    {
        image: '/italy.jpg',
        tags: ['Night on board', '3D - Cairo Aswan', '3D - Yogyakarta'],
        country: 'Italy',
        duration: '9 Days - 7 Night',
        title: 'Cairo to Nile Cruise',
        rating: 4.4,
        reviews: '293',
        price: 3896,
    },
    {
        image: '/indonesia.jpg',
        tags: ['Night on board', '3D - Jakarta', '3D - Yogyakarta'],
        country: 'Indonesia',
        duration: '17 Days - 14 Night',
        title: 'Bali & Java',
        rating: 4.8,
        reviews: '4.2k',
        price: 8996,
    },
    {
        image: '/turkey.jpg',
        tags: ['Night on board', '3D - Istanbul', '3D - Yogyakarta'],
        country: 'Turkey',
        duration: '6 Days - 5 Night',
        title: 'Blue Mosque',
        rating: 4.6,
        reviews: '563',
        price: 4996,
    },
    {
        image: '/maldive.jpg',
        tags: ['Night on board', '3D - Maldives', '3D - Yogyakarta'],
        country: 'Maldives',
        duration: '5 Days - 4 Night',
        title: 'Maldives Huruval',
        rating: 4.9,
        reviews: '6.9k',
        price: 9587,
    },
    {
        image: '/korea.jpg',
        tags: ['Night on board', '3D - Seoul', '3D - Yogyakarta'],
        country: 'South Korea',
        duration: '11 Days - 8 Night',
        title: 'Korea Uncovered',
        rating: 3.9,
        reviews: '2k',
        price: 7679,
    },
    {
        image: '/india.jpg',
        tags: ['Night on board', '3D - Cairo Aswan', '3D - Yogyakarta'],
        country: 'Egypt',
        duration: '9 Days - 7 Night',
        title: 'Cairo to Nile Cruise',
        rating: 4.4,
        reviews: '293',
        price: 3896,
    },
    {
        image: '/indonesia.jpg',
        tags: ['Night on board', '3D - Jakarta', '3D - Yogyakarta'],
        country: 'Indonesia',
        duration: '17 Days - 14 Night',
        title: 'Bali & Java',
        rating: 4.8,
        reviews: '4.2k',
        price: 8996,
    },
    {
        image: '/turkey.jpg',
        tags: ['Night on board', '3D - Istanbul', '3D - Yogyakarta'],
        country: 'Turkey',
        duration: '6 Days - 5 Night',
        title: 'Blue Mosque',
        rating: 4.6,
        reviews: '563',
        price: 4996,
    }
];

export default function CardSlider() {
    return (
        <div className="bg-black py-16">


            <div className="container max-md:px-4 mx-auto">
                <h2 className="text-3xl font-bold text-center mb-2 text-primary">
                    All Inclusive tour packages.
                </h2>
                <p className="text-center text-white mb-10">
                    Travel from anywhere in India or worldwide. Pick a tour that fits
                    you — starting right from your city.
                </p>
                <Swiper
                    modules={[Pagination]}
                    // Responsive breakpoints
                    breakpoints={{
                        // Mobile
                        320: {
                            slidesPerView: 1.1,
                            spaceBetween: 15,
                        },
                        // Tablet
                        768: {
                            slidesPerView: 2.5,
                            spaceBetween: 20,
                        },
                        // Desktop
                        1024: {
                            slidesPerView: 3.5,
                            spaceBetween: 30,
                        },

                    }}
                    pagination={{
                        el: '.swiper-pagination-custom',
                        clickable: true,
                    }}
                    className="pb-12" // Pagination ke liye neeche space
                >
                    {destinationsData.map((destination, index) => (
                        <SwiperSlide key={index}>
                            <DestinationCard {...destination} />
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Custom Pagination container */}
                <div className="swiper-pagination-custom text-center mt-8"></div>
            </div>
        </div>
    );
}