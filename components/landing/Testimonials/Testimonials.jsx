import React from "react";
import { IoIosStar } from "react-icons/io";
import Slider from "react-slick";
import qoutes from "../../../app/assets/qoutes.svg";

const reviews = [
    {
        review: "This platform exceeded my expectations! Booking was seamless and service was top-notch.",
        name: "John Doe",
        role: "Frequent Traveler",
        image: "https://randomuser.me/api/portraits/men/75.jpg",
    },
    {
        review: "Amazing service! I could book a hotel within minutes. Highly recommended!",
        name: "Jane Smith",
        role: "Business Executive",
        image: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
        review: "User-friendly interface and reliable support. Will definitely use again.",
        name: "Michael Brown",
        role: "Remote Worker",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
        review: "Super quick and easy to use. Booking daytime stays has never been easier.",
        name: "Emma Wilson",
        role: "Photographer",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
        review: "Very convenient, especially for last-minute meetings or layovers.",
        name: "David Lee",
        role: "Consultant",
        image: "https://randomuser.me/api/portraits/men/29.jpg",
    },
    {
        review: "Top-notch UI, great experience. I could even cancel last minute without hassle.",
        name: "Sophia Carter",
        role: "Freelancer",
        image: "https://randomuser.me/api/portraits/women/12.jpg",
    },
];

export default function Testimonials() {
    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        autoplay: true,
        speed: 600,
        autoplaySpeed: 3500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    centerPadding: '40px'
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    centerPadding: '20px'
                }
            }
        ]
    };

    return (
        <div className="container mx-auto px-4 py-10 md:py-16 lg:py-20">
            <div className="mb-8 md:mb-12 lg:mb-16 px-4">
                <h2 className="text-3xl md:text-4xl lg:text-5xl text-text mb-4 text-center md:text-left">
                    Our Happy <span className="font-extrabold">Friends Say</span>
                </h2>
                <p className="text-lightGray text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto md:mx-0 text-center md:text-left">
                    Here are their responses regarding the travel services we offer for their vacations
                </p>
            </div>

            <Slider {...settings} className="px-2 md:px-0">
                {reviews.map((item, index) => (
                    <div key={index} className="px-2 py-3 focus:outline-none relative">
                        <div
                            style={{ boxShadow: "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px" }}
                            className="bg-white flex flex-col justify-between h-full min-h-[320px] rounded-xl p-6 space-y-4 mx-auto"
                        >
                            <img className="w-8 md:w-10 absolute top-0 right-6 z-10" src={qoutes} alt="" />
                            <p className="text-text text-base md:text-lg leading-relaxed">{`"${item.review}"`}</p>

                            {/* Stars */}
                            <div className="flex space-x-1">
                                {[...Array(5)].map((_, i) => (
                                    <IoIosStar key={i} className="text-primary text-xl md:text-2xl" />
                                ))}
                            </div>

                            {/* User */}
                            <div className="flex items-center mt-4">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-primary shadow"
                                />
                                <div className="ml-4 text-left">
                                    <h4 className="text-gray-900 font-semibold text-base md:text-lg">
                                        {item.name}
                                    </h4>
                                    <p className="text-sm text-gray-500">{item.role}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}