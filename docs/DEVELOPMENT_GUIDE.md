# Development Guide

## Local Setup

```powershell
npm install
npm run dev
```

Use the Vite URL printed in the terminal. If dev-server dependency optimization is blocked by a restricted environment, verify with:

```powershell
npm run build
npm run preview
```

## Quality Commands

Run these before committing:

```powershell
npm run typecheck
npm test
npm run build
npm audit --audit-level=low
```

## Development Rules

- Keep the app local-first and runnable without external services.
- Keep mock behavior deterministic so the demo can be replayed reliably.
- Add or update TypeScript contracts before adding new agent-like outputs.
- Add tests for domain logic before wiring new UI states.
- Keep execution safe: real enterprise provisioning must remain mocked unless a future secure connector layer is explicitly designed.
- Do not expose `OPENAI_API_KEY` in browser code.

## Current App Flow

The dashboard state is driven from `src/App.tsx`:

1. Load fixtures.
2. Ingest and normalize traces.
3. Build graph.
4. Detect patterns and bottlenecks.
5. Generate proposal.
6. Simulate historical cases.
7. Approve governance record.
8. Run safe mock execution.
9. Generate learning recommendation.

## Adding A New Workflow

To add another demo workflow, add fixture data first, then extend the domain logic:

- Add raw traces and policy rules in `src/fixtures/`.
- Extend request types and contracts in `src/domain/types.ts`.
- Update ingestion and pattern detection logic.
- Add tests for fixture validation, normalization, pattern scoring, and simulation.
- Add UI labels only after domain behavior is verified.

## Git Hygiene

The repo intentionally ignores:

- `node_modules/`
- `dist/`
- local env files
- local Codex state
- logs

Commit source, docs, package files, tests, and configuration only.
