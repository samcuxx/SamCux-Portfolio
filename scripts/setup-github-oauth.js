#!/usr/bin/env node

/**
 * This script helps set up GitHub OAuth for your portfolio admin panel.
 * It prints the necessary information for creating a GitHub OAuth app.
 */

// Get the current URL from the environment or default to localhost
const host = process.env.VERCEL_URL 
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

console.log(`
===============================================
GitHub OAuth Setup for Portfolio Admin
===============================================

Follow these steps to set up GitHub OAuth:

1. Go to GitHub Developer Settings:
   https://github.com/settings/developers

2. Click on "New OAuth App"

3. Fill in the application details:
   - Application name: Your Portfolio Admin
   - Homepage URL: ${host}
   - Application description: Admin panel for my portfolio
   - Authorization callback URL: ${host}/api/auth/github/callback

4. Click "Register application"

5. On the next page, you'll see your Client ID
   - Copy it and add it to your .env.local file as GITHUB_CLIENT_ID
   - Also add it as NEXT_PUBLIC_GITHUB_CLIENT_ID

6. Click "Generate a new client secret"
   - Copy it and add it to your .env.local file as GITHUB_CLIENT_SECRET
   - Also add it as NEXT_PUBLIC_GITHUB_CLIENT_SECRET

Your .env.local file should include these lines:

GITHUB_CLIENT_ID=your_client_id_here
GITHUB_CLIENT_SECRET=your_client_secret_here
NEXT_PUBLIC_GITHUB_CLIENT_ID=your_client_id_here
NEXT_PUBLIC_GITHUB_CLIENT_SECRET=your_client_secret_here

===============================================
`); 