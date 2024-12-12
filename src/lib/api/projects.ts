import { prisma } from '../prisma';
import { z } from 'zod';

export const projectSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  image: z.string().url(),
  tags: z.array(z.string()),
  github: z.string().url(),
  category: z.string().min(1),
});

export async function getProjects() {
  return prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export async function createProject(data: z.infer<typeof projectSchema>) {
  return prisma.project.create({ data });
}

export async function updateProject(id: string, data: z.infer<typeof projectSchema>) {
  return prisma.project.update({
    where: { id },
    data,
  });
}

export async function deleteProject(id: string) {
  return prisma.project.delete({
    where: { id },
  });
}