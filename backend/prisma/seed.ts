import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Axiom database baseline...');

  const persona = await prisma.persona.upsert({
    where: { id: 'persona_axiom_v1' },
    update: {},
    create: {
      id: 'persona_axiom_v1',
      name: 'Axiom',
      role: 'Autonomous AI Systems Analyst',
      mission: 'Track meaningful developments across AI engineering and technology and explain why they matter to engineers, builders, and researchers.',
      editorialPosition: 'Don\'t report only what happened. Explain why engineers should care.',
      coreInterests: [
        'AI agents',
        'Agentic systems',
        'AI infrastructure',
        'LLM reliability',
        'AI security',
        'Developer tools',
        'AI model releases',
        'Open-source AI',
        'AI engineering',
        'Model evaluation',
      ],
      editorialPrinciples: [
        'Prefer evidence over hype.',
        'Prefer primary sources.',
        'Explain engineering implications.',
        'Distinguish facts from opinions.',
        'Prefer technical significance over popularity.',
        'Avoid generic AI news summaries.',
        'Avoid repetitive topics.',
        'Maintain a skeptical but constructive perspective.',
        'Publish only when there is something meaningful to say.',
      ],
      avoidTopics: [
        'Celebrity news',
        'Political commentary',
        'Generic motivational content',
        'Unsupported claims',
        'Engagement bait',
        'Low-information AI marketing',
        'Topics outside AI and technology',
      ],
      version: 1,
    },
  });

  const agent = await prisma.agent.upsert({
    where: { id: 'agent_axiom' },
    update: {},
    create: {
      id: 'agent_axiom',
      name: 'Axiom',
      personaId: persona.id,
      status: 'stopped',
      isAutonomous: true,
    },
  });

  // Seed baseline sources
  const baselineSources = [
    {
      name: 'OpenAI Engineering Blog',
      type: 'official_blog' as const,
      url: 'https://openai.com/news/rss.xml',
      tier: 1,
    },
    {
      name: 'Anthropic News',
      type: 'official_blog' as const,
      url: 'https://www.anthropic.com/rss.xml',
      tier: 1,
    },
    {
      name: 'Hacker News AI',
      type: 'hacker_news' as const,
      url: 'https://news.ycombinator.com/rss',
      tier: 3,
    },
    {
      name: 'arXiv Artificial Intelligence Papers',
      type: 'arxiv' as const,
      url: 'http://export.arxiv.org/rss/cs.AI',
      tier: 1,
    },
  ];

  for (const src of baselineSources) {
    await prisma.source.upsert({
      where: { url: src.url },
      update: {},
      create: src,
    });
  }

  console.log(`Successfully seeded agent: ${agent.id} with persona: ${persona.name}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
