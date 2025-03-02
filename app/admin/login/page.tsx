"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Github, Loader2, AlertCircle, HelpCircle } from "lucide-react";
import Link from "next/link";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is already logged in
    const checkExistingLogin = () => {
      try {
        const githubUserCookie = document.cookie
          .split('; ')
          .find(row => row.startsWith('github_user='));
        
        if (githubUserCookie) {
          // User is already logged in, redirect to admin
          console.log("User already logged in, redirecting to admin");
          router.push("/admin");
          return true;
        }
      } catch (error) {
        console.error("Error checking cookies:", error);
      }
      return false;
    };

    // Check for error in URL
    const errorParam = searchParams.get("error");
    if (errorParam) {
      switch (errorParam) {
        case "invalid_state":
          setError("Invalid state parameter. Please try again.");
          break;
        case "configuration":
          setError("GitHub OAuth is not properly configured. Please check the setup guide.");
          break;
        case "token":
          setError("Failed to get access token from GitHub.");
          break;
        case "unknown":
          setError("An unknown error occurred. Please try again.");
          break;
        default:
          setError("Authentication failed. Please try again.");
      }
    }

    // Only set loading to false if not already logged in
    if (!checkExistingLogin()) {
      setIsLoading(false);
    }
  }, [searchParams, router]);

  const handleGitHubLogin = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Redirect to GitHub OAuth login
      window.location.href = `/api/auth/github`;
    } catch (error) {
      console.error("Login error:", error);
      setError("Failed to initiate login. Please try again.");
      setIsLoading(false);
    }
  };

  // If still checking login status, show loading
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-sa-light-bg dark:bg-sa-dark-bg">
        <Loader2 className="w-8 h-8 text-[#ffe400] animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-sa-light-bg dark:bg-sa-dark-bg">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-[#131C31] rounded-xl shadow-lg border border-gray-100 dark:border-[#222F43]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#101010] dark:text-[#94A9C9]">
            Admin <span className="text-[#ffe400]">Login</span>
          </h1>
          <p className="mt-2 text-gray-600 dark:text-[#66768f]">
            Sign in to access the admin dashboard
          </p>
        </div>

        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 rounded-lg">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400" />
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
            {error.includes("not properly configured") && (
              <Link
                href="/admin/oauth-setup"
                className="mt-2 text-sm text-[#ffe400] hover:underline flex items-center gap-1"
              >
                <HelpCircle className="w-4 h-4" />
                <span>View OAuth Setup Guide</span>
              </Link>
            )}
          </div>
        )}

        <div className="space-y-4">
          <button
            onClick={handleGitHubLogin}
            disabled={isLoading}
            className="flex items-center justify-center w-full px-4 py-3 space-x-2 text-white bg-[#24292e] rounded-lg hover:bg-[#2c3137] focus:outline-none focus:ring-2 focus:ring-[#ffe400] focus:ring-offset-2 transition-colors disabled:opacity-70"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Github className="w-5 h-5" />
            )}
            <span>{isLoading ? "Signing in..." : "Sign in with GitHub"}</span>
          </button>

          <div className="text-center text-sm text-gray-500 dark:text-[#66768f]">
            <p>Only authorized users can access the admin area.</p>
            <p className="mt-1">
              <Link href="/" className="text-[#ffe400] hover:underline">
                Return to homepage
              </Link>
            </p>
          </div>
        </div>

        <div className="pt-6 mt-6 border-t border-gray-200 dark:border-[#222F43]">
          <p className="text-xs text-center text-gray-500 dark:text-[#66768f]">
            This admin panel is secured with GitHub OAuth authentication.
            <br />
            The first user to sign in is automatically made an admin.
          </p>
          <div className="mt-2 text-center">
            <Link
              href="/admin/oauth-setup"
              className="text-xs text-[#ffe400] hover:underline inline-flex items-center"
            >
              <HelpCircle className="w-3 h-3 mr-1" />
              OAuth Setup Guide
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Loading fallback for Suspense
function LoginLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-sa-light-bg dark:bg-sa-dark-bg">
      <Loader2 className="w-8 h-8 text-[#ffe400] animate-spin" />
    </div>
  );
}

export default function AdminLogin() {
  return (
    <Suspense fallback={<LoginLoading />}>
      <LoginContent />
    </Suspense>
  );
} 