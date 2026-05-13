import Image from 'next/image';
import { cn } from '@/lib/utils';
import Container from '@/components/global/container';

export type LogoItem = {
  id: string;
  src: string;
  alt: string;
  title?: string;
  href?: string;
  size?: 'normal' | 'large';
};

export type LogoBlockProps = {
  anchorId?: string;
  heading?: string;
  logos: LogoItem[];
};

export default function LogoBlock(props: LogoBlockProps) {
  const { heading, logos, anchorId } = props;

  const items = logos.length ? [...logos, ...logos] : [];

  return (
    <section
      {...(anchorId ? { id: anchorId } : {})}
      className="rounded-b-4xl border-b px-4 md:px-10"
    >
      <Container className="border-x border-dashed border-x-gray-200 px-0">
        <div className="py-6 md:py-10">
          <div className="pattern-bg relative mx-auto mt-4 w-fit border-y border-y-gray-100 bg-white px-10 py-2 md:mt-7">
            <h2 className="text-center text-xs font-medium text-gray-500 uppercase md:text-sm">
              {heading}
            </h2>
            <EdgeBlur />
          </div>
          <div className="relative mt-10 mb-6 overflow-clip md:mt-16 md:mb-8">
            <div className="relative z-30 flex w-max animate-logo-marquee items-center gap-16 border-y border-dashed py-4 pl-[4.8rem] md:gap-40 md:py-10">
              {items.map((item, index) => (
                <div key={`${item.id}-${index}`}>
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        width={200}
                        height={100}
                        src={item.src}
                        alt={item.alt}
                        className={cn('w-20 object-contain md:w-28', {
                          'w-36 md:w-40': item.size === 'large',
                        })}
                      />
                    </a>
                  ) : (
                    <Image
                      width={200}
                      height={100}
                      src={item.src}
                      alt={item.alt}
                      className={cn('w-20 object-contain md:w-28', {
                        'w-36 md:w-40': item.size === 'large',
                      })}
                    />
                  )}
                </div>
              ))}
            </div>
            <EdgeBlur />
          </div>
        </div>
      </Container>
    </section>
  );
}

function EdgeBlur() {
  return (
    <div className="absolute inset-0 flex items-center justify-between">
      <div className="relative z-30 h-full w-[200px] bg-linear-to-r from-slate-50 via-slate-50/80 to-transparent" />
      <div className="relative z-30 h-full w-[200px] bg-linear-to-l from-slate-50 via-slate-50/80 to-transparent" />
    </div>
  );
}
