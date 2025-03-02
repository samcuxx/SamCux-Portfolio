import { Footer } from "@/components/global/Footer";
import Navbar from "@/components/global/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
