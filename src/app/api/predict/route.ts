import { NextRequest, NextResponse } from 'next/server';
import { Condition } from '@prisma/client';

interface PredictionResult {
  condition: Condition;
  itemType: string;
  estimatedPoints: number;
  confidence: number;
  imageUrl: string;
}

// 의류 타입 매핑 (영어 -> 한국어)
function mapItemType(className: string): string {
  const itemTypeMap: { [key: string]: string } = {
    jacket: '자켓',
    'short pants': '반바지',
    'tailored pants': '정장바지',
    jumper: '점퍼',
    shirts: '셔츠',
    coat: '코트',
    dress: '원피스',
    'casual pants': '일반바지',
    blouse: '블라우스',
    tshirts: '티셔츠',
    skirt: '치마',
  };

  return itemTypeMap[className] || '의류';
}

// AI 분류 결과를 기반으로 상태 판단
function determineCondition(className: string): Condition {
  // 손상 상태 라벨들
  const damageLabels = ['ripped', 'pollution', 'tearing', 'frayed'];

  if (damageLabels.includes(className)) {
    return Condition.POOR;
  }

  return Condition.GOOD;
}

// condition에 따른 포인트 계산
function calculatePoints(condition: Condition): number {
  const pointRanges = {
    [Condition.GOOD]: [200, 500],
    [Condition.FAIR]: [50, 200],
    [Condition.POOR]: [0, 0],
  };

  const [minPoints, maxPoints] = pointRanges[condition];
  return Math.floor(Math.random() * (maxPoints - minPoints + 1)) + minPoints;
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

    const aiApiUrl =
      'http://reward-closet-ai-api.eba-by6v3rd4.ap-northeast-2.elasticbeanstalk.com/models/clothes/predict';

    const aiResponse = await fetch(aiApiUrl, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: imageUrl }),
    });

    if (!aiResponse.ok) {
      throw new Error(`AI API 호출 실패: ${aiResponse.status}`);
    }

    const aiResult = await aiResponse.json();

    // AI 응답을 우리 형식으로 변환
    const condition = determineCondition(aiResult.top1ClassName);

    const prediction: PredictionResult = {
      condition,
      itemType: mapItemType(aiResult.top1ClassName),
      estimatedPoints: calculatePoints(condition),
      confidence: Math.round(aiResult.top1Score * 100),
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
