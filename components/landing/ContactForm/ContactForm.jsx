import React, { useState } from "react";
import { FaArrowRight, FaPaperPlane } from "react-icons/fa";
import Heading from "../Heading/Heading";
// import { useLocation } from "react-router";
import { Button } from "../component";
// import emailjs from "emailjs-com";
// import toast, { Toaster } from "react-hot-toast";

const ContactForm = () => {
    // const location = useLocation()
    const timelineItems = [
        {
            title: "Dream Vacation Consultation",
            description:
                "We start by understanding your travel dreams, preferences, and budget to craft the perfect itinerary.",
        },
        {
            title: "Personalized Itinerary Planning",
            description:
                "Our travel experts design a customized trip plan with flights, hotels, activities, and local experiences.",
        },
        {
            title: "Booking & Logistics",
            description:
                "We handle all reservations, visas, and travel insurance so you can focus on the excitement.",
        },
        {
            title: "Seamless Travel Experience",
            description:
                "From departure to return, we provide 24/7 support, ensuring a smooth and unforgettable journey.",
        },
    ];

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        // const sendData = {
        //     from_name: formData.firstName + ' ' + formData.lastName,
        //     from_email: formData.email,
        //     message: formData.message,
        //     reply_to: formData.email
        // }
        // emailjs
        //     .send(
        //         "service_igdvuzg", // Replace with your service ID
        //         "template_vdh111s", // Replace with your template ID
        //         sendData,
        //         "roQo4NO5jcVvurtIh" // Replace with your public key

        //     )
        //     .then(
        //         (result) => {
        //             console.log("Email successfully sent:", result.text);
        //             toast.success("Message sent successfully!");
        //             setFormData({ firstName: "", lastName: "", email: "", message: "" });
        //         },
        //         (error) => {
        //             console.error("Error sending email:", error.text);
        //             toast.error("Failed to send the message. Please try again.");
        //         }
        //     );
    };

    return (
        <section
            className="container mx-auto px-4 py-6 my-4 md:px-16 md:py-12 md:my-8  h-fit "

        >
            {/* <Toaster /> */}
            {/* {location.pathname !== "/contact" && <Heading title={"Contact"} boldTitleColor={"primary"} boldTitle={" Us"} className={"text-center"} />} */}
            <div className="flex flex-col gap-16 md:flex-row py-10">
                <div className="md:w-1/2 mb-8 md:mb-0">
                    <h2 className="text-2xl font-bold mb-6">
                        What Happens When You Collaborate With Us?
                    </h2>
                    <div className="relative space-y-12 pl-8">
                        <div className="absolute top-2 left-4 w-[2px] h-full "></div>
                        {timelineItems.map((item, index) => (
                            <div key={index} className="relative flex items-start space-x-4">
                                <div className="absolute top-[8px] left-[-21px] w-3 h-3 rounded-full border border-lightGray-4 "></div>
                                <div>
                                    <h2 className="text-xl font-bold">{item.title}</h2>
                                    <p className="mt-1 font-sans">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div id="contact-us" className="md:w-1/2 text-text  md:p-6 flex flex-col rounded-lg">
                    <div className="text-3xl flex justify-center items-center my-4 rounded-full bg-primary p-2 w-[70px] h-[70px] mx-auto">
                        <FaPaperPlane className="text-white" />
                    </div>
                    <h3 className="text-2xl text-primary font-bold mb-6 text-center">
                        Send us a message
                    </h3>
                    <form className="space-y-4">
                        <div className="flex gap-4">
                            <input
                                value={formData.firstName}
                                onChange={handleChange}
                                name="firstName"
                                type="text"
                                placeholder="First name*"
                                className="w-1/2 p-2 border border-lightGray text-text rounded-md focus:outline-none"
                            />
                            <input
                                value={formData.lastName}
                                onChange={handleChange}
                                name="lastName"
                                type="text"
                                placeholder="Last name"
                                className="w-1/2 p-2 border border-lightGray text-text rounded-md focus:outline-none"
                            />
                        </div>
                        <input
                            value={formData.email}
                            onChange={handleChange}
                            name="email"
                            type="email"
                            placeholder="Email*"
                            className="w-full p-2 border border-lightGray text-text rounded-md focus:outline-none"
                        />
                        <textarea
                            value={formData.message}
                            onChange={handleChange}
                            name="message"
                            placeholder="Briefly describe your tour goals or what you'd like to discuss."
                            className="w-full p-2 text-text border border-lightGray rounded-md h-32 focus:outline-none"
                        ></textarea>
                        <Button onClick={handleSubmit}
                        >
                            Submit
                            <FaArrowRight />
                        </Button>

                    </form>
                </div>
            </div>
        </section>
    );
};

export default ContactForm;