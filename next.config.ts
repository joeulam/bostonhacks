import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    MONGO_KEY: process.env.MONGO_KEY,
  },
};

export default nextConfig;
