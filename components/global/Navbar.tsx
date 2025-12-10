"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, User, Code, Mail, Camera, Menu, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Dock, DockIcon } from "@/components/ui/dock"
import Theme from "./Theme"
import MobileMenu from "./MobileMenu"

// Navigation items with icons
const navItems = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/about", icon: User, label: "About" },
  { path: "/projects", icon: Code, label: "Projects" },
  { path: "/contact", icon: Mail, label: "Contact" },
  { path: "/photos", icon: Camera, label: "Photos" },
]

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* Desktop Navigation - Dock */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:block">
        <TooltipProvider>
          <Dock
            direction="middle"
            className="bg-white/80 dark:bg-[#131C31]/80 backdrop-blur-md shadow-lg border-gray-200 dark:border-[#222F43]"
          >
            {navItems.map((item) => (
              <DockIcon key={item.label}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.path}
                      aria-label={item.label}
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "icon" }),
                        "size-9 rounded-full",
                        pathname === item.path
                          ? "text-[#ffe400] bg-[#ffe400]/10"
                          : "text-[#101010] dark:text-[#94A9C9] hover:text-[#ffe400] dark:hover:text-[#ffe400]"
                      )}
                    >
                      <item.icon className="size-3.5" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{item.label}</p>
                  </TooltipContent>
                </Tooltip>
              </DockIcon>
            ))}
            
            <Separator orientation="vertical" className="h-full py-1" />
            
            <DockIcon>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="size-9 flex items-center justify-center">
                    <Theme />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Toggle Theme</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          </Dock>
        </TooltipProvider>
      </nav>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className={`fixed bottom-6 right-6 z-50 p-3 rounded-full bg-white/80 dark:bg-[#131C31]/80 
          backdrop-blur-md shadow-lg md:hidden transition-all duration-300 ease-bounce
          ${isMobileMenuOpen ? "rotate-180 scale-110" : "rotate-0 scale-100"}`}
        aria-label="Toggle Menu"
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6 text-[#ffe400]" />
        ) : (
          <Menu className="w-6 h-6 text-[#101010] dark:text-[#94A9C9]" />
        )}
      </button>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  )
}
