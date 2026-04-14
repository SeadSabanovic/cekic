import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function SiteLogo() {
  return (
    <Link
      href="/"
      aria-label="Go to home page"
      className={cn(
        'hover:scale-[0.95] transition-transform duration-300 ease-in-out'
      )}
    >
      <span className="font-semibold tracking-tighter text-xl">Čekić</span>
    </Link>
  );
}
