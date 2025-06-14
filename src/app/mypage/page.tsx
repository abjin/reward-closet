'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Coins,
  Package,
  Clock,
  CheckCircle,
  User,
  Heart,
  TrendingUp,
  Calendar,
} from 'lucide-react';
import Header from '@/components/header';
import { createClient } from '@/lib/supabase';

interface Donation {
  id: string;
  imageUrl: string;
  itemType: string;
  condition: 'EXCELLENT' | 'GOOD' | 'FAIR' | 'POOR';
  estimatedPoints: number;
  actualPoints?: number;
  pickupMethod: 'DELIVERY' | 'PICKUP';
  address: string;
  status:
    | 'PENDING'
    | 'CONFIRMED'
    | 'COLLECTED'
    | 'PROCESSED'
    | 'COMPLETED'
    | 'REJECTED';
  createdAt: string;
  updatedAt: string;
}

interface UserProfile {
  id: string;
  email: string;
  nickname: string;
  points: number;
  createdAt: string;
}

export default function MyPage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  const supabase = createClient();

  const statusDetails = {
    PENDING: {
      title: '신청완료',
      color: 'bg-blue-100 text-blue-800',
      icon: <Clock className="h-4 w-4" />,
    },
    CONFIRMED: {
      title: '수거확정',
      color: 'bg-yellow-100 text-yellow-800',
      icon: <Package className="h-4 w-4" />,
    },
    COLLECTED: {
      title: '수거완료',
      color: 'bg-purple-100 text-purple-800',
      icon: <CheckCircle className="h-4 w-4" />,
    },
    PROCESSED: {
      title: '처리완료',
      color: 'bg-green-100 text-green-800',
      icon: <CheckCircle className="h-4 w-4" />,
    },
    COMPLETED: {
      title: '포인트지급',
      color: 'bg-emerald-100 text-emerald-800',
      icon: <Coins className="h-4 w-4" />,
    },
    REJECTED: {
      title: '거부됨',
      color: 'bg-red-100 text-red-800',
      icon: <Package className="h-4 w-4" />,
    },
  };

  const conditionDetails = {
    EXCELLENT: { title: '새상품', color: 'bg-green-100 text-green-800' },
    GOOD: { title: '양호', color: 'bg-blue-100 text-blue-800' },
    FAIR: { title: '사용감 있음', color: 'bg-yellow-100 text-yellow-800' },
    POOR: { title: '기부 불가', color: 'bg-red-100 text-red-800' },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 사용자 인증 확인
        const {
          data: { user: authUser },
        } = await supabase.auth.getUser();

        if (!authUser) {
          router.push('/login');
          return;
        }

        // 기부 내역 가져오기
        const donationsResponse = await fetch('/api/donations');
        if (donationsResponse.ok) {
          const donationsData = await donationsResponse.json();
          setDonations(donationsData);
        }

        // 임시 사용자 정보 (실제로는 API에서 가져와야 함)
        setUser({
          id: authUser.id,
          email: authUser.email || '',
          nickname: authUser.user_metadata?.nickname || 'User',
          points: 1250, // 임시값
          createdAt: authUser.created_at || new Date().toISOString(),
        });
      } catch {
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router, supabase.auth]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const totalEstimatedPoints = donations.reduce(
    (sum, donation) => sum + donation.estimatedPoints,
    0
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">마이페이지</h1>
            <p className="text-lg text-gray-600">
              기부 내역과 포인트를 확인해보세요.
            </p>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-8">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* 사용자 정보 및 통계 */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">내 포인트</CardTitle>
                <Coins className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {user?.points.toLocaleString() || 0}P
                </div>
                <p className="text-xs text-muted-foreground">
                  사용 가능한 포인트
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  총 기부 건수
                </CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{donations.length}건</div>
                <p className="text-xs text-muted-foreground">누적 기부 건수</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  예상 포인트
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {totalEstimatedPoints.toLocaleString()}P
                </div>
                <p className="text-xs text-muted-foreground">처리 대기 중</p>
              </CardContent>
            </Card>
          </div>

          {/* 기부 내역 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                기부 내역
              </CardTitle>
            </CardHeader>
            <CardContent>
              {donations.length > 0 ? (
                <div className="space-y-6">
                  {donations.map((donation) => (
                    <div
                      key={donation.id}
                      className="border rounded-lg p-6 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex flex-col lg:flex-row gap-6">
                        <div className="flex-shrink-0">
                          <div className="relative w-32 h-32">
                            <Image
                              src={donation.imageUrl}
                              alt={donation.itemType}
                              fill
                              className="object-cover rounded-lg"
                            />
                          </div>
                        </div>

                        <div className="flex-1 space-y-4">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <div>
                              <h3 className="text-lg font-semibold">
                                {donation.itemType}
                              </h3>
                              <p className="text-sm text-gray-600 flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {formatDate(donation.createdAt)}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Badge
                                className={
                                  conditionDetails[donation.condition].color
                                }
                              >
                                {conditionDetails[donation.condition].title}
                              </Badge>
                              <Badge
                                className={statusDetails[donation.status].color}
                              >
                                <span className="flex items-center gap-1">
                                  {statusDetails[donation.status].icon}
                                  {statusDetails[donation.status].title}
                                </span>
                              </Badge>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">수거 방식</span>
                              <p className="font-medium">
                                {donation.pickupMethod === 'DELIVERY'
                                  ? '택배'
                                  : '방문수거'}
                              </p>
                            </div>
                            <div>
                              <span className="text-gray-500">예상 포인트</span>
                              <p className="font-medium text-blue-600">
                                {donation.estimatedPoints}P
                              </p>
                            </div>
                            {donation.actualPoints && (
                              <div>
                                <span className="text-gray-500">
                                  실제 포인트
                                </span>
                                <p className="font-medium text-green-600">
                                  {donation.actualPoints}P
                                </p>
                              </div>
                            )}
                            <div>
                              <span className="text-gray-500">주소</span>
                              <p className="font-medium truncate">
                                {donation.address}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Package className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                  <p className="text-lg mb-2">아직 기부 내역이 없습니다.</p>
                  <p className="text-sm mb-4">첫 번째 기부를 시작해보세요!</p>
                  <Button onClick={() => router.push('/predict')}>
                    AI 예측 시작하기
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 사용자 정보 */}
          {user && (
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  계정 정보
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-500">닉네임</span>
                    <p className="font-medium">{user.nickname}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">이메일</span>
                    <p className="font-medium">{user.email}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">가입일</span>
                    <p className="font-medium">{formatDate(user.createdAt)}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">누적 포인트</span>
                    <p className="font-medium text-blue-600">{user.points}P</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
