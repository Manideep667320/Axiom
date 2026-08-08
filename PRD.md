# PRD --- Axiom

## Autonomous AI Systems Analyst

**Version:** 1.0\
**Product:** Axiom\
**Document:** Product Requirements Document + V1 Technical
Specification\
**Status:** Implementation Baseline\
**Primary Goal:** Build a genuinely autonomous AI/technology persona
that discovers, evaluates, remembers, creates, validates, and publishes
content over time without additional human prompts.

------------------------------------------------------------------------

# 1. Executive Summary

Axiom is an autonomous AI technology persona designed to operate as a
persistent editorial agent rather than a prompt-driven content
generator.

The challenge is to build an AI persona that, after a single
initialization, independently:

1.  Discovers AI and technology topics from live information sources.
2.  Determines whether a topic deserves publication.
3.  Maintains a stable identity, interests, beliefs, and editorial
    voice.
4.  Remembers previous topics, posts, decisions, and viewpoints.
5.  Publishes selected content over time without additional human input.
6.  Explains why each published topic was selected, why it matters now,
    and which sources support it.
7.  Remains operational and observable throughout the approximately
    48-hour evaluation period.

The V1 implementation focuses on a reliable autonomous loop:

> **Discover → Normalize → Deduplicate → Cluster → Evaluate → Remember →
> Plan → Generate → Self-Review → Verify → Schedule → Publish → Store →
> Repeat**

The system deliberately separates AI reasoning from deterministic
infrastructure. LLMs are used for interpretation, editorial reasoning,
planning, generation, and critique. Conventional software is responsible
for scheduling, queues, persistence, deduplication, rate limits, job
state, retries, and API delivery.

------------------------------------------------------------------------

# 2. Problem Statement

Thousands of AI-generated posts are published every day, but most are
still initiated by a human prompt.

Existing content-generation systems generally behave like:

``` text
Human
  ↓
Prompt
  ↓
LLM
  ↓
Post
```

This does not demonstrate meaningful autonomy.

The required system must instead behave like:

``` text
Live Information
      ↓
Autonomous Discovery
      ↓
Editorial Judgment
      ↓
Memory
      ↓
Planning
      ↓
Content Creation
      ↓
Validation
      ↓
Publishing
      ↓
Memory Update
      ↓
Autonomous Continuation
```

The core engineering problem is therefore not "generate a good AI post."

It is:

> Build a persistent software system that can independently decide what
> information deserves attention, determine whether it is worth
> publishing, maintain continuity with previous work, and continue
> operating without additional human instructions.

------------------------------------------------------------------------

# 3. Product Vision

## Vision

Create an AI persona that behaves like a continuously operating
technology analyst with its own editorial standards, memory, and
publishing cadence.

## Product Principle

> **Autonomy over automation.**

A scheduler alone is not autonomy.

Axiom must be able to decide:

-   what to investigate,
-   what to ignore,
-   what to publish,
-   what to delay,
-   what to revisit,
-   how a new event relates to previous work,
-   and when no available topic is worth publishing.

------------------------------------------------------------------------

# 4. Persona

## Name

**Axiom**

## Role

**Autonomous AI Systems Analyst**

## Mission

Track meaningful developments across AI engineering and technology and
explain why they matter to engineers, builders, and researchers.

## Editorial Position

Axiom does not simply summarize technology news.

Its editorial principle is:

> **Don't report only what happened. Explain why engineers should
> care.**

## Core Interests

-   AI agents
-   Agentic systems
-   AI infrastructure
-   LLM reliability
-   AI security
-   Developer tools
-   AI model releases
-   Open-source AI
-   AI engineering
-   Model evaluation

## Editorial Principles

Axiom should:

-   Prefer evidence over hype.
-   Prefer primary sources.
-   Explain engineering implications.
-   Distinguish facts from opinions.
-   Prefer technical significance over popularity.
-   Avoid generic AI news summaries.
-   Avoid repetitive topics.
-   Maintain a skeptical but constructive perspective.
-   Publish only when there is something meaningful to say.

## Explicitly Avoid

-   Celebrity news.
-   Political commentary.
-   Generic motivational content.
-   Unsupported claims.
-   Engagement bait.
-   Low-information AI marketing.
-   Topics outside AI and technology.

------------------------------------------------------------------------

# 5. Challenge Requirements

## 5.1 Topic Discovery

The agent independently discovers AI and technology topics from live
information sources.

V1 sources:

-   RSS feeds
-   Official AI/company blogs
-   GitHub
-   arXiv
-   Hacker News

The source layer must be adapter-based so additional sources can be
added without changing the core agent.

------------------------------------------------------------------------

## 5.2 Editorial Judgment

Not every discovered topic is publishable.

The system must evaluate:

-   Persona relevance
-   Timeliness
-   Novelty
-   Technical significance
-   Evidence quality
-   Narrative continuity

The system must intentionally reject unsuitable topics and persist
rejection reasons.

------------------------------------------------------------------------

## 5.3 Consistent Persona

Axiom must maintain:

-   Stable identity
-   Stable interests
-   Stable voice
-   Stable editorial principles
-   Stable technical focus

V1 must prevent uncontrolled persona drift.

------------------------------------------------------------------------

## 5.4 Memory

The system must remember:

-   Previously discovered topics
-   Previously rejected topics
-   Previously published posts
-   Editorial decisions
-   Narrative themes
-   Relevant previous viewpoints

Memory must be used to prevent unnecessary repetition and create
continuity.

------------------------------------------------------------------------

## 5.5 Autonomous Publishing

After:

``` http
POST /api/agent/init
```

the agent must operate without additional human prompts.

Posts must appear over time rather than all being generated during
initialization.

A cycle may produce zero posts when no topic satisfies the editorial
policy.

------------------------------------------------------------------------

## 5.6 Publishing Rationale

Every published post must expose:

-   Why the topic was selected.
-   Why it is relevant now.
-   Sources supporting the information.
-   Editorial decision/score.
-   Relevant previous context where applicable.

------------------------------------------------------------------------

# 6. Product Goals

## Primary Goals

1.  Demonstrate genuine autonomous operation.
2.  Maintain a coherent AI/technology persona.
3.  Demonstrate explicit editorial judgment.
4.  Demonstrate persistent memory.
5.  Publish over time without human intervention.
6.  Provide transparent rationale and source attribution.
7.  Survive normal source/API/worker failures.
8.  Make autonomous behavior observable.

## Secondary Goals

1.  Provide a clean API for evaluator access.
2.  Provide a frontend dashboard showing agent state and history.
3.  Make backend and frontend independently developable.
4.  Keep the architecture scalable beyond V1.

------------------------------------------------------------------------

# 7. Non-Goals for V1

The following are deliberately excluded from the critical V1 path:

-   Real LinkedIn/X publishing.
-   Kubernetes deployment.
-   Multi-agent debate/swarm architecture.
-   Reinforcement learning.
-   Autonomous core-persona rewriting.
-   Complex prediction/outcome learning.
-   Full knowledge graph.
-   Advanced long-horizon forecasting.
-   Continuous autonomous belief rewriting.

These can be considered after the core autonomous loop is reliable.

------------------------------------------------------------------------

# 8. V1 Scope

## V1 Core

``` text
Live Sources
    ↓
Discovery
    ↓
Normalization
    ↓
Deduplication
    ↓
Topic Clustering
    ↓
Editorial Judgment
    ↓
Memory Retrieval
    ↓
Strategic Planning
    ↓
Content Generation
    ↓
Self Review
    ↓
Source Verification
    ↓
Adaptive Scheduling
    ↓
Simulated Publishing
    ↓
Memory Update
    ↓
Repeat
```

------------------------------------------------------------------------

# 9. V1 Architecture

``` text
                         ┌───────────────────────┐
                         │     Live Sources      │
                         │                       │
                         │ RSS / Blogs           │
                         │ GitHub                │
                         │ arXiv                 │
                         │ Hacker News           │
                         └───────────┬───────────┘
                                     │
                                     ▼
                         ┌───────────────────────┐
                         │  Discovery Service    │
                         │                       │
                         │ Fetch                 │
                         │ Normalize             │
                         │ Freshness             │
                         │ Fingerprint            │
                         └───────────┬───────────┘
                                     │
                                     ▼
                         ┌───────────────────────┐
                         │ Cluster & Deduplicate │
                         │                       │
                         │ Exact matching        │
                         │ Semantic matching     │
                         │ Cross-source grouping │
                         └───────────┬───────────┘
                                     │
                                     ▼
                         ┌───────────────────────┐
                         │ Editorial Engine      │
                         │                       │
                         │ Hard Gates             │
                         │ Weighted Score        │
                         │ Evidence Check        │
                         └───────────┬───────────┘
                                     │
                            ┌────────┴────────┐
                            │                 │
                          REJECT            ACCEPT
                            │                 │
                            ▼                 ▼
                       Decision Log      Memory Retrieval
                                              │
                                              ▼
                                     Strategic Planner
                                              │
                                              ▼
                                      Content Generator
                                              │
                                              ▼
                                       Self-Review
                                              │
                                              ▼
                                     Source Verification
                                              │
                                              ▼
                                      Adaptive Scheduler
                                              │
                                              ▼
                                         Publisher
                                              │
                                              ▼
                                      PostgreSQL Store
                                              │
                                              ▼
                                         pgvector
                                              │
                                              └──────────► Next Cycle
```

------------------------------------------------------------------------

# 10. Architecture Principles

## 10.1 AI vs Deterministic Responsibilities

### AI responsibilities

-   Trend interpretation
-   Editorial reasoning
-   Strategic planning
-   Content generation
-   Self-review
-   Perspective synthesis

### Deterministic responsibilities

-   Scheduling
-   Queue management
-   Database persistence
-   Exact deduplication
-   Semantic retrieval
-   Rate limits
-   Idempotency
-   Job state
-   Retry handling
-   API responses
-   Health checks
-   Metrics

This separation reduces cost, latency, unpredictability, and failure
surface.

------------------------------------------------------------------------

# 11. Backend Technology Stack

  Layer               Technology
  ------------------- --------------------
  Language            TypeScript
  Runtime             Node.js 20+
  API                 Express.js
  ORM                 Prisma
  Database            PostgreSQL
  Vector Memory       pgvector
  Queue               BullMQ
  Queue Backend       Redis
  Validation          Zod
  Testing             Vitest + Supertest
  Logging             Pino
  Containerization    Docker
  API Documentation   OpenAPI/Swagger
  Frontend            React + TypeScript

The LLM provider should be abstracted behind a provider interface.

------------------------------------------------------------------------

# 12. Runtime Services

V1 should be deployed as separate logical services:

``` text
API
Worker
Scheduler
PostgreSQL
Redis
Frontend
```

For local development, Docker Compose should run them together.

For cloud deployment, the same services can be deployed independently.

------------------------------------------------------------------------

# 13. Queue Architecture

BullMQ + Redis handles:

``` text
discovery
editorial_evaluation
memory_retrieval
generation
validation
publishing
memory_update
recovery
```

Example:

``` text
Scheduler
   ↓
Redis / BullMQ
   ↓
Discovery Worker
   ↓
Editorial Worker
   ↓
Generation Worker
   ↓
Validation Worker
   ↓
Publishing Worker
   ↓
Memory Worker
```

Workers must be stateless.

Persistent state belongs in PostgreSQL/pgvector.

------------------------------------------------------------------------

# 14. Autonomous Agent Loop

## Step 1 --- Discover

Fetch recent content from configured sources.

## Step 2 --- Normalize

Convert source-specific data into a common `TopicCandidate` structure.

## Step 3 --- Deduplicate

Remove exact duplicates and semantically similar events.

## Step 4 --- Cluster

Group multiple sources discussing the same underlying event.

## Step 5 --- Evaluate

Apply hard rejection gates and weighted editorial scoring.

## Step 6 --- Remember

Retrieve relevant previous topics, posts, narratives, and viewpoints.

## Step 7 --- Plan

Decide:

-   Publish now.
-   Queue for later.
-   Merge with another topic.
-   Monitor.
-   Skip.

## Step 8 --- Write

Generate content using persona + evidence + memory + editorial decision.

## Step 9 --- Critique

Check:

-   Factuality
-   Source grounding
-   Persona consistency
-   Novelty
-   Redundancy
-   Quality

Maximum revision attempts: 2.

## Step 10 --- Verify

Ensure claims are supported by source evidence.

## Step 11 --- Schedule

Apply publishing cadence and rate limits.

## Step 12 --- Publish

Write the post to the simulated publishing layer.

## Step 13 --- Learn

Persist:

-   Post
-   Sources
-   Editorial decision
-   Rationale
-   Embedding
-   Narrative context
-   Run metrics

Then continue the autonomous cycle.

------------------------------------------------------------------------

# 15. Topic Discovery

## Source Adapter Interface

``` typescript
export interface SourceAdapter {
  name: string;
  type: SourceType;

  fetchTopics(): Promise<TopicCandidate[]>;
}
```

## Source Types

``` text
rss
official_blog
github
arxiv
hacker_news
```

## Topic Candidate

``` typescript
export interface TopicCandidate {
  title: string;
  summary: string;
  url: string;
  sourceId: string;
  publishedAt?: Date;
  discoveredAt: Date;
  sourceType: SourceType;
  rawContent?: string;
}
```

------------------------------------------------------------------------

# 16. Source Tiers

## Tier 1 --- Primary

-   Official announcements
-   Official engineering blogs
-   arXiv
-   GitHub repositories/releases

## Tier 2 --- Technical

-   Reputable technology publications
-   Research publications

## Tier 3 --- Community

-   Hacker News
-   Reddit
-   Other community sources

Primary sources receive higher evidence-quality weighting.

------------------------------------------------------------------------

# 17. Source Prompt Injection Protection

External content must be treated as untrusted data.

The system must never treat instructions found inside:

-   webpages,
-   GitHub files,
-   RSS content,
-   Reddit posts,
-   articles,

as system instructions.

Rules:

1.  Retrieved source text is evidence only.
2.  System/persona instructions have higher priority.
3.  Source content cannot alter agent configuration.
4.  Source content cannot request tool execution.
5.  Generated claims must be verified against source evidence.

------------------------------------------------------------------------

# 18. Topic Deduplication

## Exact Deduplication

Use:

-   Canonical URL
-   Content hash
-   Topic fingerprint

## Semantic Deduplication

Use embeddings with pgvector.

Example policy:

``` text
similarity >= 0.90
→ likely duplicate

0.75–0.90
→ editorial review

< 0.75
→ potentially novel
```

Thresholds must be configurable.

------------------------------------------------------------------------

# 19. Emerging Trend Detection

V1 trend detection should use measurable signals.

Example:

``` text
Trend Score =
  source_count
  + source_diversity
  + mention_velocity
  + freshness
  + cluster_density
```

The system should not claim a "trend" based on one article.

A trend should have evidence across multiple observations where
possible.

------------------------------------------------------------------------

# 20. Editorial Judgment

## Scoring

  Factor                   Weight
  ---------------------- --------
  Relevance                   30%
  Novelty                     20%
  Technical Depth             20%
  Impact                      15%
  Credibility                 10%
  Narrative Continuity         5%

Total: **100%**

------------------------------------------------------------------------

# 21. Hard Editorial Gates

A topic must be rejected or held when:

``` text
source verification fails
OR
credibility is below minimum
OR
outside persona scope
OR
duplicate similarity is too high
OR
insufficient evidence
```

Weighted score must not override these hard gates.

------------------------------------------------------------------------

# 22. Editorial Decision Thresholds

Recommended initial policy:

``` text
9.0–10.0
→ Publish/priority queue

8.0–8.99
→ Queue for publishing

6.0–7.99
→ Monitor / await additional evidence

< 6.0
→ Reject
```

Thresholds are configurable.

The score is a decision aid, not the sole authority.

Every decision must be logged.

------------------------------------------------------------------------

# 23. Memory Architecture

V1 memory has four practical layers.

## 23.1 Short-Term State Memory

Stores:

-   Current job
-   Queue state
-   Scheduler state
-   Last successful run
-   Active topic
-   Failure count

Stored in PostgreSQL.

## 23.2 Episodic Memory

Stores:

-   Discovered topics
-   Editorial decisions
-   Published posts
-   Rejected topics
-   Source history
-   Agent runs

## 23.3 Semantic Memory

pgvector embeddings for:

-   Topics
-   Posts
-   Source evidence

Used for similarity and retrieval.

## 23.4 Narrative Memory

Stores:

-   Ongoing themes
-   Editorial stances
-   First mentioned date
-   Last mentioned date
-   Confidence
-   Supporting posts

Prediction memory and advanced temporal memory are optional post-V1
capabilities.

------------------------------------------------------------------------

# 24. Memory Retrieval

Before generation:

``` text
Current Topic
      ↓
Generate embedding
      ↓
Search pgvector
      ↓
Retrieve related posts/topics
      ↓
Retrieve narratives
      ↓
Check redundancy
      ↓
Check continuity
      ↓
Provide context to planner/generator
```

------------------------------------------------------------------------

# 25. Persona Consistency

Persona configuration should be versioned and treated as stable during
evaluation.

The agent may update:

-   memories,
-   confidence,
-   narrative state,
-   performance statistics.

The agent should not freely rewrite:

-   identity,
-   role,
-   core interests,
-   core editorial principles.

This prevents persona drift.

------------------------------------------------------------------------

# 26. Strategic Planner

The planner receives:

``` text
topic
editorial score
source evidence
memory
narrative context
recent publishing history
current publishing state
```

It returns one of:

``` text
publish_now
queue
monitor
merge
skip
```

Example:

``` json
{
  "decision": "publish_now",
  "reason": "The event is technically significant, well-supported by primary sources, and adds a new perspective to an existing theme."
}
```

------------------------------------------------------------------------

# 27. Content Generation

The generator must receive:

``` text
persona
topic
sources
editorial decision
memory
narrative context
```

The model must return structured output.

Example:

``` json
{
  "content": "...",
  "keyClaims": [
    "..."
  ],
  "perspective": "...",
  "sourceIds": [
    "source_123"
  ]
}
```

------------------------------------------------------------------------

# 28. Self-Review

The reviewer checks:

1.  Factual consistency.
2.  Source grounding.
3.  Persona fit.
4.  Novelty.
5.  Redundancy.
6.  Writing quality.
7.  Unsupported speculation.
8.  Required rationale fields.

Maximum revision attempts: 2.

If still invalid:

``` text
REJECT_DRAFT
```

and store the reason.

------------------------------------------------------------------------

# 29. Publishing Rationale

Rationale must be tied to the editorial decision.

Required fields:

``` json
{
  "whySelected": "...",
  "whyRelevantNow": "...",
  "whyThisOverAlternatives": "...",
  "editorialScore": 8.7,
  "sources": [
    {
      "title": "...",
      "url": "..."
    }
  ],
  "supportingContext": [
    "post_001"
  ]
}
```

The system must not fabricate rationale after publication.

------------------------------------------------------------------------

# 30. Adaptive Scheduling

Publishing is not guaranteed every cycle.

The scheduler considers:

-   Editorial score.
-   Topic freshness.
-   Current publishing frequency.
-   Recent post similarity.
-   Source velocity.
-   Queue state.
-   Rate limits.

Example configuration:

``` yaml
publishing:
  minimumIntervalMinutes: 90
  maxPostsPer6Hours: 2
  maxPostsPer24Hours: 8
```

A cycle may finish with:

``` text
0 posts
```

and still be a successful autonomous cycle.

------------------------------------------------------------------------

# 31. Publishing Model

V1 uses simulated publishing.

The publisher writes to PostgreSQL and exposes the result through the
feed API.

Future real publishing integrations can implement:

``` typescript
interface Publisher {
  publish(post: PublishablePost): Promise<PublishResult>;
}
```

Possible future implementations:

-   LinkedIn
-   X
-   Other platforms

Real social media integration is not required for V1.

------------------------------------------------------------------------

# 32. Idempotency

Every publication must have an idempotency key.

Recommended:

``` text
agentId + topicId + contentHash
```

Database constraints must prevent duplicate publications.

Retries must therefore be safe.

------------------------------------------------------------------------

# 33. Job States

``` text
DISCOVERED
EVALUATING
REJECTED
ACCEPTED
MEMORY_RETRIEVAL
PLANNING
GENERATING
VALIDATING
SCHEDULED
PUBLISHED
FAILED
```

Stale jobs must be recoverable.

------------------------------------------------------------------------

# 34. Failure Handling

## Source Failure

One failed source must not stop the cycle.

## LLM Failure

Use:

-   Timeout
-   Retry
-   Exponential backoff
-   Optional provider fallback

## Worker Failure

Use:

-   BullMQ retry
-   Persistent job state
-   Recovery worker
-   Dead-letter handling

## Database Failure

Use:

-   Transactions
-   Retryable operations
-   Persistent job state

------------------------------------------------------------------------

# 35. Observability

V1 must track:

-   Topics discovered.
-   Topics rejected.
-   Topics accepted.
-   Posts generated.
-   Posts published.
-   Editorial score distribution.
-   Source diversity.
-   Duplicate topics prevented.
-   Memory retrieval count.
-   Source failures.
-   LLM failures.
-   Worker failures.
-   Successful autonomous cycles.
-   Failed cycles.
-   Last successful cycle.
-   Queue depth.
-   Worker heartbeat.

------------------------------------------------------------------------

# 36. API Contract

## Initialize

``` http
POST /api/agent/init
```

### Response

``` json
{
  "agentId": "agent_axiom",
  "status": "running",
  "autonomous": true,
  "initializedAt": "2026-08-08T20:00:00Z"
}
```

Initialization must return quickly and schedule background work.

------------------------------------------------------------------------

## Feed

``` http
GET /api/agent/feed
```

### Response

``` json
{
  "agent": {
    "id": "agent_axiom",
    "name": "Axiom",
    "role": "Autonomous AI Systems Analyst"
  },
  "posts": [
    {
      "id": "post_001",
      "publishedAt": "2026-08-08T21:30:00Z",
      "content": "...",
      "rationale": {
        "whySelected": "...",
        "whyRelevantNow": "...",
        "whyThisOverAlternatives": "...",
        "editorialScore": 8.7,
        "sources": []
      }
    }
  ]
}
```

------------------------------------------------------------------------

## Status

``` http
GET /api/agent/status
```

Returns:

-   running/stopped/error
-   uptime
-   cycle count
-   last successful cycle
-   next cycle
-   queue state
-   worker state
-   posts published

------------------------------------------------------------------------

## Decisions

``` http
GET /api/agent/decisions
```

Returns accepted/rejected editorial decisions and reasons.

------------------------------------------------------------------------

## Runs

``` http
GET /api/agent/runs
```

Returns autonomous cycle history.

------------------------------------------------------------------------

## Health

``` http
GET /api/health
```

Checks:

-   API
-   PostgreSQL
-   Redis
-   Workers

------------------------------------------------------------------------

# 37. Database Model

Core entities:

``` text
agents
personas
sources
topics
editorial_decisions
posts
post_sources
embeddings
narratives
agent_runs
agent_state
scheduler_state
```

## Relationships

``` text
Persona
   ↓
Agent
   ↓
Topics
   ↓
Editorial Decisions
   ↓
Posts
   ↓
Sources

Topics / Posts
      ↓
  Embeddings
      ↓
  Semantic Memory

Agent
  ↓
Agent Runs
  ↓
Agent State
```

------------------------------------------------------------------------

# 38. Backend Directory Structure

``` text
backend/
├── src/
│   ├── server.ts
│   │
│   ├── config/
│   │   ├── env.ts
│   │   ├── database.ts
│   │   ├── redis.ts
│   │   └── logger.ts
│   │
│   ├── api/
│   │   ├── routes/
│   │   │   ├── agent.routes.ts
│   │   │   ├── feed.routes.ts
│   │   │   ├── decision.routes.ts
│   │   │   ├── run.routes.ts
│   │   │   └── health.routes.ts
│   │   │
│   │   ├── controllers/
│   │   │   ├── agent.controller.ts
│   │   │   ├── feed.controller.ts
│   │   │   ├── decision.controller.ts
│   │   │   ├── run.controller.ts
│   │   │   └── health.controller.ts
│   │   │
│   │   └── middleware/
│   │       ├── error.middleware.ts
│   │       ├── validation.middleware.ts
│   │       └── request-id.middleware.ts
│   │
│   ├── agent/
│   │   ├── orchestrator.ts
│   │   ├── discovery.service.ts
│   │   ├── clustering.service.ts
│   │   ├── editorial.service.ts
│   │   ├── planner.service.ts
│   │   ├── generation.service.ts
│   │   ├── review.service.ts
│   │   ├── verification.service.ts
│   │   ├── scheduling.service.ts
│   │   ├── publishing.service.ts
│   │   └── learning.service.ts
│   │
│   ├── sources/
│   │   ├── source.interface.ts
│   │   ├── rss.adapter.ts
│   │   ├── github.adapter.ts
│   │   ├── arxiv.adapter.ts
│   │   ├── official-blog.adapter.ts
│   │   └── hacker-news.adapter.ts
│   │
│   ├── memory/
│   │   ├── memory.service.ts
│   │   ├── embedding.service.ts
│   │   ├── similarity.service.ts
│   │   ├── narrative.service.ts
│   │   └── repositories/
│   │       ├── topic-memory.repository.ts
│   │       ├── post-memory.repository.ts
│   │       └── narrative.repository.ts
│   │
│   ├── llm/
│   │   ├── llm.interface.ts
│   │   ├── provider.factory.ts
│   │   ├── prompts/
│   │   │   ├── editorial.prompt.ts
│   │   │   ├── planner.prompt.ts
│   │   │   ├── generation.prompt.ts
│   │   │   └── review.prompt.ts
│   │   └── providers/
│   │       ├── openai.provider.ts
│   │       ├── anthropic.provider.ts
│   │       └── ollama.provider.ts
│   │
│   ├── workers/
│   │   ├── queue.ts
│   │   ├── discovery.worker.ts
│   │   ├── editorial.worker.ts
│   │   ├── memory.worker.ts
│   │   ├── generation.worker.ts
│   │   ├── validation.worker.ts
│   │   ├── publishing.worker.ts
│   │   └── recovery.worker.ts
│   │
│   ├── scheduler/
│   │   ├── scheduler.ts
│   │   ├── policies.ts
│   │   └── rate-limiter.ts
│   │
│   ├── models/
│   │   ├── agent.types.ts
│   │   ├── persona.types.ts
│   │   ├── topic.types.ts
│   │   ├── post.types.ts
│   │   ├── decision.types.ts
│   │   └── source.types.ts
│   │
│   ├── repositories/
│   │   ├── agent.repository.ts
│   │   ├── topic.repository.ts
│   │   ├── post.repository.ts
│   │   ├── source.repository.ts
│   │   ├── decision.repository.ts
│   │   └── run.repository.ts
│   │
│   └── utils/
│       ├── hashing.ts
│       ├── canonical-url.ts
│       ├── dates.ts
│       └── retry.ts
│
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── autonomy/
│
├── .env.example
├── Dockerfile
├── package.json
├── tsconfig.json
└── README.md
```

------------------------------------------------------------------------

# 39. Frontend Directory Structure

Frontend and backend must be independently manageable.

``` text
frontend/
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   │
│   ├── api/
│   │   ├── client.ts
│   │   ├── agent.api.ts
│   │   ├── feed.api.ts
│   │   ├── decision.api.ts
│   │   └── run.api.ts
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── PageContainer.tsx
│   │   │
│   │   ├── agent/
│   │   │   ├── AgentStatus.tsx
│   │   │   ├── PersonaCard.tsx
│   │   │   ├── RuntimeStats.tsx
│   │   │   └── AutonomousIndicator.tsx
│   │   │
│   │   ├── feed/
│   │   │   ├── Feed.tsx
│   │   │   ├── PostCard.tsx
│   │   │   ├── RationalePanel.tsx
│   │   │   └── SourceList.tsx
│   │   │
│   │   ├── decisions/
│   │   │   ├── DecisionList.tsx
│   │   │   ├── DecisionCard.tsx
│   │   │   └── DecisionScore.tsx
│   │   │
│   │   └── monitoring/
│   │       ├── CycleTimeline.tsx
│   │       ├── MetricsPanel.tsx
│   │       ├── MemoryStats.tsx
│   │       └── SourceHealth.tsx
│   │
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── FeedPage.tsx
│   │   ├── DecisionsPage.tsx
│   │   ├── MemoryPage.tsx
│   │   └── SystemPage.tsx
│   │
│   ├── hooks/
│   │   ├── useAgent.ts
│   │   ├── useFeed.ts
│   │   ├── useDecisions.ts
│   │   └── useRuns.ts
│   │
│   ├── types/
│   │   ├── agent.ts
│   │   ├── post.ts
│   │   ├── decision.ts
│   │   └── source.ts
│   │
│   ├── utils/
│   │   ├── formatDate.ts
│   │   └── formatScore.ts
│   │
│   └── styles/
│       ├── globals.css
│       └── variables.css
│
├── public/
│   └── ...
│
├── .env.example
├── Dockerfile
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

------------------------------------------------------------------------

# 40. Frontend/Backend Contract

The frontend team must not directly access:

-   PostgreSQL
-   Redis
-   worker services
-   LLM providers
-   source adapters

The frontend communicates only with the API.

``` text
Frontend
   │
   │ HTTP/JSON
   ▼
Backend API
   │
   ├── PostgreSQL
   ├── Redis
   ├── Workers
   └── LLM
```

This allows both teams to work independently.

------------------------------------------------------------------------

# 41. Shared API Contract

A shared API contract should be defined before parallel development.

Recommended:

``` text
contracts/
├── openapi.yaml
└── schemas/
    ├── agent.schema.json
    ├── post.schema.json
    ├── decision.schema.json
    └── run.schema.json
```

The frontend team builds against the contract.

The backend team implements the contract.

------------------------------------------------------------------------

# 42. Frontend MVP

The frontend is an observability and demonstration dashboard.

## Required Screens

### Dashboard

Show:

-   Agent identity
-   Running status
-   Uptime
-   Last successful cycle
-   Next cycle
-   Posts published
-   Topics discovered
-   Topics rejected

### Feed

Show:

-   Posts
-   Timestamp
-   Rationale
-   Sources
-   Editorial score

### Decisions

Show:

-   Accepted topics
-   Rejected topics
-   Scores
-   Rejection reasons

### Memory

Show:

-   Previous themes
-   Related posts
-   Duplicate prevention
-   Narrative continuity

### System

Show:

-   Source health
-   Worker health
-   Queue state
-   Recent failures

------------------------------------------------------------------------

# 43. Backend MVP

Required:

1.  Agent initialization.
2.  Source adapters.
3.  Topic normalization.
4.  Deduplication.
5.  Editorial engine.
6.  Memory retrieval.
7.  Planner.
8.  Generation.
9.  Self-review.
10. Source verification.
11. Scheduler.
12. Simulated publisher.
13. Persistent database.
14. Redis/BullMQ.
15. Feed API.
16. Status API.
17. Decision API.
18. Run API.
19. Health API.
20. Structured logs.

------------------------------------------------------------------------

# 44. Development Ownership

## Backend Team

Owns:

-   API
-   Agent orchestration
-   Workers
-   Sources
-   Editorial engine
-   Memory
-   LLM integration
-   Database
-   Redis
-   Scheduler
-   Publishing
-   Observability

## Frontend Team

Owns:

-   Dashboard
-   Feed UI
-   Decision UI
-   Memory UI
-   Monitoring UI
-   API client
-   Loading/error states
-   Responsive design

## Shared

Both teams coordinate on:

-   API contract
-   Type definitions
-   Authentication if added
-   Error response format
-   Deployment environment variables

------------------------------------------------------------------------

# 45. Environment Variables

Backend:

``` env
NODE_ENV=development
PORT=4000

DATABASE_URL=postgresql://...
REDIS_URL=redis://...

LLM_PROVIDER=openai
OPENAI_API_KEY=...

EMBEDDING_PROVIDER=openai
EMBEDDING_MODEL=...

AGENT_ID=agent_axiom

DISCOVERY_INTERVAL_MINUTES=30
MIN_PUBLISH_INTERVAL_MINUTES=90
MAX_POSTS_PER_24H=8
```

Frontend:

``` env
VITE_API_BASE_URL=http://localhost:4000/api
```

Secrets must never be committed.

------------------------------------------------------------------------

# 46. Local Development

Recommended Docker Compose services:

``` text
api
worker
scheduler
postgres
redis
frontend
```

Example:

``` text
docker compose up
```

The entire V1 system should be reproducible locally.

------------------------------------------------------------------------

# 47. Testing Strategy

## Unit Tests

Test:

-   Editorial score.
-   Hard gates.
-   Deduplication.
-   URL canonicalization.
-   Rate limiting.
-   Idempotency.
-   Persona validation.
-   Rationale validation.

## Integration Tests

Test:

``` text
Source
 ↓
Discovery
 ↓
Database
 ↓
Editorial
 ↓
Memory
 ↓
Generation
 ↓
Validation
 ↓
Publishing
```

## Failure Tests

Test:

-   Source unavailable.
-   LLM timeout.
-   Redis restart.
-   Worker crash.
-   Database timeout.
-   Duplicate job.
-   Duplicate topic.
-   Invalid generated content.

------------------------------------------------------------------------

# 48. Autonomous Evaluation

The critical acceptance test is:

``` text
T = 0
POST /api/agent/init
```

Then no additional human prompts.

Evaluators query:

``` text
T + 1h
T + 3h
T + 6h
T + 12h
T + 24h
T + 48h
```

using:

``` http
GET /api/agent/feed
```

Expected:

-   Agent remains running.
-   Feed remains accessible.
-   New posts can appear over time.
-   Posts are not generated entirely at initialization.
-   Editorial decisions remain available.
-   Memory influences subsequent decisions.
-   Rationale and sources are available for every post.

The exact number of posts is not the sole success metric.

------------------------------------------------------------------------

# 49. Memory Evaluation

Example:

``` text
Post #1:
"Agent reliability is becoming a bigger bottleneck than raw model capability."
```

Later:

``` text
New topic:
"New framework improves agent reliability."
```

Expected:

``` text
Retrieve Post #1
      ↓
Recognize related theme
      ↓
Determine whether new evidence adds value
      ↓
Publish meaningful follow-up
OR
Reject as repetitive
```

This demonstrates actual memory usage rather than simply adding a
"memory" field to the prompt.

------------------------------------------------------------------------

# 50. Editorial Evaluation

The system should demonstrate rejection.

Example:

``` text
Topic A
AI startup funding announcement
→ likely reject

Topic B
Open-source agent framework release
→ potentially publish

Topic C
New AI security research
→ potentially publish
```

The final decision must be based on the configured editorial policy and
live evidence.

------------------------------------------------------------------------

# 51. Reliability Evaluation

Test:

1.  Kill a worker.
2.  Restart the worker.
3.  Confirm jobs recover.
4.  Disable one source.
5.  Confirm other sources continue.
6.  Trigger duplicate jobs.
7.  Confirm idempotency.
8.  Restart Redis in development.
9.  Verify persisted database state remains intact.

------------------------------------------------------------------------

# 52. Security Requirements

-   Store secrets in environment variables.
-   Never expose API keys to frontend.
-   Validate all external input.
-   Sanitize fetched content.
-   Treat web content as untrusted.
-   Protect against prompt injection.
-   Apply timeouts to external calls.
-   Apply rate limits.
-   Avoid logging secrets.
-   Validate generated claims.
-   Use database constraints for integrity.

------------------------------------------------------------------------

# 53. Performance Targets

Initial V1 targets:

  Metric                  Target
  ----------------------- -------------------------------
  API health response     \< 500 ms under normal load
  Feed API                \< 1 s under normal load
  Discovery cycle         \< 5 min
  Editorial evaluation    \< 60 s per selected batch
  Generation + review     \< 2 min per publication
  Worker retry            Exponential backoff
  Duplicate publication   0 tolerated
  Autonomous downtime     As close to zero as practical

These are engineering targets, not challenge requirements.

------------------------------------------------------------------------

# 54. Scalability

V1 should not require Kubernetes.

Use:

``` text
Docker Compose
```

for local development and a small cloud deployment for evaluation.

The architecture must still be horizontally scalable:

``` text
          API
           │
     ┌─────┼─────┐
     ▼     ▼     ▼
 Worker Worker Worker
     │     │     │
     └─────┼─────┘
           │
         Redis
           │
       PostgreSQL
```

Workers are stateless.

Persistent state remains in PostgreSQL/pgvector.

------------------------------------------------------------------------

# 55. Risks and Mitigations

## Risk 1 --- Low-quality sources

Mitigation:

-   Source tiers.
-   Credibility scoring.
-   Cross-source validation.
-   Primary-source preference.

## Risk 2 --- Persona drift

Mitigation:

-   Versioned persona.
-   Stable core identity.
-   Consistency validation.
-   No unrestricted belief rewriting.

## Risk 3 --- Repetition

Mitigation:

-   Semantic memory.
-   Exact fingerprinting.
-   Similarity checks.
-   Narrative memory.

## Risk 4 --- Evaluation gaming

Mitigation:

-   Do not optimize for engagement.
-   Optimize for evidence, novelty, significance, and quality.

## Risk 5 --- Rate limits

Mitigation:

-   Adaptive scheduling.
-   Exponential backoff.
-   Source-level rate limits.

## Risk 6 --- Prompt injection

Mitigation:

-   Treat external content as untrusted.
-   Separate instructions from evidence.
-   Never execute instructions found in sources.

## Risk 7 --- Source bias

Mitigation:

-   Source diversity metrics.
-   Source-category balancing.
-   Primary/independent/community source mixture.

## Risk 8 --- Overengineering

Mitigation:

-   Keep V1 critical path small.
-   Do not implement Kubernetes or advanced learning systems initially.
-   Use deterministic code wherever possible.

------------------------------------------------------------------------

# 56. V1 Definition of Done

V1 is complete only when:

-   [ ] Agent can be initialized through one API request.
-   [ ] Agent continues operating without additional prompts.
-   [ ] At least multiple live sources are active.
-   [ ] Topics are normalized and deduplicated.
-   [ ] Editorial decisions are persisted.
-   [ ] Low-value topics are intentionally rejected.
-   [ ] Persona remains consistent.
-   [ ] Previous posts can be retrieved semantically.
-   [ ] Duplicate/repetitive content is prevented.
-   [ ] Strategic planning can choose publish/queue/monitor/skip.
-   [ ] Content is generated from evidence.
-   [ ] Self-review runs before publication.
-   [ ] Source verification runs before publication.
-   [ ] Rationale is stored with every post.
-   [ ] Every post has source attribution.
-   [ ] Publishing occurs over time.
-   [ ] Simulated feed is accessible through the API.
-   [ ] Worker failures can recover.
-   [ ] Source failures do not stop the agent.
-   [ ] Duplicate jobs cannot create duplicate posts.
-   [ ] Agent status is observable.
-   [ ] Autonomous runs are logged.
-   [ ] Frontend and backend can run independently.
-   [ ] API contract is documented.
-   [ ] Docker development environment works.

------------------------------------------------------------------------

# 57. Post-V1 Roadmap

Only after V1 is stable:

## V1.1

-   Additional sources.
-   Better trend scoring.
-   Improved dashboard.
-   More advanced narrative memory.

## V1.2

-   Prediction memory.
-   Temporal importance decay.
-   Better follow-up planning.

## V2

-   Real social publishing.
-   Knowledge graph.
-   Multi-agent editorial debate.
-   Advanced forecasting.
-   More sophisticated long-term belief updates.

Kubernetes should be introduced only when deployment scale actually
requires it.

------------------------------------------------------------------------

# 58. Final Product Architecture

The final product should be understood as five major layers:

``` text
┌────────────────────────────────────────────┐
│                 EXPERIENCE                 │
│ React Dashboard + Feed                    │
└──────────────────────┬─────────────────────┘
                       │
┌──────────────────────▼─────────────────────┐
│                    API                     │
│ Express + OpenAPI                         │
└──────────────────────┬─────────────────────┘
                       │
┌──────────────────────▼─────────────────────┐
│              AUTONOMOUS CORE               │
│ Discovery → Judge → Memory → Plan → Write │
│ → Review → Verify → Publish               │
└──────────────────────┬─────────────────────┘
                       │
┌──────────────────────▼─────────────────────┐
│             INFRASTRUCTURE                 │
│ BullMQ + Redis + Workers + Scheduler      │
└──────────────────────┬─────────────────────┘
                       │
┌──────────────────────▼─────────────────────┐
│                  DATA                     │
│ PostgreSQL + pgvector + Source Evidence  │
└────────────────────────────────────────────┘
```

------------------------------------------------------------------------

# 59. Final Engineering Principle

Axiom is not successful because it can write a convincing AI post.

It is successful when it can independently answer:

``` text
What should I investigate?
        ↓
Is it worth my attention?
        ↓
Is the evidence trustworthy?
        ↓
Have I already discussed this?
        ↓
Does it fit my identity?
        ↓
What is my perspective?
        ↓
Should I publish now?
        ↓
How does this connect to previous work?
        ↓
What should I investigate next?
```

The system therefore implements:

> **PERCEIVE → JUDGE → REMEMBER → PLAN → CREATE → VERIFY → PUBLISH →
> LEARN → REPEAT**

That loop is the core product.
