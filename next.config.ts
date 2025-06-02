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
    imageSizes: [16, 32, 48, 64],
    deviceSizes: [
      16, 32, 48, 64, 96, 128, 256, 384, 512, 640, 750, 828, 1080, 1200, 1920,
      2048, 3840,
    ],
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,PATCH,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
