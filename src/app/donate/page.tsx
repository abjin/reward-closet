'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Truck, CheckCircle, Coins, Heart } from 'lucide-react';
import Header from '@/components/header';
import { createClient } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';
import { Condition, PickupMethod } from '@prisma/client';

interface PredictionResult {
  condition: Condition;
  itemType: string;
  estimatedPoints: number;
  confidence: number;
  imageUrl: string;
}

export default function DonatePage() {
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [pickupMethod, setPickupMethod] = useState<PickupMethod>(
    PickupMethod.DELIVERY
  );
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    // 예측 결과 가져오기
    const predictionData = sessionStorage.getItem('predictionResult');
    if (predictionData) {
      setPrediction(JSON.parse(predictionData));
    } else {
      // 예측 결과가 없으면 예측 페이지로 리디렉션
      router.push('/predict');
      return;
    }

    // 사용자 정보 가져오기
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();
  }, [router, supabase.auth]);

  const conditionDetails = {
    GOOD: { title: '양호', color: 'bg-blue-100 text-blue-800' },
    FAIR: { title: '사용감 있음', color: 'bg-yellow-100 text-yellow-800' },
    POOR: { title: '기부 불가', color: 'bg-red-100 text-red-800' },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!prediction || !user) {
      setError('필요한 정보가 없습니다.');
      return;
    }

    if (!address.trim()) {
      setError('주소를 입력해주세요.');
      return;
    }

    if (!phone.trim()) {
      setError('연락처를 입력해주세요.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // 기부 신청 API 호출
      const response = await fetch('/api/donations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageUrl: prediction.imageUrl,

          itemType: prediction.itemType,
          condition: prediction.condition,
          estimatedPoints: prediction.estimatedPoints,
          pickupMethod,
          address: `${address} ${detailAddress}`.trim(),
          phone,
          notes,
        }),
      });

      if (!response.ok) {
        throw new Error('기부 신청에 실패했습니다.');
      }

      // 세션 스토리지에서 예측 결과 제거
      sessionStorage.removeItem('predictionResult');

      // 성공 페이지로 이동
      router.push('/mypage?success=donation');
    } catch {
      setError('기부 신청 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  if (!prediction) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto">
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-gray-400 mb-4" />
            <p>로딩 중...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">기부 신청</h1>
            <p className="text-lg text-gray-600">
              예측 결과를 확인하고 수거 정보를 입력해주세요.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* 예측 결과 확인 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  예측 결과 확인
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {prediction.imageUrl && (
                  <div className="relative mx-auto w-64 h-64">
                    <Image
                      src={prediction.imageUrl}
                      alt="기부할 옷"
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                )}

                <div className="text-center">
                  <div
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                      conditionDetails[prediction.condition].color
                    }`}
                  >
                    <span className="font-semibold">
                      {conditionDetails[prediction.condition].title}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">의류 종류</span>
                    <span className="text-sm">{prediction.itemType}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm font-medium">예상 포인트</span>
                    <div className="flex items-center gap-1">
                      <Coins className="h-4 w-4 text-blue-600" />
                      <span className="font-bold text-blue-600">
                        {prediction.estimatedPoints}P
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-sm text-amber-800">
                    💡 최종 심사 후 포인트가 조정될 수 있습니다.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* 수거 정보 입력 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  수거 정보
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label>수거 방식</Label>
                    <Select
                      value={pickupMethod}
                      onValueChange={(value: PickupMethod) =>
                        setPickupMethod(value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={PickupMethod.DELIVERY}>
                          택배 수거 (무료)
                        </SelectItem>
                        <SelectItem value={PickupMethod.PICKUP}>
                          방문 수거 (서울 지역)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">주소 *</Label>
                    <Input
                      id="address"
                      placeholder="기본 주소를 입력하세요"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="detailAddress">상세 주소</Label>
                    <Input
                      id="detailAddress"
                      placeholder="동/호수, 건물명 등"
                      value={detailAddress}
                      onChange={(e) => setDetailAddress(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">연락처 *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="010-0000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">요청사항</Label>
                    <Textarea
                      id="notes"
                      placeholder="수거 시 참고사항이 있으면 입력해주세요"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                    />
                  </div>

                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Heart className="h-4 w-4 text-red-500" />
                      기부 안내
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 수거 완료 후 3-5일 내 최종 심사가 진행됩니다.</li>
                      <li>• 심사 완료 후 포인트가 지급됩니다.</li>
                      <li>• 기부된 의류는 필요한 분들에게 전달됩니다.</li>
                    </ul>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        신청 중...
                      </>
                    ) : (
                      <>
                        <Heart className="mr-2 h-4 w-4" />
                        기부 신청하기
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
