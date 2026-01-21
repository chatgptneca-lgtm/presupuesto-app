/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost", "*.app.github.dev"],
      allowedForwardedHosts: ["*.app.github.dev"]
    }
  }
};

export default nextConfig;
