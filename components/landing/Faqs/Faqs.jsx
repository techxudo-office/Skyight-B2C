import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ_DATA = [
    {
        question: "How early should I arrive at the airport?",
        answer: "We recommend arriving at least 2 hours before domestic flights and 3 hours before international flights."
    },
    {
        question: "Can I change my booking after purchase?",
        answer: "Yes, most tickets can be modified. Changes may be subject to fees depending on fare conditions."
    },
    {
        question: "What's included in the ticket price?",
        answer: "The base fare includes your seat and hand luggage. Checked baggage and meals may vary by fare type."
    },
    {
        question: "Can I change my booking after purchase?",
        answer: "Yes, most tickets can be modified. Changes may be subject to fees depending on fare conditions."
    },
    {
        question: "What's included in the ticket price?",
        answer: "The base fare includes your seat and hand luggage. Checked baggage and meals may vary by fare type."
    },
];

const Faqs = () => {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <div className="max-w-5xl mx-auto px-4 py-20 ">
            <h2 className="text-5xl font-bold text-gray-800 mb-10 text-center">
                Frequently Asked Questions
            </h2>

            <div className="space-y-4">
                {FAQ_DATA.map((faq, index) => (
                    <div
                        key={index}
                        className="border border-lightGray rounded-xl shadow-sm hover:shadow-md relative group overflow-hidden"
                    >
                        <div className='absolute w-full h-full inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-tr to-transparent via-transparent from-primary/50 transition-all duration-300   '></div>
                        <button
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            className="w-full px-6 py-4 text-left flex justify-between items-center z-10 relative"
                        >
                            <h3 className="text-lg font-medium text-text">
                                {faq.question}
                            </h3>
                            <motion.span
                                className="ml-4"
                                animate={{ rotate: openIndex === index ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <svg
                                    className="w-6 h-6 text-lightGray"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </motion.span>
                        </button>

                        <AnimatePresence>
                            {openIndex === index && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    className="overflow-hidden"
                                >
                                    <div className="px-6 pb-4">
                                        <p className="text-text leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Faqs;