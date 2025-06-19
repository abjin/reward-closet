import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import {
  generateToken,
  hashPassword,
  getTokenCookieOptions,
  TOKEN_COOKIE_NAME,
} from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password, nickname } = await request.json();

    // 입력 검증
    if (!email || !password || !nickname) {
      return NextResponse.json(
        { error: '모든 필드를 입력해주세요.' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: '비밀번호는 6자 이상이어야 합니다.' },
        { status: 400 }
      );
    }

    // 이메일 중복 확인
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: '이미 등록된 이메일입니다.' },
        { status: 409 }
      );
    }

    // 비밀번호 해싱
    const hashedPassword = await hashPassword(password);

    // 사용자 생성
    const user = await prisma.user.create({
      data: {
        email,
        nickname,
        password: hashedPassword,
        points: 0,
      },
    });

    // JWT 토큰 생성
    const token = await generateToken({
      userId: user.id,
      email: user.email,
    });

    // 응답 생성 및 쿠키 설정
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        nickname: user.nickname,
      },
    });

    response.cookies.set(TOKEN_COOKIE_NAME, token, getTokenCookieOptions());

    return response;
  } catch (error) {
    console.error('Signup API error:', error);
    return NextResponse.json(
      { error: '회원가입 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
