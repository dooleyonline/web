// frontend-web/middleware.ts

import { NextRequest, NextFetchEvent, NextResponse } from "next/server";
import { clerkMiddleware } from "@clerk/nextjs/server";

// CORS 허용 오리진 목록 (필요에 따라 .env.local에서 파싱해서 사용 가능)
const allowedOrigins = [
  "http://localhost:3000",
  "https://your-production-domain.com",
];

const corsOptions = {
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// ① Clerk 미들웨어 핸들러 생성
const clerkHandler = clerkMiddleware();

export async function middleware(
  request: NextRequest,
  event: NextFetchEvent
) {
  // ② Clerk 미들웨어 먼저 실행할 때, request와 event를 모두 넘겨 줍니다.
  const clerkResponse = await clerkHandler(request, event);
  if (clerkResponse) {
    // Clerk에서 NextResponse를 반환(예: 로그인 필요 시 리디렉트)했다면 그대로 리턴
    return clerkResponse;
  }

  // ③ 이하 CORS 처리 로직
  const origin = request.headers.get("origin") ?? "";
  const isAllowedOrigin = allowedOrigins.includes(origin);
  const isPreflight = request.method === "OPTIONS";

  if (isPreflight) {
    // 프리플라이트(OPTIONS) 요청. CORS 헤더만 붙여서 빈 JSON 응답 반환
    const preflightHeaders: Record<string, string> = {
      ...(isAllowedOrigin && { "Access-Control-Allow-Origin": origin }),
      ...corsOptions,
    };
    return NextResponse.json({}, { headers: preflightHeaders });
  }

  // 일반(GET/POST/PUT/DELETE) 요청인 경우
  const response = NextResponse.next();
  if (isAllowedOrigin) {
    response.headers.set("Access-Control-Allow-Origin", origin);
  }
  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

// ④ middleware가 적용될 경로 매처 설정
export const config = {
  matcher: [
    // Next.js 내부 파일 및 정적 리소스 제외
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // API 경로에도 Clerk + CORS 적용
    '/api/:path*',
  ],
};
