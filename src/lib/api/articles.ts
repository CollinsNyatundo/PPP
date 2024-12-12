import { prisma } from '../prisma';
import { z } from 'zod';

export const articleSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  excerpt: z.string().min(1),
  image: z.string().url(),
  category: z.string().min(1),
  readTime: z.string(),
  published: z.boolean().default(false),
});

export async function getArticles() {
  return prisma.article.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export async function createArticle(data: z.infer<typeof articleSchema>) {
  return prisma.article.create({
    data: {
      ...data,
      slug: generateSlug(data.title),
    },
  });
}

export async function updateArticle(id: string, data: z.infer<typeof articleSchema>) {
  return prisma.article.update({
    where: { id },
    data: {
      ...data,
      slug: generateSlug(data.title),
    },
  });
}

export async function deleteArticle(id: string) {
  return prisma.article.delete({
    where: { id },
  });
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}