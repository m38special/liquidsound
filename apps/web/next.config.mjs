/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  transpilePackages: [
    "@liquid-sound/ui",
    "@liquid-sound/auth",
    "@liquid-sound/db",
    "@liquid-sound/types",
    "@liquid-sound/storage",
  ],
};

export default nextConfig;
