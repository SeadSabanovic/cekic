import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Container from '@/components/global/container';
import Heading from '@/components/shared/heading';
import { resolvePutokazCover } from '@/lib/putokaz-cover';
import {
  fetchPutokazBySlug,
  fetchPutokaziSlugs,
} from '@/sanity/lib/queries/putokaz-list';

export const revalidate = 60;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await fetchPutokaziSlugs('projekti');
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = await fetchPutokazBySlug(slug, 'projekti');
  if (!doc) return { title: 'Projekt' };
  const description = doc.lead?.trim() || undefined;
  const cover = resolvePutokazCover(
    { title: doc.title, coverImage: doc.coverImage },
    { w: 1200, h: 630 }
  );
  return {
    title: doc.title,
    description,
    openGraph: {
      title: doc.title,
      description,
      ...(cover
        ? {
            images: [
              {
                url: cover.url,
                alt: cover.alt,
                width: 1200,
                height: 630,
              },
            ],
          }
        : {}),
    },
  };
}

export default async function ProjektDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const doc = await fetchPutokazBySlug(slug, 'projekti');
  if (!doc) notFound();

  const cover = resolvePutokazCover(
    { title: doc.title, coverImage: doc.coverImage },
    { w: 1920, h: 640 }
  );

  return (
    <div className="pattern-bg px-4 xl:px-10">
      <Container className="space-y-6 border-x border-dashed px-4 pt-32 pb-14 md:space-y-8 md:pt-40 md:pb-24">
        {cover ? (
          <div className="relative aspect-21/9 max-h-80 min-h-44 w-full overflow-hidden rounded-2xl border border-border/60 md:min-h-56">
            <Image
              src={cover.url}
              alt={cover.alt}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 90rem"
            />
          </div>
        ) : null}
        <Heading tag="h1" size="xxl" className="max-w-3xl text-balance">
          {doc.title}
        </Heading>
        {doc.lead?.trim() ? (
          <p className="max-w-3xl text-lg leading-relaxed text-balance text-neutral-600">
            {doc.lead}
          </p>
        ) : null}
        <p className="max-w-2xl text-sm text-muted-foreground">
          Koraci i detalji projekta uskoro — ovo je početna stranica za sadržaj
          iz CMS-a.
        </p>
      </Container>
    </div>
  );
}
