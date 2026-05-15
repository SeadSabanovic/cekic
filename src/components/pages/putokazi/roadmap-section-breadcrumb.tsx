import Link from 'next/link';

type RoadmapSectionBreadcrumbProps = {
  hubTitle: string;
  hubSlug: string;
  sectionTitle: string;
};

export function RoadmapSectionBreadcrumb({
  hubTitle,
  hubSlug,
  sectionTitle,
}: RoadmapSectionBreadcrumbProps) {
  return (
    <nav
      className="text-sm text-muted-foreground"
      aria-label="Put navigacije"
    >
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <li>
          <Link
            href="/karijerni-putokazi"
            className="transition-colors hover:text-foreground"
          >
            Karijerni putokazi
          </Link>
        </li>
        <li aria-hidden className="text-border">
          /
        </li>
        <li>
          <Link
            href={`/karijerni-putokazi/${hubSlug}`}
            className="transition-colors hover:text-foreground"
          >
            {hubTitle}
          </Link>
        </li>
        <li aria-hidden className="text-border">
          /
        </li>
        <li className="font-medium text-black">{sectionTitle}</li>
      </ol>
    </nav>
  );
}
