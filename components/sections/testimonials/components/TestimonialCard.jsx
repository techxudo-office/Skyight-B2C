// src/components/TestimonialCard.jsx
import React from 'react';
import StarRating from './StarRating';

export default function TestimonialCard({
    idx,
    image,
    rating,
    location,
    duration,
    quote,
    userName,
    userLocation,
    userAvatar
}) {
    return (
        <div className={`flex flex-col h-full px-6 ${idx == 0 ? "md:border-r md:border-l" : "md:border-r"} h-full `}>
            {/* Image Section */}
            <div className="relative">
                <img
                    src={image}
                    alt={`Testimonial from ${userName}`}
                    className="w-full h-64 object-cover rounded-2xl "
                />
                <div className="
          absolute bottom-4 left-4 
          bg-green-600 text-white rounded-full 
          flex items-center gap-2 px-3 py-1.5
        ">
                    <span className="font-bold text-sm">{rating.toFixed(1)}</span>
                    <StarRating />
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col flex-grow">
                <p className="text-gray-400 text-sm mb-4">{location} · {duration}</p>

                <p className="text-white text-2xl font-semibold leading-snug mb-6">
                    "{quote}"
                </p>

                {/* Yeh div neeche ke content ko push karega */}
                <div className="flex-grow" />

                <div className="flex items-center gap-4 mt-auto">
                    <img
                        src={userAvatar}
                        alt={userName}
                        className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                        <p className="text-white font-semibold">{userName}</p>
                        <p className="text-gray-400 text-sm">{userLocation}</p>
                    </div>
                </div>
            </div>
        </div >
    );
}