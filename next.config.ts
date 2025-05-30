import type { NextConfig } from "next";

const CLOUDFROMT_DISTRIBUTION_DOMAIN_NAME =
  process.env.NEXT_PUBLIC_CLOUDFRONT_DISTRIBUTION_DOMAIN_NAME;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: CLOUDFROMT_DISTRIBUTION_DOMAIN_NAME
      ? [
          {
            protocol: "https",
            hostname: CLOUDFROMT_DISTRIBUTION_DOMAIN_NAME,
            pathname: "/**",
          },
        ]
      : [],
    deviceSizes: [
      16, 32, 48, 64, 96, 128, 256, 384, 512, 640, 750, 828, 1080, 1200, 1920,
      2048, 3840,
    ],
  },
};

export default nextConfig;
