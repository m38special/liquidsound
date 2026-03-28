/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@liquid-sound/ui",
    "@liquid-sound/auth",
    "@liquid-sound/db",
    "@liquid-sound/types",
    "@liquid-sound/storage",
  ],
};

export default nextConfig;
