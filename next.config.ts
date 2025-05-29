import type { NextConfig } from "next";

const domain = process.env.NEXT_PUBLIC_CLOUDFRONT_DISTRIBUTION_DOMAIN_NAME;

const nextConfig: NextConfig = {
  images: {
    domains: domain ? [domain] : [],
  },
  /* config options here */
};

export default nextConfig;
