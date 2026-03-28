import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@liquid-sound/ui",
    "@liquid-sound/auth",
    "@liquid-sound/db",
    "@liquid-sound/types",
  ],
};

export default nextConfig;
