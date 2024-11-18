"use client";
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import navItems from '@/components/data/NavItem';
import { Home, User, Code, Mail } from "lucide-react";
import Theme from "./Theme";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navIcons = {
  "/": <Home className="w-5 h-5" />,
  "/about": <User className="w-5 h-5" />,
  "/projects": <Code className="w-5 h-5" />,
  "/contact": <Mail className="w-5 h-5" />,
};

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  return (
    <div
      className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-40 transform transition-all duration-300 
        ease-bounce md:hidden ${isOpen ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-16 opacity-0 scale-95'}`}
    >
      <div className="bg-white/80 dark:bg-[#131C31]/80 backdrop-blur-md shadow-lg rounded-full py-2 px-6">
        <nav className="flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.path}
              onClick={onClose}
              className={`relative group p-2 transition-all duration-300 hover:scale-110`}
            >
              <div className={`relative transition-colors ${
                pathname === item.path
                  ? "text-[#ffe400]"
                  : "text-[#101010] dark:text-[#94A9C9] hover:text-[#ffe400] dark:hover:text-[#ffe400]"
              }`}>
                {navIcons[item.path as keyof typeof navIcons]}
                <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-xs opacity-0 
                  group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {item.title}
                </span>
              </div>
            </Link>
          ))}
          <Theme />
        </nav>
      </div>
    </div>
  );
}
