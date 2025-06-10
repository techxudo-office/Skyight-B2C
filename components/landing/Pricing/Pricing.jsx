import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { PiArrowBendDownRightThin } from "react-icons/pi";
import { CgCalendarDates } from "react-icons/cg";
import { FaTruck, FaStar, FaUserFriends, FaClock, FaGlobe, FaRobot, FaStopwatch, FaAd, FaVideo, FaBlog, FaChartLine, FaCalendarAlt, FaHeadset, FaRegCalendarCheck, FaPhoneVolume, FaEnvelopeOpenText, FaBookmark } from "react-icons/fa";
import { SlEnergy } from "react-icons/sl";
import { RiBox3Fill, RiRobot2Line } from "react-icons/ri";
import { BsStars } from "react-icons/bs";
import { BiSolidReport } from "react-icons/bi";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { MdCancel, MdEmail, MdMail, MdOutlineCancel, MdSms } from "react-icons/md";
// import { Link } from "react-router-dom";
import { AnimateTitle, Button } from "../component";

export const priceData = [
    {
        smBtn: "starter",
        title: "Best for solopreneurs or startups wanting fast automation.",
        price: "$499",
        priceInfo: "Check price in EU €",
        demoBtn: "Book a demo",
        serviceTitle: "What is included:",
        services: [
            { icon: <FaTruck />, label: "Smart Logo + Branding" },
            { icon: <FaStar />, label: "1-Page Website" },
            { icon: <SlEnergy />, label: "Instagram Setup + 5 Captions via AI" },
            { icon: <FaUserFriends />, label: " 1 AI Video Ad" },
            { icon: <FaRobot />, label: " AI Chatbot (Website Only)" },
            { icon: <FaGlobe />, label: " Free Online Brand Audit" },
            { icon: <FaClock />, label: "7 Days Delivery" },
        ],
    },
    {
        smBtn: "AI Growth Engine",
        title: "Ideal for local businesses scaling lead gen & automation.",
        price: " $999",
        priceInfo: "Check price in EU €",
        demoBtn: "Book a demo",
        serviceTitle: "What is included:",
        services: [
            { icon: <FaBangladeshiTakaSign />, label: " All from Starter Package" },
            { icon: <RiBox3Fill />, label: "WhatsApp Chatbot + FAQ Assistant" },
            { icon: <SlEnergy />, label: "5-Page SEO Website" },
            { icon: <FaUserFriends />, label: "AI Blog (1/Month)" },
            { icon: <FaStopwatch />, label: "CRM + AI-Powered Follow-up Reminders" },
            { icon: <FaGlobe />, label: " Social Media Content (10 AI-Crafted Posts + Captions)" },
            { icon: <MdMail />, label: "Email Marketing Setup (1 AI campaign/month)" },
            { icon: <FaClock />, label: "2 Weeks Delivery" },
        ],
    },
    {
        smBtn: "AI Dominator Suite",
        title: "High-impact funnel + full automation + ad management.",
        price: "$1,799",
        priceInfo: "Check price in EU €",
        demoBtn: "Book a demo",
        serviceTitle: "What is included:",
        services: [
            {
                icon: <BsStars className="text-primary" />,
                label: "Everything in Growth Engine"
            },
            {
                icon: <BiSolidReport className="text-primary" />,
                label: "Full Funnel Page (Conversion Optimized)"
            },
            {
                icon: <FaAd className="text-primary" />,
                label: "Meta & Google Ad Setup with AI Ad Copy & Split Tests"
            },
            {
                icon: <FaVideo className="text-primary" />,
                label: "2 AI Video Ads / Reels"
            },
            {
                icon: <FaBlog className="text-primary" />,
                label: "2 Blog Posts + SEO Optimization"
            },
            {
                icon: <FaChartLine className="text-primary" />,
                label: "AI Weekly Report with Actionable Insights"
            },
            {
                icon: <RiRobot2Line className="text-primary" />,
                label: "Custom GPT Assistant for Lead Qualification"
            },
            {
                icon: <MdEmail className="text-primary" />,
                label: "30-Day Email Automation"
            },
            {
                icon: <MdSms className="text-primary" />,
                label: "30-Day SMS Automation"
            },
            {
                icon: <FaCalendarAlt className="text-primary" />,
                label: "1-on-1 Strategy Call Monthly"
            },
            {
                icon: <FaHeadset className="text-primary" />,
                label: "3 Weeks Delivery + 30 Days Support"
            }
        ]
    }
];

const Pricing = () => {
    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10
            }
        }
    };

    const [isModalOpen, setIsModalOpen] = React.useState(false);

    return (
        <div className="bg-six  py-20">
            <AnimateTitle text={` Grow your business with our CX tools and affordable fulfilment`}
                title={"Pricing"} />

            {/* Content Grid */}
            <div className="flex flex-col gap-8 max-w-7xl mx-auto px-4">
                {/* Left Column - Header */}
                <div className="  flex flex-col items-center px-4 text-text text-center md:px-20 mb-4">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <Button >
                            <CgCalendarDates className="text-xl" />
                            Calculate your fulfilment prices
                        </Button>
                    </motion.div>
                    <motion.div
                        className="flex items-start gap-2"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <PiArrowBendDownRightThin className="text-3xl glowing-green" />
                        <p>BtoC and BtoB logistics to scale your brand</p>
                    </motion.div>
                </div>

                {/* Right Column - Cards */}
                <motion.div
                    className=""
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ margin: "-100px" }}
                    variants={container}
                >
                    <div className="grid grid-cols-1 md:grid-cols-3  gap-6 md:gap-2 pb-6 px-4">
                        {priceData.map((e, i) => (
                            <motion.div
                                key={i}
                                className={`flex-none w-full ${i === 1 ? "lg:-translate-y-6 max-lg:mb-10" : ""} glow-hover transition-all duration-500 rounded-3xl border border-lightGray relative`}
                                variants={item}
                            >
                                <div className={`rounded-3xl ${i === 1 ? "bg-primary " : ""} h-full`}>
                                    {i === 1 && (
                                        <p className="text-white text-center py-2 glowing-green">
                                            Most Popular
                                        </p>
                                    )}
                                    <div className={`bg-white p-6 rounded-3xl flex flex-col gap-4 h-full ${i === 1 ? "border-2 border-primary " : ""}`}>
                                        <div className="flex flex-col items-center gap-3">
                                            <button className={`px-5 py-1 rounded-full border-primary border text-primary`}>
                                                {e.smBtn}
                                            </button>
                                            <p className="text-center text-gray-600">{e.title}</p>
                                            <h1 className="text-3xl font-bold text-gray-900">{e.price}</h1>
                                            {/* <p className="text-sm text-gray-500">{e.priceInfo}</p> */}
                                        </div>
                                        {/* <Link to={"/contact"}
                                            className="flex justify-center"
                                        >
                                            <Button className={"mx-auto"}>
                                                <FaBookmark />
                                                {e.demoBtn}
                                            </Button>
                                        </Link> */}

                                        <div className="flex flex-col gap-2">
                                            <h4 className="text-sm text-gray-500">{e.serviceTitle}</h4>
                                            {e.services.map((val, index) => (
                                                <div key={index} className="flex items-center gap-2 text-sm">
                                                    <span className="text-primary">{val.icon}</span>
                                                    <p>{val.label}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Pricing;