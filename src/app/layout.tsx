import './(frontend)/globals.css';
import { Geist } from 'next/font/google';
import { cn } from '@/lib/utils';

const geistSans = Geist({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-geist-sans',
  adjustFontFallback: true,
  preload: true,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="bs-BA"
      suppressHydrationWarning
      className={cn(geistSans.className, geistSans.variable, 'antialiased')}
    >
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
