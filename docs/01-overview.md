# 1. Overview

## 1.1 Purpose

Work Graph Foundry is a local-first enterprise work intelligence and governed automation demo. It shows how an AI-native operating layer can observe messy work traces, infer the real process, identify repeated work patterns, generate governed automation, simulate that automation, execute approved work safely, and recommend improvements.

The current demo is intentionally not a chatbot and not a landing page. The first screen is an operating dashboard because the product is meant to feel like a real enterprise tool for process owners, IT operators, compliance reviewers, and automation teams.

## 1.2 Product Problem

In large organizations, work moves through email, tickets, chat, spreadsheets, approvals, documents, and internal systems. Teams often know pieces of the process, but no one has a reliable live map of how work actually flows. This causes:

- hidden bottlenecks
- repeated manual coordination
- inconsistent approval paths
- audit gaps
- automation work that starts too late because humans first need to manually draw the workflow

Work Graph Foundry demonstrates a different loop: discover the workflow from work traces first, then propose and govern automation.

## 1.3 Current State

The repository currently contains a complete local MVP:

- React/Vite/TypeScript dashboard
- seeded IT access request fixture data
- typed domain contracts
- deterministic ingestion and normalization
- work graph generation
- pattern detection and bottleneck scoring
- governed automation proposal generation
- historical simulation
- governance approval and audit state
- safe mock execution
- learning-loop recommendation
- deterministic mock AI provider
- optional OpenAI Responses API provider boundary
- unit and component tests

The MVP is demo-ready and does not require enterprise credentials or an OpenAI API key.

## 1.4 Main User Flow

The golden path is:

1. User clicks `Load Sample`.
2. App loads seeded raw work traces.
3. App validates and normalizes traces into work items.
4. App builds a work graph for IT access requests.
5. App detects repeated patterns and the manager approval bottleneck.
6. App generates a governed automation proposal.
7. App simulates the proposal against historical cases.
8. User approves the proposal.
9. User clicks `Run Case`.
10. App executes a new request through safe mock tools.
11. App recommends a learning-loop improvement.
12. User clicks `Reset` to replay.

## 1.5 Agentic Loop

The product demonstrates these agentic behaviors:

- Observe: read raw traces and normalize them.
- Understand: group repeated work and identify request patterns.
- Map: build the work graph.
- Reason: calculate bottlenecks, opportunity, and risk.
- Plan: generate a structured automation proposal.
- Simulate: replay historical cases before execution.
- Govern: require approval and create audit events.
- Execute: run only approved workflows through mock tools.
- Improve: recommend a future proposal update.

## 1.6 What The Solution Is Not

The current MVP is not:

- a production connector platform
- a real provisioning system
- a general chatbot
- a workflow designer where the user draws every step
- a system that sends enterprise data to a model by default
- a multi-tenant enterprise SaaS implementation

Those are future directions, not current scope.

## 1.7 Repository Entry Points

Start with:

- `README.md` for quick setup and demo path.
- `docs/02-architecture.md` for how the app is built.
- `docs/03-development.md` for how to continue development.
- `docs/06-testing-and-validation.md` for test and agentic verification steps.

Important source files:

- `src/App.tsx`: dashboard orchestration.
- `src/domain/types.ts`: shared contracts.
- `src/fixtures/demoData.ts`: seeded demo data.
- `src/ai/providers.ts`: mock and optional OpenAI provider boundary.

## 1.8 Current Demo Story

The demo centers on IT access requests:

- Employees request application access.
- Requests arrive through several channels.
- The process usually requires manager approval.
- Standard requests are repeatable.
- Privileged, contractor, finance, or exception cases need human review.
- The system discovers this pattern, proposes an automation, tests it, and executes only after governance approval.

The strongest demo moment is that the workflow is discovered from traces rather than predefined by the user.
