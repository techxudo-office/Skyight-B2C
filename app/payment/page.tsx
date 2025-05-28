"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { CreditCard, Lock, Plane, User, Shield } from "lucide-react"
import { Header } from "@/components/header"

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
    billingAddress: "",
    city: "",
    zipCode: "",
    country: "",
    saveCard: false,
    agreeToTerms: false,
  })

  const flightDetails = {
    airline: "SkyWings",
    from: "New York (JFK)",
    to: "Paris (CDG)",
    departure: "2024-06-15 08:30",
    arrival: "2024-06-15 14:45",
    duration: "7h 15m",
    passengers: 1,
    class: "Economy",
    price: 599,
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle payment processing
    console.log("Payment submission:", formData)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Complete Your Booking</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Payment Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Passenger Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Passenger Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <Button
                      variant={paymentMethod === "card" ? "default" : "outline"}
                      onClick={() => setPaymentMethod("card")}
                      className="h-16"
                    >
                      <CreditCard className="h-6 w-6" />
                    </Button>
                    <Button
                      variant={paymentMethod === "paypal" ? "default" : "outline"}
                      onClick={() => setPaymentMethod("paypal")}
                      className="h-16"
                    >
                      PayPal
                    </Button>
                    <Button
                      variant={paymentMethod === "apple" ? "default" : "outline"}
                      onClick={() => setPaymentMethod("apple")}
                      className="h-16"
                    >
                      Apple Pay
                    </Button>
                  </div>

                  {paymentMethod === "card" && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={formData.cardNumber}
                          onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <Input
                            id="expiryDate"
                            placeholder="MM/YY"
                            value={formData.expiryDate}
                            onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            value={formData.cvv}
                            onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="nameOnCard">Name on Card</Label>
                        <Input
                          id="nameOnCard"
                          value={formData.nameOnCard}
                          onChange={(e) => setFormData({ ...formData, nameOnCard: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Billing Address */}
              <Card>
                <CardHeader>
                  <CardTitle>Billing Address</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="billingAddress">Address</Label>
                    <Input
                      id="billingAddress"
                      value={formData.billingAddress}
                      onChange={(e) => setFormData({ ...formData, billingAddress: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        value={formData.zipCode}
                        onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Select
                        value={formData.country}
                        onValueChange={(value) => setFormData({ ...formData, country: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="ca">Canada</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="fr">France</SelectItem>
                          <SelectItem value="de">Germany</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Terms and Conditions */}
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="saveCard"
                      checked={formData.saveCard}
                      onCheckedChange={(checked) => setFormData({ ...formData, saveCard: checked as boolean })}
                    />
                    <Label htmlFor="saveCard">Save this card for future bookings</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: checked as boolean })}
                    />
                    <Label htmlFor="agreeToTerms" className="text-sm">
                      I agree to the Terms of Service and Privacy Policy
                    </Label>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Booking Summary */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Flight Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Plane className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-semibold">{flightDetails.airline}</div>
                      <div className="text-sm text-muted-foreground">{flightDetails.class}</div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">From:</span>
                      <span>{flightDetails.from}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">To:</span>
                      <span>{flightDetails.to}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Departure:</span>
                      <span>{flightDetails.departure}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration:</span>
                      <span>{flightDetails.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Passengers:</span>
                      <span>{flightDetails.passengers}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Price Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Flight ticket</span>
                      <span>${flightDetails.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxes & fees</span>
                      <span>$89</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Service fee</span>
                      <span>$15</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${flightDetails.price + 89 + 15}</span>
                  </div>

                  <Button onClick={handleSubmit} className="w-full" size="lg" disabled={!formData.agreeToTerms}>
                    <Lock className="h-4 w-4 mr-2" />
                    Complete Booking
                  </Button>

                  <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                    <Shield className="h-4 w-4" />
                    <span>Secure payment protected by SSL encryption</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
