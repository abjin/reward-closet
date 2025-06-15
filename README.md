# 🎽 Reward Closet

**AI-Powered Clothing Donation Platform**

A web application that analyzes clothing condition using AI to predict reward points and enables easy clothing donations.

## ✨ Key Features

### 🤖 AI Clothing Condition Prediction
- AI analyzes uploaded clothing photos to evaluate condition
- Provides estimated reward points based on clothing condition
- Automatic analysis of brand, item type, and condition

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
git clone https://github.com/your-username/reward-closet.git
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
- **AI Analysis**: External AI API service

## 📝 Scripts

```bash
npm run dev        # Run development server (with Turbopack)
npm run build      # Production build
npm run start      # Start production server
npm run lint       # Run ESLint
```

## 🤖 AI Features Details

### AI Clothing Analysis API
- **External AI Service**: Hosted on AWS Elastic Beanstalk
- **Analysis Items**: Clothing type, condition, damage level
- **Supported Categories**: Jackets, shirts, pants, dresses, skirts, etc.
- **Condition Classification**: Good (500P), Fair (200P), Poor (0P)

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