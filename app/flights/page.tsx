"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plane, Filter, Star, Wifi, Utensils } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function FlightsPage() {
  const searchParams = useSearchParams()
  const [sortBy, setSortBy] = useState("price")
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([])
  const [selectedStops, setSelectedStops] = useState<string[]>([])

  const flights = [
    {
      id: 1,
      airline: "SkyWings",
      logo: "/placeholder.svg?height=40&width=40",
      departure: { time: "08:30", airport: "JFK", city: "New York" },
      arrival: { time: "14:45", airport: "CDG", city: "Paris" },
      duration: "7h 15m",
      stops: "Non-stop",
      price: 599,
      class: "Economy",
      amenities: ["wifi", "meals", "entertainment"],
      rating: 4.5,
    },
    {
      id: 2,
      airline: "AirGlobal",
      logo: "/placeholder.svg?height=40&width=40",
      departure: { time: "10:15", airport: "JFK", city: "New York" },
      arrival: { time: "17:30", airport: "CDG", city: "Paris" },
      duration: "8h 15m",
      stops: "1 stop",
      price: 449,
      class: "Economy",
      amenities: ["wifi", "meals"],
      rating: 4.2,
    },
    {
      id: 3,
      airline: "EuroFly",
      logo: "/placeholder.svg?height=40&width=40",
      departure: { time: "15:20", airport: "JFK", city: "New York" },
      arrival: { time: "22:35", airport: "CDG", city: "Paris" },
      duration: "7h 15m",
      stops: "Non-stop",
      price: 729,
      class: "Business",
      amenities: ["wifi", "meals", "entertainment", "lounge"],
      rating: 4.8,
    },
  ]

  const airlines = ["SkyWings", "AirGlobal", "EuroFly", "FastJet"]
  const stopOptions = ["Non-stop", "1 stop", "2+ stops"]

  const handleAirlineChange = (airline: string, checked: boolean) => {
    if (checked) {
      setSelectedAirlines([...selectedAirlines, airline])
    } else {
      setSelectedAirlines(selectedAirlines.filter((a) => a !== airline))
    }
  }

  const handleStopsChange = (stop: string, checked: boolean) => {
    if (checked) {
      setSelectedStops([...selectedStops, stop])
    } else {
      setSelectedStops(selectedStops.filter((s) => s !== stop))
    }
  }

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case "wifi":
        return <Wifi className="h-4 w-4" />
      case "meals":
        return <Utensils className="h-4 w-4" />
      case "entertainment":
        return <Star className="h-4 w-4" />
      default:
        return null
    }
  }

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-3">Price Range</h3>
        <Slider value={priceRange} onValueChange={setPriceRange} max={1000} step={50} className="mb-2" />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Airlines</h3>
        <div className="space-y-2">
          {airlines.map((airline) => (
            <div key={airline} className="flex items-center space-x-2">
              <Checkbox
                id={airline}
                checked={selectedAirlines.includes(airline)}
                onCheckedChange={(checked) => handleAirlineChange(airline, checked as boolean)}
              />
              <label htmlFor={airline} className="text-sm">
                {airline}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Stops</h3>
        <div className="space-y-2">
          {stopOptions.map((stop) => (
            <div key={stop} className="flex items-center space-x-2">
              <Checkbox
                id={stop}
                checked={selectedStops.includes(stop)}
                onCheckedChange={(checked) => handleStopsChange(stop, checked as boolean)}
              />
              <label htmlFor={stop} className="text-sm">
                {stop}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Search Summary */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">
            {searchParams.get("from")} → {searchParams.get("to")}
          </h1>
          <p className="text-muted-foreground">
            {searchParams.get("departure")} • {searchParams.get("passengers")} passenger(s)
          </p>
        </div>

        <div className="flex gap-6">
          {/* Desktop Filters */}
          <div className="hidden lg:block w-64 shrink-0">
            <Card>
              <CardContent className="p-6">
                <h2 className="font-semibold mb-4">Filters</h2>
                <FilterSidebar />
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort and Filter Controls */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-muted-foreground">{flights.length} flights found</p>

              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price">Price (Low to High)</SelectItem>
                    <SelectItem value="duration">Duration</SelectItem>
                    <SelectItem value="departure">Departure Time</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                  </SelectContent>
                </Select>

                {/* Mobile Filter Button */}
                <Sheet>
                  <SheetTrigger asChild className="lg:hidden">
                    <Button variant="outline">
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterSidebar />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>

            {/* Flight Results */}
            <div className="space-y-4">
              {flights.map((flight) => (
                <Card key={flight.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <img
                          src={flight.logo || "/placeholder.svg"}
                          alt={flight.airline}
                          className="w-10 h-10 rounded"
                        />
                        <div>
                          <h3 className="font-semibold">{flight.airline}</h3>
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm text-muted-foreground">{flight.rating}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-8">
                        <div className="text-center">
                          <div className="font-semibold text-lg">{flight.departure.time}</div>
                          <div className="text-sm text-muted-foreground">{flight.departure.airport}</div>
                        </div>

                        <div className="flex flex-col items-center">
                          <div className="text-sm text-muted-foreground">{flight.duration}</div>
                          <div className="flex items-center space-x-2 my-1">
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            <div className="w-16 h-px bg-border"></div>
                            <Plane className="h-4 w-4 text-blue-600" />
                            <div className="w-16 h-px bg-border"></div>
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          </div>
                          <div className="text-sm text-muted-foreground">{flight.stops}</div>
                        </div>

                        <div className="text-center">
                          <div className="font-semibold text-lg">{flight.arrival.time}</div>
                          <div className="text-sm text-muted-foreground">{flight.arrival.airport}</div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">${flight.price}</div>
                        <div className="text-sm text-muted-foreground">{flight.class}</div>
                        <Button className="mt-2">Select Flight</Button>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {flight.amenities.map((amenity, index) => (
                          <div key={index} className="flex items-center space-x-1 text-muted-foreground">
                            {getAmenityIcon(amenity)}
                            <span className="text-sm capitalize">{amenity}</span>
                          </div>
                        ))}
                      </div>

                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
