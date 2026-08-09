"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.narrativeRepository = exports.NarrativeRepository = void 0;
const database_1 = require("../../config/database");
class NarrativeRepository {
    async upsertNarrative(theme, editorialStance, postId) {
        const existing = await database_1.prisma.narrative.findUnique({ where: { theme } });
        if (existing) {
            const updatedPosts = postId && !existing.supportingPosts.includes(postId)
                ? [...existing.supportingPosts, postId]
                : existing.supportingPosts;
            return database_1.prisma.narrative.update({
                where: { theme },
                data: {
                    editorialStance,
                    supportingPosts: updatedPosts,
                    lastMentioned: new Date(),
                },
            });
        }
        return database_1.prisma.narrative.create({
            data: {
                theme,
                editorialStance,
                supportingPosts: postId ? [postId] : [],
            },
        });
    }
    async getAllNarratives() {
        return database_1.prisma.narrative.findMany({
            orderBy: { lastMentioned: 'desc' },
        });
    }
}
exports.NarrativeRepository = NarrativeRepository;
exports.narrativeRepository = new NarrativeRepository();
