import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/quantumpixels',
  images: { unoptimized: true },
  transpilePackages: ['three'],
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
