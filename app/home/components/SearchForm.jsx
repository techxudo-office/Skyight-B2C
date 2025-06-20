"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Plane, Users } from "lucide-react";
import { Counter } from "@/components/ui/counter";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function SearchForm() {
  const [tripType, setTripType] = useState("one-way");
  const [popoverOpen, setPopoverOpen] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      from: "",
      to: "",
      departure: "",
      returnDate: "",
      adults: 1,
      children: 0,
      infants: 0,
    },
  });

  const { adults, children, infants } = watch();

  const onSubmit = (data) => {
    if (tripType === "one-way") delete data.returnDate;
    const passengers = `${data.adults}A/${data.children}C/${data.infants}I`;
    const params = new URLSearchParams({
      ...data,
      tripType,
      passengers,
    });
    window.location.href = `/flights?${params.toString()}`;
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Toggle + Passengers */}
          <div className="flex items-center mb-4 space-x-4">
            <ToggleGroup
              type="single"
              value={tripType}
              onValueChange={(val) => setTripType(val || "one-way")}
              variant="blue" // ← use new variant
              size="default"
            >
              {["one-way", "return"].map((val) => (
                <ToggleGroupItem key={val} value={val}>
                  {val === "one-way" ? "One‑way" : "Return"}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>

            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <Users className="w-4 h-4" />
                  <span>
                    {adults} ADT - {children} CH - {infants} INF
                  </span>
                </Button>
              </PopoverTrigger>

              <PopoverContent align="start" sideOffset={4} className="w-48">
                <Counter
                  label="Adults"
                  value={adults}
                  setValue={(v) =>
                    setValue("adults", v, { shouldValidate: true })
                  }
                  min={1}
                />
                <Counter
                  label="Children"
                  value={children}
                  setValue={(v) => setValue("children", v)}
                />
                <Counter
                  label="Infants"
                  value={infants}
                  setValue={(v) => setValue("infants", v)}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
            {/* From */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                From
              </label>
              <div className="relative">
                <MapPin className="absolute w-4 h-4 left-3 top-3 text-muted-foreground" />
                <Input
                  className="pl-10"
                  placeholder="Departure city"
                  {...register("from", { required: "From is required" })}
                />
              </div>
              {errors.from && (
                <p className="text-sm text-red-500">{errors.from.message}</p>
              )}
            </div>

            {/* To */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                To
              </label>
              <div className="relative">
                <MapPin className="absolute w-4 h-4 left-3 top-3 text-muted-foreground" />
                <Input
                  className="pl-10"
                  placeholder="Destination city"
                  {...register("to", { required: "To is required" })}
                />
              </div>
              {errors.to && (
                <p className="text-sm text-red-500">{errors.to.message}</p>
              )}
            </div>

            {/* Departure */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Departure
              </label>
              <Input
                type="date"
                {...register("departure", {
                  required: "Departure date is required",
                })}
              />
              {errors.departure && (
                <p className="text-sm text-red-500">
                  {errors.departure.message}
                </p>
              )}
            </div>

            {/* Return */}
            {tripType === "return" && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Return
                </label>
                <Input
                  type="date"
                  {...register("returnDate", {
                    required: "Return date is required",
                  })}
                />
                {errors.returnDate && (
                  <p className="text-sm text-red-500">
                    {errors.returnDate.message}
                  </p>
                )}
              </div>
            )}

            {/* Submit */}
            <div className="flex items-end">
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                <Plane className="w-4 h-4 mr-2" />
                Search Flights
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
