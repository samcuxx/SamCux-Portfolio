"use client";

import React, { useEffect, useState } from "react";
import "./RubberBand.css";

interface AnimatedTextProps {
  text: string;
  className?: string;
  initialClass?: string;
  hoverClass?: string;
  animationDelay?: number;
  color?: string; // New color prop
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className,
  initialClass = "text-animate-fast",
  hoverClass = "text-animate-fast-hover",
  animationDelay = 30,
  color = "inherit", // Default color
}) => {
  const [letterClass, setLetterClass] = useState(initialClass);
  const strArray = text.split("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass(hoverClass);
    }, animationDelay);
    return () => clearTimeout(timer);
  }, [hoverClass, animationDelay]);

  return (
    <div className={className}>
      {strArray.map((char, i) => (
        <span
          key={char + i}
          className={`${letterClass} _${i}`}
          style={{ color }} // Apply color
        >
          {char}
        </span>
      ))}
    </div>
  );
};

export default AnimatedText;
