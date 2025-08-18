// app/bookings/page.tsx
"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { getBookings } from "@/_core/features/bookingSlice";
import { Header } from "@/components/header";
import Loader from "@/components/loader";

export default function BookingsPage() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.persist);
  const { bookings, isLoadingBookings } = useSelector((state) => state.booking);

  useEffect(() => {
    if (!userData?.token) return;
    dispatch(
      getBookings({
        token: userData.token,
        logoutHandler: () => {},
        secretToken: userData?.customer?.secretToken,
      })
    );
  }, [dispatch, userData]);

  if (!userData?.token) {
    return (
      <div className="p-8 text-center text-destructive">
        You must be logged in to view your bookings.
      </div>
    );
  }

  if (isLoadingBookings) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen bg-background">
        <Loader />
      </div>
    );
  }

  //   if (bookingsError) {
  //     return (
  //       <div className="p-8 text-center text-destructive">
  //         Error loading bookings.
  //       </div>
  //     );
  //   }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-8 mx-auto">
        <h1 className="mb-6 text-2xl font-semibold">My Bookings</h1>
        <Table>
          <TableCaption>
            {bookings.length} booking{bookings.length !== 1 ? "s" : ""}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Reference</TableHead>
              <TableHead>Trip Type</TableHead>
              <TableHead>From → To</TableHead>
              <TableHead>Total Fare</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((b) => (
              <TableRow key={b.id}>
                <TableCell>{b.id}</TableCell>
                <TableCell>{b.booking_reference_id}</TableCell>
                <TableCell>{b.trip_type}</TableCell>
                <TableCell>
                  {b.origin} → {b.destination}
                </TableCell>
                <TableCell>
                  {b.currency} {parseFloat(b.total_fare).toFixed(2)}
                </TableCell>
                <TableCell
                  className={cn(
                    b.booking_status === "booked"
                      ? "text-green-600"
                      : "text-destructive"
                  )}
                >
                  {b.booking_status}
                </TableCell>
                <TableCell>{format(new Date(b.created_at), "PPpp")}</TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      window.location.assign(
                        `/booking/${b.booking_reference_id}`
                      )
                    }
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
