# Axiom 🤖

> **Autonomous AI Systems Analyst & Continuous Editorial Engine**

Axiom is an autonomous AI technology persona designed to operate as a **persistent, self-directed editorial analyst** rather than a prompt-driven content generator. Once initialized with a single API request, Axiom continuously monitors live technology sources (arXiv, RSS feeds, GitHub, Hacker News), evaluates developments using explicit multi-factor editorial standards, maintains long-term semantic & intent memory, self-reviews its writing for factual grounding, and publishes insightful technical analysis over time—all **without requiring human prompts**.

---

## live URL

[Axiom Live URL](https://axiom-nine-lemon.vercel.app/)

---

## 💡 The Core Idea (In Simple Terms)

Most AI applications today behave like a calculator:

```text
Human  ──►  Type a Prompt  ──►  LLM  ──►  Single Output
```

Axiom operates like an **independent technology research desk**:

```text
Live News & Research Sources (RSS, arXiv, GitHub, HN)
          │
          ▼
    Discover Topics & Normalize
          │
          ▼
    Exact & Semantic Deduplication (pgvector)
          │
          ▼
    Evaluate Editorial Value (Weighted 6-Factor Model)
          │
          ▼
    Check Memory (pgvector + Breeth Intent Memory)
          │
          ▼
    Strategic Planning & Content Draft
          │
          ▼
    Automated Self-Critique & Source Verification
          │
          ▼
    Adaptive Scheduling & Feed Publication
          │
          ▼
    Update Memory & Autonomous Continuation
```

---

## ✨ Key Features

- 🔍 **Autonomous Topic Discovery**: Automatically collects tech developments from RSS feeds, arXiv research, GitHub releases, Hacker News, and official engineering blogs via pluggable source adapters.
- ⚡ **Discovered Topics Pipeline**: Real-time observability into candidate topics across all stages (`DISCOVERED`, `EVALUATING`, `ACCEPTED`, `REJECTED`, `PUBLISHED`).
- ⚖️ **Strict Editorial Standards**: Applies hard rejection gates to filter hype, low-evidence claims, and duplicate stories. Employs a 6-factor weighted scoring model (Relevance 30%, Novelty 20%, Technical Depth 20%, Impact 15%, Credibility 10%, Narrative Continuity 5%).
- 🧠 **Dual-Layer Memory Architecture**:
  - **Local Semantic Memory**: PostgreSQL + `pgvector` embeddings for fast similarity search and hard duplicate rejection ($\ge 0.90$).
  - **Cloud Intent Memory**: Deep integration with the **Breeth API** (`thebreeth.com`) for intent-aware cognitive episode tracking.
- ✍️ **Self-Critique & Source Verification**: Automated reviewer evaluates factual consistency, source grounding, persona alignment, and writing quality (max 2 revision attempts).
- ⏱️ **Adaptive Scheduling & Idempotency**: Rate-limited publication schedule (default max 8 posts/24h). Enforces unique composite idempotency keys (`agentId + topicId + contentHash`) to prevent duplicate publications during retries.
- 🛡️ **Prompt Injection Hardening**: External web content is strictly wrapped inside `<external_evidence>` XML tags and treated as untrusted data.
- 🎨 **"The Editor's Desk" UI Dashboard**: Production React 18 + Vite dashboard with a warm editorial color palette (amber, terracotta, sage), Playfair Display typography, responsive layout, and full dark mode.

---

## 🏗️ Architecture & Technology Stack

Axiom strictly separates **AI Reasoning** (interpretation, planning, evaluation, generation, critique) from **Deterministic Infrastructure** (queues, databases, rate limits, state persistence).

| Layer | Technology | Function |
| :--- | :--- | :--- |
| **Runtime & Language** | Node.js 20+ & TypeScript | Asynchronous core service |
| **API Framework** | Express.js | Decoupled RESTful API endpoints |
| **Database & ORM** | PostgreSQL 16 + `pgvector` & Prisma | Relational state persistence & vector embeddings |
| **Memory Integration** | Breeth API (`thebreeth.com`) + `pgvector` | Intent-aware cognitive episode tracking & local vector search |
| **LLM Interface** | Provider Abstraction (OpenAI / Anthropic / Gemini / Ollama) | Auto-detects keys including Google Gemini (`AQ...`) & OpenAI (`sk-...`) |
| **Job Queue & Cache** | BullMQ & Redis 7 | Stateless background workers & worker recovery |
| **Frontend UI** | React 18, TypeScript & Vite | Observability dashboard & live feed viewer |
| **Containerization** | Docker & Docker Compose | Containerized local & cloud deployment |

---

## 🔌 API Endpoints & Contract

| Endpoint | Method | Status | Description |
| :--- | :---: | :---: | :--- |
| `/api/agent/init` | `POST` | **200 OK** | Initializes the autonomous background cycle. |
| `/api/agent/status` | `GET` | **200 OK** | Returns operational health, status, uptime, and last run summary. |
| `/api/agent/topics` | `GET` | **200 OK** | Returns all discovered topics with processing states (`DISCOVERED`, `EVALUATING`, etc.). |
| `/api/agent/feed` | `GET` | **200 OK** | Returns published technical posts with editorial rationale and source links. |
| `/api/agent/decisions` | `GET` | **200 OK** | Returns accepted and rejected topic decisions with weighted score breakdowns. |
| `/api/agent/runs` | `GET` | **200 OK** | Returns execution history of autonomous background cycles. |
| `/api/health` | `GET` | **200 OK** | Health check verifying API server, PostgreSQL, and Redis connectivity. |

---

## 📂 Project Directory Structure

```text
Axiom/
├── contracts/             # OpenAPI specification & shared JSON schemas
│   └── openapi.yaml
├── backend/               # Express API, BullMQ workers & Agent services
│   ├── prisma/            # Database schema with pgvector & seed script
│   └── src/
│       ├── agent/         # Autonomous core: Orchestrator, Discovery, Editorial, Planner, Generation, Review, Verification, Publishing
│       ├── api/           # Express controllers, routes & middleware
│       ├── config/        # Environment, Database, Redis & Logger configuration
│       ├── llm/           # Provider factory (OpenAI, Anthropic, Gemini, Ollama) & prompt builders
│       ├── memory/        # Embedding, Similarity, Narrative & Breeth API provider
│       ├── models/        # TypeScript interfaces & types
│       ├── repositories/  # Database access layer
│       ├── scheduler/     # Autonomous scheduler & rate limiter
│       ├── sources/       # Source adapters (RSS, GitHub, arXiv, Official Blog, Hacker News)
│       └── workers/       # Stateless BullMQ job processors
├── frontend/              # React 18 + Vite Dashboard UI
│   └── src/
│       ├── api/           # API client functions
│       ├── components/    # Layout, Agent, Feed, Decisions, Topics & Monitoring components
│       ├── hooks/         # Custom React hooks (useAgent, useFeed, useTopics, useDecisions, useRuns)
│       ├── pages/         # Dashboard, TopicsPage, FeedPage, DecisionsPage, MemoryPage, SystemPage
│       ├── styles/        # CSS variables & global editorial styles
│       ├── types/         # Frontend TypeScript definitions
│       └── utils/         # Date & score formatting utilities
├── docker-compose.yml     # Container orchestration (PostgreSQL 16 + Redis 7)
├── PRD.md                 # Product Requirements Document
└── README.md              # Project documentation
```

---

## 🚀 Quick Start (Local Setup)

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (for PostgreSQL & Redis containers)
- [Node.js 20+](https://nodejs.org/)

### 1. Launch Infrastructure Containers

```bash
# Start PostgreSQL (pgvector) and Redis containers
docker compose up -d
```

### 2. Configure Backend Environment

Create `backend/.env` with your API keys:

```env
NODE_ENV=development
PORT=4000

DATABASE_URL=postgresql://postgres:postgres@localhost:5432/axiom?schema=public
REDIS_URL=redis://localhost:6379

LLM_PROVIDER=openai
OPENAI_API_KEY=your_openai_or_gemini_api_key

BREETH_API_KEY=your_breeth_api_key
BREETH_API_URL=https://api.thebreeth.com/v1

AGENT_ID=agent_axiom
DISCOVERY_INTERVAL_MINUTES=30
MIN_PUBLISH_INTERVAL_MINUTES=90
MAX_POSTS_PER_24H=8
MOCK_SOURCES_ENABLED=false
```

### 3. Initialize Database Schema & Seed Persona

```bash
cd backend
npm install
npx prisma db push
npm run db:seed
```

### 4. Start Backend & Frontend

```bash
# Terminal 1: Start Express Backend Server & Background Workers
cd backend
npm run dev

# Terminal 2: Start React + Vite Frontend Dashboard
cd frontend
npm install
npm run dev
```

- **Backend API**: `http://localhost:4000`
- **Frontend Dashboard**: `http://localhost:5173`

---

## 🎮 Initializing Autonomous Operation

Trigger initialization once. Axiom will continuously discover, evaluate, and publish without requiring further prompts:

```bash
curl -X POST http://localhost:4000/api/agent/init
```

**Response**:

```json
{
  "agentId": "agent_axiom",
  "status": "running",
  "autonomous": true,
  "initializedAt": "2026-08-09T20:00:00.000Z"
}
```

---

## 📜 Editorial Policy & Principles

Axiom follows a strict persona principle:

> **"Don't report only what happened. Explain why engineers should care."**

- **Prefers**: Primary research papers, official engineering announcements, technical depth, agentic reliability benchmarks, open-source AI.
- **Explicitly Avoids**: Celebrity tech news, political commentary, low-information marketing, unsupported hype, engagement bait.

---

## 📜 License

Distributed under the MIT License.
