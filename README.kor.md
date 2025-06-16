# 🎽 Reward Closet

**AI 기반 의류 기부 플랫폼**

입지 않는 옷을 AI로 상태를 분석하여 예상 보상 포인트를 확인하고, 간편하게 기부할 수 있는 웹 애플리케이션입니다.

## 📖 소개

### 프로젝트 개요
Reward Closet은 인공지능을 통해 의류 폐기물과 자선 기부 사이의 격차를 해소하는 혁신적인 플랫폼입니다. 모든 사람이 더 쉽고, 투명하며, 보람 있는 의류 기부를 할 수 있도록 하는 것이 우리의 사명입니다.

### 우리가 해결하고자 하는 문제
- **의류 폐기물 위기**: 매년 수백만 톤의 의류가 매립지로 가면서 환경 오염을 야기합니다
- **기부 장벽**: 기존의 기부 과정은 복잡하고 시간이 많이 걸리며 투명성이 부족합니다
- **가치 불확실성**: 기부자들은 자신의 옷이 얼마나 가치 있는지, 어떤 영향을 미치는지 명확히 알 수 없습니다
- **제한적인 인센티브**: 현재의 기부 시스템은 지속적인 참여에 대한 동기 부여가 부족합니다

### 우리의 동기
우리는 기술이 지속 가능한 소비와 자선 기부에 대한 접근 방식을 변화시킬 수 있다고 믿습니다. AI 기반 평가와 투명한 보상 시스템을 결합하여 다음을 목표로 합니다:

- **섬유 폐기물 감소**: 사람들이 버리는 대신 기부하기 쉽게 만들기
- **기부 참여 증대**: 명확한 가치와 보상을 제공하여 정기적인 기부를 장려
- **투명성 향상**: 기술을 사용하여 기부자에게 기여의 실제 영향을 보여주기
- **커뮤니티 구축**: 기부가 참여형이고 사회적인 활동이 되는 플랫폼 만들기

### 우리의 솔루션
Reward Closet은 최첨단 AI 기술을 활용하여:
- **즉시 평가**: AI가 의류 상태를 분석하고 즉시 가치를 추정합니다
- **관대함에 보상**: 기부자를 인정하고 보상하는 포인트 기반 시스템
- **프로세스 간소화**: 유연한 수거 옵션이 있는 원클릭 기부 시스템
- **영향 추적**: 기부 상태와 커뮤니티 영향의 실시간 추적

기부를 보람되고, 투명하며, 쉽게 만들어서 모든 사람이 이기는 지속 가능한 생태계를 만들고 있습니다. 기부자는 가치를 인정받고, 수혜자는 양질의 의류를 받으며, 환경은 폐기물 감소의 혜택을 누립니다.

## 🔗 프로젝트 링크

- **🌐 웹 애플리케이션**: [https://reward-closet.vercel.app](https://reward-closet.vercel.app)
- **⚡ AI API 서버 저장소**: [https://github.com/abjin/reward-closet-ai-api-server](https://github.com/abjin/reward-closet-ai-api-server)
- **📚 AI API 문서**: [https://reward-closet-ai-api.eba-by6v3rd4.ap-northeast-2.elasticbeanstalk.com/docs](https://reward-closet-ai-api.eba-by6v3rd4.ap-northeast-2.elasticbeanstalk.com/docs)

## 🏗 시스템 아키텍처

![시스템 아키텍처](diagram.png)

위 다이어그램은 Reward Closet 플랫폼의 핵심 구성요소와 데이터 흐름을 보여줍니다:

- **사용자**: 웹 애플리케이션과 상호작용
- **웹 앱**: Vercel에서 호스팅되는 Next.js 애플리케이션
- **AI 서버**: AWS의 FastAPI 기반 의류 분석 서비스
- **데이터베이스**: 사용자 데이터와 기부 기록을 위한 MySQL 데이터베이스
- **Supabase**: 인증 및 이미지 저장소 처리

## ✨ 주요 기능

### 🤖 AI 옷 상태 예측
- 업로드한 옷 사진을 AI가 분석하여 상태를 평가
- 옷 상태에 따른 예상 보상 포인트 제공
- 아이템 타입, 컨디션 자동 분석

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
git clone https://github.com/abjin/reward-closet.git
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
- **AI 분석**: [FastAPI 서버](https://github.com/abjin/reward-closet-ai-api-server) (AWS Elastic Beanstalk)

## 📝 주요 스크립트

```bash
npm run dev        # 개발 서버 실행 (Turbopack 사용)
npm run build      # 프로덕션 빌드
npm run start      # 프로덕션 서버 실행
npm run lint       # ESLint 검사
```

## 🤖 AI 기능 상세

### AI 의류 분석 API
- **AI 서버 저장소**: [reward-closet-ai-api-server](https://github.com/abjin/reward-closet-ai-api-server)
- **프레임워크**: FastAPI + PyTorch TorchScript 모델
- **플랫폼**: AWS Elastic Beanstalk
- **API 엔드포인트**: `/models/clothes/predict`

### 지원 카테고리
**의류 종류 (15개 카테고리)**:
- jacket, short pants, tailored pants, jumper, shirts
- coat, dress, casual pants, blouse, tshirts, skirt

**결함 감지**:
- ripped (찢어짐), pollution (오염), tearing (찢어짐), frayed (헤짐)

### 상태 분류 및 포인트
- **양호한 상태** (500P): 결함 없음
- **사용감 있음** (200P): 경미한 결함 (마모, 약간의 손상)
- **기부 불가** (0P): 심각한 결함 (찢어짐, 얼룩, 심한 손상)

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
