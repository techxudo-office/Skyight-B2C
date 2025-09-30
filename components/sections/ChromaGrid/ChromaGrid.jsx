"use client";
import React, { useState } from "react";
import Image from "next/image";
import Heading from "@/components/Heading";

const ChromaGrid = () => {
    const destinations = [
        {
            name: "India",
            packages: "47 Trips Packages",
            image: "/india.jpg",
        },
        {
            name: "Italy",
            packages: "18 Trips Packages",
            image: "/italy.jpg",
        },
        {
            name: "Greece",
            packages: "11 Trips Packages",
            image: "/greece.jpg",
        },
        {
            name: "Portugal",
            packages: "14 Trips Packages",
            image: "/portugal.jpg",
        },
        {
            name: "Japan",
            packages: "10 Trips Packages",
            image: "/japan.jpg",
        },
        {
            name: "Peru",
            packages: "15 Trips Packages",
            image: "/maldive.jpg",
        },
        {
            name: "South Africa",
            packages: "14 Trips Packages",
            image: "/peru.jpg",
        },
        {
            name: "Europe",
            packages: "104 Trips Packages",
            image: "/europe.jpg",
        },
    ];

    // The default background image to show initially and on mouse leave
    const defaultBackgroundImage = "/4.jpg";

    // State to track the currently active background image
    const [activeBg, setActiveBg] = useState(defaultBackgroundImage);

    // Get a list of unique background images to prevent duplicate rendering
    const uniqueImages = [
        ...new Set([defaultBackgroundImage, ...destinations.map((d) => d.image)]),
    ];

    return (
        <div
            className="relative min-h-screen bg-black" // Fallback background
        >
            {/* Background Images Container */}
            <div className="absolute inset-0 z-0">
                {uniqueImages.map((img) => (
                    <div
                        key={img}
                        className="absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-in-out"
                    // style={{
                    //     backgroundImage: `url(${img})`,
                    //     opacity: activeBg === img ? 1 : 0, // Show only the active image
                    // }}
                    />
                ))}
            </div>

            {/* Gradient Overlay for Readability */}
            <div
                className="absolute inset-0 bg-black/50 z-10"
                style={{
                    backgroundImage: ` linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.1))`,
                }}
            />

            {/* Content Container */}
            <div className="relative z-20 max-w-7xl mx-auto px-4 py-20">
                {/* Header */}
                <Heading title={"Where to next?"} tag={"Explore Destinations Country"} />

                {/* Destinations Grid */}
                <div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    // Reset to default background when mouse leaves the entire grid area
                    onMouseLeave={() => setActiveBg(defaultBackgroundImage)}
                >
                    {destinations.map((destination, index) => (
                        <div
                            key={index}
                            className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer"
                            // Set the active background on hover
                            onMouseEnter={() => setActiveBg(destination.image)}
                        >
                            {/* Card Background Image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-all duration-500 filter grayscale group-hover:grayscale-0 group-hover:brightness-110"
                                style={{ backgroundImage: `url(${destination.image})` }}
                            />

                            {/* Card Dark Overlay */}
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500" />

                            {/* Card Content */}
                            <div className="absolute inset-0 flex flex-col justify-end p-6">
                                <h3 className="text-white boucher uppercase font-bold text-3xl mb-2 transform transition-all duration-300 group-hover:translate-y-[-4px]">
                                    {destination.name}
                                </h3>
                                <div className="inline-flex">
                                    <span className="bg-white backdrop-blur-sm text-black sofia text-sm px-3 py-1 rounded-full border border-black transition-all duration-300 group-hover:bg-primary">
                                        {destination.packages}
                                    </span>
                                </div>
                            </div>

                            {/* Card Hover Effect Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ChromaGrid;