"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Heading from "@/components/Heading";

// --- Data moved outside the component to prevent re-creation on re-renders ---
const destinations = [
    { name: "India", packages: "47 Trips Packages", image: "/india.jpg" },
    { name: "Italy", packages: "18 Trips Packages", image: "/italy.jpg" },
    { name: "Greece", packages: "11 Trips Packages", image: "/greece.jpg" },
    { name: "Portugal", packages: "14 Trips Packages", image: "/portugal.jpg" },
    { name: "Japan", packages: "10 Trips Packages", image: "/japan.jpg" },
    { name: "Peru", packages: "15 Trips Packages", image: "/maldive.jpg" },
    { name: "South Africa", packages: "14 Trips Packages", image: "/peru.jpg" },
    { name: "Europe", packages: "104 Trips Packages", image: "/europe.jpg" },
];

// --- Step 1: Create a dedicated, stateful DestinationCard component ---

const DestinationCard = ({ destination }) => {
    // Each card now manages its own loading state
    const [isLoading, setIsLoading] = useState(true);

    return (
        <Link
            href={`/destinations/${destination.name.toLowerCase()}`}
            className="group relative h-64 block overflow-hidden rounded-2xl"
        >
            <Image
                src={destination.image}
                alt={destination.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                // This is the core of the skeleton effect
                className={`
                    "object-cover filter grayscale transition-all duration-700 ease-in-out group-hover:grayscale-0 group-hover:brightness-110"
                 ${isLoading
                        ? "blur-xl scale-110"
                        : "blur-0 scale-100"}
                `}
                // When the image finishes loading, update the state
                onLoad={() => setIsLoading(false)}
            />

            {/* Content overlays */}
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="transform text-3xl font-bold uppercase text-white boucher mb-2 transition-all duration-300 group-hover:translate-y-[-4px]">
                    {destination.name}
                </h3>
                <div className="inline-flex">
                    <span className="rounded-full border border-black bg-white px-3 py-1 text-sm text-black sofia backdrop-blur-sm transition-all duration-300 group-hover:bg-primary">
                        {destination.packages}
                    </span>
                </div>
            </div>
        </Link>
    );
};


// --- Step 2: The Main ChromaGrid component is now much cleaner ---

const ChromaGrid = () => {
    return (
        <div className="relative min-h-screen bg-black">
            <div className="relative z-20 mx-auto max-w-7xl px-4">
                <Heading title={"Where to next?"} tag={"Explore Destinations Country"} />

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {destinations.map((dest) => (
                        <DestinationCard key={dest.name} destination={dest} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ChromaGrid;