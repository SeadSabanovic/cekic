import { Metadata } from 'next';
import { sanityFetch } from '@/sanity/lib/sanity-fetch';
import ProjectGrid from '../../_components/project-grid';
import {
  projectCategoryBySlugQuery,
  projectCategorySlugsQuery,
  projectsByCategoryQuery,
} from '@/sanity/lib/queries/documents/project';
import type {
  ProjectCategoryBySlugQueryResult,
  ProjectCategorySlugsQueryResult,
  ProjectsByCategoryQueryResult,
} from '../../../../../../sanity.types';
import { CircleSlash } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { data } = await sanityFetch<ProjectCategorySlugsQueryResult>({
    query: projectCategorySlugsQuery,
  });
  return data ?? [];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {

  const { data: category } = await sanityFetch<ProjectCategoryBySlugQueryResult | null>({
    query: projectCategoryBySlugQuery,
    params: await params,
  });

  if (!category) { return {} };

  return {
    title: `${category?.title} Projects`,
    description: `Browse our collection of ${category?.title?.toLowerCase()} projects.`
  }
}

export default async function ProjectsByCategoryPage(props: {
  params: Promise<{ slug: string }>
}) {

  const params = await props.params;

  const { data: projects } = await sanityFetch<ProjectsByCategoryQueryResult | null>({
    query: projectsByCategoryQuery,
    params: params
  });

  if (!projects?.length) {
    return (
      <div className="py-20 flex items-center justify-center gap-2 border border-dashed rounded-3xl text-center text-gray-600 bg-white">
        <CircleSlash size={20} className='text-red-500' /> <span className='font-medium antialiased'>No projects found in this category.</span>
      </div>
    )
  }

  return (
    <ProjectGrid projects={projects ?? []} />
  )
}