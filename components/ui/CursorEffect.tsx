"use client";

import React, { useEffect, useRef } from "react";

const CursorEffect: React.FC = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorBorderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
  }, []);

  return (
    <>
      <div ref={cursorDotRef} className="cursor-dot" />
      <div ref={cursorBorderRef} className="cursor-border" />
    </>
  );
};

export default CursorEffect;
