"use client";

import React, { useEffect, useRef, useState } from "react";

const CursorEffect: React.FC = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorBorderRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    let frameId: number | null = null;
    const latest = { x: 0, y: 0 };

    const onMouseMove = (e: MouseEvent) => {
      latest.x = e.clientX;
      latest.y = e.clientY;

      if (frameId == null) {
        frameId = window.requestAnimationFrame(() => {
          const { x, y } = latest;
          if (cursorDotRef.current && cursorBorderRef.current) {
            cursorDotRef.current.style.left = `${x}px`;
            cursorDotRef.current.style.top = `${y}px`;
            cursorBorderRef.current.style.left = `${x}px`;
            cursorBorderRef.current.style.top = `${y}px`;
          }
          frameId = null;
        });
      }
    };

    const onPointerOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target || !cursorBorderRef.current) return;
      if (target.closest("a,button,[data-cursor-interactive='true']")) {
        cursorBorderRef.current.classList.add("active");
      }
    };

    const onPointerOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target || !cursorBorderRef.current) return;
      if (target.closest("a,button,[data-cursor-interactive='true']")) {
        cursorBorderRef.current.classList.remove("active");
      }
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onPointerOver);
    document.addEventListener("mouseout", onPointerOut);

    return () => {
      if (frameId != null) {
        window.cancelAnimationFrame(frameId);
      }
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onPointerOver);
      document.removeEventListener("mouseout", onPointerOut);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      <div ref={cursorDotRef} className="cursor-dot" />
      <div ref={cursorBorderRef} className="cursor-border" />
    </>
  );
};

export default CursorEffect;
