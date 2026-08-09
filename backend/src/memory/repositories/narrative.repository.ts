import { prisma } from '../../config/database';

export class NarrativeRepository {
  async upsertNarrative(theme: string, editorialStance: string, postId?: string) {
    const existing = await prisma.narrative.findUnique({ where: { theme } });
    if (existing) {
      const updatedPosts = postId && !existing.supportingPosts.includes(postId)
        ? [...existing.supportingPosts, postId]
        : existing.supportingPosts;

      return prisma.narrative.update({
        where: { theme },
        data: {
          editorialStance,
          supportingPosts: updatedPosts,
          lastMentioned: new Date(),
        },
      });
    }

    return prisma.narrative.create({
      data: {
        theme,
        editorialStance,
        supportingPosts: postId ? [postId] : [],
      },
    });
  }

  async getAllNarratives() {
    return prisma.narrative.findMany({
      orderBy: { lastMentioned: 'desc' },
    });
  }
}

export const narrativeRepository = new NarrativeRepository();
