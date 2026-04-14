'use client';

import { Play } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

function toEmbedUrl(url: string): string {
  try {
    const u = new URL(url);
    if (u.hostname.includes('youtube.com') && u.searchParams.get('v')) {
      return `https://www.youtube-nocookie.com/embed/${u.searchParams.get('v')}`;
    }
    if (u.hostname === 'youtu.be') {
      return `https://www.youtube-nocookie.com/embed/${u.pathname.slice(1)}`;
    }
  } catch {
    /* ignore */
  }
  return url;
}

export default function PlayVideo({
  videoUrl,
  className,
}: {
  videoUrl: string;
  className?: string;
}) {
  const embed = toEmbedUrl(videoUrl);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className={cn(
            'absolute inset-0 z-20 flex items-center justify-center bg-black/25 transition hover:bg-black/35',
            className
          )}
          aria-label="Reprodukuj video"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-foreground shadow-lg">
            <Play className="ml-1 h-7 w-7" fill="currentColor" />
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl border-0 bg-black p-0 sm:max-w-4xl">
        <DialogTitle className="sr-only">Video</DialogTitle>
        <div className="aspect-video w-full overflow-hidden rounded-lg">
          <iframe
            title="Video"
            src={embed}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
