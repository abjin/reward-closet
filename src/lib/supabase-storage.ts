import { createClient } from '@supabase/supabase-js';

// 스토리지 전용 Supabase 클라이언트
export function createStorageClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
