import { motion } from "framer-motion";
import privateJetImage from "../../../app/assets/aeroplane.png"; // Replace with your image path

const CoreValues = () => {
    const features = [
        {
            title: "Luxury and Comfort",
            description: "In the realm of contemporary living, the intertwined of luxury & comfort create a tapestry of indulge..."
        },
        {
            title: "Personal Schedule",
            description: "In the realm of contemporary living, the intertwined of luxury & comfort create a tapestry of indulge..."
        },
        {
            title: "Safety and Confidentiality",
            description: "In the realm of contemporary living, the intertwined of luxury & comfort create a tapestry of indulge..."
        },
        {
            title: "Many Airports",
            description: "In the realm of contemporary living, the intertwined of luxury & comfort create a tapestry of indulge..."
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: [0.16, 0.77, 0.47, 0.97] // Smooth ease-out
            }
        }
    };

    return (
        <section className="px-4 sm:px-6 lg:px-8 py-20">
            <div className="container mx-auto relative">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{
                        duration: 0.6,
                        ease: [0.16, 0.77, 0.47, 0.97]
                    }}
                    className="mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Core Values</h1>
                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-700">Private Jet Performance and Specifications</h2>
                </motion.div>

                <div className="flex flex-col gap-12 items-center">
                    {/* Image Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 0.8,
                            ease: [0.16, 0.77, 0.47, 0.97]
                        }}
                        className="absolute -top-20 right-0 "
                    >
                        <img
                            src={privateJetImage}
                            alt="Private Jet Interior"
                            className="w-full h-auto object-cover"
                        />
                    </motion.div>

                    {/* Features List */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        className="grid grid-cols-2 gap-4 "
                    >
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="p-6 rounded-lg border border-secondary bg-gradient-to-t from-primary to-transparent"
                            >
                                <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default CoreValues;