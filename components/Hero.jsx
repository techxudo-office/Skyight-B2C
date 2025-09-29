"use client"
import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from './ui/button'

export default function Hero({ imgIdx }) {
    const images = [
        "/hero1.webp",
        "/hero2.webp",
        "/hero3.webp",
        "/hero4.webp",
    ]

    return (
        // Yeh main section ab static hai, isme animation nahi hai
        <section
            className="relative flex items-center justify-center min-h-[90vh] text-center text-white overflow-hidden"
        >
            {/* AnimatePresence ab sirf background image ko control karega */}
            <AnimatePresence>
                <motion.div
                    // Key zaroori hai taake AnimatePresence ko pata chale ke component change hua hai
                    key={imgIdx}

                    // Yeh div background image ban jayega
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url('${images[imgIdx]}')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}

                    // Animation states
                    initial={{ opacity: 0, scale: 1.7 }} // Thoda sa zoomed-in aur transparent se shuru karein
                    animate={{ opacity: 1, scale: 1 }}     // Full opacity aur normal size par aayen
                    exit={{ opacity: 0, scale: 1.3 }}        // Fade out ho jayen

                    // Yahan humne opacity aur scale ke liye alag-alag duration set ki hai
                    transition={{
                        opacity: { duration: 1.8, ease: "easeInOut" }, // Opacity jaldi change hogi
                        scale: { duration: 5, ease: "linear", delay: 0.4 },   // Scale aahista change hoga
                    }}
                />
            </AnimatePresence>

            {/* Yeh black overlay hai jo background ke upar aayega */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-10" />

            {/* Yeh content hai jo sabse upar rahega aur animate nahi hoga */}
            <div className="relative z-20 px-4 max-w-3xl">
                <div className="flex items-center gap-x-4 rounded-full border border-white/20 bg-black/30 px-5 py-3 shadow-lg backdrop-blur-2xl w-fit mb-4 mx-auto">
                    <span className="text-lg text-gray-100">Explore Place with Skyight</span>
                </div>

                <p className="mb-4 text-lg">No stress, just real experiences.</p>
                <h2 className="text-3xl md:text-5xl  mb-6">
                    Top places to visit, eat or experience –{" "}
                    <span className="text-primary">all in one spot.</span>
                </h2>
                <Button size="lg" className="rounded-full px-8 py-6 text-lg">
                    Let's Explore
                </Button>
            </div>
        </section>
    )
}