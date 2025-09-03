"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, Clock, Wifi, Coffee, Phone, Menu } from "lucide-react";
import Link from "next/link";
import { trendingDestinations } from "@/data/data";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Top Banner */}
      <div className="bg-blue-600 text-white text-center text-sm py-5">
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
          {/* <Menu className="w-6 h-6 cursor-pointer" /> */}
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="relative flex items-center justify-center min-h-[90vh] text-center text-white"
        style={{
          backgroundImage: "url('/mumbai.jpg')", // replace with your image path
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative z-10 px-4 max-w-3xl">
          <p className="mb-4 text-lg">No stress, just real experiences.</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Top places to visit, eat or experience –{" "}
            <span className="text-blue-600">all in one spot.</span>
          </h2>
          <Button size="lg" className="rounded-full px-8 py-6 text-lg">
            Let's Explore
          </Button>
        </div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />
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

      {/* Trending Destinations (same) */}
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
