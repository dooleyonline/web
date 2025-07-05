import { z } from "zod";

const envSchema = z.object({
  BASE_URL: z.string().url(),
  API_BASE_URL: z.string().url(),
  CLOUDFRONT_DISTRIBUTION_DOMAIN_NAME: z.string().min(1),
});

const parsedEnv = envSchema.safeParse({
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  CLOUDFRONT_DISTRIBUTION_DOMAIN_NAME:
    process.env.NEXT_PUBLIC_CLOUDFRONT_DISTRIBUTION_DOMAIN_NAME,
});

if (!parsedEnv.success) {
  console.error(
    "Invalid environment variables:",
    parsedEnv.error.flatten().fieldErrors
  );
  throw new Error("Invalid environment variables.");
}

export const env = parsedEnv.data;
