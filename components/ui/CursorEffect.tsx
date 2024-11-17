"use client";

import React, { useEffect, useRef, useState } from "react";

const CursorEffect: React.FC = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorBorderRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window !== 'undefined') {
      // Initial check
      setIsMobile(window.innerWidth < 768);

      // Add resize listener
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    if (isMobile) return; // Don't add event listeners if on mobile

    const onMouseMove = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        const { clientX, clientY } = e;
        if (cursorDotRef.current && cursorBorderRef.current) {
          cursorDotRef.current.style.left = `${clientX}px`;
          cursorDotRef.current.style.top = `${clientY}px`;
          cursorBorderRef.current.style.left = `${clientX}px`;
          cursorBorderRef.current.style.top = `${clientY}px`;
        }
      });
    };

    const onMouseEnter = () => {
      if (cursorBorderRef.current)
        cursorBorderRef.current.classList.add("active");
    };

    const onMouseLeave = () => {
      if (cursorBorderRef.current)
        cursorBorderRef.current.classList.remove("active");
    };

    document.addEventListener("mousemove", onMouseMove);
    document.querySelectorAll("a, button").forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnter);
      el.addEventListener("mouseleave", onMouseLeave);
    });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.querySelectorAll("a, button").forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnter);
        el.removeEventListener("mouseleave", onMouseLeave);
      });
    };
  }, [isMobile]); // Add isMobile to dependency array

  if (isMobile) return null; // Don't render cursor elements on mobile

  return (
    <>
      <div ref={cursorDotRef} className="cursor-dot" />
      <div ref={cursorBorderRef} className="cursor-border" />
    </>
  );
};

export default CursorEffect;
