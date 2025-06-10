import React from 'react'
import { motion } from 'framer-motion'
export default function AnimateTitle({ title, text }) {
    return (
        <motion.div
            className="text-center mb-12 px-4"
        >
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: "-100px" }}
                transition={{
                    duration: 0.6,
                    ease: [0.16, 0.77, 0.47, 0.97],
                    delay: 0.2
                }}
                className="text-3xl md:text-5xl font-bold text-text mb-4 capitalize">
                {title}
            </motion.h2>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: "-100px" }}
                transition={{
                    duration: 0.6,
                    ease: [0.16, 0.77, 0.47, 0.97],
                    delay: 0.4
                }}
                className="text-gray-600 max-w-2xl mx-auto">
                {text}
            </motion.p>
        </motion.div>
    )
}
