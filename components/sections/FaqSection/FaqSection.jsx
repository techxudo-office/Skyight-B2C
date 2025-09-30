// src/components/FaqSection.jsx
import React from 'react';
import { ChevronRight } from 'lucide-react';
import FadeupAnimation from '@/components/FadeupAnimation';
import Heading from '@/components/Heading';

// Data ko component se bahar rakhein taake isay manage karna aasan ho.
// Aap is data ko API se bhi fetch kar sakte hain.
const faqData = [
    {
        id: 1,
        question: "How do I book a trip on Travio?",
        answer: "Just choose your destination, pick a package or experience, and follow the booking steps – it's quick and hassle-free."
    },
    {
        id: 2,
        question: "Can I customize my travel package?",
        answer: "Yes! Many of our packages can be personalized. You'll see options during checkout or you can contact us for help."
    },
    {
        id: 3,
        question: "Are the prices shown final?",
        answer: "Most prices are all-inclusive, but details are listed on each package page. No hidden fees – we keep it transparent."
    },
    {
        id: 4,
        question: "Do I need to create an account to book?",
        answer: "Nope. You can book as a guest, but having an account lets you track your trips and save your favorites."
    },
    {
        id: 5,
        question: "What if I need to cancel or change my booking?",
        answer: "Each trip has its own cancellation policy. You'll find it on the package page, or reach out to our support for help."
    },
    {
        id: 6,
        question: "Travio available for international planning?",
        answer: "Yes! Travio covers both domestic and international destinations – from India to Europe, Southeast Asia, and more."
    },
];

// Helper component for a single FAQ item
const FaqItem = ({ question, answer }) => (
    <div className="flex items-start gap-x-5">
        <div className="flex-shrink-0 w-8 h-8 bg-[#222] rounded-full flex items-center justify-center mt-1">
            <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
        <div>
            <h3 className="text-white text-lg font-semibold">{question}</h3>
            <p className="text-gray-400 mt-2 text-base leading-relaxed">{answer}</p>
        </div>
    </div>
);

// Main Section Component
export default function FaqSection() {
    return (
        <section className="bg-black py-24">
            <div className="container mx-auto px-4">
                {/* Section Title */}
                <Heading title={"Frequently Asked Questions"} subtitle={"Got questions? We’ve got answers."} />

                {/* Responsive Grid for FAQs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 md:gap-x-16 max-w-6xl mx-auto">
                    {faqData.map((item, i) => (
                        <FadeupAnimation key={item.id} delay={i * 0.1}>

                            <FaqItem question={item.question} answer={item.answer} />
                        </FadeupAnimation>
                    ))}
                </div>
            </div>
        </section>
    );
}