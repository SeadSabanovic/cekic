import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import Container from '@/components/global/container';
import Heading from '@/components/shared/heading';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const panels = [
  {
    title: 'Karijerni putokazi',
    description:
      'Od šegrta do prve plate. Faze učenja, alat i posao — sve na jednoj stazi.',
    href: '/putokazi',
    cta: 'Kreni učiti',
    variant: 'default' as const,
  },
  {
    title: 'Uradi sam projekti',
    description:
      'Brza rješenja za kućne kvare. Koraci, materijal i provjeren redoslijed radova.',
    href: '/projekti',
    cta: 'Popravi sam',
    variant: 'secondary' as const,
  },
];

export default function HomeSplitSection() {
  return (
    <section aria-labelledby="home-split-eyebrow">
      <Container
        className="border-x border-dashed"
        paddingTop="default"
        paddingBottom="default"
      >
        <Heading
          tag="h2"
          size="xl"
          id="home-split-eyebrow"
          className="relative z-10 text-center"
        >
          Tvoj plan. <span className="text-muted-foreground">Tvoj tempo.</span>
        </Heading>
        <p className="mt-3 max-w-3xl mx-auto text-center leading-relaxed text-balance text-muted-foreground md:text-lg">
          Uči svojim tempom i označi savladano gradivo. Tvoj napredak ostaje
          sačuvan na tvom uređaju.
        </p>

        <div className="mt-10 grid gap-6 sm:mt-12 lg:mt-14 lg:grid-cols-2 lg:gap-8">
          {panels.map((panel) => (
            <article
              key={panel.href}
              className={cn(
                'group relative flex flex-col overflow-hidden rounded-3xl border border-dashed border-border bg-background/70 p-8 backdrop-blur-sm transition-[border-color,box-shadow] duration-300 md:p-10',
                'hover:border-primary/30'
              )}
            >
              <div className="relative flex min-h-[220px] flex-col sm:min-h-0">
                <Heading tag="h3" size="md" className="text-foreground">
                  {panel.title}
                </Heading>
                <p className="mt-4 max-w-md flex-1 leading-relaxed text-pretty text-muted-foreground md:mt-5 md:text-lg">
                  {panel.description}
                </p>
                <Link
                  href={panel.href}
                  className={cn(
                    buttonVariants({ variant: panel.variant, size: 'lg' }),
                    'mt-8 inline-flex w-fit items-center gap-2 self-start'
                  )}
                >
                  <span>{panel.cta}</span>
                  <ArrowRight
                    className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
