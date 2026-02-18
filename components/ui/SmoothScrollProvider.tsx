"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

type LocomotiveScrollInstance = {
  update: () => void;
  destroy: () => void;
};

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<LocomotiveScrollInstance | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;

    async function init() {
      if (!containerRef.current) return;
      const LocomotiveScroll = (await import("locomotive-scroll")).default;

      if (cancelled) return;

      scrollRef.current = new LocomotiveScroll({
        el: containerRef.current,
        smooth: true,
        multiplier: 0.75,
        inertia: 0.5,
        reloadOnContextChange: true,
      }) as unknown as LocomotiveScrollInstance;

      // Best-effort update after initial paint + images.
      setTimeout(() => scrollRef.current?.update(), 50);
      window.addEventListener("load", () => scrollRef.current?.update(), {
        once: true,
      });
    }

    init();

    return () => {
      cancelled = true;
      scrollRef.current?.destroy();
      scrollRef.current = null;
    };
  }, []);

  useEffect(() => {
    // Update on route change so measurements stay correct.
    const t = setTimeout(() => scrollRef.current?.update(), 50);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <div data-scroll-container ref={containerRef}>
      {children}
    </div>
  );
}

