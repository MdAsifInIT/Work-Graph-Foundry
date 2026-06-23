# Data And Agent Guide

## Demo Data

The seeded demo focuses on IT access requests. Fixture data includes:

- Raw work traces across email, ticket, chat, approval log, and system action channels.
- Policy rules for standard access, privileged access, contractor access, finance access, and analytics access.
- Approval history with manager/system-owner decisions.
- A new incoming Salesforce request for execution.

## Core Contracts

Important domain contracts live in `src/domain/types.ts`:

- `RawWorkTrace`
- `NormalizedWorkItem`
- `WorkPattern`
- `WorkGraph`
- `AutomationProposal`
- `SimulationResult`
- `GovernanceRecord`
- `ExecutionRun`
- `LearningRecommendation`
- `PolicyRule`

Every AI-like output should map to a TypeScript contract before it reaches the UI.

## Agentic Responsibilities

The MVP models agents as deterministic domain modules:

- Observer: ingestion and normalization.
- Mapper: graph builder.
- Pattern analyst: clustering and bottleneck scoring.
- Planner: governed proposal generation.
- Simulator: historical replay.
- Governance reviewer: approval and audit gate.
- Executor: safe mock tool calls.
- Learner: improvement recommendation.

## Mock Provider

`MockAiProvider` returns deterministic proposal behavior through local TypeScript logic. It is the default because demo reliability matters more than live-model variability.

## OpenAI Provider

`OpenAiResponsesProvider` is an optional boundary for trusted runtimes. It uses the Responses API shape with structured JSON schema output for `AutomationProposal`.

Rules for future OpenAI work:

- Never expose API keys in browser code.
- Validate model output before using it.
- Fall back to mock behavior when live calls fail.
- Keep policy-sensitive actions gated by governance.

## Extending Contracts

When adding new data or agent behavior:

1. Add or update TypeScript types.
2. Add fixture examples.
3. Add deterministic logic.
4. Add tests for happy path and exception path.
5. Wire UI after domain behavior is stable.
