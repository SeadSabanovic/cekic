"use client";

import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player/lazy";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

// Defer Radix Dialog until after mount so SSR/CSR useId (aria-controls) stay aligned.
export default function VideoDialog({
  children,
  videoUrl,
}: {
  children: React.ReactNode;
  videoUrl?: string;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="inset-10 max-w-full max-h-[740px]">
        <ReactPlayer
          url={videoUrl}
          width="100%"
          height="100%"
          playing={true}
        />
      </DialogContent>
    </Dialog>
  );
}