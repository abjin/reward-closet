# 🎽 Reward Closet

**AI 기반 의류 기부 플랫폼**

입지 않는 옷을 AI로 상태를 분석하여 예상 보상 포인트를 확인하고, 간편하게 기부할 수 있는 웹 애플리케이션입니다.

## ✨ 주요 기능

### 🤖 AI 옷 상태 예측
- 업로드한 옷 사진을 AI가 분석하여 상태를 평가
- 옷 상태에 따른 예상 보상 포인트 제공
- 브랜드, 아이템 타입, 컨디션 자동 분석

### 💝 간편한 기부 시스템
- 한 번의 클릭으로 기부 신청
- 택배 수거 및 방문 수거 옵션 제공
- 기부 진행 상황 실시간 추적

### 🏆 포인트 리워드 시스템
- 기부 완료 시 포인트 지급
- 개인 포인트 누적 현황 확인
- 기부 히스토리 관리

### 👤 사용자 관리
- **Supabase Auth** 기반 안전한 회원가입/로그인
- 이메일 인증 및 소셜 로그인 지원
- 개인 기부 내역 및 포인트 관리
- 마이페이지에서 전체 활동 현황 확인

### 💾 파일 관리
- **Supabase Storage** 활용 이미지 업로드
- 자동 파일 크기 및 형식 검증 (최대 10MB, JPG/PNG/WebP)
- CDN을 통한 빠른 이미지 서빙

## 🛠 기술 스택

### Frontend
- **Next.js 15** - React 기반 풀스택 프레임워크
- **React 19** - 최신 리액트 버전
- **TypeScript** - 타입 안정성
- **Tailwind CSS** - 유틸리티 우선 CSS 프레임워크
- **Radix UI** - 접근성이 우수한 UI 컴포넌트
- **Lucide React** - 아이콘 라이브러리

### Backend & Database
- **Next.js API Routes** - 서버리스 API
- **Prisma** - 타입 안전한 ORM
- **MySQL** - 관계형 데이터베이스
- **Supabase Auth** - 인증 시스템
- **Supabase Storage** - 이미지 파일 저장소

### 배포 & 인프라
- **Vercel** - Next.js 최적화 호스팅 플랫폼
- **Supabase** - Auth, Storage, 실시간 기능
- **AWS Elastic Beanstalk** - AI API 서비스 호스팅

### 개발 도구
- **ESLint** - 코드 품질 관리
- **Turbopack** - 빠른 개발 서버

## 📁 프로젝트 구조

```
src/
├── app/                    # Next.js App Router 페이지
│   ├── page.tsx           # 홈페이지
│   ├── login/             # 로그인 페이지
│   ├── signup/            # 회원가입 페이지
│   ├── predict/           # AI 예측 페이지
│   ├── donate/            # 기부 신청 페이지
│   ├── mypage/            # 마이페이지
│   ├── guide/             # 기부 가이드
│   └── api/               # API 라우트
│       ├── users/         # 사용자 관련 API
│       ├── donations/     # 기부 관련 API
│       ├── predict/       # AI 예측 API
│       └── user/          # 개별 사용자 API
├── components/            # 재사용 가능한 컴포넌트
│   ├── ui/               # 기본 UI 컴포넌트
│   └── header.tsx        # 공통 헤더
├── lib/                  # 유틸리티 및 설정
│   ├── supabase.ts      # Supabase 클라이언트
│   ├── prisma.ts        # Prisma 클라이언트
│   ├── storage.ts       # 파일 저장소 관련
│   └── utils.ts         # 공통 유틸리티
└── middleware.ts        # Next.js 미들웨어

prisma/
├── schema.prisma        # 데이터베이스 스키마
└── migrations/          # 데이터베이스 마이그레이션
```

## 📊 데이터베이스 모델

### User (사용자)
```prisma
model User {
  id          String      # 고유 ID
  email       String      # 이메일 (unique)
  nickname    String      # 닉네임
  supabaseId  String      # Supabase 사용자 ID
  points      Int         # 보유 포인트
  donations   Donation[]  # 기부 내역
  createdAt   DateTime    # 생성일
  updatedAt   DateTime    # 수정일
}
```

### Donation (기부)
```prisma
model Donation {
  id              String          # 고유 ID
  userId          String          # 사용자 ID
  imageUrl        String          # 옷 이미지 URL
  brand           String?         # 브랜드명
  itemType        String          # 아이템 종류
  condition       Condition       # 옷 상태 (양호/사용감/기부불가)
  estimatedPoints Int             # 예상 포인트
  actualPoints    Int?            # 실제 지급 포인트
  pickupMethod    PickupMethod    # 수거 방법 (택배/방문수거)
  address         String?         # 수거 주소
  status          DonationStatus  # 기부 상태
  createdAt       DateTime        # 생성일
  updatedAt       DateTime        # 수정일
}
```

## 🚀 시작하기

### 사전 요구사항
- Node.js 18 이상
- MySQL 데이터베이스
- **Supabase 계정** (Auth 및 Storage 설정 필요)
- **Vercel 계정** (배포용, 무료 플랜 사용 가능)
- AI API 서비스 (현재 외부 서비스 사용 중)

### 설치 및 실행

1. **저장소 클론**
```bash
git clone https://github.com/your-username/reward-closet.git
cd reward-closet
```

2. **의존성 설치**
```bash
npm install
```

3. **환경 변수 설정**
`.env.local` 파일을 생성하고 다음 내용을 추가하세요:
```env
# Database
DATABASE_URL="mysql://user:password@localhost:3306/reward_closet"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# AI API (현재 외부 서비스 사용)
# AI_API_URL은 코드에 하드코딩되어 있습니다
```

4. **데이터베이스 설정**
```bash
# Prisma 클라이언트 생성
npx prisma generate

# 데이터베이스 마이그레이션 (개발 환경)
npx prisma db push

# 또는 마이그레이션 파일 적용 (프로덕션 환경)
npx prisma migrate deploy
```

5. **Supabase Storage 설정**
Supabase 대시보드에서 다음 Storage 버킷을 생성해주세요:
- 버킷명: `clothing-images`
- 공개 정책: 활성화

6. **개발 서버 실행**
```bash
npm run dev
```

애플리케이션이 [http://localhost:3000](http://localhost:3000)에서 실행됩니다.

## 🌐 배포

### Vercel 배포
이 프로젝트는 Vercel에서 배포하도록 최적화되어 있습니다.

1. **Vercel 배포**
```bash
# Vercel CLI 설치
npm i -g vercel

# 프로젝트 배포
vercel --prod
```

2. **환경 변수 설정**
Vercel 대시보드에서 다음 환경 변수를 설정하세요:
```
DATABASE_URL=your_mysql_database_url
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 서비스 구성
- **호스팅**: Vercel (Next.js 최적화)
- **인증**: Supabase Auth (소셜 로그인, 이메일 인증)
- **스토리지**: Supabase Storage (이미지 파일 관리)
- **데이터베이스**: MySQL (Prisma ORM, RDS)
- **AI 분석**: AI API

## 📝 주요 스크립트

```bash
npm run dev        # 개발 서버 실행 (Turbopack 사용)
npm run build      # 프로덕션 빌드
npm run start      # 프로덕션 서버 실행
npm run lint       # ESLint 검사
```

## 🤖 AI 기능 상세

### AI 의류 분석 API
- **외부 AI 서비스**: AWS Elastic Beanstalk에서 호스팅
- **분석 항목**: 의류 종류, 상태, 손상 정도
- **지원 카테고리**: 자켓, 셔츠, 바지, 원피스, 치마 등
- **상태 분류**: 양호(500P), 사용감 있음(200P), 기부 불가(0P)

## 🌟 주요 페이지

- **홈페이지** (`/`) - 서비스 소개 및 통계 정보
- **AI 예측** (`/predict`) - 옷 사진 업로드 및 AI 분석
- **기부 신청** (`/donate`) - 기부 신청 및 수거 정보 입력
- **마이페이지** (`/mypage`) - 개인 기부 내역 및 포인트 관리
- **로그인/회원가입** (`/login`, `/signup`) - 사용자 인증

## 🎯 사용 방법

1. **회원가입** - 이메일과 닉네임으로 간편 가입
2. **사진 업로드** - 기부할 옷의 사진을 찍어 업로드
3. **AI 분석** - AI가 옷 상태를 분석하고 예상 포인트 제공
4. **기부 신청** - 수거 방법을 선택하고 기부 신청
5. **포인트 획득** - 기부 완료 후 포인트 지급

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 📧 문의

프로젝트 관련 문의사항이 있으시면 이슈를 생성해주세요.

---

**Reward Closet**과 함께 의미 있는 기부 문화를 만들어나가요! 🌱
