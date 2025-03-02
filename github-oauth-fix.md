# GitHub OAuth Fix Guide

## Problem
When accessing the admin page on your deployed site, you get the error:
> The redirect_uri is not associated with this application.

This happens because the callback URL in your GitHub OAuth application settings doesn't match the actual callback URL of your deployed site.

## Solution

1. Go to GitHub Developer Settings: https://github.com/settings/developers

2. Find and click on your OAuth App for your portfolio

3. Update the 'Authorization callback URL' to: 
   ```
   https://your-deployed-domain.com/api/auth/github/callback
   ```
   (Replace 'your-deployed-domain.com' with your actual deployed domain)

4. Click 'Update application'

5. Make sure your environment variables in your deployment platform include:
   ```
   GITHUB_CLIENT_ID=your_client_id
   GITHUB_CLIENT_SECRET=your_client_secret
   NEXT_PUBLIC_GITHUB_CLIENT_ID=your_client_id
   NEXT_PUBLIC_GITHUB_CLIENT_SECRET=your_client_secret
   ```

6. Redeploy your application if necessary

## Verification
After making these changes, try accessing your admin page again. The GitHub OAuth flow should now work correctly.
