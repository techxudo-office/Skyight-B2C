import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

export default function FadeupAnimation({
    children,
    className = '',
    delay = 0.2,
    yOffset = 40,
    // blurAmount = 2,
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const mainControls = useAnimation();

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible");
        }
    }, [isInView, mainControls]);

    return (
        <div className={`relative ${className}`}>
            <motion.div

                variants={{
                    hidden: {
                        opacity: 0,
                        y: yOffset,
                    },
                    visible: {
                        opacity: 1,
                        y: 0,
                    },
                }}
                initial="hidden"
                whileInView={"visible"}
                viewport={{ once: true }}
                // animate={mainControls}
                transition={{
                    duration: 0.7,
                    delay: delay,
                    ease: [0.17, 0.55, 0.55, 1]
                    // ease: "easeInOut"
                }}
            >
                {children}
            </motion.div>
        </div>
    );
}
