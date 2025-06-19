import { NextResponse } from 'next/server';
import { TOKEN_COOKIE_NAME } from '@/lib/auth';

export async function POST() {
  try {
    // 쿠키에서 토큰 제거
    const response = NextResponse.json({ success: true });

    response.cookies.set(TOKEN_COOKIE_NAME, '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0, // 즉시 만료
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Logout API error:', error);
    return NextResponse.json(
      { error: '로그아웃 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
