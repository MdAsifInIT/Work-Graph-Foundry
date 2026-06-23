# Work Graph Foundry Master Plan

## Summary

Work Graph Foundry will be built as a local-first enterprise work intelligence and governed automation demo. The MVP centers on IT access requests: messy work traces are ingested, normalized, clustered into repeatable work patterns, mapped into a work graph, analyzed for bottlenecks, converted into a governed automation proposal, simulated against history, approved by a human, run against a new case, and improved through a learning loop.

The current repository is documentation-only. There is no application scaffold, package manager lockfile, source tree, or test setup. The selected stack is therefore the default recommended stack from the product brief:

- TypeScript
- Vite 6
- React
- Local JSON fixtures
- Deterministic mock AI provider by default
- Optional OpenAI provider behind `OPENAI_API_KEY`

## Implementation Strategy

1. Preserve the current markdown files as product source material.
2. Build the app in small verified phases, keeping all behavior runnable without external services.
3. Use typed contracts for every agent output, fixture, graph object, simulation result, governance state, and execution event.
4. Keep the first screen as the operating dashboard, not a landing page.
5. Prefer deterministic local logic for demo reliability, with OpenAI integration added as an optional provider after the core flow works.
6. Update the current phase document and `06-progress-tracker.md` after every phase.

## Phase Order

| Phase | Focus | Status |
| --- | --- | --- |
| 00 | Repo discovery | Complete for planning |
| 01 | Product scope | Complete for planning |
| 02 | Technical foundation | Not started |
| 03 | Data model and fixtures | Not started |
| 04 | Work ingestion | Not started |
| 05 | Work graph engine | Not started |
| 06 | Pattern detection | Not started |
| 07 | Agentic workflow planner | Not started |
| 08 | Governance and simulation | Not started |
| 09 | Operator dashboard | Not started |
| 10 | OpenAI integration layer | Not started |
| 11 | Demo experience | Not started |
| 12 | Testing, hardening, and handoff | Not started |

## Dependencies

- Node.js/npm availability will be confirmed during Phase 02.
- No live enterprise connectors are required for the MVP.
- No OpenAI credentials are required for the MVP; real model calls are optional.
- Browser-based UI verification is required once the frontend exists.

## Verification Strategy

- Phase 00-01: repository inspection and documentation review.
- Phase 02: install, dev server, type check, and baseline test command.
- Phase 03-08: unit tests for deterministic data, graph, planner, simulation, governance, and execution logic.
- Phase 09-11: UI smoke checks, desktop and mobile visual verification, end-to-end demo path.
- Phase 12: clean-run verification from documented commands, accessibility pass, handoff review, and known limitations.

## Demo Definition Of Done

The demo is complete when a user can complete this path in under five minutes:

1. Load realistic IT access request traces.
2. See repeated work patterns and select the access-request cluster.
3. Inspect the generated work graph with actors, systems, approvals, policies, exceptions, and outcomes.
4. See bottleneck and automation opportunity insights.
5. Generate or view a governed automation proposal.
6. Simulate it against historical requests.
7. Approve the proposal with reviewer comments.
8. Run it against a new incoming request using safe mock tools.
9. See a learning-loop recommendation from delays, exceptions, or overrides.

## Initial Decisions

| Decision | Rationale |
| --- | --- |
| Use IT access requests as MVP workflow | Recommended by the brief and fits governance, audit, policy, and measurable cycle-time value. |
| Use local JSON fixtures first | Keeps the demo reliable without enterprise integrations. |
| Use deterministic mock AI first | Avoids a demo dependency on network, billing, or model nondeterminism. |
| Add OpenAI as optional provider later | Preserves realism while keeping the core product runnable without secrets. |
| Use a dashboard-first UI | Matches enterprise operator expectations and avoids a marketing-page demo. |
