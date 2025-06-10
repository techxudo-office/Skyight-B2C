"use client"
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Carousel,
  ContactForm,
  CoreValues,
  Faqs,
  Hero,
  Mission,
  MobileApp,
  Navbar,
  Testimonials,
  Trustedby,
  VedioSec,
} from "../components/landing/component";
import { plane3 } from "../app/assets";

export default function Page() {
  const { scrollYProgress } = useScroll();

  // Horizontal movement (left to right)
  const x = useTransform(scrollYProgress, [0, 1], ["-100%", "300%"]);

  // Vertical movement (bottom to top)
  const y = useTransform(scrollYProgress, [0, 1], ["100%", "-300%"]);

  // Rotation effect (optional)
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 20]);

  return (
    <>
      <Navbar />
      <Hero />
      {/* <Hero2 /> */}
      <Mission />
      <Carousel />
      {/* <CoreValues /> */}
      <VedioSec />
      <Testimonials />
      <MobileApp />
      <Trustedby />
      <Faqs />
      <ContactForm />
      <motion.img
        src={plane3}
        alt="plane"
        className="fixed z-0 w-44 max-sm:hidden"
        style={{
          x,
          y,
          rotate,
          left: 0,
          bottom: 0,
        }}
      />
      <motion.img
        src={plane3}
        alt="plane"
        className="fixed z-0 w-44 rotate-180 max-sm:hidden"
        style={{
          x,
          y,
          rotate,
          right: 0,
          top: 0,
        }}
      />
    </>
  );
}
