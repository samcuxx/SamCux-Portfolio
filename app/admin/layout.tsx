"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader2 } from "lucide-react";
import AdminSidebar from "@/components/Admin/AdminSidebar";
import { toast } from "sonner";
import BgGlow from "@/components/ui/BgGlow";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [githubUser, setGithubUser] = useState<any>(null);
  const [authChecked, setAuthChecked] = useState(false);
  
  // Create or update user mutation
  const createOrUpdateUser = useMutation(api.auth.createOrUpdateUser);
  
  // Skip auth check for login page and OAuth setup page
  const isAuthExemptPage = pathname === "/admin/login" || pathname === "/admin/oauth-setup" || pathname === "/admin/debug";
  
  useEffect(() => {
    if (isAuthExemptPage) {
      setIsLoading(false);
      setAuthChecked(true);
      return;
    }

    // Check for GitHub user in cookies
    const checkGithubUser = async () => {
      try {
        // Get the github_user cookie
        const githubUserCookie = document.cookie
          .split('; ')
          .find(row => row.startsWith('github_user='));
        
        if (githubUserCookie) {
          const githubUserData = JSON.parse(decodeURIComponent(githubUserCookie.split('=')[1]));
          setGithubUser(githubUserData);
          
          try {
            // Create or update the user in Convex
            await createOrUpdateUser({
              githubId: githubUserData.id.toString(),
              name: githubUserData.name || githubUserData.login,
              email: githubUserData.email || "",
              avatarUrl: githubUserData.avatar_url,
            });
            
            // Mark auth as checked
            setAuthChecked(true);
          } catch (convexError) {
            console.error("Error updating user in Convex:", convexError);
            // Continue even if there's an error with Convex
            setAuthChecked(true);
          }
        } else {
          // If no GitHub user cookie, redirect to login
          console.log("No GitHub user cookie found, redirecting to login");
          router.push("/admin/login");
        }
      } catch (error) {
        console.error("Error checking GitHub user:", error);
        router.push("/admin/login");
      } finally {
        // Set loading to false after checking
        setIsLoading(false);
      }
    };

    checkGithubUser();
  }, [pathname, router, createOrUpdateUser, isAuthExemptPage]);

  // Check if the user is an admin - handle potential errors
  const isAdmin = useQuery(api.auth.isAdmin, 
    githubUser ? { githubId: githubUser.id.toString() } : { githubId: undefined }
  );

  useEffect(() => {
    // Skip for login and OAuth setup pages
    if (isAuthExemptPage || !authChecked) {
      return;
    }
    
    // If we've determined the user is not an admin, redirect to home
    if (isAdmin === false) {
      console.log("User is not an admin, redirecting to home");
      toast.error("You don't have admin access");
      router.push("/");
    } else if (isAdmin === undefined) {
      // Still loading, do nothing
      return;
    } else {
      // User is an admin, set loading to false
      setIsLoading(false);
    }
  }, [isAdmin, router, pathname, authChecked, isAuthExemptPage]);

  // Skip layout for login page and OAuth setup page
  if (isAuthExemptPage) {
    return <>{children}</>;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-sa-light-bg dark:bg-sa-dark-bg">
        <Loader2 className="w-8 h-8 text-[#ffe400] animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-sa-light-bg dark:bg-sa-dark-bg">
      <BgGlow />
      <AdminSidebar user={githubUser} />
      <main className="flex-1 p-6 md:p-8 overflow-y-auto ml-0 md:ml-0 pt-16 md:pt-6">
        {children}
      </main>
    </div>
  );
} 