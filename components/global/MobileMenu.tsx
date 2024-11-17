"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import Logo from "@/public/logo.png";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Projects",
      href: "/projects",
    },
    {
      title: "Contact",
      href: "/contact",
    },
    {
      title: "Photos",
      href: "/photos",
    },
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <>
      <button
        aria-label="Toggle Menu"
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden relative z-50 w-8 h-8 flex flex-col justify-center items-center gap-1.5"
      >
        <span
          className={`w-6 h-0.5 bg-current transition-all duration-300 ${
            isOpen ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <span
          className={`w-6 h-0.5 bg-current transition-all duration-300 ${
            isOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`w-6 h-0.5 bg-current transition-all duration-300 ${
            isOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        />
      </button>

      <div
        className={`fixed inset-0 bg-white dark:bg-[#0B1121] md:hidden transition-transform duration-500 ease-in-out z-40 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between p-6 border-b dark:border-gray-800">
            <Link href="/" onClick={() => setIsOpen(false)} className="z-50">
              <Image src={Logo} width={35} height={35} alt="logo" priority />
            </Link>
          </div>

          <nav className="flex-1 overflow-y-auto py-8 z-50">
            <div className="px-6 space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block py-4 px-4 text-lg font-medium rounded-lg transition-colors
                    hover:bg-gray-100 dark:hover:bg-gray-800/50
                    text-gray-800 dark:text-gray-200 z-50"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </nav>

          <div className="p-6 border-t dark:border-gray-800 z-50">
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              © {new Date().getFullYear()} SamCux
            </p>
          </div>
        </div>
      </div>

      {/* Backdrop overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
