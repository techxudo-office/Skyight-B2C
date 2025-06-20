"use client";
import { useSearchParams } from "next/navigation";

const FlightSearchSummary = () => {
  const searchParams = useSearchParams();

  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const departure = searchParams.get("departure");
  const passengers = searchParams.get("passengers");

  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold mb-2">
        {from} → {to}
      </h1>
      <p className="text-muted-foreground">
        {departure} • {passengers} passenger(s)
      </p>
    </div>
  );
};

export default FlightSearchSummary;
