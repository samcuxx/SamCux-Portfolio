"use client";

import { motion, useSpring, useScroll } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 right-0 bottom-0 w-[0.15rem] bg-gradient-to-b from-gray-100/10 to-gray-200/10 dark:from-[#131C31]/10 dark:to-[#1a2539]/10 backdrop-blur-sm z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="h-full w-full bg-gradient-to-b from-gray-600 via-gray-700 to-gray-800 dark:from-[#ffe60000] dark:via-[#ffe60023] dark:to-[#FFE400] origin-top"
        style={{ scaleY }}
        transition={{ type: "spring" }}
      />
    </motion.div>
  );
}
