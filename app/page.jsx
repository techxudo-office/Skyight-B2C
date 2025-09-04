"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, Clock, Wifi, Coffee, Phone } from "lucide-react";
import Link from "next/link";
import { trendingDestinations } from "@/data/data";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"; // <- make sure you have this from shadcn/ui
import { useState } from "react";

const teamMembers = [
  {
    name: "Rishant Singh",
    role: "Vice President – Product",
    title: "The Code Whisperer",
    image: "/user_1.jpg",
  },
  {
    name: "Nisha Kapoor",
    role: "CEO & Co-Founder",
    title: "The Idea Box",
    image: "/user_2.jpg",
  },
  {
    name: "Kabir Malhotra",
    role: "Head of Engineering",
    title: "Life of the Party",
    image: "/user_3.jpg",
  },
  {
    name: "Rohan Verma",
    role: "Vice President – Growth",
    title: "The Show Runner",
    image: "/user_4.jpg",
  },
  {
    name: "Aarav Kapoor",
    role: "CTO & Founder",
    title: "The Visionary",
    image: "/user_5.jpg",
  },
];

// Dummy data for tour packages (replace with API/data)
const tourPackages = [
  {
    country: "Egypt",
    days: "9 Days – 7 Night",
    title: "Cairo to Nile Cruise",
    image: "/cairo.jpg",
    rating: 4.4,
    reviews: 293,
    price: "$3,896",
  },
  {
    country: "Indonesia",
    days: "17 Days – 14 Night",
    title: "Bali & Java",
    image: "/indonesia.jpg",
    rating: 4.8,
    reviews: 4200,
    price: "$8,996",
  },
  {
    country: "Turkey",
    days: "6 Days – 5 Night",
    title: "Blue Mosque",
    image: "/turkey.jpg",
    rating: 4.6,
    reviews: 563,
    price: "$4,996",
  },
  {
    country: "Maldives",
    days: "5 Days – 4 Night",
    title: "Maldives Huruval",
    image: "/maldives.jpg",
    rating: 4.9,
    reviews: 6900,
    price: "$9,587",
  },
  {
    country: "South Korea",
    days: "11 Days – 8 Night",
    title: "Korea",
    image: "/korea.jpg",
    rating: 3.9,
    reviews: 2000,
    price: "$7,679",
  },
];

export default function HomePage() {
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
      <section
        className="relative flex items-center justify-center min-h-[90vh] text-center text-white"
        style={{
          backgroundImage: "url('/mumbai.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative z-10 px-4 max-w-3xl">
          <p className="mb-4 text-lg">No stress, just real experiences.</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Top places to visit, eat or experience –{" "}
            <span className="text-primary">all in one spot.</span>
          </h2>
          <Button size="lg" className="rounded-full px-8 py-6 text-lg">
            Let's Explore
          </Button>
        </div>
        <div className="absolute inset-0 bg-black/40" />
      </section>

      {/* All Inclusive Tour Packages Carousel */}
      <section className="py-20 bg-white text-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-2 text-primary">
            All Inclusive tour packages.
          </h2>
          <p className="text-center text">
            Travel from anywhere in India or worldwide. Pick a tour that fits
            you — starting right from your city.
          </p>

          {/* Carousel */}
          <Carousel className="w-full max-w-6xl mx-auto mt-5">
            <CarouselContent>
              {tourPackages.map((pkg, idx) => (
                <CarouselItem
                  key={idx}
                  className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <Card className="rounded-2xl overflow-hidden bg-zinc-900 text-white">
                    <div className="aspect-video">
                      <img
                        src={pkg.image}
                        alt={pkg.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <CardContent className="p-4">
                      <p className="text-xs text-gray-400 mb-1">
                        {pkg.country} • {pkg.days}
                      </p>
                      <h3 className="font-bold text-lg mb-2">{pkg.title}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`px-2 py-0.5 text-xs font-semibold rounded ${
                            pkg.rating >= 4.5
                              ? "bg-primary"
                              : pkg.rating >= 4.0
                              ? "bg-primary"
                              : "bg-primary"
                          }`}
                        >
                          {pkg.rating}
                        </span>
                        <span className="text-sm text-gray-300">
                          Wonderful ({pkg.reviews.toLocaleString()} reviews)
                        </span>
                      </div>
                      <p className="text-xl font-bold mb-4">
                        {pkg.price}{" "}
                        <span className="text-sm font-normal">
                          / per person
                        </span>
                      </p>
                      <Button
                        className="w-full rounded-full"
                        variant="secondary"
                      >
                        Request Callback
                      </Button>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Arrows */}
            <CarouselPrevious className="left-[-4rem] bg-black hover:bg-white/40 text-white" />
            <CarouselNext className="right-[-4rem] bg-black hover:bg-white/40 text-white" />
          </Carousel>
        </div>
      </section>

      <section className="bg-white text-black py-20">
        <div className="container mx-auto px-4 text-center">
          {/* Heading */}
          <h2 className="text-4xl font-bold mb-4">
            Travel. Explore. Celebrate life.
          </h2>
          <p className="max-w-2xl mx-auto text-black-300 mb-16">
            At Skiyght, we keep travel simple, fun, and real. From where to go to
            what to do, we help you plan every step — all in one clean, easy
            space. We’re a small, passionate team who loves to travel and build
            helpful tools for others who do too.
          </p>

          {/* Team Members */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="flex flex-col items-center">
                {/* Circle Image */}
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-sm text-gray-400">{member.role}</p>
                <p className="mt-2 text-primary italic">{member.title}</p>
              </div>
            ))}
          </div>

          {/* Bottom Stats */}
          <div className="mt-16 bg-primary text-white py-6 rounded-lg grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-2xl font-bold">14</p>
              <p className="text-sm">Years of Enjoying Life</p>
            </div>
            <div>
              <p className="text-2xl font-bold">24*7</p>
              <p className="text-sm">In-trip assistance</p>
            </div>
            <div>
              <p className="text-2xl font-bold">10K+</p>
              <p className="text-sm">Happy Travelers</p>
            </div>
            <div>
              <p className="text-2xl font-bold">250+</p>
              <p className="text-sm">Packages worldwide</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section (kept same) */}
      <section className="py-16 bg-muted/50">
        <div className="container px-4 mx-auto">
          <h2 className="mb-12 text-3xl font-bold text-center">
            Why Choose Travito?
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card className="text-center">
              <CardContent className="p-6">
                <Clock className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <h3 className="mb-2 text-xl font-semibold">24/7 Support</h3>
                <p className="text-muted-foreground">
                  Round-the-clock customer service for all your travel needs
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <Wifi className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <h3 className="mb-2 text-xl font-semibold">Best Prices</h3>
                <p className="text-muted-foreground">
                  Compare prices from hundreds of sources to find the best deals
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <Coffee className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <h3 className="mb-2 text-xl font-semibold">Easy Booking</h3>
                <p className="text-muted-foreground">
                  Simple and secure booking process in just a few clicks
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trending Destinations (same as before) */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold">Trending Destinations</h2>
            <Link href="/destinations">
              <Button variant="outline">
                View All <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {trendingDestinations.map((destination, index) => (
              <Card
                key={index}
                className="overflow-hidden transition-shadow hover:shadow-lg"
              >
                <div className="aspect-video bg-muted">
                  <img
                    src={destination.image || "/placeholder.svg"}
                    alt={destination.city}
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold">{destination.city}</h3>
                      <p className="text-sm text-muted-foreground">
                        {destination.country}
                      </p>
                    </div>
                    <Badge variant="secondary">{destination.price}</Badge>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm">{destination.rating}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
