"use client";


import { Phone } from "lucide-react";

import CardSlider from "@/components/sections/DestinationSlider/CardSlider";

import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import TeamSection from "@/components/sections/TeamSection/TeamSection";
import TopDestinations from "@/components/sections/TopDestinations/TopDestinations";
import Testimonials from "@/components/sections/testimonials/Testimonials";
import ChromaGrid from "@/components/sections/ChromaGrid/ChromaGrid";
import FaqSection from "@/components/sections/FaqSection/FaqSection";
import ContactUs from "@/components/sections/ContactUs/ContactUs";
import WhyChooseSkyight from "@/components/sections/WhyChooseSkyight/WhyChooseSkyight";

export default function HomePage() {
  const images = [
    "/mumbai.jpg",
    "/goa.jpg",
    "/greece.jpg"
  ]
  const [imgIdx, setImgIdx] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setImgIdx((prev) => {
        if (prev < images.length - 1) {
          return prev + 1
        } else {
          return 0
        }
      })
    }, 7000)

    return () => clearInterval(interval)
  }, [images.length])

  console.log(imgIdx, "imgidx")
  return (
    <div className="min-h-screen bg-background">
      {/* Top Banner */}
      <div className="bg-primary text-white text-center text-sm py-5">
        Summer specials offer • The season&apos;s best deals | Up to 60% off
      </div>

      {/* Header */}
      <header className="absolute top-0 left-0 w-full flex items-center justify-between px-6 py-4 z-20">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-white">
          Skyight<span className="text-white">.</span>
        </h1>

        {/* Right side */}
        <div className="flex items-center gap-6 text-white">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span>(028) 858-494-999</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <Hero imgIdx={imgIdx} />
      <CardSlider />
      <TeamSection />
      <TopDestinations />
      <Testimonials />
      <WhyChooseSkyight />
      <ChromaGrid />
      <FaqSection />
      <ContactUs />
    </div >
  );
}
