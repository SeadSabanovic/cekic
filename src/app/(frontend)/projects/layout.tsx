import React from 'react';
import { sanityFetch } from '@/sanity/lib/sanity-fetch';
import ProjectsLayout from './_components/projects-layout';
import { projectsPageQuery } from '@/sanity/lib/queries/documents/project';
import type { ProjectsPageQueryResult } from '../../../../sanity.types';

export default async function Layout({ children }: {
  children: React.ReactNode;
}) {
  
  const { data: page } = await sanityFetch<ProjectsPageQueryResult | null>({
    query: projectsPageQuery,
  });
  
  return (
    <ProjectsLayout page={page}>
      {children}
    </ProjectsLayout>
  )
}