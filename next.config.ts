import type { NextConfig } from "next";

const domain = process.env.NEXT_PUBLIC_CLOUDFRONT_DISTRIBUTION_DOMAIN_NAME;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: domain
      ? [
          {
            protocol: "https",
            hostname: domain,
            pathname: "/**",
          },
        ]
      : [],
  },
};

export default nextConfig;
