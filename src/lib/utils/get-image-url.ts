import { CLOUDFRONT_DISTRIBUTION_DOMAIN_NAME } from "@/lib/env";

export default function getImageURL(src: string | undefined): string {
  if (!src) return "/images/fallback.png";

  if (!CLOUDFRONT_DISTRIBUTION_DOMAIN_NAME) {
    console.error("CLOUDFRONT_DISTRIBUTION_DOMAIN_NAME not configured.");
    return "";
  }

  const domain = CLOUDFRONT_DISTRIBUTION_DOMAIN_NAME.replace(/\/+$/, "");
  const path = src.replace(/^\/+/, "");
  return `https://${domain}/${path}`;
}
