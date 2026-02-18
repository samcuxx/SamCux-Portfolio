# OAuth Production Fix - Redirect URI Mismatch

## Problem
When accessing the admin section in production, you get the error:
> The `redirect_uri` is not associated with this application.

## Root Cause
The callback URL is dynamically generated from the request origin, which can differ from what's registered in GitHub OAuth settings:
- **GitHub OAuth App expects**: `https://www.samcux.com/api/auth/github/callback`
- **Request might come from**: `https://samcux.com` (without www) or other variations
- This mismatch causes GitHub to reject the OAuth request

## Solution

### 1. Set Environment Variable in Production
Add this environment variable to your production deployment platform (Vercel, Netlify, etc.):

```bash
NEXT_PUBLIC_APP_URL=https://www.samcux.com
```

**Important**: Make sure this URL matches EXACTLY what you have in GitHub OAuth settings:
- If GitHub has `https://www.samcux.com/api/auth/github/callback`, use `NEXT_PUBLIC_APP_URL=https://www.samcux.com`
- If GitHub has `https://samcux.com/api/auth/github/callback`, use `NEXT_PUBLIC_APP_URL=https://samcux.com`

### 2. Verify GitHub OAuth Settings
Go to: https://github.com/settings/developers

1. Click on your OAuth App
2. Check the **Authorization callback URL** field
3. It should be: `https://www.samcux.com/api/auth/github/callback` (or `https://samcux.com/api/auth/github/callback` if you prefer non-www)
4. Make sure `NEXT_PUBLIC_APP_URL` matches the domain part (without `/api/auth/github/callback`)

### 3. Ensure Both Domains Work (Optional but Recommended)
If you want both `samcux.com` and `www.samcux.com` to work, you need to register BOTH callback URLs in GitHub:

1. Go to GitHub OAuth App settings
2. Add TWO callback URLs:
   - `https://www.samcux.com/api/auth/github/callback`
   - `https://samcux.com/api/auth/github/callback`
3. Set `NEXT_PUBLIC_APP_URL` to your preferred canonical domain (usually `https://www.samcux.com`)

### 4. Verify Environment Variables
Make sure these are set in production:
```bash
NEXT_PUBLIC_APP_URL=https://www.samcux.com
GITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET=your_client_secret
NEXT_PUBLIC_GITHUB_CLIENT_ID=your_client_id
NEXT_PUBLIC_GITHUB_CLIENT_SECRET=your_client_secret
NEXT_PUBLIC_CONVEX_URL=your_convex_url
```

### 5. Redeploy
After setting the environment variable, redeploy your application.

## How It Works Now
The code now:
- **In Production**: Uses `NEXT_PUBLIC_APP_URL` to build the callback URL, ensuring it matches GitHub's registered URL
- **In Development**: Uses the request origin (localhost) for flexibility

## Testing
1. Visit your production site: `https://www.samcux.com/admin`
2. Click "Login with GitHub"
3. You should be redirected to GitHub for authorization
4. After authorizing, you should be redirected back to `/admin` successfully

## Troubleshooting
If it still doesn't work:
1. Check browser console for errors
2. Check server logs for the callback URL being used
3. Verify `NEXT_PUBLIC_APP_URL` is set correctly in your deployment platform
4. Ensure the GitHub OAuth callback URL matches exactly (including www vs non-www)
5. Clear browser cookies and try again
