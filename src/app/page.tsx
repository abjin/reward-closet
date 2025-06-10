import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, Coins, Heart, TrendingUp, Users, Package } from 'lucide-react';
import Header from '@/components/header';
import { prisma } from '@/lib/prisma';

async function getStats() {
  try {
    const [totalDonations, totalUsers, totalPoints] = await Promise.all([
      prisma.donation.count(),
      prisma.user.count(),
      prisma.user.aggregate({
        _sum: {
          points: true,
        },
      }),
    ]);

    return {
      totalDonations,
      totalUsers,
      totalPoints: totalPoints._sum.points || 0,
    };
  } catch (error) {
    console.error('Failed to fetch stats:', error);
    return {
      totalDonations: 0,
      totalUsers: 0,
      totalPoints: 0,
    };
  }
}

export default async function HomePage() {
  const stats = await getStats();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              입지 않는 옷,
              <br />
              <span className="text-blue-600">AI로 보상받고 기부해요!</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              AI가 옷 상태를 분석하여 예상 보상 포인트를 알려드립니다. 간편하게
              기부하고 포인트를 받아보세요.
            </p>
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link href="/predict">지금 시작하기</Link>
            </Button>
          </div>
        </section>

        {/* How it works */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            어떻게 작동하나요?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Camera className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">1. 사진 업로드</h3>
              <p className="text-gray-600">
                기부할 옷의 사진을 찍어 업로드하세요
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">2. AI 예측</h3>
              <p className="text-gray-600">
                AI가 옷 상태를 분석하고 보상 포인트를 예측합니다
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">3. 기부 신청</h3>
              <p className="text-gray-600">
                예측 결과를 확인하고 기부를 신청하세요
              </p>
            </div>

            <div className="text-center">
              <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Coins className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">4. 포인트 지급</h3>
              <p className="text-gray-600">
                기부가 완료되면 포인트를 받아보세요
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              함께 만든 변화
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    총 기부 건수
                  </CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stats.totalDonations.toLocaleString()}건
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    참여 회원 수
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stats.totalUsers.toLocaleString()}명
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    누적 포인트
                  </CardTitle>
                  <Coins className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stats.totalPoints.toLocaleString()}P
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">지금 바로 시작해보세요!</h2>
            <p className="text-xl text-gray-600 mb-8">
              집에 잠자고 있는 옷들을 의미 있는 기부로 만들어보세요.
            </p>
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link href="/predict">AI 예측 시작하기</Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
