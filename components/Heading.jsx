import React from 'react';
import FadeupAnimation from './FadeUpAnimation';

export default function Heading({
    tag,
    title,
    subtitle,
    subtitle2,
    className = ''
}) {
    return (
        <div className={`text-center py-10 sm:py-16 ${className}`}>
            <FadeupAnimation>
                <div className="container mx-auto px-4">
                    {tag && (
                        <p className="text-white/90 text-sm tracking-tight font-semibold leading-tight md:text-lg max-w-xl mx-auto">
                            {tag}
                        </p>
                    )}
                    <h2 className="text-white font-bold text-4xl sm:text-5xl leading-tight my-7">
                        {title}
                    </h2>
                    {subtitle && (
                        <p className="text-white/90 text-sm tracking-tight font-semibold leading-tight md:text-lg max-w-xl mx-auto">
                            {subtitle}
                        </p>
                    )}
                    {subtitle2 && (
                        <p className="text-white/90 mt-4 text-sm tracking-tight font-semibold leading-tight md:text-lg max-w-md mx-auto">
                            {subtitle2}
                        </p>
                    )}
                </div>
            </FadeupAnimation>
        </div>
    );
}
