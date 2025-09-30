// src/components/TestimonialsCarousel.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

// Swiper ki zaroori CSS files
import 'swiper/css';
import 'swiper/css/pagination';
// import "./testimonials.css"

import TestimonialCard from './components/TestimonialCard';
import Heading from '@/components/Heading';

// Sample Data
const testimonialsData = [
    {
        image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=2940&auto=format&fit=crop',
        rating: 4.6,
        location: 'Maldives',
        duration: '8 Days - 7 Night',
        quote: 'Travio made travel planning effortless. Book dream trip in minutes!',
        userName: 'Riya Patel',
        userLocation: 'Bangalore',
        userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2787&auto=format&fit=crop',
    },
    {
        image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=3128&auto=format&fit=crop',
        rating: 4.6,
        location: 'Maldives',
        duration: '8 Days - 7 Night',
        quote: 'Planning our Maldives was great, fast and met our needs perfectly.',
        userName: 'Vikram',
        userLocation: 'Delhi, India',
        userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2787&auto=format&fit=crop',
    },
    {
        image: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=2940&auto=format&fit=crop',
        rating: 4.6,
        location: 'Indonesia',
        duration: '17 Days - 14 Night',
        quote: 'Planning my Bali trip with Travio was a breeze. Bookings and great tips!',
        userName: 'Priya Shah',
        userLocation: 'Mumbai',
        userAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2861&auto=format&fit=crop',
    },
    {
        image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=3087&auto=format&fit=crop',
        rating: 4.6,
        location: 'Dubai',
        duration: '7 Days - 6 Night',
        quote: 'Exploring options for Dubai was simple. They were personal and helpful.',
        userName: 'Ahmed K.',
        userLocation: 'Dubai',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2787&auto=format&fit=crop',
    },
    {
        image: 'https://images.unsplash.com/photo-1540914214949-80811a43c490?q=80&w=2940&auto=format&fit=crop',
        rating: 4.8,
        location: 'Greece',
        duration: '10 Days - 9 Night',
        quote: 'Absolutely stunning views and perfectly organized. Highly recommend!',
        userName: 'Sophia',
        userLocation: 'Athens',
        userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2788&auto=format&fit=crop',
    },
];

export default function Testimonials() {
    return (
        <section className="bg-black py-20">
            <Heading title={"Words from Our Adventurers"} subtitle={"See what our travelers have to say about their journeys with Travio."} />
            <div className="w-screen-lg mx-auto">
                <Swiper
                    modules={[Pagination]}
                    // Responsive breakpoints
                    breakpoints={{
                        320: { slidesPerView: 1.1 },
                        768: { slidesPerView: 2.2 },
                        1024: { slidesPerView: 3.2 },
                        1440: { slidesPerView: 4 }
                    }}
                    pagination={{
                        el: '.swiper-pagination-custom',
                        clickable: true,
                    }}
                    className="pb-16" // Pagination ke liye neeche space
                >
                    {testimonialsData.map((testimonial, index) => (
                        <SwiperSlide key={index} className="h-auto">
                            <TestimonialCard idx={index} {...testimonial} />
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Custom Pagination container */}
                <div className="swiper-pagination-custom text-center"></div>
            </div>
        </section>
    );
}