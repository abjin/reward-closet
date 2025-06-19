import { SignJWT, jwtVerify, type JWTPayload } from 'jose';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// 디버깅: JWT_SECRET 로드 확인 (프로덕션에서는 전체 키 노출 안함)
if (process.env.NODE_ENV === 'development') {
  console.log('🔑 JWT_SECRET loaded:', JWT_SECRET.substring(0, 10) + '...');
} else {
  console.log(
    '🔑 JWT_SECRET loaded:',
    JWT_SECRET ? 'Yes' : 'No (using default)'
  );
}
export const TOKEN_COOKIE_NAME = 'rwd-session';

export interface User {
  id: string;
  email: string;
  nickname: string;
}

export interface TokenPayload extends JWTPayload {
  userId: string;
  email: string;
}

// 비밀번호 해싱
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

// 비밀번호 검증
export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

// JWT 토큰 생성
export async function generateToken(payload: TokenPayload): Promise<string> {
  const secret = new TextEncoder().encode(JWT_SECRET);
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret);

  return token;
}

// JWT 토큰 검증
export async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload as TokenPayload;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

// 쿠키에서 토큰 가져오기 (서버 컴포넌트용)
export async function getTokenFromCookies(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_COOKIE_NAME);
  return token?.value || null;
}

// 현재 사용자 정보 가져오기 (서버측)
export async function getCurrentUser(): Promise<TokenPayload | null> {
  const token = await getTokenFromCookies();
  if (!token) return null;

  return await verifyToken(token);
}

// 쿠키 옵션 설정
export function getTokenCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const, // 더 엄격한 보안
    maxAge: 60 * 60 * 24 * 7, // 7일
    path: '/',
  };
}
