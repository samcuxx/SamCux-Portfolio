"use client";

import { useState, useEffect } from "react";
import { Clipboard, Check, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function OAuthSetup() {
  const [origin, setOrigin] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    // Get the origin for the callback URL
    setOrigin(window.location.origin);
  }, []);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#101010] dark:text-[#94A9C9]">
          GitHub OAuth Setup Guide
        </h1>
        <p className="text-gray-600 dark:text-[#66768f] mt-1">
          Follow these steps to configure GitHub OAuth for your admin panel
        </p>
      </div>

      <div className="bg-white dark:bg-[#131C31] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-[#222F43]">
        <h2 className="text-lg font-semibold text-[#101010] dark:text-[#94A9C9] mb-4">
          Step 1: Create a GitHub OAuth App
        </h2>
        <ol className="space-y-4 list-decimal list-inside text-gray-600 dark:text-[#66768f]">
          <li>
            Go to{" "}
            <Link
              href="https://github.com/settings/developers"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#ffe400] hover:underline inline-flex items-center"
            >
              GitHub Developer Settings
              <ExternalLink className="w-3 h-3 ml-1" />
            </Link>
          </li>
          <li>Click on &quot;New OAuth App&quot;</li>
          <li>
            Fill in the application details:
            <ul className="pl-6 mt-2 space-y-2 list-disc">
              <li>
                <strong>Application name:</strong> Your Portfolio Admin
              </li>
              <li>
                <strong>Homepage URL:</strong>{" "}
                <div className="inline-flex items-center gap-2 bg-gray-100 dark:bg-[#222F43] px-3 py-1 rounded-md">
                  <code>{origin}</code>
                  <button
                    onClick={() => copyToClipboard(origin, "homepage")}
                    className="text-gray-500 hover:text-[#ffe400]"
                  >
                    {copied === "homepage" ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Clipboard className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </li>
              <li>
                <strong>Application description:</strong> Admin panel for my
                portfolio
              </li>
              <li>
                <strong>Authorization callback URL:</strong>{" "}
                <div className="inline-flex items-center gap-2 bg-gray-100 dark:bg-[#222F43] px-3 py-1 rounded-md">
                  <code>{`${origin}/api/auth/github/callback`}</code>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `${origin}/api/auth/github/callback`,
                        "callback"
                      )
                    }
                    className="text-gray-500 hover:text-[#ffe400]"
                  >
                    {copied === "callback" ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Clipboard className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </li>
            </ul>
          </li>
          <li>Click &quot;Register application&quot;</li>
        </ol>
      </div>

      <div className="bg-white dark:bg-[#131C31] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-[#222F43]">
        <h2 className="text-lg font-semibold text-[#101010] dark:text-[#94A9C9] mb-4">
          Step 2: Get Your Client ID and Secret
        </h2>
        <ol className="space-y-4 list-decimal list-inside text-gray-600 dark:text-[#66768f]">
          <li>After registering, you&apos;ll see your Client ID</li>
          <li>Click &quot;Generate a new client secret&quot;</li>
          <li>Copy both the Client ID and Client Secret</li>
        </ol>
      </div>

      <div className="bg-white dark:bg-[#131C31] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-[#222F43]">
        <h2 className="text-lg font-semibold text-[#101010] dark:text-[#94A9C9] mb-4">
          Step 3: Update Your Environment Variables
        </h2>
        <p className="mb-4 text-gray-600 dark:text-[#66768f]">
          Add these variables to your <code>.env.local</code> file:
        </p>
        <div className="bg-gray-100 dark:bg-[#222F43] p-4 rounded-md">
          <pre className="text-sm text-gray-800 dark:text-[#94A9C9]">
            <code>
              GITHUB_CLIENT_ID=your_client_id_here
              <br />
              GITHUB_CLIENT_SECRET=your_client_secret_here
              <br />
              <br />
              # Also include as public for client-side components
              <br />
              NEXT_PUBLIC_GITHUB_CLIENT_ID=your_client_id_here
              <br />
              NEXT_PUBLIC_GITHUB_CLIENT_SECRET=your_client_secret_here
            </code>
          </pre>
          <button
            onClick={() =>
              copyToClipboard(
                `GITHUB_CLIENT_ID=your_client_id_here
GITHUB_CLIENT_SECRET=your_client_secret_here

# Also include as public for client-side components
NEXT_PUBLIC_GITHUB_CLIENT_ID=your_client_id_here
NEXT_PUBLIC_GITHUB_CLIENT_SECRET=your_client_secret_here`,
                "env"
              )
            }
            className="mt-2 text-gray-500 hover:text-[#ffe400] flex items-center gap-1"
          >
            {copied === "env" ? (
              <>
                <Check className="w-4 h-4 text-green-500" />
                <span className="text-green-500">Copied!</span>
              </>
            ) : (
              <>
                <Clipboard className="w-4 h-4" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-[#131C31] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-[#222F43]">
        <h2 className="text-lg font-semibold text-[#101010] dark:text-[#94A9C9] mb-4">
          Step 4: Important Note About Convex Authentication
        </h2>
        <p className="text-gray-600 dark:text-[#66768f] mb-4">
          This application uses a custom GitHub OAuth flow, not Convex's built-in authentication. 
          Make sure you're using the correct callback URL as shown above, not the Convex callback URL.
        </p>
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800/30 rounded-lg">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            If you&apos;re being redirected to <code>combative-starling-202.convex.cloud/auth/callback</code> or a similar URL,
            your GitHub OAuth app is configured with the wrong callback URL. Please update it to use
            <code>{` ${origin}/api/auth/github/callback `}</code> instead.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-[#131C31] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-[#222F43]">
        <h2 className="text-lg font-semibold text-[#101010] dark:text-[#94A9C9] mb-4">
          Step 5: Restart Your Application
        </h2>
        <p className="text-gray-600 dark:text-[#66768f]">
          After updating your environment variables, restart your Next.js
          application for the changes to take effect.
        </p>
      </div>

      <div className="flex justify-center mt-8">
        <Link
          href="/admin/login"
          className="px-6 py-2 bg-[#ffe400] text-[#101010] rounded-lg hover:bg-[#ffe400]/90 transition-colors"
        >
          Return to Login
        </Link>
      </div>
    </div>
  );
} 