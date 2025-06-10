"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ProfileIcon from "./ProfileIcon/ProfileIcon";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <header
      className={`fixed w-full z-[99] transition-all duration-300 ${
        scrolled ? "bg-white shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-text">
            {/* Uncomment and import your logo if needed */}
            {/* <Image src={skyightLogo} alt="Logo" className="h-8 w-auto" /> */}
            Skyight
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:gap-7 font-semibold text-sm">
            {/* Example links - enable as needed */}
            <Link
              href="/about"
              className="hover:text-lightGray transition-all text-text"
            >
              About
            </Link>
            <Link
              href="/pricing"
              className="hover:text-lightGray transition-all text-text"
            >
              Pricing
            </Link>
            <Link
              href="/contact"
              className="hover:text-lightGray transition-all text-text"
            >
              Contact Us
            </Link>

            <a
              href="tel:9292842269"
              className="hover:text-lightGray transition-all text-text"
            >
              (929) 284-2269
            </a>
            <span className="text-text">EN • USD</span>
            <ProfileIcon />
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div
            className="space-y-1 px-2 pb-3 pt-2"
            onClick={() => setIsMenuOpen(false)}
          >
            {/* Enable these links if needed */}
            <Link href="/about" className="block px-3 py-2 text-text">
              About
            </Link>
            <Link href="/pricing" className="block px-3 py-2 text-text">
              Pricing
            </Link>
            <Link href="/contact" className="block px-3 py-2 text-text">
              Contact
            </Link>

            <a href="tel:9292842269" className="block px-3 py-2 text-text">
              (929) 284-2269
            </a>
            <span className="block px-3 py-2 text-text">EN • USD</span>
            <a
              href="https://agent.skyight.com/login"
              className="block px-3 py-2 text-text"
            >
              Login
            </a>
            <Link href="/reservations" className="block px-3 py-2 text-text">
              My Reservations
            </Link>
            <Link href="/favourites" className="block px-3 py-2 text-text">
              My Favourites
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
