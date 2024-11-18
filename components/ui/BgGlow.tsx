"use client";

import { useEffect, useRef } from "react";

export default function BgGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const rect = glow.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate distance from center
      const distanceX = (clientX - centerX) / rect.width;
      const distanceY = (clientY - centerY) / rect.height;

      // Calculate rotation based on mouse position
      const rotation = Math.atan2(distanceY, distanceX) * (180 / Math.PI);

      // Update gradient position and rotation
      glow.style.setProperty("--mouse-x", `${clientX}px`);
      glow.style.setProperty("--mouse-y", `${clientY}px`);
      glow.style.setProperty("--rotation", `${rotation}deg`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Primary glow layer */}
        {/* <div
          ref={glowRef}
          className="absolute inset-0 opacity-20 dark:opacity-10"
          style={{
            background: `
              radial-gradient(
                1200px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
                rgba(255, 215, 0, 0.08),
                rgba(255, 215, 0, 0.05),
                transparent 50%
              ),
              radial-gradient(
                800px circle at calc(var(--mouse-x, 50%) - 200px) calc(var(--mouse-y, 50%) - 200px),
                rgba(14, 165, 234, 0.05),
                transparent 50%
              ),
              radial-gradient(
                600px circle at calc(var(--mouse-x, 50%) + 200px) calc(var(--mouse-y, 50%) + 200px),
                rgba(11, 209, 209, 0.05),
                transparent 50%
              )
            `,
          }}
        /> */}

        {/* Ambient background gradients */}
        <div className="absolute inset-0 opacity-30 dark:opacity-20">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-sa-blue rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
          <div className="absolute top-0 -right-4 w-72 h-72 bg-sa-blue2 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-sa-light-primary dark:bg-sa-dark-primary rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
        </div>

        {/* Grain overlay */}
        <div 
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '100px 100px'
          }}
        />
      </div>
    </>
  );
}
