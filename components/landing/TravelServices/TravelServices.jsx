import React from "react";
import { motion } from "framer-motion";

const TravelServices = () => {
    const services = [
        {
            id: "1",
            imageUrl: "https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=600",
            title: "Customized Tours",
            description: "Tailor-made vacation packages designed around your unique preferences, travel pace, and budget with personalized itineraries crafted by our expert travel consultants for unforgettable experiences."
        },
        {
            id: "2",
            imageUrl: "https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=600",
            title: "Luxury Accommodations",
            description: "Exclusive selection of five-star hotels, boutique resorts, and premium villas offering exceptional comfort, world-class amenities, and authentic cultural experiences in prime locations worldwide."
        },
        {
            id: "3",
            imageUrl: "https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            title: "Flight Bookings",
            description: "Competitive airfare deals on all major airlines with flexible booking options, seat upgrades, and round-the-clock support for seamless domestic and international flight arrangements."
        },
        {
            id: "4",
            imageUrl: "https://images.pexels.com/photos/32204469/pexels-photo-32204469/free-photo-of-ferry-approaches-sydney-opera-house.jpeg?auto=compress&cs=tinysrgb&w=600",
            title: "Cruise Packages",
            description: "All-inclusive luxury cruise vacations featuring gourmet dining, premium entertainment, and exotic itineraries to stunning destinations across oceans, rivers, and tropical island paradises."
        },
        {
            id: "5",
            imageUrl: "https://images.pexels.com/photos/2174656/pexels-photo-2174656.jpeg?auto=compress&cs=tinysrgb&w=600",
            title: "Adventure Travel",
            description: "Thrilling expeditions including African safaris, Himalayan treks, Amazon explorations, and extreme sports adventures with expert guides and top-tier safety equipment included."
        },
        {
            id: "6",
            imageUrl: "https://images.pexels.com/photos/238622/pexels-photo-238622.jpeg?auto=compress&cs=tinysrgb&w=600",
            title: "Travel Insurance",
            description: "Comprehensive protection plans covering medical emergencies, trip cancellations, lost baggage, and unexpected incidents to safeguard your health and financial investment throughout your journey."
        }
    ];

    return (

        <div
            className="container mx-auto flex flex-col md:flex-row items-start min-h-screen"
            id="services"
        >
            {/* Left Section */}
            <div className="w-full md:w-1/2 p-6 md:p-16 space-y-6 md:sticky md:top-0">
                <h1 className="text-3xl md:text-5xl font-bold">
                    Our Travel Services
                </h1>
                <section className="p-6 relative h-96 mb-20">
                    <img
                        src={"https://html.themeholy.com/tourm/demo/assets/img/normal/about_3_1.jpg"}
                        alt="Lake View"
                        className="rounded-xl w-72 h-auto r absolute top-0 left-0"
                    />
                    <img
                        src={"https://html.themeholy.com/tourm/demo/assets/img/normal/about_3_2.jpg"}
                        alt="Group Hiking"
                        className="rounded-xl w-72 h-96 object-cover absolute right-0 top-10 border-4 border-white w-60"
                    />
                    <motion.img
                        src={"https://html.themeholy.com/tourm/demo/assets/img/normal/about_3_3.jpg"}
                        alt="Yacht"
                        className="rounded-xl w-72 h-40 object-cover absolute -bottom-20 border-4 border-white "
                        animate={{
                            x: ["-13px", "13px", "-13px"],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                </section>
            </div>

            {/* Right Section */}
            <motion.div
                className="w-full md:w-1/2 p-6 md:p-16 md:px-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                {services.map((service, index) => (
                    <motion.div
                        key={index}
                        className="space-y-4 md:space-y-4  rounded-md mb-8 md:mb-12 p-6  border border-lightGray text-white text-left bg-cover bg-center relative cursor-default h-96 group overflow-hidden "
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{
                            boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
                            scale: 1.02
                        }}
                        style={{
                            backgroundImage: `url(${service.imageUrl})`
                        }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.2 }}
                    >
                        <div className=" text-primary text-shadow-current text-3xl font-extrabold z-10 relative">
                            {service.id}<span className="font-extrabold text-white text-3xl pb-1">.</span>
                        </div>
                        {/* <div className="flex justify-center">
                            <img src={service.imageUrl} alt={service.title} className="w-[120px]" />
                        </div> */}
                        <motion.h1
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}

                            className="text-xl md:text-2xl font-bold z-10 relative ">
                            {service.title}
                        </motion.h1>
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}

                            className="w-full h-[0.2px] bg-white z-10 relative"></motion.div>
                        <motion.p
                            initial={{ y: 40, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, ease: "easeOut", delay: 0.7 }}

                            className="text-shadow-black   font-sans z-10 relative ">
                            {service.description}
                        </motion.p>
                        <div className="absolute inset-0 bg-black/20 z-0 h-full"></div>
                        <div className="absolute translate-y-full group-hover:translate-y-0 inset-0 bg-gradient-to-t from-pink-400/70 via-transparent to-transparent z-0 h-full flex justify-end items-end p-4 transition-all duration-300 ease-initial">
                            <button className="mt-8 border border-white  text-white px-6 py-3 rounded-full font-semibold hover:bg-primary cursor-pointer transition-all duration-200">
                                Explore More <span className="ml-2">→</span>
                            </button>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default TravelServices;