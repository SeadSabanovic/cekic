import Image from 'next/image';

import {
  resolvePutokazCover,
  type PutokazCoverImageInput,
} from '@/lib/putokaz-cover';
import { cn } from '@/lib/utils';

export type ContentImageBlockProps = {
  image: PutokazCoverImageInput;
  /** Fallback za alt ako nije unesen u studiju. */
  altFallback?: string;
  compact?: boolean;
  className?: string;
  priority?: boolean;
};

/** Slika u istom okviru kao hero blok (pattern, dashed border, zaobljeni rubovi). */
export function ContentImageBlock({
  image,
  altFallback = 'Ilustracija',
  compact = false,
  className,
  priority = false,
}: ContentImageBlockProps) {
  const resolved = resolvePutokazCover(
    { title: altFallback, coverImage: image },
    { w: 1400, h: 800 }
  );

  if (!resolved) return null;

  return (
    <figure className={cn('w-full', className)}>
      <div className="pattern-bg--2 rounded-3xl border border-dashed p-4 md:rounded-4xl md:p-6">
        <div className="relative w-full overflow-hidden rounded-3xl md:rounded-4xl">
          <Image
            priority={priority}
            width={1400}
            height={800}
            src={resolved.url}
            alt={resolved.alt}
            className={cn(
              'w-full rounded-2xl object-cover md:rounded-3xl',
              compact && 'max-h-120'
            )}
          />
        </div>
      </div>
    </figure>
  );
}
