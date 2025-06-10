import React from 'react'

export default function Heading({ title, boldTitle, subText, boldTitleColor, className }) {
    return (

        <div className="">
            <h1 className={`text-4xl max-w-2xl mx-auto  sm:text-5xl md:text-6xl font-sans font-semibold leading-tight mb-6 
                    ${className}`}
            >
                {title}<span className={`font-bold text-${boldTitleColor}`}>{boldTitle}</span>
            </h1>
            <p className=" text-base md:text-xl max-w-xl mx-auto  mb-6">
                {subText}
            </p>
        </div>

    )
}
