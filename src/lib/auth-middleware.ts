import { jwtVerify, type JWTPayload } from 'jose';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// 디버깅: JWT_SECRET 로드 확인 (미들웨어)
console.log(
  '🛡️ Middleware JWT_SECRET:',
  JWT_SECRET ? 'Loaded' : 'Using default'
);
const TOKEN_COOKIE_NAME = 'rwd-session';

export interface TokenPayload extends JWTPayload {
  userId: string;
  email: string;
}

// JWT 토큰 검증 (Edge Runtime용)
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

// 요청에서 토큰 가져오기 (미들웨어용)
export function getTokenFromRequest(request: NextRequest): string | null {
  return request.cookies.get(TOKEN_COOKIE_NAME)?.value || null;
}
