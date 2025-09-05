"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, Clock, Wifi, Coffee, Phone } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { trendingDestinations } from "@/data/data";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useState } from "react";

const testimonials = [
  {
    country: "Maldives",
    days: "8 Days – 7 Night",
    review:
      "Travio made travel planning effortless. Book dream trip in minutes!",
    rating: 4.6,
    image: "/outing_1.jpg",
    name: "Riya Patel",
    location: "Bangalore",
    avatar: "/user_1.jpg",
  },
  {
    country: "Maldives",
    days: "8 Days – 7 Night",
    review:
      "Planning our Maldives was great, fast and met our needs perfectly. Let's Enjoy the tour",
    rating: 4.6,
    image: "/outing_2.jpg",
    name: "Vikram",
    location: "Delhi, India",
    avatar: "/user_2.jpg",
  },
  {
    country: "Indonesia",
    days: "17 Days – 14 Night",
    review:
      "Planning my Bali trip with Travio was a breeze. Bookings and great tips!",
    rating: 4.6,
    image: "/outing_3.jpg",
    name: "Priya Shah",
    location: "Mumbai",
    avatar: "/user_3.jpg",
  },
  {
    country: "Dubai",
    days: "7 Days – 6 Night",
    review:
      "Exploring options for Dubai was simple. Suggestions were personal and useful.",
    rating: 4.6,
    image: "/outing_4.jpg",
    name: "Ahmed K.",
    location: "Dubai",
    avatar: "/user_4.jpg",
  },
  {
    country: "Maldives",
    days: "8 Days – 7 Night",
    review:
      "Travio revealed hidden gems in Istanbul. It felt like having a local friend!",
    rating: 4.6,
    image: "/maldive.jpg",
    name: "Sarah M",
    location: "London",
    avatar: "/user_5.jpg",
  },
];

const categories = ["All", "Beach", "Culture", "Ski", "Family"];

const stays = [
  {
    city: "Calangute",
    location: "Goa",
    country: "India",
    flag: "🇮🇳",
    image: "/goa.jpg",
    price: "$4,895",
  },
  {
    city: "Mumbai",
    location: "Maharashtra",
    country: "India",
    flag: "🇮🇳",
    image: "/mumbai.jpg",
    price: "$1,468",
  },
  {
    city: "Bangkok",
    location: "Bangkok Province",
    country: "Thailand",
    flag: "🇹🇭",
    image: "/bangkok.jpg",
    price: "$7,466",
  },
  {
    city: "Dubai",
    location: "Dubai",
    country: "United Arab Emirates",
    flag: "🇦🇪",
    image: "/dubai.jpg",
    price: "$9,250",
  },
  {
    city: "Paris",
    location: "Île-de-France",
    country: "France",
    flag: "🇫🇷",
    image: "/paris.jpg",
    price: "$6,730",
  },
  {
    city: "New York",
    location: "New York",
    country: "USA",
    flag: "🇺🇸",
    image: "/newyork.jpg",
    price: "$8,999",
  },
];

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
  const [activeCategory, setActiveCategory] = useState("All");
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

      {/* Team Members Portion */}
      <section className="bg-white text-black py-20">
        <div className="container mx-auto px-4 text-center">
          {/* Heading */}
          <h2 className="text-4xl font-bold mb-4">
            Travel. Explore. Celebrate life.
          </h2>
          <p className="max-w-2xl mx-auto text-black-300 mb-16">
            At Skiyght, we keep travel simple, fun, and real. From where to go
            to what to do, we help you plan every step — all in one clean, easy
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

      {/* Explore Destination Portion */}
      <section className="bg-white text-black py-20">
        <div className="container mx-auto px-4 text-center">
          {/* Heading */}
          <p className="text-sm uppercase tracking-wider mb-2 text-black-300">
            Explore Destinations
          </p>
          <h2 className="text-4xl font-bold mb-4">Stays in Top Destinations</h2>
          <p className="text-black-400 mb-12 max-w-2xl mx-auto">
            Find the right place to stay — beach breaks, family getaways, and
            more.
          </p>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant="ghost"
                className={`rounded-full px-6 py-2 ${
                  activeCategory === cat
                    ? "bg-primary text-black font-semibold"
                    : "bg-zinc-900 text-white hover:bg-white"
                }`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {stays.map((stay, idx) => (
              <Card
                key={idx}
                className="bg-zinc-900 text-white rounded-2xl overflow-hidden"
              >
                <div className="aspect-video">
                  <img
                    src={stay.image}
                    alt={stay.city}
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardContent className="p-4 flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{stay.city}</h3>
                    <p className="text-sm text-gray-400 mb-4">
                      {stay.location} • {stay.flag} {stay.country}
                    </p>
                    <p className="text-lg font-semibold">{stay.price}</p>
                    <p className="text-sm text-gray-400">Avg. nightly price</p>
                  </div>

                  {/* Arrow button bottom right */}
                  <div className="flex justify-end mt-4">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="rounded-full bg-white/10 hover:bg-white/20"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial part */}

      <section className="bg-black text-white py-20">
        <div className="container mx-auto px-4">
          {/* Heading */}
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-wider mb-2 text-gray-400">
              Our Testimonials
            </p>
            <h2 className="text-4xl font-bold mb-4">
              Words from Our Adventurers
            </h2>
            <p className="text-blue-400">
              See what our travelers have to say about their journeys with
              Travio.
            </p>
          </div>

          {/* Carousel */}
          <Carousel className="w-full max-w-7xl mx-auto">
            <CarouselContent>
              {testimonials.map((item, idx) => (
                <CarouselItem
                  key={idx}
                  className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <Card className="bg-zinc-900 text-white rounded-2xl overflow-hidden">
                    {/* Image */}
                    <div className="relative aspect-video">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute bottom-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
                        {item.rating} ★★★★★
                      </div>
                    </div>

                    {/* Content */}
                    <CardContent className="p-4 flex flex-col justify-between">
                      <p className="text-xs text-gray-400 mb-1">
                        {item.country} • {item.days}
                      </p>
                      <p className="mb-4 font-medium">"{item.review}"</p>

                      {/* User Info */}
                      <div className="flex items-center gap-3 mt-auto">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={item.avatar} alt={item.name} />
                          <AvatarFallback>{item.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-semibold">{item.name}</p>
                          <p className="text-xs text-gray-400">
                            {item.location}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Arrows */}
            <CarouselPrevious className="left-[-3rem] bg-white/10 hover:bg-white/20 text-white" />
            <CarouselNext className="right-[-3rem] bg-white/10 hover:bg-white/20 text-white" />
          </Carousel>
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
