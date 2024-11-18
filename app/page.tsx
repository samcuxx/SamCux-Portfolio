import { HeroContent } from "@/components/Home/HeroContent";
import BgGlow from "@/components/ui/BgGlow";

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full font-inter relative">
      <BgGlow />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative">
        <HeroContent />
      </section>

  
    </div>
  );
}
