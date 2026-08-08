# Axiom 🤖

> **Autonomous AI Systems Analyst & Editorial Agent**

Axiom is an autonomous AI technology persona designed to operate as a persistent editorial agent rather than a prompt-driven content generator. Once initialized, Axiom continuously monitors live technology sources, evaluates developments using explicit editorial standards, maintains long-term memory, self-reviews its writing, and publishes insightful technical analysis over time—all **without requiring human prompts**.

---

## 💡 The Core Idea (In Simple Terms)

Most AI tools today work like a calculator:

```text
Human  ──►  Type a Prompt  ──►  LLM  ──►  Single Output
```

Axiom operates like an **independent technology research desk**:

```text
Live News & Research Sources
          │
          ▼
    Discover Topics
          │
          ▼
   Filter Hype & Duplicates
          │
          ▼
   Evaluate Editorial Value
          │
          ▼
   Check 4-Tier Memory Matrix
          │
          ▼
   Draft & Self-Critique Content
          │
          ▼
   Verify Evidence Grounding
          │
          ▼
   Schedule & Publish Post
          │
          ▼
   Update Memory & Repeat Continuous Loop
```

---

## ✨ Key Features

- 🔍 **Autonomous Topic Discovery**: Automatically collects tech news and papers from RSS feeds, arXiv research, GitHub releases, Hacker News, and official engineering blogs.
- ⚖️ **Strict Editorial Standards**: Doesn't report everything. Uses hard rejection gates to discard hype, low-evidence claims, and duplicate stories, using a weighted scoring model to select high-impact topics.
- 🧠 **Persistent 4-Tier Memory**:
  - **Short-Term Memory**: Tracks active job queues, rate limits, and run states.
  - **Episodic Memory**: Remembers past accepted/rejected topics and published posts.
  - **Semantic Memory**: Uses vector embeddings (`pgvector`) to prevent repetitive coverage and maintain context over weeks.
  - **Narrative Memory**: Tracks long-term stances and evolving tech trends.
- ✍️ **Self-Critique & Fact Verification**: Drafts posts and subjects them to an automated reviewer that verifies source grounding, persona consistency, and writing quality (with a max of 2 self-correction retries).
- ⏱️ **Adaptive Scheduling & Idempotency**: Publishes dynamically based on topic quality and rate limits. Uses unique composite idempotency keys (`agentId + topicId + contentHash`) to prevent duplicate publications during retries.
- 🛡️ **Prompt Injection Hardening**: Treats all external web content as untrusted evidence data, preventing malicious articles from altering system instructions.
- 📊 **Real-Time Observability Dashboard**: Includes a React UI to visualize agent execution, view published feeds, inspect rejection decisions with rationale, and monitor worker queue health.

---

## 🏗️ Architecture & Technology Stack

Axiom strictly separates **AI reasoning** (LLM interpretation, planning, self-review) from **Deterministic Infrastructure** (queues, databases, rate limits, state persistence).

| Layer | Technology | Function |
| :--- | :--- | :--- |
| **Runtime & Language** | Node.js 20+ & TypeScript | Fast, type-safe asynchronous core |
| **API Framework** | Express.js | Decoupled RESTful API endpoints |
| **Database & Memory** | PostgreSQL + `pgvector` & Prisma ORM | Relational persistence & vector embeddings |
| **Job Queue & Cache** | BullMQ & Redis | Stateless background workers and queue management |
| **LLM Interface** | Provider Abstraction (OpenAI / Anthropic / Ollama) | Flexible AI provider integration |
| **Frontend UI** | React, TypeScript & Vite | Observability dashboard and feed viewer |
| **Deployment** | Docker & Docker Compose | Multi-container local & cloud setup |

---

## 📂 Project Directory Structure

```text
Axiom/
├── contracts/             # OpenAPI spec and shared JSON schemas
├── backend/               # Core Node.js/Express service
│   ├── prisma/            # Database schema & migrations
│   └── src/
│       ├── agent/         # Autonomous loop: Discovery, Editorial, Planner, Generation
│       ├── api/           # Express routes, controllers & middleware
│       ├── config/        # Environment, DB, Redis & Logger configs
│       ├── llm/           # LLM provider abstraction & prompt templates
│       ├── memory/        # Vector embedding & similarity services
│       ├── models/        # TypeScript type definitions
│       ├── repositories/  # Data access layer
│       ├── scheduler/     # Rate limiter & scheduling policies
│       ├── sources/       # Pluggable adapters (RSS, GitHub, arXiv, HN)
│       ├── utils/         # Hashing, URL canonicalization & retry helpers
│       └── workers/       # Stateless BullMQ job workers
├── frontend/              # React + Vite dashboard app
│   └── src/
│       ├── api/           # API client integration
│       ├── components/    # UI components (Agent Status, Feed, Decisions, Monitoring)
│       ├── hooks/         # React state & query hooks
│       ├── pages/         # Dashboard views
│       ├── styles/        # CSS variables & global styling
│       └── types/         # Frontend TypeScript definitions
├── PRD.md                 # Product Requirements Document
├── docker-compose.yml     # Multi-container orchestration
└── README.md              # Project documentation
```

---

## 🚀 Quick Start (Local Setup)

### Prerequisites

- [Docker & Docker Compose](https://docs.docker.com/get-docker/)
- [Node.js 20+](https://nodejs.org/) (for local script execution without Docker)

### 1. Clone & Configure Environment

```bash
# Clone the repository
git clone https://github.com/your-org/axiom.git
cd Axiom

# Set up environment variables
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

### 2. Start Services via Docker Compose

```bash
docker compose up --build
```

This launches:
- **PostgreSQL (`:5432`)** with `pgvector`
- **Redis (`:6379`)** for BullMQ background workers
- **Backend API (`:4000`)**
- **Workers & Scheduler**
- **Frontend Dashboard (`:3000`)**

---

## 🎮 Operating the Agent

### Initialize the Autonomous Loop

Trigger the agent once. After initialization, no further human input is needed:

```http
POST http://localhost:4000/api/agent/init
```

**Response**:
```json
{
  "agentId": "agent_axiom",
  "status": "running",
  "autonomous": true,
  "initializedAt": "2026-08-08T20:00:00Z"
}
```

### Core API Endpoints

- `GET /api/agent/feed` — Retrieve published technical posts along with source links and editorial rationale.
- `GET /api/agent/status` — View uptime, cycle counts, worker state, and publishing statistics.
- `GET /api/agent/decisions` — View accepted and rejected topics, including weighted editorial scores.
- `GET /api/agent/runs` — Inspect history of autonomous background cycles.
- `GET /api/health` — Complete system health check (PostgreSQL, Redis, Workers).

---

## 📜 Editorial Policy & Principles

Axiom follows a strict persona guideline:

> **"Don't report only what happened. Explain why engineers should care."**

- **Prefers**: Evidence over hype, primary sources, technical depth, open-source AI, agent reliability, model evaluations.
- **Explicitly Avoids**: Celebrity news, political commentary, low-information marketing, unsupported claims, engagement-bait.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for details.
