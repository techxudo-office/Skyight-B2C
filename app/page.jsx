"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, Clock, Wifi, Coffee } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { trendingDestinations } from "@/data/data";
import SearchForm from "@/components/search-form";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 text-white bg-gradient-to-r from-blue-600 to-purple-700 dark:from-blue-800 dark:to-purple-900">
        <div className="container px-4 mx-auto">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold md:text-6xl">
              Find Your Perfect Flight
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Book flights to anywhere in the world with the best prices
            </p>
          </div>

          {/* Search Form */}
          <SearchForm />
        </div>
      </section>

      {/* ... Other sections unchanged ... */}
      <section className="py-16 bg-muted/50">
        <div className="container px-4 mx-auto">
          <h2 className="mb-12 text-3xl font-bold text-center">
            Why Choose Skyight?
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
                  Compare prices from hundreds of airlines to find the best
                  deals
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

      <Footer />
    </div>
  );
}
