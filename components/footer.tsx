import Link from "next/link"
import { Plane, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Plane className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold">FlightBooker</span>
            </Link>
            <p className="text-muted-foreground">
              Your trusted partner for finding the best flight deals worldwide. Book with confidence and travel with
              ease.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-muted-foreground hover:text-blue-600 cursor-pointer" />
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-blue-600 cursor-pointer" />
              <Instagram className="h-5 w-5 text-muted-foreground hover:text-blue-600 cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/flights" className="block text-muted-foreground hover:text-foreground">
                Search Flights
              </Link>
              <Link href="/destinations" className="block text-muted-foreground hover:text-foreground">
                Popular Destinations
              </Link>
              <Link href="/support" className="block text-muted-foreground hover:text-foreground">
                Customer Support
              </Link>
              <Link href="/about" className="block text-muted-foreground hover:text-foreground">
                About Us
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Support</h3>
            <div className="space-y-2">
              <Link href="/help" className="block text-muted-foreground hover:text-foreground">
                Help Center
              </Link>
              <Link href="/contact" className="block text-muted-foreground hover:text-foreground">
                Contact Us
              </Link>
              <Link href="/terms" className="block text-muted-foreground hover:text-foreground">
                Terms of Service
              </Link>
              <Link href="/privacy" className="block text-muted-foreground hover:text-foreground">
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">support@flightbooker.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">123 Travel St, City, State 12345</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} FlightBooker. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
