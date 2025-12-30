import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com", // The domain where your images are hosted
        pathname: "/**", // Allow all paths on that domain
      },
      {
        protocol: "https",
        hostname: "img.mlbstatic.com", // Example for MLB photos
      },
    ],
  },
};

export default nextConfig;
