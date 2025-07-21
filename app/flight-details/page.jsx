"use client";
import React from "react";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Plane, Luggage, Ticket } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { Button } from "@/components/ui/button";

const FlightDetailsPage = () => {
  const router = useRouter();
  const params = useSearchParams();
  const { searchResults } = useSelector((state) => state.persist);

  if (!searchResults || !searchResults[0]) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container px-4 py-8 mx-auto text-center">
          <h1 className="text-xl font-semibold">Flight Details</h1>
          <p className="mt-4 text-sm text-muted-foreground">
            No flight data available.
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  const data = searchResults[0];
  const breakdowns = data.AirItineraryPricingInfo.PTC_FareBreakdowns;
  const segment =
    data.AirItinerary.OriginDestinationOptions[0].FlightSegment[0];

  const flight = {
    number: segment.FlightNumber,
    airlineCode: segment.OperatingAirline.Code,
    aircraft: segment.Equipment.AirEquipType,
    departure: {
      code: segment.DepartureAirport.LocationCode,
      city: segment.DepartureAirport.Terminal,
      time: segment.DepartureDateTime,
    },
    arrival: {
      code: segment.ArrivalAirport.LocationCode,
      city: segment.ArrivalAirport.Terminal,
      time: segment.ArrivalDateTime,
    },
    duration: segment.FlightDuration.replace(":", "h ") + "m",
    baggage: segment.FreeBaggages.map((b) => ({
      type:
        b.PassengerType === "ADL"
          ? "Adult"
          : b.PassengerType === "CHD"
          ? "Child"
          : "Infant",
      weight: `${b.Quantity}${b.Unit}`,
    })),
    fares: breakdowns.map((f) => ({
      type:
        f.PassengerTypeQuantity.Code === "ADL"
          ? "Adult"
          : f.PassengerTypeQuantity.Code === "CHD"
          ? "Child"
          : "Infant",
      quantity: f.PassengerTypeQuantity.Quantity,
      base: f.PassengerFare.BaseFare.pkrBaseFare,
      tax: f.PassengerFare.Taxes.Tax.reduce((sum, t) => sum + t.pkrTax, 0),
      total: f.PassengerFare.TotalFare.pkrTotalFare,
    })),
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background">
      <Header />
      <main className="container px-4 py-8 mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Flight Details
          </h1>
          <Button
            // variant="outline"
            size="sm"
            onClick={() => {
              router.push(`/confirm-booking?${params.toString()}`);
            }}
          >
            Continue booking
          </Button>
        </div>

        {/* Itinerary Card */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">
                {flight.airlineCode} {flight.number}
              </CardTitle>
              <Badge variant="outline" className="text-sm">
                {flight.aircraft}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
              {/* Departure */}
              <div className="text-center md:text-left">
                <p className="text-2xl font-bold">{flight.departure.code}</p>
                <p className="text-sm text-muted-foreground">
                  {flight.departure.city}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {dayjs(flight.departure.time).format("MMM D, YYYY HH:mm")}
                </p>
              </div>

              {/* Plane Icon & Duration */}
              <div className="flex flex-col items-center text-muted-foreground">
                <Plane className="w-6 h-6" />
                <Separator className="w-12 my-1" />
                <p className="text-xs">{flight.duration}</p>
              </div>

              {/* Arrival */}
              <div className="text-center md:text-right">
                <p className="text-2xl font-bold">{flight.arrival.code}</p>
                <p className="text-sm text-muted-foreground">
                  {flight.arrival.city}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {dayjs(flight.arrival.time).format("MMM D, YYYY HH:mm")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Baggage & Fare Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Baggage Card */}
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-medium text-md">
                <Luggage className="w-5 h-5 text-primary" />
                Baggage
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center flex-1 p-4">
              {flight.baggage.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {flight.baggage.map((b, i) => (
                    <Badge key={i} className="px-3 py-1 text-sm">
                      {b.type}: {b.weight}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No info available.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Fare Breakdown Card */}
          <Card className="h-full lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-medium text-md">
                <Ticket className="w-5 h-5 text-primary" />
                Fare Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col flex-1 p-4">
              <ScrollArea className="flex-1">
                <div className="space-y-4">
                  {flight.fares.map((f, i) => (
                    <div key={i} className="p-3 border rounded">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          {f.type} x{f.quantity}
                        </span>
                        <span className="text-sm font-semibold text-primary">
                          PKR {f.total.toFixed(2)}
                        </span>
                      </div>
                      <Separator className="my-2" />
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <div className="flex justify-between">
                          <span>Base:</span>
                          <span>{f.base.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Taxes:</span>
                          <span>{f.tax.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FlightDetailsPage;
