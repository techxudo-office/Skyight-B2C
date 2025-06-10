import { motion } from "framer-motion";
import { AnimateTitle } from "../component";

const GoogleMap = () => {
    return (
        <section className="flex flex-col items-center justify-center px-4 py-12  container mx-auto">
            <AnimateTitle title={"You can find us"} />
            <motion.div
                className="w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl border-4 border-white"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                <iframe
                    title="SkyLight Location"
                    className="w-full h-[400px] sm:h-[500px]"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.000410725724!2d67.05964401498874!3d24.86073448405342!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33eccc6ac4f45%3A0xb2d2c6ffb3a305fc!2sUniversity%20of%20Karachi!5e0!3m2!1sen!2s!4v1716741452595!5m2!1sen!2s"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                ></iframe>
            </motion.div>
        </section>
    );
};

export default GoogleMap;
