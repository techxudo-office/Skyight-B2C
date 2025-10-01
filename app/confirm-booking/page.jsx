"use client";
import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProgressBar from "./components/ProgressBar";
import { progressSteps, form_constants } from "./components/FormConstants";
import { FormSchema } from "@/utils/ValidationSchema";
import {
  defaultTraveller,
  StepFields,
  TravellerSection,
  useTravellerDefs,
  parsePhone,
} from "./components/Sections";
import { useDispatch, useSelector } from "react-redux";
import { confirmBooking } from "@/_core/features/bookingSlice";
import { City } from "country-state-city";
import { useRouter } from "nextjs-toploader/app";

export default function ConfirmBookingPage() {
  const router = useRouter();
  const params = useSearchParams();
  const travellersDef = useTravellerDefs(params);
  const {
    control,
    register,
    watch,
    setValue,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      travellers: travellersDef.map(() => defaultTraveller()),
      email_address: "",
      current_employment_status: "",
    },
  });

  const { fields: travellers } = useFieldArray({
    control,
    name: "travellers",
  });

  // populate city options per traveller
  // 1) watch the current travellers array
  const travellerValues = watch("travellers"); // this is an array

  // 2) derive just the country codes
  const countryCodes = travellerValues.map((t) => t.country);

  // 3) state for each traveller’s city list
  const [cityOpts, setCityOpts] = useState(travellersDef.map(() => []));

  // 4) whenever countryCodes changes, recompute cityOpts
  useEffect(() => {
    const newOpts = countryCodes.map((code) =>
      code ? City.getCitiesOfCountry(code).map((c) => c.name) : []
    );
    setCityOpts(newOpts);
  }, [countryCodes.join(",")]); // join() is enough to detect array changes

  // 5) clear stale city values if country was cleared
  useEffect(() => {
    countryCodes.forEach((code, i) => {
      if (!code) {
        setValue(`travellers.${i}.city`, "");
      }
    });
  }, [countryCodes.join(","), setValue]);
  // multi‑step
  const sections = [
    { title: "Traveller Details", fields: form_constants[0].fields },
    ...form_constants.slice(1),
  ];
  const [step, setStep] = useState(0);
  const total = sections.length;

  const next = async () => {
    const names =
      step === 0
        ? travellers.flatMap((_, i) =>
            form_constants[0].fields.map((f) => `travellers.${i}.${f.name}`)
          )
        : form_constants[step].fields.map((f) => f.name);

    if (await trigger(names)) setStep((s) => Math.min(s + 1, total - 1));
  };
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const dispatch = useDispatch();
  const { userData, searchResults } = useSelector((state) => state.persist);

  const pricing = searchResults[0]?.AirItineraryPricingInfo; // Extract pricing info for easier access

  const onSubmitHandler = async (formValues) => {
    const isRoundTrip = !params.get("tripType") === "one-way";
    const itineraries =
      searchResults[0]?.AirItinerary?.OriginDestinationOptions;
    const firstItin = itineraries[0];
    const firstSeg = firstItin.FlightSegment[0];

    // Helper: map one FlightSegment + its parent itinerary option into flat payload fields
    // suffix allows to distinguish outbound vs return trip data keys (e.g., flight_duration_return)
    const buildSegmentFields = (seg, parent, suffix = "") => ({
      [`flight_duration${suffix}`]: seg.FlightDuration,
      [`origin_location_code${suffix}`]: seg.DepartureAirport.LocationCode,
      [`departure_terminal${suffix}`]: seg.DepartureAirport.Terminal || "", // optional terminal info
      [`destination_location_code${suffix}`]: seg.ArrivalAirport.LocationCode,
      [`arrival_terminal${suffix}`]: seg.ArrivalAirport.Terminal || "",
      [`airline_code${suffix}`]: seg.OperatingAirline.Code,
      [`air_equip_type${suffix}`]: seg.Equipment.AirEquipType,
      [`departure_date_time${suffix}`]: seg.DepartureDateTime,
      [`arrival_date_time${suffix}`]: seg.ArrivalDateTime,
      [`departure_date${suffix}`]: seg.DepartureDate,
      [`departure_time${suffix}`]: seg.DepartureTime,
      [`arrival_date${suffix}`]: seg.ArrivalDate,
      [`arrival_time${suffix}`]: seg.ArrivalTime,
      [`flight_number${suffix}`]: seg.FlightNumber,
      [`res_book_design_Code${suffix}`]: seg.ResBookDesigCode,
      [`rph${suffix}`]: seg.RPH,
      [`ref_number${suffix}`]: parent.RefNumber, // itinerary-level reference
      [`direction_id${suffix}`]: parent.DirectionId, // 0 for outbound, 1 for return typically
      [`elapsed_time${suffix}`]: parent.ElapsedTime,
      [`free_baggages${suffix}`]: seg.FreeBaggages,
      // Map booking class availabilities into simpler array objects
      [`booking_class_avails${suffix}`]: seg.BookingClassAvails.map((item) => ({
        available_PTC: item.AvailablePTC,
        res_book_desig_code: item.ResBookDesigCode,
        res_book_desig_quantity: item.ResBookDesigQuantity,
        rph: item.RPH,
        res_book_desig_cabin_code: item.ResBookDesigCabinCode,
        fare_basis: item.FareBasis,
      })),
    });

    // Helper: build the pricing info section of the payload with fares and passenger breakdown
    const buildPriceInfo = (pricing) => ({
      itin_total_fare: {
        base_fare: {
          amount: pricing.ItinTotalFare.BaseFare.Amount,
          currency_code: pricing.ItinTotalFare.BaseFare.CurrencyCode,
          decimal_places: pricing.ItinTotalFare.BaseFare.DecimalPlaces,
        },
        total_equiv_fare: {
          amount: pricing.ItinTotalFare.MarkupFare.Amount,
          currency_code: pricing.ItinTotalFare.MarkupFare.CurrencyCode,
          decimal_places: pricing.ItinTotalFare.MarkupFare.DecimalPlaces,
        },
        total_fare: {
          amount: pricing.ItinTotalFare.TotalFare.Amount,
          currency_code: pricing.ItinTotalFare.TotalFare.CurrencyCode,
          decimal_places: pricing.ItinTotalFare.TotalFare.DecimalPlaces,
        },
      },
      ptc_fare_break_downs: pricing.PTC_FareBreakdowns.map((passenger) => ({
        passenger_type_quantity: {
          code: passenger.PassengerTypeQuantity.Code,
          quantity: passenger.PassengerTypeQuantity.Quantity,
        },
        fare_basis_code: "", // empty here, could be filled if available
        passenger_fare: {
          base_fare: {
            amount: passenger.PassengerFare.BaseFare.Amount,
            currency_code: passenger.PassengerFare.BaseFare.CurrencyCode,
            decimal_places: passenger.PassengerFare.BaseFare.DecimalPlaces,
          },
          total_fare: {
            amount: passenger.PassengerFare.TotalFare.Amount,
            currency_code: passenger.PassengerFare.TotalFare.CurrencyCode,
            decimal_places: passenger.PassengerFare.TotalFare.DecimalPlaces,
          },
          fees: passenger.PassengerFare.Fees,
          // Flatten tax array into name/amount pairs
          taxes: passenger.PassengerFare.Taxes.Tax.map((tax) => ({
            name: tax.Name,
            amount: tax.Amount,
          })),
        },
        traveler_ref_number: "", // left blank for now
        pricing_source: "", // left blank for now
      })),
    });

    const formattedTravellers = travellerValues.map((traveller, index) => {
      const passengerType =
        travellersDef[index]?.role === "Adult"
          ? "ADT"
          : travellersDef[index]?.role === "Child"
          ? "CHD"
          : "INF";

      return {
        ...traveller,
        telephone: parsePhone(traveller.telephone, "PK"),
        mobile: parsePhone(traveller.mobile, "PK"),
        passenger_type: passengerType,
        doc_type: "P",
      };
    });

    // Build main booking payload starting with outbound flight segment data
    let payload = {
      ...buildSegmentFields(firstSeg, firstItin),
      cabin_class: null, // placeholder, could be enhanced to pick from UI
      trip_type: isRoundTrip ? "Return" : "OneWay",
      travellers: formattedTravellers, // all passenger details included
      transaction_identifier: "", // blank here, can be assigned if needed
      priceInfo: buildPriceInfo(pricing), // structured pricing info
    };

    // If trip is round-trip, also add return segment data with '_return' suffix keys
    if (isRoundTrip && itineraries.length > 1) {
      const retItin = itineraries[1];
      const retSeg = retItin.FlightSegment[0];
      payload = {
        ...payload,
        ...buildSegmentFields(retSeg, retItin, "_return"),
        cabin_class_return: null, // placeholder for return cabin class
      };
    }

    // Dispatch the confirmBooking Redux action with payload and user token
    dispatch(
      confirmBooking({
        data: payload,
        token: userData?.token,
        logoutHandler: () => {},
        secretToken: userData?.customer?.secretToken,
      })
    )
      .unwrap()
      .then(() => router.push("/bookings"))
      .catch(() => {
        // error handling could be enhanced here
      });
  };

  return (
    <div className="w-full p-4 mx-auto shadow-lg md:p-14 bg-card text-foreground rounded-xl">
      <h1 className="text-3xl font-bold text-center">Confirm Your Booking</h1>
      <p className="mb-8 text-center text-muted-foreground">
        Please fill in your details carefully
      </p>

      <ProgressBar
        currentStep={step + 1}
        steps={progressSteps.map((s, i) => ({
          id: i + 1,
          title: i === 0 ? "Traveller Details" : s.title,
          icon: s.icon,
        }))}
      />

      <form onSubmit={handleSubmit(onSubmitHandler)} className="mt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="p-6 border rounded-lg bg-background border-border">
              <h3 className="px-3 py-2 mb-6 text-xl font-medium border-b border-muted">
                {sections[step].title}
              </h3>

              {step === 0 ? (
                <TravellerSection
                  travellers={travellers}
                  travellerDefs={travellersDef}
                  cityOpts={cityOpts}
                  control={control}
                  register={register}
                  errors={errors}
                />
              ) : (
                <StepFields
                  fields={sections[step].fields}
                  register={register}
                  control={control}
                  errors={errors}
                />
              )}

              <div className="flex justify-between mt-6">
                {step > 0 ? (
                  <button
                    type="button"
                    onClick={prev}
                    className="flex items-center px-4 py-1 rounded-lg bg-muted text-muted-foreground hover:bg-muted/70"
                  >
                    <ChevronLeft className="mr-2" /> Previous
                  </button>
                ) : (
                  <div />
                )}

                {step < total - 1 ? (
                  <button
                    type="button"
                    onClick={next}
                    className="flex items-center px-4 py-1 ml-auto text-white rounded-lg bg-primary hover:bg-primary/80"
                  >
                    Next <ChevronRight className="ml-2" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="flex items-center px-6 py-2 ml-auto text-white bg-green-600 rounded-lg hover:bg-green-700"
                  >
                    Submit
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </form>
    </div>
  );
}
