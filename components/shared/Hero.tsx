import React from "react";
import { Navbar } from "./Navbar";
import { HeroContent } from "./HeroContent";
import { SocialLinks } from "./SocialLinks";
import { ScrollMessage } from "./ScrollMessage";
import BgGlow from "./BgGlow";

export default function Hero() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full  font-inter relative">
      <BgGlow />
      <Navbar />
      <HeroContent />
      <SocialLinks />
      <ScrollMessage />
    </div>
  );
}
