import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// 사용자 정보 조회
export async function GET() {
  try {
    // 현재 로그인한 사용자 확인
    const authUser = await getCurrentUser();

    if (!authUser) {
      return NextResponse.json(
        { error: '인증이 필요합니다.' },
        { status: 401 }
      );
    }

    // 데이터베이스에서 사용자 정보 조회
    let user = await prisma.user.findUnique({
      where: {
        id: authUser.userId,
      },
      include: {
        donations: {
          select: {
            id: true,
            actualPoints: true,
            status: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: '사용자를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 완료된 기부에서 실제 포인트 합계 계산
    const completedDonations = user.donations.filter(
      (donation) => donation.status === 'COMPLETED' && donation.actualPoints
    );

    const totalEarnedPoints = completedDonations.reduce(
      (sum, donation) => sum + (donation.actualPoints || 0),
      0
    );

    // 사용자 포인트가 실제 획득 포인트와 다르면 업데이트
    if (user.points !== totalEarnedPoints) {
      user = await prisma.user.update({
        where: { id: user.id },
        data: { points: totalEarnedPoints },
        include: {
          donations: {
            select: {
              id: true,
              actualPoints: true,
              status: true,
            },
          },
        },
      });
    }

    // 응답 데이터 준비
    const userData = {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
      points: user.points,
      createdAt: user.createdAt.toISOString(),
      totalDonations: user.donations.length,
      completedDonations: completedDonations.length,
    };

    return NextResponse.json(userData);
  } catch (error) {
    console.error('User API error:', error);
    return NextResponse.json(
      { error: '사용자 정보를 가져오는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// 사용자 정보 업데이트
export async function PUT(request: NextRequest) {
  try {
    // 현재 로그인한 사용자 확인
    const authUser = await getCurrentUser();

    if (!authUser) {
      return NextResponse.json(
        { error: '인증이 필요합니다.' },
        { status: 401 }
      );
    }

    const { nickname } = await request.json();

    if (!nickname || nickname.trim().length < 2) {
      return NextResponse.json(
        { error: '닉네임은 2글자 이상이어야 합니다.' },
        { status: 400 }
      );
    }

    // 데이터베이스에서 사용자 정보 업데이트
    const updatedUser = await prisma.user.update({
      where: {
        id: authUser.userId,
      },
      data: {
        nickname: nickname.trim(),
      },
    });

    return NextResponse.json({
      id: updatedUser.id,
      email: updatedUser.email,
      nickname: updatedUser.nickname,
      points: updatedUser.points,
      createdAt: updatedUser.createdAt.toISOString(),
    });
  } catch (error) {
    console.error('User update API error:', error);
    return NextResponse.json(
      { error: '사용자 정보를 업데이트하는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
