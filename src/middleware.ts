import { NextResponse, type NextRequest } from 'next/server';
import { getTokenFromRequest, verifyToken } from '@/lib/auth-middleware';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 토큰 가져오기
  const token = getTokenFromRequest(request);

  // 토큰 검증
  const user = token ? await verifyToken(token) : null;

  // 인증이 필요한 페이지들
  const protectedRoutes = ['/predict', '/donate', '/mypage'];
  const authRoutes = ['/login', '/signup'];

  // 인증된 사용자가 로그인/회원가입 페이지 접근 시 홈으로 리디렉션
  if (user && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 인증되지 않은 사용자가 보호된 페이지 접근 시 로그인으로 리디렉션
  if (!user && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
