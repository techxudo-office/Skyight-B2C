import { useState, useEffect } from "react";
import ProfileIcon from "./ProfileIcon/ProfileIcon";
// import { Link } from 'react-router';

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
      {/* Desktop Navbar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          {/* <Link to={"/"} className={`text-xl font-bold transition-colors duration-300 text-text`}>
                        <img src={skyightLogo} alt="Logo" className="h-8 w-auto" />
                    </Link> */}

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:gap-7 font-semibold text-sm">
            {/* <Link to={"/about"} className={`hover:text-lightGray transition-all duration-200 text-text`}>
                            About
                        </Link>
                        <Link to={"/pricing"} className={`hover:text-lightGray transition-all duration-200 text-text`}>
                            Pricing
                        </Link>
                        <Link to={"/contact"} className={`hover:text-lightGray transition-all duration-200 text-text`}>
                            Contact Us
                        </Link> */}
            <a
              href="tel:9292842269"
              className={`hover:text-lightGray transition-all duration-200 text-text`}
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
              stroke={"currentColor"}
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
            {/* <Link to={"/about"} className="block px-3 py-2 text-text">
                            About
                        </Link>
                        <Link to={"/pricing"} className="block px-3 py-2 text-text">
                            Pricing
                        </Link>
                        <Link to={"/contact"} className="block px-3 py-2 text-text">
                            Contact
                        </Link> */}
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
            <span className="block px-3 py-2 text-text">My Reservations</span>
            <span className="block px-3 py-2 text-text">My Favourites</span>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
