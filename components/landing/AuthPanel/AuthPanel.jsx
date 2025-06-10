"use client";
import React, { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import Input from "../Input/Input";

const AuthPanel = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [isValid, setIsValid] = useState(false);

  // Validation logic
  useEffect(() => {
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isPasswordValid = password.length >= 6;
    setIsValid(isEmailValid && isPasswordValid);
  }, [email, password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      // Handle login logic
      console.log("Logging in with:", { email, password });
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-full">
      {/* Login Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white p-8 rounded-l-3xl">
        <h2 className="text-3xl font-bold mb-8">Login</h2>
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <Input
            type="email"
            label="Email"
            id="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type="password"
            label="Password"
            id="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            showPasswordToggle={true}
          />

          <div className="text-sm text-right mb-6">
            <a href="#" className="text-gray-600 underline">
              Forgot your password?
            </a>
          </div>

          <button
            type="submit"
            disabled={!isValid}
            className={`w-full py-3  rounded-full text-white text-center font-medium transition ${
              isValid
                ? "bg-primary hover:bg-secondary cursor-pointer"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Log in
          </button>
        </form>
      </div>

      {/* Create Account Section */}
      <div className="hidden md:flex w-1/2 items-center justify-center relative bg-black rounded-r-3xl">
        <RxCross2
          className="absolute top-8 right-8 text-gray-200 text-3xl z-10 cursor-pointer"
          onClick={onClose}
        />
        <img
          src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80"
          alt="Create Account"
          className="absolute inset-0 w-full h-full object-cover opacity-50 rounded-r-3xl"
        />
        <div className="relative z-10 text-white text-center px-8">
          <h2 className="text-3xl font-bold mb-6">Create your account</h2>
          <ul className="text-left mb-6 space-y-3">
            <li className="flex items-center gap-2">
              ✅ Save time when booking
            </li>
            <li className="flex items-center gap-2">
              ✅ Save your favourites easily
            </li>
            <li className="flex items-center gap-2">
              ✅ View your reservations and history
            </li>
          </ul>
          <button className="px-6 py-2 rounded-full bg-white text-black font-medium hover:bg-gray-200 transition cursor-pointer">
            Create my account
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPanel;
