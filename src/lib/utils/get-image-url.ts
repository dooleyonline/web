import { env } from "../env";

export default function getImageURL(src: string | undefined): string {
  if (!src) return "/images/fallback.png";

  const domain = env.CLOUDFRONT_DISTRIBUTION_DOMAIN_NAME.replace(/\/+$/, "");
  const path = src.replace(/^\/+/, "");
  return `https://${domain}/${path}`;
}
