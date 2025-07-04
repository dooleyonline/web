export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api";

export const CLOUDFRONT_DISTRIBUTION_DOMAIN_NAME =
  process.env.NEXT_PUBLIC_CLOUDFRONT_DISTRIBUTION_DOMAIN_NAME;

export const ENDPOINTS = {
  AUTH: {
    SIGN_IN: "/auth/login/",
    SIGN_UP: "/auth/register/",
    SIGN_OUT: "/auth/logout/",
    REFRESH: "/auth/login/refresh/",
    ME: "/auth/me/",
  },
  MARKETPLACE: {
    CATEGORIES: "/marketplace/categories/",
    ITEMS: "/marketplace/items/",
  },
};
