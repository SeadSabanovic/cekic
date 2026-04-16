import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function SiteLogo() {
  return (
    <Link
      href="/"
      aria-label="Go to home page"
      className={cn(
        'transition-transform duration-300 ease-in-out hover:scale-[0.95]'
      )}
    >
      <span className="text-xl font-semibold tracking-tighter">Čekić</span>
    </Link>
  );
}
