"use client"

import React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home, User, Code, Mail, Camera } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Dock, DockIcon } from "@/components/ui/dock"
import Theme from "./Theme"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

// Navigation items with icons
const navItems = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/about", icon: User, label: "About" },
  { path: "/projects", icon: Code, label: "Projects" },
  { path: "/contact", icon: Mail, label: "Contact" },
  { path: "/photos", icon: Camera, label: "Photos" },
]

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname()

  return (
    <div
      className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-40 transform transition-all duration-300 
        ease-bounce md:hidden ${isOpen ? "translate-y-0 opacity-100 scale-100" : "translate-y-16 opacity-0 scale-95 pointer-events-none"}`}
    >
      <Dock
        direction="middle"
        className="bg-white/80 dark:bg-[#131C31]/80 backdrop-blur-md shadow-lg border-gray-200 dark:border-[#222F43]"
      >
        {navItems.map((item) => (
          <DockIcon key={item.label}>
            <Link
              href={item.path}
              onClick={onClose}
              aria-label={item.label}
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "size-10 rounded-full",
                pathname === item.path
                  ? "text-[#ffe400] bg-[#ffe400]/10"
                  : "text-[#101010] dark:text-[#94A9C9] hover:text-[#ffe400] dark:hover:text-[#ffe400]"
              )}
            >
              <item.icon className="size-4" />
            </Link>
          </DockIcon>
        ))}

        <Separator orientation="vertical" className="h-full py-2" />

        <DockIcon>
          <div className="size-10 flex items-center justify-center">
            <Theme />
          </div>
        </DockIcon>
      </Dock>
    </div>
  )
}
