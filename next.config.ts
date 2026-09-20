import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Copyright-Act-2023-Bangladesh",
  images: {
    unoptimized: true, // Required for static export
  }
};

export default nextConfig;
