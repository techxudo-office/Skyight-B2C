"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  MessageCircle,
  Phone,
  Mail,
  Clock,
  Search,
  Send,
  HelpCircle,
  FileText,
  CreditCard,
  Plane,
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [ticketForm, setTicketForm] = useState({
    subject: "",
    category: "",
    priority: "",
    description: "",
    email: "",
    bookingReference: "",
  });

  const faqs = [
    {
      question: "How can I cancel my flight booking?",
      answer:
        "You can cancel your flight booking by logging into your account and navigating to 'My Bookings'. Click on the booking you want to cancel and follow the cancellation process. Cancellation fees may apply depending on the airline's policy and how close to departure you are canceling.",
    },
    {
      question: "What documents do I need for international travel?",
      answer:
        "For international travel, you typically need a valid passport that doesn't expire within 6 months of your travel date. Some destinations may also require a visa. Check the specific requirements for your destination country and ensure all your documents are up to date.",
    },
    {
      question: "How early should I arrive at the airport?",
      answer:
        "We recommend arriving at least 2 hours before domestic flights and 3 hours before international flights. During peak travel times or at busy airports, consider arriving even earlier. Check with your airline for specific recommendations.",
    },
    {
      question: "Can I change my flight dates?",
      answer:
        "Flight date changes are possible but depend on the fare type you purchased and the airline's policy. Most airlines charge a change fee plus any difference in fare. Flexible or premium tickets often allow free changes.",
    },
    {
      question: "What happens if my flight is delayed or cancelled?",
      answer:
        "If your flight is delayed or cancelled, the airline is responsible for rebooking you on the next available flight at no extra cost. You may also be entitled to compensation depending on the length of delay and the reason for cancellation.",
    },
    {
      question: "How do I add baggage to my booking?",
      answer:
        "You can add baggage to your booking through your airline's website or by contacting them directly. It's usually cheaper to add baggage online before your flight rather than at the airport.",
    },
  ];

  const supportChannels = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant help from our support team",
      availability: "24/7",
      action: "Start Chat",
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with a support agent",
      availability: "Mon-Fri 8AM-8PM",
      action: "Call Now",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us a detailed message",
      availability: "Response within 24 hours",
      action: "Send Email",
    },
  ];

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    console.log("Support ticket submitted:", ticketForm);
    // Handle ticket submission
  };

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 dark:from-blue-800 dark:to-purple-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            How Can We Help You?
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Get the support you need for your travel experience
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-lg bg-white text-black"
            />
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Support Channels */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            Contact Our Support Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {supportChannels.map((channel, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <channel.icon className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                  <h3 className="text-xl font-semibold mb-2">
                    {channel.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {channel.description}
                  </p>
                  <div className="flex items-center justify-center mb-4">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {channel.availability}
                    </span>
                  </div>
                  <Button className="w-full">{channel.action}</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FAQ Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HelpCircle className="h-5 w-5 mr-2" />
                  Frequently Asked Questions
                </CardTitle>
                <CardDescription>
                  Find quick answers to common questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {filteredFaqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>

                {filteredFaqs.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      No FAQs found matching your search.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Support Ticket Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Submit a Support Ticket
                </CardTitle>
                <CardDescription>
                  Can't find what you're looking for? Send us a message
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleTicketSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={ticketForm.email}
                      onChange={(e) =>
                        setTicketForm({ ...ticketForm, email: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bookingReference">
                      Booking Reference (Optional)
                    </Label>
                    <Input
                      id="bookingReference"
                      placeholder="e.g., FB123456"
                      value={ticketForm.bookingReference}
                      onChange={(e) =>
                        setTicketForm({
                          ...ticketForm,
                          bookingReference: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={ticketForm.category}
                      onValueChange={(value) =>
                        setTicketForm({ ...ticketForm, category: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="booking">Booking Issues</SelectItem>
                        <SelectItem value="payment">
                          Payment & Refunds
                        </SelectItem>
                        <SelectItem value="flight">Flight Changes</SelectItem>
                        <SelectItem value="baggage">Baggage</SelectItem>
                        <SelectItem value="technical">
                          Technical Issues
                        </SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select
                      value={ticketForm.priority}
                      onValueChange={(value) =>
                        setTicketForm({ ...ticketForm, priority: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={ticketForm.subject}
                      onChange={(e) =>
                        setTicketForm({
                          ...ticketForm,
                          subject: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Please provide as much detail as possible..."
                      value={ticketForm.description}
                      onChange={(e) =>
                        setTicketForm({
                          ...ticketForm,
                          description: e.target.value,
                        })
                      }
                      rows={4}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Submit Ticket
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Plane className="h-4 w-4 mr-2" />
                  Manage My Booking
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Request Refund
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Travel Documents
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Flight Status
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
