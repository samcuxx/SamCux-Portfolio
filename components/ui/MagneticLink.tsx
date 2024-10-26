"use client";

import React, { useState, useRef, useEffect } from "react";

interface MagneticLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const MagneticLink: React.FC<MagneticLinkProps> = ({
  href,
  children,
  className,
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    if (ref.current) {
      const { left, top, width, height } = ref.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const deltaX = mouseX - centerX;
      const deltaY = mouseY - centerY;

      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const maxDistance = Math.max(width, height); // Increased from maxDistance / 2

      if (distance < maxDistance) {
        const factor = 0.5; // Increased from 0.2 to make the effect stronger
        setPosition({
          x: deltaX * factor,
          y: deltaY * factor,
        });
      } else {
        setPosition({ x: 0, y: 0 });
      }
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-block transition-transform duration-200 ease-out ${className}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </a>
  );
};

export default MagneticLink;
