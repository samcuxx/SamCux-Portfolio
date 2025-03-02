"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

// Define a proper type for GitHub user
interface GitHubUser {
  id: number;
  login: string;
  name?: string;
  avatar_url?: string;
  [key: string]: unknown;
}

export default function DebugPage() {
  const [cookies, setCookies] = useState<string>("");
  const [githubUser, setGithubUser] = useState<GitHubUser | null>(null);
  
  // Convex mutations
  const makeAdmin = useMutation(api.auth.makeAdmin);
  
  useEffect(() => {
    // Get all cookies
    setCookies(document.cookie);

    // Try to parse the github_user cookie
    try {
      const githubUserCookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('github_user='));
      
      if (githubUserCookie) {
        const userData = JSON.parse(decodeURIComponent(githubUserCookie.split('=')[1]));
        setGithubUser(userData);
      }
    } catch (error) {
      console.error("Error parsing github_user cookie:", error);
    }
  }, []);
  
  // Get user from Convex if githubUser exists
  const user = useQuery(
    api.auth.getUserByGithubId, 
    githubUser ? { githubId: githubUser.id.toString() } : "skip"
  );

  const clearCookies = () => {
    // Clear the github_user cookie
    document.cookie = "github_user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // Refresh the page
    window.location.reload();
  };
  
  const handleMakeAdmin = async () => {
    if (!githubUser) {
      toast.error("No user found");
      return;
    }
    
    try {
      await makeAdmin({ githubId: githubUser.id.toString() });
      toast.success("User is now an admin");
      // Refresh the page after a short delay
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      console.error("Error making user admin:", error);
      toast.error("Failed to make user admin");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Authentication Debug Page</h1>
      
      <div className="bg-white dark:bg-[#131C31] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-[#222F43] mb-6">
        <h2 className="text-lg font-semibold mb-4">Cookie Information</h2>
        <div className="bg-gray-100 dark:bg-[#222F43] p-4 rounded-md mb-4 overflow-x-auto">
          <pre className="text-sm">{cookies || "No cookies found"}</pre>
        </div>
        
        <button 
          onClick={clearCookies}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
        >
          Clear Cookies
        </button>
      </div>
      
      <div className="bg-white dark:bg-[#131C31] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-[#222F43] mb-6">
        <h2 className="text-lg font-semibold mb-4">GitHub User Data (from Cookie)</h2>
        {githubUser ? (
          <div className="bg-gray-100 dark:bg-[#222F43] p-4 rounded-md overflow-x-auto mb-4">
            <pre className="text-sm">{JSON.stringify(githubUser, null, 2)}</pre>
          </div>
        ) : (
          <p className="mb-4">No GitHub user data found in cookies</p>
        )}
        
        <h2 className="text-lg font-semibold mb-4">User Data (from Convex)</h2>
        {user ? (
          <div className="bg-gray-100 dark:bg-[#222F43] p-4 rounded-md overflow-x-auto mb-4">
            <pre className="text-sm">{JSON.stringify(user, null, 2)}</pre>
          </div>
        ) : (
          <p className="mb-4">No user data found in Convex</p>
        )}
        
        <div className="flex gap-2">
          <button 
            onClick={handleMakeAdmin}
            disabled={!githubUser}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Make User Admin
          </button>
        </div>
      </div>
      
      <div className="flex gap-4">
        <Link 
          href="/admin"
          className="px-4 py-2 bg-[#ffe400] text-[#101010] rounded-md hover:bg-[#ffe400]/90 transition-colors"
        >
          Back to Admin
        </Link>
        <Link 
          href="/admin/login"
          className="px-4 py-2 bg-gray-200 dark:bg-[#222F43] text-[#101010] dark:text-[#94A9C9] rounded-md hover:bg-gray-300 dark:hover:bg-[#2a3a56] transition-colors"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
} 