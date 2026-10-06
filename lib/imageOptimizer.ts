export interface CompressionOptions {
  maxDimension?: number;
  quality?: number;
  mimeType?: 'image/webp' | 'image/jpeg' | 'image/png';
}

export interface CompressionResult {
  file: File;
  blob: Blob;
  dataUrl: string;
  width: number;
  height: number;
  originalSize: number;
  compressedSize: number;
  savingsPercentage: number;
  formattedOriginalSize: string;
  formattedCompressedSize: string;
  fileName: string;
}

export const QUALITY_PRESETS = {
  balanced: {
    label: 'Standard Portfolio (Recommended)',
    description: 'Max 1200px @ 80% quality. Optimal balance of visual fidelity & minimal file size (~100-250 KB).',
    maxDimension: 1200,
    quality: 0.8,
    mimeType: 'image/webp' as const
  },
  ultra: {
    label: 'Ultra High (Hero / Banner)',
    description: 'Max 1920px @ 85% quality. High-definition for full-screen hero headers & large monitors (~200-400 KB).',
    maxDimension: 1920,
    quality: 0.85,
    mimeType: 'image/webp' as const
  },
  compact: {
    label: 'Compact (Quick Loading)',
    description: 'Max 800px @ 75% quality. Lightweight thumbnail size for fast mobile rendering (~30-90 KB).',
    maxDimension: 800,
    quality: 0.75,
    mimeType: 'image/webp' as const
  }
};

export function formatBytes(bytes: number, decimals: number = 1): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export async function compressAndOptimizeImage(
  file: File,
  options: CompressionOptions = QUALITY_PRESETS.balanced
): Promise<CompressionResult> {
  const {
    maxDimension = 1200,
    quality = 0.8,
    mimeType = 'image/webp'
  } = options;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate aspect-ratio scaling
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get 2D context from canvas'));
          return;
        }

        // Enable high quality image smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // Draw image onto canvas
        ctx.drawImage(img, 0, 0, width, height);

        // Export to blob
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Canvas toBlob failed'));
              return;
            }

            const dataUrl = canvas.toDataURL(mimeType, quality);
            const extension = mimeType === 'image/webp' ? '.webp' : mimeType === 'image/jpeg' ? '.jpg' : '.png';
            const nameWithoutExt = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
            const newFileName = `${nameWithoutExt}_optimized${extension}`;

            const optimizedFile = new File([blob], newFileName, {
              type: mimeType,
              lastModified: Date.now(),
            });

            const originalSize = file.size;
            const compressedSize = blob.size;
            const savingsPercentage = originalSize > 0 
              ? Math.max(0, Math.round(((originalSize - compressedSize) / originalSize) * 100))
              : 0;

            resolve({
              file: optimizedFile,
              blob,
              dataUrl,
              width,
              height,
              originalSize,
              compressedSize,
              savingsPercentage,
              formattedOriginalSize: formatBytes(originalSize),
              formattedCompressedSize: formatBytes(compressedSize),
              fileName: newFileName,
            });
          },
          mimeType,
          quality
        );
      };

      img.onerror = (err) => reject(err);
    };

    reader.onerror = (err) => reject(err);
  });
}
