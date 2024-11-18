"use client";
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import navItems from '@/components/data/NavItem';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  return (
    <div
      className={`fixed inset-x-0 top-16 z-40 transform transition-transform duration-300 ease-in-out md:hidden
        ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
    >
      <div className="bg-white/80 dark:bg-[#131C31]/80 backdrop-blur-md shadow-lg border-t 
        border-gray-100 dark:border-[#222F43]">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.path}
                onClick={onClose}
                className={`relative py-2 px-4 rounded-lg transition-all duration-300 
                  ${pathname === item.path
                    ? "bg-[#ffe400] bg-opacity-10 text-[#ffe400]"
                    : "text-[#101010] dark:text-[#94A9C9] hover:bg-[#ffe400] hover:bg-opacity-10"
                  }`}
              >
                <span className="relative z-10">{item.title}</span>
                {pathname === item.path && (
                  <span 
                    className="absolute inset-0 rounded-lg bg-[#ffe400] bg-opacity-10 
                      transition-all duration-300"
                  />
                )}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
