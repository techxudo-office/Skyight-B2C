// src/components/DestinationCard.jsx
import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function DestinationCard({
    image,
    tags,
    country,
    duration,
    title,
    rating,
    reviews,
    price
}) {
    return (
        <div className="bg-[#121212] rounded-2xl overflow-hidden flex flex-col group">
            {/* Image Section */}
            <div className="relative">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    {tags.map((tag, index) => (
                        <span key={index} className="bg-black/50 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Content Section */}
            <div className="p-5 flex flex-col flex-grow">
                <p className="text-gray-400 text-sm mb-1">{country} • {duration}</p>
                <h3 className="text-white text-xl font-semibold mb-3">{title}</h3>

                <div className="flex items-center gap-2 mb-6">
                    <span className="bg-green-500/20 text-green-400 font-bold text-sm px-2 py-1 rounded-md">{rating}</span>
                    <span className="text-gray-300">Wonderful</span>
                    <span className="text-gray-400 text-sm">({reviews} reviews)</span>
                </div>

                {/* Spacer to push price and button to bottom */}
                <div className="flex-grow" />

                <div className="flex justify-between items-end">
                    <div>
                        <span className="text-white text-2xl font-bold">${price.toLocaleString()}</span>
                        <span className="text-gray-400"> / per person</span>
                    </div>
                </div>

                <button className="
            mt-5 w-full text-white border border-gray-600 rounded-full py-3 px-6 
            flex justify-between items-center
            transition-colors duration-300 hover:bg-white hover:text-black
        ">
                    <span>Request Callback</span>
                    <ArrowRight size={20} />
                </button>
            </div>
        </div>
    );
}