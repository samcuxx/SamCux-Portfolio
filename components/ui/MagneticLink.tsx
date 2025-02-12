"use client";

import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";

interface MagneticLinkProps {
  href: string;
  target?: string;
  children: React.ReactNode;
  className?: string;
}

const MagneticLink: React.FC<MagneticLinkProps> = ({
  href,
  target,
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
      const maxDistance = Math.max(width, height);

      if (distance < maxDistance) {
        const factor = 0.3;
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
    <Link
      ref={ref}
      href={href}
      target={target}
      rel="noopener noreferrer"
      className={`inline-block transition-transform duration-200 ease-out ${className}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </Link>
  );
};

export default MagneticLink;
