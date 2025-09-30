"use client"
import React, { useState } from 'react';
import { ChevronRight, MapPin } from 'lucide-react';
import Heading from '../../Heading';
import FadeupAnimation from '../../FadeUpAnimation';

const mockDestinations = [
    {
        id: 1,
        name: 'Calangute',
        location: 'Goa',
        country: 'India',
        flag: '🇮🇳',
        price: 4895,
        image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80',
        categories: ['all', 'beach']
    },
    {
        id: 2,
        name: 'Mumbai',
        location: 'Maharashtra',
        country: 'India',
        flag: '🇮🇳',
        price: 1468,
        image: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=800&q=80',
        categories: ['all', 'culture']
    },
    {
        id: 3,
        name: 'Bangkok',
        location: 'Bangkok Province',
        country: 'Thailand',
        flag: '🇹🇭',
        price: 7466,
        image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&q=80',
        categories: ['all', 'culture', 'family']
    },
    {
        id: 4,
        name: 'Bali',
        location: 'Bali',
        country: 'Indonesia',
        flag: '🇮🇩',
        price: 5299,
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
        categories: ['all', 'beach', 'culture']
    },
    {
        id: 5,
        name: 'Maldives',
        location: 'Malé',
        country: 'Maldives',
        flag: '🇲🇻',
        price: 12500,
        image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80',
        categories: ['all', 'beach']
    },
    {
        id: 6,
        name: 'Swiss Alps',
        location: 'Zermatt',
        country: 'Switzerland',
        flag: '🇨🇭',
        price: 8900,
        image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80',
        categories: ['all', 'ski', 'family']
    },
    {
        id: 7,
        name: 'Tokyo',
        location: 'Tokyo',
        country: 'Japan',
        flag: '🇯🇵',
        price: 6750,
        image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80',
        categories: ['all', 'culture', 'family']
    },
    {
        id: 8,
        name: 'Dubai',
        location: 'Dubai',
        country: 'UAE',
        flag: '🇦🇪',
        price: 9200,
        image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
        categories: ['all', 'family']
    }
];

const tabs = [
    { id: 'all', label: 'All' },
    { id: 'beach', label: 'Beach' },
    { id: 'culture', label: 'Culture' },
    { id: 'ski', label: 'Ski' },
    { id: 'family', label: 'Family' }
];

export default function TopDestinations() {
    const [activeTab, setActiveTab] = useState('all');

    const filteredDestinations = mockDestinations.filter(dest =>
        dest.categories.includes(activeTab)
    );

    return (
        <div className="min-h-screen bg-black text-white pb-16 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <Heading title={" Stays in Top Destinations"} subtitle={"  Find the right place to stay — beach breaks, family getaways, and more."} />


                {/* Tabs */}
                <div className="flex justify-center gap-3 mb-12 flex-wrap">
                    {tabs.map((tab, i) => (
                        <FadeupAnimation
                            key={tab.id}
                            delay={i * 0.2}
                        >
                            <button
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${activeTab === tab.id
                                    ? 'bg-primary text-black shadow-lg '
                                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        </FadeupAnimation>
                    ))}
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDestinations.map((destination, idx) => (
                        <FadeupAnimation key={idx} delay={idx * 0.1}>


                            <div
                                key={destination.id}
                                className="group  rounded-2xl overflow-hidden p-3 transition-all duration-300 cursor-pointer border border-gray-800 hover:border-gray-700"
                            >
                                {/* Image */}
                                <div className="relative h-56 overflow-hidden rounded-xl">
                                    <img
                                        src={destination.image}
                                        alt={destination.name}
                                        className="w-full h-full rounded-xl object-cover  transition-transform duration-500"
                                    />
                                    <div className="absolute rounded-xl inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="text-2xl font-bold mb-2">{destination.name}</h3>

                                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                                        <span>{destination.location}</span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1">
                                            <span>{destination.flag}</span>
                                            <span>{destination.country}</span>
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-2xl font-bold">
                                                ${destination.price.toLocaleString()}
                                            </div>
                                            <div className="text-gray-500 text-sm">Avg. nightly price</div>
                                        </div>

                                        <button className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-all duration-300">
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </FadeupAnimation>
                    ))}
                </div>

                {/* Empty State */}
                {filteredDestinations.length === 0 && (
                    <div className="text-center py-20">
                        <MapPin className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                        <h3 className="text-xl font-semibold text-gray-400">
                            No destinations found
                        </h3>
                        <p className="text-gray-500 mt-2">
                            Try selecting a different category
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}