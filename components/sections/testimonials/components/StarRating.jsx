// src/components/StarRating.jsx
import React from 'react';
import { Star } from 'lucide-react';

// Yeh component 5 stars render karega
export default function StarRating() {
    return (
        <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} size={14} className="text-white fill-current" />
            ))}
        </div>
    );
}