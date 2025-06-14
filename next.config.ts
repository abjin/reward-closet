import type { NextConfig } from 'next';

const config: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kgejwdmitaxkcgxxbywx.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/clothing-images/**',
        search: '',
      },
    ],
  },
};

export default config;
