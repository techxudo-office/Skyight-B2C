"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useSelector } from "react-redux";

const FlightDetailsPage = () => {
  const { searchResults } = useSelector((state) => state.booking);
  const flightData = searchResults[0];

  const flightSegment =
    flightData?.AirItinerary?.OriginDestinationOptions?.[0]?.FlightSegment?.[0];
  const pricingInfo =
    flightData?.AirItineraryPricingInfo?.PTC_FareBreakdowns || [];

  const flight = {
    flightNumber: flightSegment?.FlightNumber,
    departure: {
      location: `${flightSegment?.DepartureAirport?.LocationCode} - ${flightSegment?.DepartureAirport?.Terminal}`,
      time: flightSegment?.DepartureDateTime,
    },
    arrival: {
      location: `${flightSegment?.ArrivalAirport?.LocationCode} - ${flightSegment?.ArrivalAirport?.Terminal}`,
      time: flightSegment?.ArrivalDateTime,
    },
    duration: `${flightSegment?.FlightDuration?.replace(":", "h ")}m`,
    airline: flightSegment?.OperatingAirline?.Code,
    aircraft: flightSegment?.Equipment?.AirEquipType,
    baggage: flightSegment?.FreeBaggages?.map((bag) => ({
      type:
        bag.PassengerType === "ADL"
          ? "Adult"
          : bag.PassengerType === "CHD"
          ? "Child"
          : "Infant",
      weight: `${bag.Quantity}${bag.Unit}`,
    })),
    fares: pricingInfo.map((fare) => ({
      type:
        fare.PassengerTypeQuantity?.Code === "ADL"
          ? "Adult"
          : fare.PassengerTypeQuantity?.Code === "CHD"
          ? "Child"
          : "Infant",
      base: fare.PassengerFare?.BaseFare?.pkrBaseFare || 0,
      tax: fare.PassengerFare?.Taxes?.Tax?.[0]?.pkrTax || 0,
      total: fare.PassengerFare?.TotalFare?.pkrTotalFare || 0,
    })),
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container px-4 py-8 mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Flight Details</h1>
        </div>

        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Flight Number:</span>
                <span>{flight.flightNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Aircraft:</span>
                <span>{flight.aircraft}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Airline Code:</span>
                <span>{flight.airline}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <h2 className="mb-1 font-semibold">Departure</h2>
                <p>{flight.departure.location}</p>
                <p className="text-muted-foreground">{flight.departure.time}</p>
              </div>
              <div>
                <h2 className="mb-1 font-semibold">Arrival</h2>
                <p>{flight.arrival.location}</p>
                <p className="text-muted-foreground">{flight.arrival.time}</p>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="text-sm text-muted-foreground">
              Duration: {flight.duration}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardContent className="p-4">
            <h2 className="mb-3 font-semibold">Baggage Allowance</h2>
            <div className="flex flex-wrap gap-2">
              {flight?.baggage?.map((bag, index) => (
                <Badge key={index} variant="secondary">
                  {bag.type}: {bag.weight}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h2 className="mb-3 font-semibold">Fare Breakdown (PKR)</h2>
            <ScrollArea className="h-[200px]">
              <div className="space-y-3">
                {flight.fares.map((fare, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-3 gap-4 p-3 text-sm border rounded-md"
                  >
                    <div>
                      <span className="text-muted-foreground">Passenger</span>
                      <div>{fare.type}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Base</span>
                      <div>PKR {fare.base.toFixed(2)}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Total</span>
                      <div>PKR {fare.total.toFixed(2)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default FlightDetailsPage;
