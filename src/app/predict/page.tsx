'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Upload,
  Camera,
  Loader2,
  CheckCircle,
  Star,
  AlertCircle,
  Coins,
  ArrowRight,
} from 'lucide-react';
import Header from '@/components/header';
import { uploadImage, validateFile } from '@/lib/storage';

interface PredictionResult {
  condition: 'EXCELLENT' | 'GOOD' | 'FAIR' | 'POOR';
  brand?: string;
  itemType: string;
  estimatedPoints: number;
  confidence: number;
  imageUrl: string;
}

export default function PredictPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [error, setError] = useState('');
  const router = useRouter();

  const conditionDetails = {
    EXCELLENT: {
      title: '새상품',
      color: 'bg-green-100 text-green-800',
      icon: <Star className="h-4 w-4" />,
      description: '매우 좋은 상태',
    },
    GOOD: {
      title: '양호',
      color: 'bg-blue-100 text-blue-800',
      icon: <CheckCircle className="h-4 w-4" />,
      description: '좋은 상태',
    },
    FAIR: {
      title: '사용감 있음',
      color: 'bg-yellow-100 text-yellow-800',
      icon: <AlertCircle className="h-4 w-4" />,
      description: '보통 상태',
    },
    POOR: {
      title: '기부 불가',
      color: 'bg-red-100 text-red-800',
      icon: <AlertCircle className="h-4 w-4" />,
      description: '기부하기 어려운 상태',
    },
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // 파일 검증
      const validation = validateFile(file);
      if (!validation.isValid) {
        setError(validation.error || '잘못된 파일입니다.');
        return;
      }

      setSelectedFile(file);
      setError('');
      setPrediction(null);

      // 미리보기 생성
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const mockAIPrediction = (): PredictionResult => {
    const conditions: Array<'EXCELLENT' | 'GOOD' | 'FAIR' | 'POOR'> = [
      'EXCELLENT',
      'GOOD',
      'FAIR',
      'POOR',
    ];
    const brands = [
      'Nike',
      'Adidas',
      'Zara',
      'H&M',
      'Uniqlo',
      'Calvin Klein',
      '무신사',
      '',
    ];
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

    return {
      condition: randomCondition,
      brand: brands[Math.floor(Math.random() * brands.length)] || undefined,
      itemType: itemTypes[Math.floor(Math.random() * itemTypes.length)],
      estimatedPoints,
      confidence: Math.floor(Math.random() * 20) + 80, // 80-100%
      imageUrl: preview || '',
    };
  };

  const handlePredict = async () => {
    if (!selectedFile || !preview) {
      setError('먼저 이미지를 선택해주세요.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Supabase Storage에 이미지 업로드
      const uploadResult = await uploadImage(selectedFile);
      console.log(uploadResult.url);

      if (uploadResult.error) {
        setError(`업로드 실패: ${uploadResult.error}`);
        return;
      }

      // 실제 구현에서는 여기서 AI API를 호출합니다
      // 현재는 mock 데이터로 시뮬레이션
      await new Promise((resolve) => setTimeout(resolve, 2000)); // AI 분석 시뮬레이션

      const result = mockAIPrediction();
      // 업로드된 이미지 URL로 교체
      result.imageUrl = uploadResult.url;

      setPrediction(result);
    } catch (error) {
      console.error('Prediction error:', error);
      setError('예측 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const handleDonate = () => {
    if (prediction) {
      // 예측 결과를 세션 스토리지에 저장하고 기부 페이지로 이동
      sessionStorage.setItem('predictionResult', JSON.stringify(prediction));
      router.push('/donate');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">AI 의류 상태 예측</h1>
            <p className="text-lg text-gray-600">
              옷 사진을 업로드하면 AI가 상태를 분석하고 예상 보상 포인트를
              알려드립니다.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* 이미지 업로드 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  사진 업로드
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  {preview ? (
                    <div className="space-y-4">
                      <div className="relative mx-auto w-64 h-64">
                        <Image
                          src={preview}
                          alt="업로드된 이미지"
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setPreview(null);
                          setSelectedFile(null);
                          setPrediction(null);
                        }}
                      >
                        다른 이미지 선택
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div>
                        <Label
                          htmlFor="image-upload"
                          className="cursor-pointer"
                        >
                          <div className="text-lg font-medium text-gray-700">
                            클릭하여 이미지 업로드
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            JPG, PNG 파일 (최대 10MB)
                          </div>
                        </Label>
                        <Input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleFileSelect}
                          className="hidden"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button
                  onClick={handlePredict}
                  disabled={!selectedFile || loading}
                  className="w-full"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      AI 분석 중...
                    </>
                  ) : (
                    <>
                      <Star className="mr-2 h-4 w-4" />
                      AI 예측 시작
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* 예측 결과 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  예측 결과
                </CardTitle>
              </CardHeader>
              <CardContent>
                {prediction ? (
                  <div className="space-y-6">
                    <div className="text-center">
                      <div
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                          conditionDetails[prediction.condition].color
                        }`}
                      >
                        {conditionDetails[prediction.condition].icon}
                        <span className="font-semibold">
                          {conditionDetails[prediction.condition].title}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        신뢰도: {prediction.confidence}%
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium">의류 종류</span>
                        <span className="text-sm">{prediction.itemType}</span>
                      </div>

                      {prediction.brand && (
                        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                          <span className="text-sm font-medium">브랜드</span>
                          <span className="text-sm">{prediction.brand}</span>
                        </div>
                      )}

                      <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                        <span className="text-sm font-medium">예상 포인트</span>
                        <div className="flex items-center gap-1">
                          <Coins className="h-4 w-4 text-blue-600" />
                          <span className="text-lg font-bold text-blue-600">
                            {prediction.estimatedPoints}P
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <p className="text-sm text-amber-800">
                        💡 이 결과는 AI 예측이며, 실제 심사 후 포인트가 달라질
                        수 있습니다.
                      </p>
                    </div>

                    <Button
                      onClick={handleDonate}
                      className="w-full"
                      size="lg"
                      disabled={prediction.condition === 'POOR'}
                    >
                      {prediction.condition === 'POOR' ? (
                        '기부 불가'
                      ) : (
                        <>
                          기부 신청하기
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <Star className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                    <p>이미지를 업로드하고 AI 예측을 시작해보세요.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* 도움말 */}
          <div className="mt-12 bg-white rounded-lg border p-6">
            <h3 className="text-lg font-semibold mb-4">
              📸 더 정확한 예측을 위한 사진 촬영 팁
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <h4 className="font-medium mb-2">✅ 좋은 사진</h4>
                <ul className="space-y-1">
                  <li>• 밝은 자연광에서 촬영</li>
                  <li>• 옷 전체가 보이도록 촬영</li>
                  <li>• 정면에서 평평하게 펼쳐서 촬영</li>
                  <li>• 라벨과 브랜드 태그가 보이도록</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">❌ 피해야 할 사진</h4>
                <ul className="space-y-1">
                  <li>• 어둡거나 흐릿한 사진</li>
                  <li>• 구겨져 있거나 뒤섞인 상태</li>
                  <li>• 일부분만 보이는 사진</li>
                  <li>• 배경이 복잡한 사진</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
