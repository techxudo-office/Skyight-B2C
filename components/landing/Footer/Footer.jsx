import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaGooglePlusG,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaPaperPlane,
} from "react-icons/fa";
// import { Link } from "react-router";
import skyightLogo from "../../../app/assets/skyight-logo.svg";

export default function Footer() {
  return (
    <footer className="bg-[#1D2335] text-white px-6 py-10">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 justify-between gap-10">
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold mb-3">
            <img src={skyightLogo} alt="Logo" className="h-10 w-auto" />
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed">
            Management consulting includes a broad range of activities, and the
            many firms and their members often define these practices.
          </p>
          <div className="flex gap-3 mt-4">
            {[FaFacebookF, FaTwitter, FaInstagram, FaGooglePlusG].map(
              (Icon, i) => (
                <div
                  key={i}
                  className="bg-[#2C3448] hover:bg-primary p-2 rounded-full cursor-pointer transition"
                >
                  <Icon className="text-white w-4 h-4" />
                </div>
              )
            )}
          </div>
        </div>

        {/* Services */}
        <div className="flex md:justify-center">
          <div>
            <h3 className="text-lg font-bold mb-4">SERVICES</h3>
            <ul className="text-sm space-y-2 text-gray-300">
              <li>Delicious Food</li>
              <li>Parking Area</li>
              <li>Swimming Pool</li>
              <li>Spa Salon</li>
              <li>Exercise Space</li>
            </ul>
          </div>
        </div>

        {/* Important Links */}
        <div className="flex md:justify-center">
          <div>
            <h3 className="text-lg font-bold mb-4">IMPORTANT LINK</h3>
            <ul className="text-sm space-y-2 text-gray-300">
              <li>About Us</li>
              <li>Populer Destinition</li>
              <li>Our Services</li>
              <li>Pricing Plan</li>
              {/* <Link to={"/privacy-policy"}>Privacy Policy</Link> */}
            </ul>
          </div>
        </div>

        {/* Contact */}
        <div className="flex md:justify-center">
          <div>
            <h3 className="text-lg font-bold mb-4">CONTACT</h3>
            <ul className="text-sm space-y-4 text-gray-300">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-1" />
                <span>
                  7 Green Lake Street
                  <br />
                  Crawfordsville, IN 47933
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt />
                <span>+1 800 123 456 789</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPaperPlane />
                <span>parador@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-sm text-gray-400 mt-10 border-t border-gray-700 pt-6 relative">
        <p>Copyright © 2024 Techxudo. All Rights Reserved.</p>
        {/* Scroll to Top */}
        {/* <div className="absolute right-5 bottom-6 sm:bottom-auto sm:top-0">
                    <div className="bg-primary w-10 h-10 flex items-center justify-center rounded-full shadow-md cursor-pointer hover:bg-red-600 transition">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-white"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M3.293 10.707a1 1 0 010-1.414L10 2.586l6.707 6.707a1 1 0 01-1.414 1.414L11 6.414V17a1 1 0 11-2 0V6.414L4.707 10.707a1 1 0 01-1.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                </div> */}
      </div>
    </footer>
  );
}
