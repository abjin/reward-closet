# 🎽 Reward Closet

**AI-Powered Clothing Donation Platform**

A web application that analyzes clothing condition using AI to predict reward points and enables easy clothing donations.

## 📖 Introduction

### Project Overview
Reward Closet is an innovative platform that bridges the gap between clothing waste and charitable giving through artificial intelligence. Our mission is to make clothing donations more accessible, transparent, and rewarding for everyone involved.

### The Problem We're Solving
- **Clothing Waste Crisis**: Millions of tons of clothing end up in landfills each year, contributing to environmental pollution
- **Donation Barriers**: Traditional donation processes are often complicated, time-consuming, and lack transparency
- **Value Uncertainty**: Donors have no clear understanding of their clothing's worth or impact
- **Limited Incentives**: Current donation systems provide minimal motivation for regular participation

### Our Motivation
We believe that technology can transform how we approach sustainable consumption and charitable giving. By combining AI-powered assessment with a transparent reward system, we aim to:

- **Reduce Textile Waste**: Make it easier for people to donate instead of discarding
- **Increase Donation Participation**: Provide clear value and rewards to encourage regular donations
- **Enhance Transparency**: Use technology to show donors the real impact of their contributions
- **Build Community**: Create a platform where giving back becomes engaging and social

### Our Solution
Reward Closet leverages cutting-edge AI technology to:
- **Instantly Assess**: AI analyzes clothing condition and provides immediate value estimates
- **Reward Generosity**: Points-based system that recognizes and rewards donors
- **Simplify Process**: One-click donation system with flexible pickup options
- **Track Impact**: Real-time tracking of donation status and community impact

By making donations rewarding, transparent, and effortless, we're creating a sustainable ecosystem where everyone wins – donors feel valued, recipients get quality clothing, and the environment benefits from reduced waste.

## 🔗 Project Links

- **🌐 Web Application**: [https://reward-closet.vercel.app](https://reward-closet.vercel.app)
- **⚡ AI API Server Repository**: [https://github.com/abjin/reward-closet-ai-api-server](https://github.com/abjin/reward-closet-ai-api-server)
- **📚 AI API Documentation**: [https://reward-closet-ai-api.eba-by6v3rd4.ap-northeast-2.elasticbeanstalk.com/docs](https://reward-closet-ai-api.eba-by6v3rd4.ap-northeast-2.elasticbeanstalk.com/docs)

## 🏗 Representative block diagram (System Architecture)

![System Architecture](diagram.png)

The diagram above illustrates the core components and data flow of the Reward Closet platform:

- **User**: Interacts with the web application
- **Web App**: Next.js application hosted on Vercel
- **AI Server**: FastAPI-based clothing analysis service on AWS
- **Database**: MySQL database for user data and donation records
- **Supabase**: Handles authentication and image storage

## ✨ Key Features

### 🤖 AI Clothing Condition Prediction
- AI analyzes uploaded clothing photos to evaluate condition
- Provides estimated reward points based on clothing condition
- Automatic analysis of item type, and condition

### 💝 Simple Donation System
- One-click donation application
- Delivery pickup and home collection options
- Real-time donation progress tracking

### 🏆 Point Reward System
- Points awarded upon donation completion
- Personal accumulated points tracking
- Donation history management

### 👤 User Management
- **Supabase Auth** based secure registration/login
- Email verification and social login support
- Personal donation history and points management
- Complete activity overview in My Page

### 💾 File Management
- Image upload using **Supabase Storage**
- Automatic file size and format validation (max 10MB, JPG/PNG/WebP)
- Fast image serving through CDN

## 🛠 Tech Stack

### Frontend
- **Next.js 15** - React-based full-stack framework
- **React 19** - Latest React version
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible UI components
- **Lucide React** - Icon library

### Backend & Database
- **Next.js API Routes** - Serverless API
- **Prisma** - Type-safe ORM
- **MySQL** - Relational database
- **Supabase Auth** - Authentication system
- **Supabase Storage** - Image file storage

### Deployment & Infrastructure
- **Vercel** - Next.js optimized hosting platform
- **Supabase** - Auth, Storage, real-time features
- **AWS Elastic Beanstalk** - AI API service hosting

### Development Tools
- **ESLint** - Code quality management
- **Turbopack** - Fast development server

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── login/             # Login page
│   ├── signup/            # Sign up page
│   ├── predict/           # AI prediction page
│   ├── donate/            # Donation application page
│   ├── mypage/            # My page
│   ├── guide/             # Donation guide
│   └── api/               # API routes
│       ├── users/         # User-related API
│       ├── donations/     # Donation-related API
│       ├── predict/       # AI prediction API
│       └── user/          # Individual user API
├── components/            # Reusable components
│   ├── ui/               # Basic UI components
│   └── header.tsx        # Common header
├── lib/                  # Utilities and configurations
│   ├── supabase.ts      # Supabase client
│   ├── prisma.ts        # Prisma client
│   ├── storage.ts       # File storage related
│   └── utils.ts         # Common utilities
└── middleware.ts        # Next.js middleware

prisma/
├── schema.prisma        # Database schema
└── migrations/          # Database migrations
```

## 📊 Database Models

### User
```prisma
model User {
  id          String      # Unique ID
  email       String      # Email (unique)
  nickname    String      # Nickname
  supabaseId  String      # Supabase user ID
  points      Int         # Points balance
  donations   Donation[]  # Donation history
  createdAt   DateTime    # Created at
  updatedAt   DateTime    # Updated at
}
```

### Donation
```prisma
model Donation {
  id              String          # Unique ID
  userId          String          # User ID
  imageUrl        String          # Clothing image URL
  brand           String?         # Brand name
  itemType        String          # Item type
  condition       Condition       # Clothing condition (Good/Fair/Poor)
  estimatedPoints Int             # Estimated points
  actualPoints    Int?            # Actual awarded points
  pickupMethod    PickupMethod    # Pickup method (Delivery/Home pickup)
  address         String?         # Pickup address
  status          DonationStatus  # Donation status
  createdAt       DateTime        # Created at
  updatedAt       DateTime        # Updated at
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- MySQL database
- **Supabase account** (Auth and Storage setup required)
- **Vercel account** (for deployment, free plan available)
- AI API service (currently using external service)

### Installation & Setup

1. **Clone the repository**
```bash
git clone https://github.com/abjin/reward-closet.git
cd reward-closet
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment variables setup**
Create a `.env.local` file and add the following:
```env
# Database
DATABASE_URL="mysql://user:password@localhost:3306/reward_closet"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# AI API (currently using external service)
# AI_API_URL is hardcoded in the code
```

4. **Database setup**
```bash
# Generate Prisma client
npx prisma generate

# Database migration (development)
npx prisma db push

# Or apply migration files (production)
npx prisma migrate deploy
```

5. **Supabase Storage setup**
Create the following Storage bucket in your Supabase dashboard:
- Bucket name: `clothing-images`
- Public policy: Enabled

6. **Run development server**
```bash
npm run dev
```

The application will run at [http://localhost:3000](http://localhost:3000).

## 🌐 Deployment

### Vercel Deployment
This project is optimized for deployment on Vercel.

1. **Deploy to Vercel**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy project
vercel --prod
```

2. **Environment variables setup**
Set the following environment variables in your Vercel dashboard:
```
DATABASE_URL=your_mysql_database_url
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### Service Architecture
- **Hosting**: Vercel (Next.js optimized)
- **Authentication**: Supabase Auth (social login, email verification)
- **Storage**: Supabase Storage (image file management)
- **Database**: MySQL (Prisma ORM, RDS)
- **AI Analysis**: [FastAPI Server](https://github.com/abjin/reward-closet-ai-api-server) on AWS Elastic Beanstalk

## 📝 Scripts

```bash
npm run dev        # Run development server (with Turbopack)
npm run build      # Production build
npm run start      # Start production server
npm run lint       # Run ESLint
```

## 🤖 AI Features Details

### AI Clothing Analysis API
- **AI Server Repository**: [reward-closet-ai-api-server](https://github.com/abjin/reward-closet-ai-api-server)
- **Framework**: FastAPI with PyTorch TorchScript models
- **Platform**: AWS Elastic Beanstalk
- **API Endpoint**: `/models/clothes/predict`

### Supported Categories
**Clothing Types (15 categories)**:
- jacket, short pants, tailored pants, jumper, shirts
- coat, dress, casual pants, blouse, tshirts, skirt

**Defect Detection**:
- ripped, pollution, tearing, frayed

### Condition Classification & Points
- **Good Condition** (500P): No defects detected
- **Fair Condition** (200P): Minor defects (wear, slight damage)
- **Poor Condition** (0P): Major defects (tears, stains, severe damage)

## 🌟 Main Pages

- **Home** (`/`) - Service introduction and statistics
- **AI Prediction** (`/predict`) - Upload clothing photos and AI analysis
- **Donation Application** (`/donate`) - Apply for donation and pickup information
- **My Page** (`/mypage`) - Personal donation history and points management
- **Login/Sign Up** (`/login`, `/signup`) - User authentication

## 🎯 How to Use

1. **Sign Up** - Simple registration with email and nickname
2. **Upload Photo** - Take and upload photos of clothes to donate
3. **AI Analysis** - AI analyzes clothing condition and provides estimated points
4. **Apply for Donation** - Select pickup method and apply for donation
5. **Earn Points** - Receive points after donation completion

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is distributed under the MIT License.

## 📧 Contact

If you have any questions about the project, please create an issue.

---

**Let's create a meaningful donation culture together with Reward Closet!** 🌱 