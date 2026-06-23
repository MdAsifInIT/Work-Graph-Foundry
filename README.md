# Work Graph Foundry

Work Graph Foundry is a local-first enterprise work intelligence and governed automation demo. It observes messy work traces, builds a live work graph, identifies repeated work patterns, proposes governed automations, simulates them against historical cases, executes approved workflows through safe mock tools, and recommends improvements.

The demo is intentionally not a chatbot or landing page. It is an operating dashboard that shows an AI-native enterprise work loop: observe, understand, map, reason, plan, simulate, govern, execute, and improve.

## What The Demo Shows

The MVP uses IT access requests as the workflow:

1. Employees request access through email, tickets, chat, approvals, and system logs.
2. The app loads realistic multi-channel traces.
3. It normalizes messy traces into typed work items.
4. It discovers repeated access-request patterns.
5. It builds a work graph with requesters, manager approval, policy checks, IT provisioning, audit logging, exceptions, and outcomes.
6. It identifies manager approval as a bottleneck.
7. It generates a governed automation proposal.
8. It simulates that proposal against historical cases.
9. A human reviewer approves the proposal.
10. A new request runs through safe mock tools.
11. The learning loop recommends a future improvement.

## Tech Stack

- TypeScript
- React
- Vite 6
- Vitest
- Local JSON-like fixture data in TypeScript
- Deterministic mock AI provider by default
- Optional OpenAI Responses API provider boundary for trusted runtimes

## Run Locally

```powershell
npm install
npm run dev
```

Open the local URL printed by Vite.

If Vite dev dependency optimization is blocked by a local sandbox, use the production artifact path:

```powershell
npm run build
npm run preview
```

## Demo Path

1. Click `Load Sample`.
2. Review the normalized work item, graph, pattern, bottleneck, and proposal panels.
3. Review historical simulation results and execution gate state.
4. Click `Approve`.
5. Click `Run Case`.
6. Review mock tool calls and the learning-loop recommendation.
7. Click `Reset` to replay.

## Scripts

```powershell
npm run dev        # Start local development server
npm run build      # Typecheck and build production artifact
npm run preview    # Preview production build
npm run typecheck  # Run TypeScript checks
npm test           # Run Vitest suite
```

## Project Structure

```text
src/
  ai/          # AI provider abstraction, mock provider, optional OpenAI provider
  domain/      # Ingestion, graph, patterns, planner, simulation, governance, execution
  fixtures/    # Seeded IT access request traces and policy data
  test/        # Test setup
docs/
  ARCHITECTURE.md
  DATA_AND_AGENT_GUIDE.md
  DEMO_GUIDE.md
  DEVELOPMENT_GUIDE.md
  ROADMAP.md
  archive/
```

## Documentation

- [Development Guide](docs/DEVELOPMENT_GUIDE.md): setup, repo layout, development rules, extension recipes, and test workflow.
- [Architecture](docs/ARCHITECTURE.md): solution overview, module-by-module implementation walkthrough, current limitations, and production direction.
- [Data And Agent Guide](docs/DATA_AND_AGENT_GUIDE.md): data contracts, fixture model, deterministic agent responsibilities, provider behavior, and extension guidance.
- [Demo Guide](docs/DEMO_GUIDE.md): presenter script, value moments, fallback talk tracks, and manual acceptance checklist.
- [Roadmap](docs/ROADMAP.md): current MVP state, next improvements, productionization path, and testing roadmap.

Historical planning prompts and phase notes are archived under `docs/archive/`.

## AI Provider Behavior

The app runs without live OpenAI credentials. The browser demo uses deterministic mock agents so it is reliable in local and judging environments.

The provider boundary lives in `src/ai/providers.ts`:

- `MockAiProvider` is the default.
- `OpenAiResponsesProvider` targets the Responses API with structured JSON output.
- Live API keys should only be injected from a trusted server-side runtime.

Do not expose `OPENAI_API_KEY` directly in browser code.

## Verification

Before handoff or push, run:

```powershell
npm run typecheck
npm test
npm run build
npm audit --audit-level=low
```

Current verified baseline:

- 9 test files
- 21 tests
- production build passes
- audit reports 0 vulnerabilities

## Troubleshooting

- If `npm run dev` fails during dependency optimization in a restricted sandbox, run `npm run build` followed by `npm run preview`.
- If live OpenAI calls fail, leave `OPENAI_API_KEY` unset and use the deterministic mock provider.
- If the UI appears stale after changes, rebuild or reload the preview server.

## Contributing

Keep the product dashboard-first. Avoid turning the app into a generic chatbot or marketing page. New features should preserve typed contracts, deterministic demo behavior, governance visibility, and safe mock execution by default.
