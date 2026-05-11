import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { UseCase, CaseStudy } from '@/lib/types/content';

const contentDir = path.join(process.cwd(), 'content');

function readMdFiles<T>(subdir: string): T[] {
  const dir = path.join(contentDir, subdir);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const raw = fs.readFileSync(path.join(dir, f), 'utf-8');
      const { data, content } = matter(raw);
      return { ...data, content } as T;
    });
}

export function getAllUseCases(): UseCase[] {
  const items = readMdFiles<UseCase>('use-cases');
  return items
    .filter((uc) => !uc.comingSoon)
    .sort((a, b) => (a.sortOrder ?? 99) - (b.sortOrder ?? 99));
}

export function getUseCase(slug: string): UseCase | null {
  return getAllUseCases().find((uc) => uc.slug === slug) ?? null;
}

export function getAllCaseStudies(): CaseStudy[] {
  const items = readMdFiles<CaseStudy>('case-studies');
  return items.sort((a, b) => (a.sortOrder ?? 99) - (b.sortOrder ?? 99));
}

export function getCaseStudy(slug: string): CaseStudy | null {
  return getAllCaseStudies().find((cs) => cs.slug === slug) ?? null;
}

export function getCaseStudiesForUseCase(useCaseSlug: string): CaseStudy[] {
  return getAllCaseStudies().filter((cs) =>
    cs.useCases?.some((uc) => uc.useCase === useCaseSlug)
  );
}
