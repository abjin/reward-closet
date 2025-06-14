import { NextRequest, NextResponse } from 'next/server';
import { Condition } from '@prisma/client';

interface PredictionResult {
  condition: Condition;
  itemType: string;
  estimatedPoints: number;
  confidence: number;
  imageUrl: string;
}

export async function POST(request: NextRequest) {
  try {
    const { imageUrl } = await request.json();

    if (!imageUrl) {
      return NextResponse.json(
        { error: '이미지 URL이 필요합니다.' },
        { status: 400 }
      );
    }

    // AI 분석 시뮬레이션을 위한 지연
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock AI 예측 로직
    const conditions = Object.values(Condition);
    const itemTypes = [
      '티셔츠',
      '청바지',
      '후드',
      '셔츠',
      '니트',
      '자켓',
      '코트',
      '원피스',
    ];

    const randomCondition =
      conditions[Math.floor(Math.random() * conditions.length)];
    const pointRanges = {
      EXCELLENT: [500, 1000],
      GOOD: [200, 500],
      FAIR: [50, 200],
      POOR: [0, 0],
    };

    const [minPoints, maxPoints] = pointRanges[randomCondition];
    const estimatedPoints =
      Math.floor(Math.random() * (maxPoints - minPoints + 1)) + minPoints;

    const prediction: PredictionResult = {
      condition: randomCondition,
      itemType: itemTypes[Math.floor(Math.random() * itemTypes.length)],
      estimatedPoints,
      confidence: Math.floor(Math.random() * 20) + 80, // 80-100%
      imageUrl,
    };

    return NextResponse.json(prediction);
  } catch (error) {
    console.error('Prediction API error:', error);
    return NextResponse.json(
      { error: '예측 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
