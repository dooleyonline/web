// frontend-web/middleware.ts

import { NextRequest, NextFetchEvent, NextResponse } from "next/server";
import { clerkMiddleware } from "@clerk/nextjs/server";

const allowedOrigins = [
  "http://localhost:3000",
  "https://your-production-domain.com",
];

const corsOptions = {
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

const clerkHandler = clerkMiddleware();

export async function middleware(
  request: NextRequest,
  event: NextFetchEvent
) {

  const clerkResponse = await clerkHandler(request, event);
  if (clerkResponse) {
    return clerkResponse;
  }

  const origin = request.headers.get("origin") ?? "";
  const isAllowedOrigin = allowedOrigins.includes(origin);
  const isPreflight = request.method === "OPTIONS";

  if (isPreflight) {
    const preflightHeaders: Record<string, string> = {
      ...(isAllowedOrigin && { "Access-Control-Allow-Origin": origin }),
      ...corsOptions,
    };
    return NextResponse.json({}, { headers: preflightHeaders });
  }

  const response = NextResponse.next();
  if (isAllowedOrigin) {
    response.headers.set("Access-Control-Allow-Origin", origin);
  }
  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/api/:path*',
  ],
};
