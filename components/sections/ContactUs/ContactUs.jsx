import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Phone, Mail, Send } from 'lucide-react';
import FadeupAnimation from '@/components/FadeupAnimation';


export default function ContactUs() {
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', contactNumber: '', message: ''
    });
    const [agreed, setAgreed] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen bg-black text-white py-16 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Left Side */}
                    <FadeupAnimation delay={0.1}>
                        <div className="relative">
                            <div className="bg-primary text-black rounded-3xl p-8">
                                <div className="mb-8">
                                    <h2 className="text-4xl font-bold mb-2">Skyight.</h2>
                                    <div className="w-12 h-1 bg-black"></div>
                                </div>
                                <p className="text-xl font-semibold mb-8">Keep travelling<br />all year round!</p>
                                <div className="flex gap-3">
                                    <button className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                                    </button>
                                    <button className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                                    </button>
                                    <button className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" /></svg>
                                    </button>
                                    <button className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                                    </button>
                                </div>
                            </div>
                            <div className="mt-6 rounded-3xl overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80" alt="Beach" className="w-full h-80 object-cover" />
                            </div>
                            <div className="mt-8 text-gray-500 text-sm space-y-2">
                                <p>© 2025. All rights reserved.</p>
                                <div className="flex gap-4"><button className="hover:text-white transition-colors">License</button><button className="hover:text-white transition-colors">Changelog</button><button className="hover:text-white transition-colors">StyleGuide</button></div>
                                <p>Designed by Flowcub Design</p><p>Powered by Webflow</p>
                            </div>
                        </div>
                    </FadeupAnimation>

                    {/* Right Side */}
                    <div>
                        <FadeupAnimation delay={0.2}><h1 className="text-5xl font-bold mb-4">Let's work together</h1></FadeupAnimation>
                        <FadeupAnimation delay={0.3}><p className="text-gray-400 mb-8">Drop me a message or reach out directly — I'll get back within a day.</p></FadeupAnimation>

                        <div className="grid grid-cols-2 gap-6 mb-8">
                            <FadeupAnimation delay={0.4}>
                                <div><div className="flex items-center gap-2 text-sm text-gray-400 mb-2"><Phone className="w-4 h-4" /><span>Mobile Number</span></div><p className="text-white">+ (38) 0292 7380 9925</p></div>
                            </FadeupAnimation>
                            <FadeupAnimation delay={0.5}>
                                <div><div className="flex items-center gap-2 text-sm text-gray-400 mb-2"><Mail className="w-4 h-4" /><span>Email Address</span></div><p className="text-white">yourmailaddress@gmail.com</p></div>
                            </FadeupAnimation>
                        </div>

                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <FadeupAnimation delay={0.6}>
                                    <div><label className="block text-sm mb-2">First Name*</label><input type="text" name="firstName" placeholder="Rakesh" value={formData.firstName} onChange={handleChange} className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-gray-700 transition-colors" /></div>
                                </FadeupAnimation>
                                <FadeupAnimation delay={0.7}>
                                    <div><label className="block text-sm mb-2">Last Name*</label><input type="text" name="lastName" placeholder="Patel" value={formData.lastName} onChange={handleChange} className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-gray-700 transition-colors" /></div>
                                </FadeupAnimation>
                            </div>
                            <FadeupAnimation delay={0.8}>
                                <div><label className="block text-sm mb-2">Email Address*</label><input type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-gray-700 transition-colors" /></div>
                            </FadeupAnimation>
                            <FadeupAnimation delay={0.9}>
                                <div><label className="block text-sm mb-2">Contact number*</label><input type="tel" name="contactNumber" placeholder="IS 487 65665" value={formData.contactNumber} onChange={handleChange} className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-gray-700 transition-colors" /></div>
                            </FadeupAnimation>
                            <FadeupAnimation delay={1.0}>
                                <div><label className="block text-sm mb-2">Write your Message</label><textarea name="message" placeholder="Write a message here..." value={formData.message} onChange={handleChange} rows="5" className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-gray-700 transition-colors resize-none"></textarea></div>
                            </FadeupAnimation>
                            <FadeupAnimation delay={1.1}>
                                <button className="w-full bg-white text-black font-semibold py-4 rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 group">Send Message<div className="w-8 h-8 bg-black rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"><Send className="w-4 h-4 text-white" /></div></button>
                            </FadeupAnimation>
                            <FadeupAnimation delay={1.2}>
                                <div className="flex items-center gap-2 text-sm text-gray-400"><input type="checkbox" id="privacy" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="w-4 h-4 rounded border-gray-700 bg-gray-900" /><label htmlFor="privacy">I have read and accept the Privacy policy, and agree to join.</label></div>
                            </FadeupAnimation>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}