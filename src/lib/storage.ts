import { createStorageClient } from './supabase-storage';

export interface UploadResult {
  url: string;
  path: string;
  error?: string;
}

/**
 * Supabase Storage에 이미지 업로드
 * @param file 업로드할 파일
 * @param bucket 버킷 이름 (기본값: 'clothing-images')
 * @param folder 폴더 경로 (기본값: 'predictions')
 * @returns 업로드 결과
 */
export async function uploadImage(
  file: File,
  bucket: string = 'clothing-images',
  folder: string = 'public'
): Promise<UploadResult> {
  try {
    const supabase = createStorageClient();

    // 파일 확장자 추출
    const fileExt = file.name.split('.').pop();

    // 고유한 파일명 생성 (timestamp + random string)
    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}.${fileExt}`;

    // 파일 경로 생성
    const filePath = `${folder}/${fileName}`;

    // 파일 업로드
    const { error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Storage upload error:', error);
      return {
        url: '',
        path: '',
        error: error.message,
      };
    }

    // 공개 URL 가져오기
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return {
      url: urlData.publicUrl,
      path: filePath,
    };
  } catch (error) {
    console.error('Upload error:', error);
    return {
      url: '',
      path: '',
      error:
        error instanceof Error
          ? error.message
          : '업로드 중 오류가 발생했습니다.',
    };
  }
}

/**
 * Supabase Storage에서 이미지 삭제
 * @param path 삭제할 파일 경로
 * @param bucket 버킷 이름 (기본값: 'clothing-images')
 * @returns 성공 여부
 */
export async function deleteImage(
  path: string,
  bucket: string = 'clothing-images'
): Promise<boolean> {
  try {
    const supabase = createStorageClient();

    const { error } = await supabase.storage.from(bucket).remove([path]);

    if (error) {
      console.error('Storage delete error:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Delete error:', error);
    return false;
  }
}

/**
 * 파일 크기 검증 (최대 10MB)
 * @param file 검증할 파일
 * @returns 유효성 여부
 */
export function validateFileSize(file: File): boolean {
  const maxSize = 10 * 1024 * 1024; // 10MB
  return file.size <= maxSize;
}

/**
 * 이미지 파일 타입 검증
 * @param file 검증할 파일
 * @returns 유효성 여부
 */
export function validateImageType(file: File): boolean {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  return allowedTypes.includes(file.type);
}

/**
 * 파일 검증 (크기 + 타입)
 * @param file 검증할 파일
 * @returns 검증 결과
 */
export function validateFile(file: File): { isValid: boolean; error?: string } {
  if (!validateImageType(file)) {
    return {
      isValid: false,
      error: '지원되는 이미지 형식은 JPEG, PNG, WebP입니다.',
    };
  }

  if (!validateFileSize(file)) {
    return {
      isValid: false,
      error: '파일 크기는 10MB 이하여야 합니다.',
    };
  }

  return { isValid: true };
}
