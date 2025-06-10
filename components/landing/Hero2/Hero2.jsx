import { useState } from 'react';

const Hero2 = () => {
    const [destination, setDestination] = useState('Where would you like to go?');
    const [date, setDate] = useState('When it will start?');

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Hero Section */}
                <div className="p-8 md:p-12 lg:p-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                        Wherever You Go,<br />
                        Let Us Make It Happen
                    </h1>
                    <p className="text-lg md:text-xl opacity-90 max-w-2xl">
                        Take the unique chance to get the most unforgettable experience. These are the emotions you will never forget.
                    </p>
                </div>

                {/* Form Section */}
                <div className="p-8 md:p-12 lg:p-16">
                    <div className="space-y-8">
                        {/* Divider */}
                        <div className="border-t border-gray-200"></div>

                        {/* Destination Input */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                DESTINATION
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={destination}
                                    onChange={(e) => setDestination(e.target.value)}
                                    className="w-full p-4 border-b border-gray-300 focus:border-blue-500 focus:outline-none text-gray-700 text-lg"
                                />
                                <div className="absolute right-0 top-0 h-full flex items-center pr-3 pointer-events-none">
                                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Date Input */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                DATE
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="w-full p-4 border-b border-gray-300 focus:border-blue-500 focus:outline-none text-gray-700 text-lg"
                                />
                                <div className="absolute right-0 top-0 h-full flex items-center pr-3 pointer-events-none">
                                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-gray-200"></div>

                        {/* CTA Button */}
                        <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold py-4 px-6 rounded-lg text-lg transition duration-200 transform hover:scale-105">
                            LET'S EXPLORE
                        </button>
                    </div>

                    {/* Footer */}
                    <div className="mt-12 text-center text-gray-400 text-sm">
                        Made in Webflow
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero2;