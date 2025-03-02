"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  FolderKanban, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  User
} from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

interface AdminSidebarProps {
  user?: {
    id?: string;
    login?: string;
    name?: string;
    email?: string;
    avatar_url?: string;
  };
}

export default function AdminSidebar({ user }: AdminSidebarProps) {
  const pathname = usePathname();
  const _router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const logoutMutation = useMutation(api.auth.logout);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      // Call the server-side logout mutation
      await logoutMutation();
      
      // Call the logout API route
      window.location.href = "/api/auth/logout";
    } catch (error) {
      toast.error("Failed to logout");
      console.error("Logout error:", error);
    }
  };

  const navItems = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      name: "Projects",
      href: "/admin/projects",
      icon: <FolderKanban className="w-5 h-5" />,
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-white dark:bg-[#131C31] shadow-md md:hidden"
        onClick={toggleSidebar}
      >
        {isOpen ? (
          <X className="w-5 h-5 text-[#101010] dark:text-[#94A9C9]" />
        ) : (
          <Menu className="w-5 h-5 text-[#101010] dark:text-[#94A9C9]" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-[#131C31] border-r border-gray-100 dark:border-[#222F43] transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-100 dark:border-[#222F43]">
            <Link href="/admin" className="flex items-center">
              <span className="text-xl font-bold text-[#101010] dark:text-[#94A9C9]">
                SamCux <span className="text-[#ffe400]">Admin</span>
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                  pathname === item.href
                    ? "bg-[#ffe400] bg-opacity-10 text-[#101010] dark:text-[#ffe400]"
                    : "text-gray-600 dark:text-[#66768f] hover:bg-gray-100 dark:hover:bg-[#222F43]"
                }`}
              >
                {item.icon}
                <span className="ml-3">{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* User */}
          <div className="p-4 border-t border-gray-100 dark:border-[#222F43]">
            <div className="flex items-center">
              {user?.avatar_url ? (
                <img
                  src={user.avatar_url}
                  alt={user.name || "User"}
                  className="w-8 h-8 rounded-full mr-3"
                />
              ) : (
                <div className="w-8 h-8 rounded-full mr-3 bg-[#ffe400] bg-opacity-10 flex items-center justify-center">
                  <User className="w-4 h-4 text-[#ffe400]" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#101010] dark:text-[#94A9C9] truncate">
                  {user?.name || user?.login || "Admin User"}
                </p>
                <p className="text-xs text-gray-500 dark:text-[#66768f] truncate">
                  {user?.email || ""}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-500 dark:text-[#66768f] hover:text-[#101010] dark:hover:text-[#94A9C9]"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
} 