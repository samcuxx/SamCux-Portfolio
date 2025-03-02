export default {
  providers: [
    {
      domain: "https://github.com",
      applicationID: process.env.GITHUB_CLIENT_ID || process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
    }
  ]
}; 