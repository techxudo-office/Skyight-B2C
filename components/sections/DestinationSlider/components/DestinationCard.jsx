// src/components/DestinationCard.jsx
import React from 'react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

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
        <div className="  overflow-hidden flex flex-col group">
            {/* Image Section */}
            <div className="relative">
                <div className="relative w-full h-56">
                    <Image
                        fill // This tells the image to fill the parent div
                        src={image}
                        alt={title}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"

                        // 2. The height class (h-56) is REMOVED from the Image component.
                        //    Styling classes like object-cover and rounded-2xl should remain.
                        className="rounded-2xl object-cover transition-transform duration-300"
                    />
                </div>
                <div className="border-[1px] mt-1.5 rounded-lg relative border-gray-600  ">
                    {/* <div className='absolute z-10 inset-0 rounded-lg bg-gradient-to-r from-transparent via-transparent to-black/50'></div> */}
                    <div className='flex relative z-0 items-center justify-center gap-2 animate-slide w-fit'>

                        {tags.map((tag, index) => (
                            <span key={index} className=" whitespace-nowrap  text-white text-xs px-2 py-1  ">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="py-5 flex flex-col flex-grow">
                <p className="text-gray-400 text-sm mb-1">{country} • {duration}</p>
                <h3 className="text-white text-xl font-semibold mb-3">{title}</h3>

                <div className="flex items-center gap-2 mb-6">
                    <span className="bg-primary/30 text-primary font-bold text-sm px-2 py-1 rounded-md">{rating}</span>
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