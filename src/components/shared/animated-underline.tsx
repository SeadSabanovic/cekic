import { cn } from '@/lib/utils';

export default function AnimatedUnderline({
  className: additionalStyles,
  /** Kao hover — puna širina linije (npr. scroll-spy na aktivnoj stavci). */
  active = false,
}: {
  className?: string;
  active?: boolean;
}) {
  const baseStyles =
    'absolute -bottom-[4px] left-0 block h-[1.5px] w-full max-w-0 rounded-full bg-black transition-all duration-300 ease-in-out group-hover:max-w-full';
  return (
    <span
      className={cn(baseStyles, active && 'max-w-full', additionalStyles)}
    />
  );
}
