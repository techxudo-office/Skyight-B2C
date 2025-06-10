"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, MapPin, Calendar, Search } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function DestinationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("all")
  const [selectedBudget, setSelectedBudget] = useState("all")

  const destinations = [
    {
      id: 1,
      city: "Paris",
      country: "France",
      region: "Europe",
      image: "/placeholder.svg?height=300&width=400",
      price: "$299",
      rating: 4.8,
      reviews: 2847,
      description: "The City of Light awaits with its iconic landmarks, world-class museums, and romantic atmosphere.",
      highlights: ["Eiffel Tower", "Louvre Museum", "Notre-Dame", "Champs-Élysées"],
      bestTime: "Apr-Jun, Sep-Oct",
      budget: "mid",
    },
    {
      id: 2,
      city: "Tokyo",
      country: "Japan",
      region: "Asia",
      image: "/placeholder.svg?height=300&width=400",
      price: "$599",
      rating: 4.9,
      reviews: 3241,
      description: "Experience the perfect blend of traditional culture and cutting-edge technology.",
      highlights: ["Shibuya Crossing", "Mount Fuji", "Senso-ji Temple", "Tokyo Skytree"],
      bestTime: "Mar-May, Sep-Nov",
      budget: "high",
    },
    {
      id: 3,
      city: "New York",
      country: "USA",
      region: "North America",
      image: "/placeholder.svg?height=300&width=400",
      price: "$399",
      rating: 4.7,
      reviews: 4156,
      description: "The city that never sleeps offers endless entertainment, culture, and dining experiences.",
      highlights: ["Times Square", "Central Park", "Statue of Liberty", "Broadway"],
      bestTime: "Apr-Jun, Sep-Nov",
      budget: "high",
    },
    {
      id: 4,
      city: "London",
      country: "United Kingdom",
      region: "Europe",
      image: "/placeholder.svg?height=300&width=400",
      price: "$349",
      rating: 4.6,
      reviews: 2934,
      description: "Discover royal palaces, historic landmarks, and vibrant neighborhoods in this iconic city.",
      highlights: ["Big Ben", "Tower Bridge", "British Museum", "Buckingham Palace"],
      bestTime: "May-Sep",
      budget: "mid",
    },
    {
      id: 5,
      city: "Bali",
      country: "Indonesia",
      region: "Asia",
      image: "/placeholder.svg?height=300&width=400",
      price: "$199",
      rating: 4.5,
      reviews: 1876,
      description: "Tropical paradise with stunning beaches, ancient temples, and lush rice terraces.",
      highlights: ["Ubud Rice Terraces", "Tanah Lot Temple", "Seminyak Beach", "Mount Batur"],
      bestTime: "Apr-Oct",
      budget: "low",
    },
    {
      id: 6,
      city: "Dubai",
      country: "UAE",
      region: "Middle East",
      image: "/placeholder.svg?height=300&width=400",
      price: "$449",
      rating: 4.4,
      reviews: 2156,
      description: "Luxury shopping, ultramodern architecture, and desert adventures await.",
      highlights: ["Burj Khalifa", "Dubai Mall", "Palm Jumeirah", "Desert Safari"],
      bestTime: "Nov-Mar",
      budget: "high",
    },
  ]

  const regions = [
    { value: "all", label: "All Regions" },
    { value: "Europe", label: "Europe" },
    { value: "Asia", label: "Asia" },
    { value: "North America", label: "North America" },
    { value: "Middle East", label: "Middle East" },
  ]

  const budgetRanges = [
    { value: "all", label: "All Budgets" },
    { value: "low", label: "Budget ($100-300)" },
    { value: "mid", label: "Mid-range ($300-500)" },
    { value: "high", label: "Luxury ($500+)" },
  ]

  const filteredDestinations = destinations.filter((destination) => {
    const matchesSearch =
      destination.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      destination.country.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRegion = selectedRegion === "all" || destination.region === selectedRegion
    const matchesBudget = selectedBudget === "all" || destination.budget === selectedBudget

    return matchesSearch && matchesRegion && matchesBudget
  })

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 dark:from-blue-800 dark:to-purple-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Amazing Destinations</h1>
          <p className="text-xl mb-8 opacity-90">
            Explore the world's most beautiful places and create unforgettable memories
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter Controls */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search destinations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                {regions.map((region) => (
                  <SelectItem key={region.value} value={region.value}>
                    {region.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedBudget} onValueChange={setSelectedBudget}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Select budget" />
              </SelectTrigger>
              <SelectContent>
                {budgetRanges.map((budget) => (
                  <SelectItem key={budget.value} value={budget.value}>
                    {budget.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            {filteredDestinations.length} destination{filteredDestinations.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.map((destination) => (
            <Card key={destination.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video relative">
                <img
                  src={destination.image || "/placeholder.svg"}
                  alt={destination.city}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-white/90 text-black">
                    {destination.price}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-semibold">{destination.city}</h3>
                    <p className="text-muted-foreground flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {destination.country}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="font-medium">{destination.rating}</span>
                    <span className="text-muted-foreground text-sm ml-1">({destination.reviews})</span>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm mb-4">{destination.description}</p>

                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-sm mb-2">Top Attractions</h4>
                    <div className="flex flex-wrap gap-1">
                      {destination.highlights.slice(0, 3).map((highlight, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                      {destination.highlights.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{destination.highlights.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      Best: {destination.bestTime}
                    </div>
                  </div>

                  <Button className="w-full">View Flights</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDestinations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No destinations found matching your criteria.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setSelectedRegion("all")
                setSelectedBudget("all")
              }}
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
