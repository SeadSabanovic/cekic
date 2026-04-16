'use client';
import Navbar from './navbar';
import Footer from './footer';
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
    <div className="min-h-screen">
      <Navbar settings={settings} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
