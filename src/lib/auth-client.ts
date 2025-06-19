'use client';

export interface LoginData {
  email: string;
  password: string;
}

export interface SignupData {
  email: string;
  password: string;
  nickname: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  user?: {
    id: string;
    email: string;
    nickname: string;
  };
}

// 로그인
export async function login(data: LoginData): Promise<AuthResponse> {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.error || '로그인에 실패했습니다.',
      };
    }

    return {
      success: true,
      user: result.user,
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      message: '로그인 중 오류가 발생했습니다.',
    };
  }
}

// 회원가입
export async function signup(data: SignupData): Promise<AuthResponse> {
  try {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.error || '회원가입에 실패했습니다.',
      };
    }

    return {
      success: true,
      user: result.user,
    };
  } catch (error) {
    console.error('Signup error:', error);
    return {
      success: false,
      message: '회원가입 중 오류가 발생했습니다.',
    };
  }
}

// 로그아웃
export async function logout(): Promise<AuthResponse> {
  try {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
    });

    if (!response.ok) {
      return {
        success: false,
        message: '로그아웃에 실패했습니다.',
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error('Logout error:', error);
    return {
      success: false,
      message: '로그아웃 중 오류가 발생했습니다.',
    };
  }
}

// 현재 사용자 정보 가져오기
export async function getCurrentUser() {
  try {
    const response = await fetch('/api/user', {
      method: 'GET',
    });

    if (!response.ok) {
      return null;
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
}
