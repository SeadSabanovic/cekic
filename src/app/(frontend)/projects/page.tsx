import { Metadata } from 'next';
import { processMetadata } from '@/lib/utils';
import { sanityFetch } from '@/sanity/lib/sanity-fetch';
import ProjectGrid from './_components/project-grid';
import { allProjectsQuery, projectsPageQuery } from '@/sanity/lib/queries/documents/project';
import type { AllProjectsQueryResult, ProjectsPageQueryResult } from '../../../../sanity.types';

export async function generateMetadata(): Promise<Metadata> {
  const { data: page } = await sanityFetch<ProjectsPageQueryResult | null>({
    query: projectsPageQuery,
  });

  if (!page) { return {} };

  return processMetadata({ data: page as ProjectsPageQueryResult });
}

export default async function ProjectsPage() {
  const { data: projects } = await sanityFetch<AllProjectsQueryResult | null>({
    query: allProjectsQuery,
  });

  return (
    <ProjectGrid projects={projects ?? []} />
  )
}