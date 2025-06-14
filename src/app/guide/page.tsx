import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import Header from '@/components/header';

const conditionGuides = [
  {
    condition: 'GOOD',
    title: '양호',
    points: '200-500P',
    color: 'bg-blue-100 text-blue-800',
    icon: <CheckCircle className="h-5 w-5" />,
    description: '여러 번 착용했지만 상태가 좋은 의류',
    criteria: [
      '착용감은 있지만 깨끗한 상태',
      '미세한 사용감은 있으나 손상 없음',
      '색상이 원래대로 유지됨',
      '형태가 잘 보존되어 있음',
      '세탁 후 깔끔한 상태',
    ],
    examples: [
      '정기적으로 착용했지만 관리가 잘 된 옷',
      '계절옷으로 몇 번 착용한 아우터',
      '출근복으로 사용했지만 상태 좋은 셔츠',
    ],
  },
  {
    condition: 'FAIR',
    title: '사용감 있음',
    points: '50-200P',
    color: 'bg-yellow-100 text-yellow-800',
    icon: <AlertCircle className="h-5 w-5" />,
    description: '사용감이 있지만 기부 가능한 상태',
    criteria: [
      '눈에 띄는 사용감이 있음',
      '약간의 변색이나 보풀이 있음',
      '작은 얼룩이나 미세한 손상',
      '형태가 약간 변형됨',
      '하지만 착용 가능한 상태',
    ],
    examples: [
      '자주 착용해서 보풀이 생긴 니트',
      '약간의 변색이 있는 청바지',
      '소매나 목 부분이 늘어난 티셔츠',
    ],
  },
  {
    condition: 'POOR',
    title: '기부 불가',
    points: '0P',
    color: 'bg-red-100 text-red-800',
    icon: <XCircle className="h-5 w-5" />,
    description: '기부하기 어려운 상태의 의류',
    criteria: [
      '큰 얼룩이나 손상이 있음',
      '구멍이나 찢어진 부분',
      '심한 변색이나 탈색',
      '냄새가 제거되지 않음',
      '형태가 심하게 변형됨',
    ],
    examples: [
      '세탁으로 제거되지 않는 얼룩',
      '구멍이 뚫리거나 찢어진 옷',
      '심하게 늘어나거나 변형된 옷',
    ],
  },
];

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">의류 상태 기준 안내</h1>
            <p className="text-lg text-gray-600">
              AI가 어떤 기준으로 옷의 상태를 판단하는지 알아보세요.
              <br />
              상태에 따라 받을 수 있는 포인트가 달라집니다.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {conditionGuides.map((guide) => (
              <Card key={guide.condition} className="h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${guide.color}`}>
                        {guide.icon}
                      </div>
                      <div>
                        <CardTitle className="text-xl">{guide.title}</CardTitle>
                        <Badge variant="secondary" className="mt-1">
                          {guide.points}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 mt-2">{guide.description}</p>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-sm text-gray-800 uppercase tracking-wide">
                      판단 기준
                    </h4>
                    <ul className="space-y-2">
                      {guide.criteria.map((criterion, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm text-gray-600">
                            {criterion}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 text-sm text-gray-800 uppercase tracking-wide">
                      예시
                    </h4>
                    <ul className="space-y-2">
                      {guide.examples.map((example, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm text-gray-600">
                            {example}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">
              📝 기부 전 체크리스트
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">✅ 기부 가능</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 깨끗하게 세탁된 상태</li>
                  <li>• 보관 상태가 양호함</li>
                  <li>• 착용 가능한 상태</li>
                  <li>• 브랜드나 라벨이 확인 가능</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">❌ 기부 불가</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 속옷이나 양말류</li>
                  <li>• 수영복, 운동복</li>
                  <li>• 심하게 손상된 옷</li>
                  <li>• 가죽, 모피 제품</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              상태 기준에 대해 더 궁금한 점이 있으시나요?
            </p>
            <p className="text-sm text-gray-500">
              AI 예측 결과가 실제와 다를 수 있으며, 최종 심사 후 포인트가 조정될
              수 있습니다.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
