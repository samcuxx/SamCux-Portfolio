import Link from "next/link";
import BgGlow from "@/components/ui/BgGlow";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center relative">
      <BgGlow />
      <div className="container mx-auto flex flex-col items-center justify-center px-4 py-16 text-center">
        <h1 className="text-8xl md:text-9xl font-bold tracking-tighter text-[#ffe400]">404</h1>
        <h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">Page not found</h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-xl">
          Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
        </p>
        <Link 
          href="/"
          className="mt-8 px-8 py-3 rounded-lg bg-[#ffe400] text-gray-900 font-bold hover:bg-[#ffec4d] transition-all"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
} 