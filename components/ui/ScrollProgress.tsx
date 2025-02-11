"use client";

import { motion, useSpring, useScroll } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gray-200/50 to-gray-300/50 dark:from-[#131C31]/50 dark:to-[#1a2539]/50 backdrop-blur-sm z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="h-full bg-gradient-to-r from-[#000000] via-[#70610d] to-[#ffcc00] origin-[0%]"
        style={{ scaleX }}
        transition={{ type: "spring" }}
      />
    </motion.div>
  );
}
