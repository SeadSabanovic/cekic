'use client';
import Navbar from './navbar';
import Footer from './footer';
import { Toaster } from 'react-hot-toast';
import { usePathname } from 'next/navigation';
import type { SiteSettings } from '@/lib/site-settings';

interface ClientLayoutProps {
  children: React.ReactNode;
  settings: SiteSettings;
}

export default function ClientLayout({
  children,
  settings,
}: ClientLayoutProps) {
  const pathname = usePathname();
  if (pathname.includes('/studio')) return children;

  return (
    <div className="grid min-h-dvh grid-rows-[auto_1fr_auto]">
      <Navbar settings={settings} />
      <main className="overflow-hidden">{children}</main>
      <Footer />
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: 'text-sm font-semibold antialiased',
          style: {
            borderRadius: '300px',
            padding: '4px 8px',
            color: '#FFFFFF',
            fontWeight: '500',
            backgroundColor: '#000000',
          },
        }}
      />
    </div>
  );
}
