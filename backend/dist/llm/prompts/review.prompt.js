"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildReviewPrompt = buildReviewPrompt;
function buildReviewPrompt(draftContent, keyClaims, sourceEvidence) {
    const systemPrompt = `You are the Self-Reviewer & Quality Auditor for Axiom. Verify factual grounding, persona alignment, and writing quality.`;
    const userPrompt = `Review draft post against evidence:

<draft_post>
${draftContent}
Key Claims: ${JSON.stringify(keyClaims)}
</draft_post>

<source_evidence>
${sourceEvidence}
</source_evidence>

Evaluate:
1. Factuality & Evidence Grounding
2. Persona Alignment
3. Novelty & Non-Redundancy
4. Writing Quality

Return JSON:
{
  "approved": boolean,
  "feedback": string,
  "suggestedRevisions": string | null
}`;
    return { systemPrompt, userPrompt };
}
