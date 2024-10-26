"use client";

import React, { useEffect, useState } from "react";
import "./RubberBand.css";

interface AnimatedTextProps {
  text: string;
  className?: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className }) => {
  const [letterClass, setLetterClass] = useState("text-animate-fast");
  const strArray = text.split("");

  useEffect(() => {
    setTimeout(() => {
      setLetterClass("text-animate-fast-hover");
    }, 30);
  }, []);

  return (
    <div className={className}>
      {strArray.map((char, i) => (
        <span key={char + i} className={`${letterClass} _${i}`}>
          {char}
        </span>
      ))}
    </div>
  );
};

export default AnimatedText;
