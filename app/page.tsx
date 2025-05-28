"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, MapPin, Plane, Users, ArrowRight, Star, Clock, Wifi, Coffee } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function HomePage() {
  const [searchData, setSearchData] = useState({
    from: "",
    to: "",
    departure: "",
    return: "",
    passengers: "1",
  })

  const trendingDestinations = [
    { city: "Paris", country: "France", price: "$299", image: "/placeholder.svg?height=200&width=300", rating: 4.8 },
    { city: "Tokyo", country: "Japan", price: "$599", image: "/placeholder.svg?height=200&width=300", rating: 4.9 },
    { city: "New York", country: "USA", price: "$399", image: "/placeholder.svg?height=200&width=300", rating: 4.7 },
    { city: "London", country: "UK", price: "$349", image: "/placeholder.svg?height=200&width=300", rating: 4.6 },
  ]

  const handleSearch = () => {
    const params = new URLSearchParams(searchData)
    window.location.href = `/flights?${params.toString()}`
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-700 dark:from-blue-800 dark:to-purple-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Find Your Perfect Flight</h1>
            <p className="text-xl md:text-2xl opacity-90">Book flights to anywhere in the world with the best prices</p>
          </div>

          {/* Search Form */}
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">From</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Departure city"
                      className="pl-10"
                      value={searchData.from}
                      onChange={(e) => setSearchData({ ...searchData, from: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">To</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Destination city"
                      className="pl-10"
                      value={searchData.to}
                      onChange={(e) => setSearchData({ ...searchData, to: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Departure</label>
                  <div className="relative">
                    <CalendarDays className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="date"
                      className="pl-10"
                      value={searchData.departure}
                      onChange={(e) => setSearchData({ ...searchData, departure: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Passengers</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="number"
                      min="1"
                      max="9"
                      className="pl-10"
                      value={searchData.passengers}
                      onChange={(e) => setSearchData({ ...searchData, passengers: e.target.value })}
                    />
                  </div>
                </div>

                <div className="flex items-end">
                  <Button onClick={handleSearch} className="w-full bg-blue-600 hover:bg-blue-700">
                    <Plane className="mr-2 h-4 w-4" />
                    Search Flights
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose FlightBooker?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <Clock className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                <p className="text-muted-foreground">Round-the-clock customer service for all your travel needs</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Wifi className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
                <p className="text-muted-foreground">Compare prices from hundreds of airlines to find the best deals</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Coffee className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
                <p className="text-muted-foreground">Simple and secure booking process in just a few clicks</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trending Destinations */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Trending Destinations</h2>
            <Link href="/destinations">
              <Button variant="outline">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingDestinations.map((destination, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-muted">
                  <img
                    src={destination.image || "/placeholder.svg"}
                    alt={destination.city}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold">{destination.city}</h3>
                      <p className="text-sm text-muted-foreground">{destination.country}</p>
                    </div>
                    <Badge variant="secondary">{destination.price}</Badge>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
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
  )
}
