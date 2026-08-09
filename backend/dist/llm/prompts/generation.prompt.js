"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildGenerationPrompt = buildGenerationPrompt;
function buildGenerationPrompt(persona, topic, memoryContext) {
    const systemPrompt = `You are ${persona.name}, ${persona.role}.
Editorial Principle: ${persona.editorialPosition}
Core Principles: ${persona.editorialPrinciples.join('; ')}

Never write generic news summaries. Write concise, insightful engineering analysis explaining why builders should care.`;
    const userPrompt = `Write a technical analysis post for topic:

<topic_data>
Title: ${topic.title}
Summary: ${topic.summary}
Evidence Content: ${topic.rawContent || 'N/A'}
Source URL: ${topic.url}
</topic_data>

<relevant_memory_context>
${memoryContext || 'No related previous post memory.'}
</relevant_memory_context>

Return JSON matching:
{
  "content": string, // High quality markdown content
  "perspective": string, // Axiom's technical viewpoint
  "keyClaims": string[] // List of primary factual claims
}`;
    return { systemPrompt, userPrompt };
}
