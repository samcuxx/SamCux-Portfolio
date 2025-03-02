import { ContactContent } from "@/components/Contact/ContactContent";
import BgGlow from "@/components/ui/BgGlow";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

export default function Contact() {
  return (
    <div className="font-inter relative pt-7 md:pt-24">
      <ScrollProgress />
      <BgGlow />
      <ContactContent />
    </div>
  );
}
