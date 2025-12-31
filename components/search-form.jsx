"use client";
import React, { useState, useEffect } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { useForm } from "react-hook-form";
import airports from "@nwpr/airport-codes";
import { Plane, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Dropdown from "@/components/ui/dropdown";
import { useRouter } from "nextjs-toploader/app";
import { Counter } from "@/components/ui/counter";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent } from "@/components/ui/card";
import { getRoutes } from "@/_core/features/bookingSlice";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function SearchForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);
  const [tripType, setTripType] = useState("one-way");
  const [popoverOpen, setPopoverOpen] = useState(false);
  const { userData } = useSelector((state) => state.persist);
  const [processedRoutes, setProcessedRoutes] = useState([]);
  const { routes, loadingRoutes } = useSelector((state) => state.booking);

  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    resetField,
    formState: { errors },
  } = useForm({
    defaultValues: {
      from: null,
      to: null,
      departure: "",
      returnDate: "",
      adults: 1,
      children: 0,
      infants: 0,
      cabinClass: { value: "Economy", label: "Economy" },
    },
  });
  const { from, to, adults, children, infants } = watch();

  // Ensure that form state stays in sync if you ever reset, etc.
  useEffect(() => {
    register("from", { required: "From is required" });
    register("to", { required: "To is required" });
  }, [register]);

  useEffect(() => {
    if (userData?.token) {
      dispatch(
        getRoutes({
          token: userData?.token,
          logoutHandler: () => {},
          secretToken: userData?.customer?.secretToken,
        })
      )
        .unwrap()
        .catch(() => {
          dispatch(
            getRoutes({
              token: userData?.token,
              logoutHandler: () => {},
              secretToken: userData?.customer?.secretToken,
            })
          );
        });
    }
  }, [dispatch, userData]);

  useEffect(() => {
    if (routes && routes.length > 0) {
      const enrichedRoutes = routes
        .map((route) => {
          // Find airport data for Origin and Destination
          const origin = airports.find((a) => a.iata === route.Origin);
          const dest = airports.find((a) => a.iata === route.Destination);

          // Create the new, enriched object structure
          return {
            Origin: {
              terminal: route.Origin,
              // Use the found name, or fallback to the terminal code if not found
              name: origin?.city || route.Origin,
            },
            Destination: {
              terminal: route.Destination,
              name: dest?.city || route.Destination,
            },
          };
        })
        .filter(Boolean); // Filter out any potential null/undefined entries

      setProcessedRoutes(enrichedRoutes);
    }
  }, [routes]);

  const departureOptions = React.useMemo(() => {
    // Create a unique list of origins to avoid duplicates in the dropdown
    const uniqueOrigins = [
      ...new Map(
        processedRoutes.map((item) => [item.Origin.terminal, item.Origin])
      ).values(),
    ];
    return uniqueOrigins.map((origin) => ({
      value: origin.terminal,
      label: `${origin.name} (${origin.terminal})`, // e.g., "Tehran (THR)"
    }));
  }, [processedRoutes]);

  const arrivalOptions = React.useMemo(
    () => (from) => {
      if (!from?.value) return [];
      return processedRoutes
        .filter(({ Origin }) => Origin.terminal === from.value)
        .map(({ Destination }) => ({
          value: Destination.terminal,
          label: `${Destination.name} (${Destination.terminal})`,
        }));
    },
    [processedRoutes]
  );

  const onSubmit = (data) => {
    if (tripType === "one-way") delete data.returnDate;
    const params = new URLSearchParams({
      from: data.from.value,
      to: data.to.value,
      departure: data.departure,
      ...(tripType === "return" && { returnDate: data.returnDate }),
      adults: data.adults.toString(),
      children: data.children.toString(),
      infants: data.infants.toString(),
      tripType,
      cabinClass: data.cabinClass.value,
    });
    router.push(`/flights?${params.toString()}`);
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Toggle + Passengers */}
          <div className="flex flex-col items-start mb-4 space-y-4 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
            <ToggleGroup
              type="single"
              value={tripType}
              onValueChange={(val) => setTripType(val || "one-way")}
              variant="blue"
              size="default"
            >
              {["one-way", "return"].map((val) => (
                <ToggleGroupItem key={val} value={val}>
                  {val === "one-way" ? "One‑way" : "Return"}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
            <div className="w-full sm:w-auto">
              <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center w-full space-x-2 sm:w-auto"
                  >
                    <Users className="w-4 h-4" />
                    <span>
                      {adults} ADT - {children} CH - {infants} INF
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  side="bottom"
                  align="start"
                  sideOffset={8}
                  className="w-full sm:w-52"
                >
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
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
            {/* From */}
            <div className="col-span-2 space-y-2 md:col-span-1 lg:col-span-1">
              <label className="text-sm font-medium text-muted-foreground">
                From
              </label>
              {mounted && (
                <Dropdown
                  value={from}
                  loading={loadingRoutes}
                  options={departureOptions}
                  onChange={(val) => {
                    resetField("to");
                    setValue("from", val, { shouldValidate: true });
                  }}
                  placeholder="Departure"
                />
              )}
              {errors.from && (
                <p className="text-sm text-red-500">{errors.from.message}</p>
              )}
            </div>

            {/* To */}
            <div className="col-span-2 space-y-2 md:col-span-1 lg:col-span-1">
              <label className="text-sm font-medium text-muted-foreground">
                To
              </label>
              {mounted && (
                <Dropdown
                  value={to}
                  disabled={!from}
                  options={arrivalOptions(from)}
                  onChange={(val) =>
                    setValue("to", val, { shouldValidate: true })
                  }
                  placeholder="Destination"
                />
              )}
              {errors.to && (
                <p className="text-sm text-red-500">{errors.to.message}</p>
              )}
            </div>

            {/* Departure */}
            <div className="col-span-2 space-y-2 md:col-span-1 lg:col-span-1">
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
              <div className="col-span-2 space-y-2 md:col-span-1 lg:col-span-1">
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

            {/* Class */}
            <div className="col-span-2 space-y-2 md:col-span-1 lg:col-span-1">
              <label className="text-sm font-medium text-muted-foreground">
                Class
              </label>
              {mounted && (
                <Dropdown
                  value={watch("cabinClass")}
                  options={[
                    { value: "Economy", label: "Economy" },
                    { value: "Business", label: "Business" },
                  ]}
                  onChange={(val) => setValue("cabinClass", val)}
                  placeholder="Class"
                />
              )}
            </div>

            {/* Submit */}
            <div className="flex items-end col-span-2 md:col-span-2 lg:col-span-1">
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
