"use client";
import { Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useDispatch, useSelector } from "react-redux";
import FilterSidebar from "./components/FilterSidebar";
import { useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import {
  clearSearchResults,
  searchFlight,
} from "@/_core/features/persistSlice";
import { Plane, Filter, Star, Wifi, Utensils } from "lucide-react";
import FlightSearchSummary from "./components/FlightSearchSummary";
import Loader from "@/components/loader";

export default function FlightsPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const params = useSearchParams();
  const [sortBy, setSortBy] = useState("price");
  const [selectedStops, setSelectedStops] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const { userData } = useSelector((state) => state.persist);
  const [selectedAirlines, setSelectedAirlines] = useState([]);
  const { searchResults, isLoadingSearchResults } = useSelector(
    (state) => state.persist
  );

  const from = params.get("from");
  const to = params.get("to");
  const departure = params.get("departure");
  const returnDate = params.get("returnDate");
  const tripType = params.get("tripType") || "one-way";
  const adults = Number(params.get("adults") || "1");
  const children = Number(params.get("children") || "0");
  const infants = Number(params.get("infants") || "0");

  const stopOptions = ["Non-stop", "1 stop", "2+ stops"];
  const airlines = ["SkyWings", "AirGlobal", "EuroFly", "FastJet"];

  useEffect(() => {
    const payload = {
      tripType: tripType === "one-way" ? "OneWay" : "Return",
      originCode: from,
      destinationCode: to,
      departureDate: departure,
      returnDate: returnDate || undefined,
      adult: adults,
      child: children,
      infant: infants,
    };

    dispatch(
      searchFlight({
        payload,
        token: userData?.token,
        logoutHandler: () => {},
        secretToken: userData?.customer?.secretToken,
      })
    );

    return () => {
      dispatch(clearSearchResults());
    };
  }, [dispatch, params, userData?.token]);

  const handleAirlineChange = (airline, checked) => {
    if (checked) {
      setSelectedAirlines([...selectedAirlines, airline]);
    } else {
      setSelectedAirlines(selectedAirlines.filter((a) => a !== airline));
    }
  };

  const handleStopsChange = (stop, checked) => {
    if (checked) {
      setSelectedStops([...selectedStops, stop]);
    } else {
      setSelectedStops(selectedStops.filter((s) => s !== stop));
    }
  };

  const getAmenityIcon = (amenity) => {
    switch (amenity) {
      case "wifi":
        return <Wifi className="w-4 h-4" />;
      case "meal":
        return <Utensils className="w-4 h-4" />;
      case "entertainment":
        return <Star className="w-4 h-4" />;
      default:
        return null;
    }
  };

  // 2) Map it into a “flights” array:
  const flights = searchResults?.map((itin, idx) => {
    // grab the first OD option and the first segment in it
    const segment =
      itin.AirItinerary.OriginDestinationOptions[0].FlightSegment[0];

    // pricing info
    const pricing = itin.AirItineraryPricingInfo.ItinTotalFare;

    return {
      id: idx + 1,
      airline: segment.MarketingAirline.Code, // e.g. "B9"
      logo: `/logos/${segment.MarketingAirline.Code}.svg`, // or however you resolve logos
      departure: {
        time: segment.DepartureDateTime.slice(11), // "19:30"
        airport: segment.DepartureAirport.LocationCode, // "EVN"
        city: segment.DepartureAirport.Terminal, // “Yerevan”
      },
      arrival: {
        time: segment.ArrivalDateTime.slice(11), // "21:30"
        airport: segment.ArrivalAirport.LocationCode, // "IKA"
        city: segment.ArrivalAirport.Terminal, // “Tehran”
      },
      duration: segment.FlightDuration.replace(":", "h ") + "m", // "2h 30m"
      stops:
        itin.AirItinerary.OriginDestinationOptions[0].FlightSegment.length > 1
          ? `${segment.length - 1} stop`
          : "Non‑stop",
      price: pricing.TotalFare.pkrTotalFare.toFixed(0), // e.g. "3509"
      currency: "PKR", // or segment.CurrencyCode
      class: segment.BookingClassAvails[0].ResBookDesigCabinCode, // “Y”
      amenities: [
        // you can decide from your API which amenities to show:
        "wifi",
        "meal",
        "entertainment",
      ],
      rating: 4.5, // static or maybe compute from somewhere else
      raw: itin, // keep raw in case you need to drill into pax breakdown later
    };
  });

  <FilterSidebar
    priceRange={priceRange}
    airlines={airlines}
    selectedAirlines={selectedAirlines}
    handleAirlineChange={handleAirlineChange}
    stopOptions={stopOptions}
    selectedStops={selectedStops}
    handleStopsChange={handleStopsChange}
  />;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container px-4 py-8 mx-auto">
        {/* Search Summary */}
        <Suspense
          fallback={
            <div className="h-20 mb-6 rounded bg-muted animate-pulse" />
          }
        >
          <FlightSearchSummary />
        </Suspense>

        <div className="flex gap-6">
          {/* Desktop Filters */}
          <div className="hidden w-64 lg:block shrink-0">
            <Card>
              <CardContent className="p-6">
                <h2 className="mb-4 font-semibold">Filters</h2>
                <FilterSidebar
                  priceRange={priceRange}
                  airlines={airlines}
                  selectedAirlines={selectedAirlines}
                  handleAirlineChange={handleAirlineChange}
                  stopOptions={stopOptions}
                  selectedStops={selectedStops}
                  handleStopsChange={handleStopsChange}
                />
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          {isLoadingSearchResults ? (
            <Loader />
          ) : (
            <div className="flex-1">
              {/* Sort and Filter Controls */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  {flights?.length} flights found
                </p>

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
                        <Filter className="w-4 h-4 mr-2" />
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
                {flights?.map((flight) => (
                  <Card
                    key={flight.id}
                    className="transition-shadow hover:shadow-md"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <img
                            src={flight.logo}
                            alt={flight.airline}
                            className="w-10 h-10 rounded"
                          />
                          <div>
                            <h3 className="font-semibold">{flight.airline}</h3>
                            <div className="flex items-center space-x-1">
                              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                              <span className="text-sm text-muted-foreground">
                                {flight.rating}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* times & airports */}
                        <div className="flex items-center space-x-8">
                          <div className="text-center">
                            <div className="text-lg font-semibold">
                              {flight.departure.time}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {flight.departure.airport}
                            </div>
                          </div>

                          <div className="flex flex-col items-center">
                            <div className="text-sm text-muted-foreground">
                              {flight.duration}
                            </div>
                            <div className="flex items-center my-1 space-x-2">
                              <div className="w-2 h-2 bg-blue-600 rounded-full" />
                              <div className="w-16 h-px bg-border" />
                              <Plane className="w-4 h-4 text-blue-600" />
                              <div className="w-16 h-px bg-border" />
                              <div className="w-2 h-2 bg-blue-600 rounded-full" />
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {flight.stops}
                            </div>
                          </div>

                          <div className="text-center">
                            <div className="text-lg font-semibold">
                              {flight.arrival.time}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {flight.arrival.airport}
                            </div>
                          </div>
                        </div>

                        {/* price & action */}
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">
                            {flight.currency} {flight.price}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {flight.class}
                          </div>
                          <Button className="mt-2">Select Flight</Button>
                        </div>
                      </div>

                      <Separator className="my-4" />

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          {flight.amenities.map((amenity, i) => (
                            <div
                              key={i}
                              className="flex items-center space-x-1 text-muted-foreground"
                            >
                              {getAmenityIcon(amenity)}
                              <span className="text-sm capitalize">
                                {amenity}
                              </span>
                            </div>
                          ))}
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            router.push(`/flight-details?${params.toString()}`);
                          }}
                        >
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
