# Development Guide

This guide explains how to work on Work Graph Foundry after the MVP handoff. It is written for a developer who needs to understand the current state, safely add features, and verify changes without depending on external enterprise systems.

## Current State

Work Graph Foundry is a local-first React and TypeScript demo. The application is intentionally self-contained:

- The dashboard runs in the browser.
- Domain behavior is implemented in TypeScript modules under `src/domain/`.
- Demo data is seeded under `src/fixtures/`.
- AI-like behavior is deterministic by default.
- The OpenAI provider boundary exists, but the browser demo does not require or expose API keys.
- Execution uses safe mock tools only.

The current golden path is:

1. Load IT access request traces.
2. Normalize messy traces into work items.
3. Build a work graph.
4. Detect repeated work patterns and bottlenecks.
5. Generate a governed automation proposal.
6. Simulate the proposal against historical cases.
7. Approve the proposal.
8. Run a new request through mock tools.
9. Generate a learning-loop recommendation.

## Local Setup

Install dependencies:

```powershell
npm install
```

Start development mode:

```powershell
npm run dev
```

Open the local Vite URL printed in the terminal.

If the local environment blocks Vite dependency optimization, use the production artifact path:

```powershell
npm run build
npm run preview
```

This fallback is important in restricted Windows or sandboxed environments. The production build is the artifact that should be trusted for final demo verification.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Starts the Vite development server. |
| `npm run build` | Runs TypeScript project checks and builds the production artifact. |
| `npm run preview` | Serves the production artifact locally. |
| `npm run typecheck` | Runs TypeScript checks without building assets. |
| `npm test` | Runs the Vitest test suite. |
| `npm audit --audit-level=low` | Checks dependency advisories at low severity and above. |

## Repository Layout

```text
src/
  App.tsx                  # Dashboard orchestration and demo state
  styles.css               # Dashboard styling and responsive layout
  ai/
    providers.ts           # Mock and optional OpenAI provider boundary
  domain/
    types.ts               # Shared contracts
    fixtures.ts            # Fixture loader and validation
    ingestion.ts           # Raw trace normalization
    graph.ts               # Work graph generation
    patterns.ts            # Pattern and bottleneck detection
    planner.ts             # Automation proposal generation
    simulation.ts          # Historical replay
    governance.ts          # Approval and audit state
    execution.ts           # Safe mock execution and learning recommendation
  fixtures/
    demoData.ts            # Seeded IT access request data
  test/
    setup.ts               # Vitest setup
docs/
  ARCHITECTURE.md
  DATA_AND_AGENT_GUIDE.md
  DEMO_GUIDE.md
  DEVELOPMENT_GUIDE.md
  ROADMAP.md
```

## How The App Is Wired

`src/App.tsx` is the dashboard orchestrator. It currently uses React state for the demo:

- `sampleLoaded`: controls whether fixture data has been loaded.
- `approved`: controls whether governance opens the execution gate.
- `runRequested`: controls whether the new request has been run.

Derived values are built in order:

1. `loadDemoFixtures()`
2. `validateDemoFixtures(fixtures)`
3. `ingestWorkTraces(...)`
4. `buildWorkGraph(...)`
5. `detectWorkPatterns(...)`
6. `generateAutomationProposal(...)`
7. `simulateAutomation(...)`
8. `createGovernanceRecord(...)`
9. `canExecute(...)`
10. `runApprovedWorkflow(...)`
11. `recommendLearningUpdate(...)`

This order matters. Later modules assume earlier modules have produced typed, validated data.

## Development Principles

- Keep domain logic deterministic until there is a deliberate live-service integration.
- Add or update contracts in `src/domain/types.ts` before adding new behavior.
- Keep the UI dashboard-first and operational. Do not add a landing page as the primary screen.
- Keep governance visible. Execution should never appear to bypass approval.
- Keep real enterprise actions mocked unless a secure connector layer is designed first.
- Keep all AI-generated or AI-like outputs typed and testable.
- Prefer focused domain tests over UI-only assertions.

## Adding A New Workflow

Use this path when adding a new workflow such as procurement, onboarding, or finance exceptions.

1. Add fixture examples in `src/fixtures/`.
2. Extend `RequestType`, policies, and related contracts in `src/domain/types.ts`.
3. Update fixture validation in `src/domain/fixtures.ts` if new required fields exist.
4. Update ingestion rules in `src/domain/ingestion.ts`.
5. Update pattern grouping and scoring in `src/domain/patterns.ts`.
6. Update graph generation if the workflow has new nodes or paths.
7. Update planner rules and simulation behavior.
8. Add tests for each changed domain module.
9. Wire UI labels and panels after the domain behavior is stable.

Do not start with UI mockups for a new workflow. The product is strongest when the dashboard reflects real typed transformations.

## Adding A New Dashboard Panel

Use this path when adding a panel to the existing dashboard:

1. Identify which domain output the panel represents.
2. Add missing domain fields and tests first.
3. Add the panel in `src/App.tsx`.
4. Add responsive CSS in `src/styles.css`.
5. Add a UI smoke assertion in `src/App.test.tsx`.
6. Verify desktop and mobile layouts.

Avoid nested cards. Use simple panels, tables, timelines, lists, and badges.

## Adding Live OpenAI Support

The provider boundary exists in `src/ai/providers.ts`, but browser code should not read secrets. A production-ready live integration should add a server-side API layer:

1. Add a server or serverless route that owns `OPENAI_API_KEY`.
2. Call `OpenAiResponsesProvider` from that trusted runtime.
3. Validate structured output before returning it to the browser.
4. Fall back to deterministic mock output if the model call fails.
5. Add tests using a mocked fetcher.

The browser should only receive validated proposal data, never raw secrets.

## Testing Guide

Run the full suite before committing:

```powershell
npm run typecheck
npm test
npm run build
npm audit --audit-level=low
```

What each check protects:

- `typecheck`: catches contract drift and unsafe TypeScript changes.
- `test`: verifies fixture validity, ingestion, graph generation, pattern detection, planner behavior, simulation, governance, execution, AI provider parsing, and dashboard flow.
- `build`: verifies the production artifact compiles.
- `audit`: verifies dependency vulnerability baseline.

## Test Coverage Map

| Area | Test File |
| --- | --- |
| Dashboard golden path | `src/App.test.tsx` |
| AI providers | `src/ai/providers.test.ts` |
| Fixtures | `src/domain/fixtures.test.ts` |
| Ingestion | `src/domain/ingestion.test.ts` |
| Graph | `src/domain/graph.test.ts` |
| Patterns | `src/domain/patterns.test.ts` |
| Planner | `src/domain/planner.test.ts` |
| Simulation and governance | `src/domain/simulation.test.ts` |
| Execution and learning | `src/domain/execution.test.ts` |

## Manual Smoke Test

After a meaningful UI change:

1. Run `npm run build`.
2. Run `npm run preview`.
3. Open the preview URL.
4. Click `Load Sample`.
5. Confirm the graph, patterns, proposal, simulation, and execution panels render.
6. Click `Approve`.
7. Click `Run Case`.
8. Confirm mock tool calls and the learning recommendation appear.
9. Click `Reset`.
10. Check a mobile-width viewport for horizontal overflow and text overlap.

## Git Hygiene

The repo intentionally ignores:

- `node_modules/`
- `dist/`
- local env files
- local Codex state
- logs

Commit source, docs, package files, tests, and configuration only.

Before pushing:

```powershell
git status --short
git diff --stat
```

The working tree should be clean after commit and push.
