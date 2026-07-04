# Work Graph Foundry

Work Graph Foundry is a local-first enterprise automation demo that finds repeated organizational patterns in messy work traces and turns them into governed AI automation. It builds a work graph, surfaces process intelligence, proposes workflow automation, simulates changes against historical cases, and runs approved actions through safe mock tools.

The product is designed to be easy to evaluate in a hackathon setting. Reviewers get a polished landing page, a direct path into the demo, and a clear before-and-after story: observe work, understand the pattern, govern the proposal, and execute only what is approved. The language and flows are intentionally customer-facing, but the behavior remains deterministic and local-first for reliable judging.

## Demo Value

The demo shows how an organization can move from scattered requests and manual handoffs to governed automation without pretending the system has production access.

It highlights:

- enterprise automation for repeated internal work
- work graph modeling across people, systems, approvals, and outcomes
- process intelligence that identifies bottlenecks and recurring patterns
- governed AI automation with explicit review, simulation, and audit steps
- workflow automation that stays safe by using deterministic mock execution by default

## What The Demo Shows

The app includes two synthetic workflow scenarios:

1. IT access requests: employees request access through email, tickets, chat, approvals, and system logs.
2. Procurement intake: teams request software purchases, vendor onboarding, and invoice exception handling through intake traces, approvals, and procurement-system updates.

The default scenario is IT access requests:

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
11. State persists locally for replay, export, import, and reset.
12. The learning loop recommends a future improvement.

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
npm run demo:dev
```

Open the local URL printed by Vite.

If Vite dev dependency optimization is blocked by a local sandbox, use the production artifact path:

```powershell
npm run build
npm run preview
```

## Demo Path

1. Click `Launch` from the product page.
2. Choose `IT access requests` or `Procurement intake`.
3. Click `Load Workflow`.
4. Click `Analyze` and inspect `Graph`.
5. Open `Evidence` when source traces or normalized evidence need review.
6. Click `Generate Proposal`.
7. Review required data, forbidden data, assumptions, policy checks, escalations, simulation results, and governance notes in `Review & Run`.
8. Use the `Approve` and `Reject` actions in `Review & Run`.
9. Click `Run approved workflow` after approval in `Review & Run`.
10. Open `Audit` to review export/import controls and persisted audit state.
11. Use `Export Summary` in `Audit` for a portable run summary or `Reset` in `Audit` to restore seeded state.

## Scripts

```powershell
npm run dev         # Start local development server
npm run demo:dev    # Start local demo server
npm run demo:seed   # Print deterministic seed state JSON
npm run demo:reset  # Print browser localStorage reset snippet
npm run build       # Typecheck and build production artifact
npm run verify:demo # Run typecheck, tests, build, and audit
npm run test:e2e    # Run Playwright Chromium e2e tests
npm run preview     # Preview production build
npm run typecheck   # Run TypeScript checks
npm test            # Run Vitest suite
```

## Project Structure

```text
src/
  ai/          # AI provider abstraction, mock provider, optional OpenAI provider
  domain/      # Scenarios, persistence, ingestion, graph, patterns, planner, simulation, governance, execution
  fixtures/    # Seeded synthetic scenario traces and policy data
  test/        # Test setup
docs/
  README.md
  01-overview.md
  02-architecture.md
  03-development.md
  04-demo-setup.md
  05-data-access-and-security.md
  06-testing-and-validation.md
  07-roadmap.md
  08-continuation-plan.md
  09-agentic-build-guide.md
  10-demo-operations.md
  archive/
```

## Documentation

- [Documentation Index](docs/README.md): ordered guide list for developers and agents.
- [1. Overview](docs/01-overview.md): purpose, current state, main flows, and agentic loop.
- [2. Architecture](docs/02-architecture.md): components, data flow, module responsibilities, and production direction.
- [3. Development](docs/03-development.md): setup, build, test, extension recipes, and agent development rules.
- [4. Demo Setup](docs/04-demo-setup.md): requirements, local run steps, walkthrough, reset, and recovery.
- [5. Data Access And Security](docs/05-data-access-and-security.md): organization access, data needs, non-needs, governance, and compliance FAQ.
- [6. Testing And Validation](docs/06-testing-and-validation.md): unit tests, integration checks, UI smoke tests, and agentic verification steps.
- [7. Roadmap](docs/07-roadmap.md): current limitations, future improvements, productionization, and testing roadmap.
- [8. Continuation Plan](docs/08-continuation-plan.md): current implementation plan and guardrails.
- [9. Agentic Build Guide](docs/09-agentic-build-guide.md): safe continuation checklist for future agents.
- [10. Demo Operations](docs/10-demo-operations.md): operator runbook, reset, import/export, and recovery.
- [11. Hackathon Demo](docs/11-hackathon-demo.md): concise hackathon talk track, safety framing, and verification commands.

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
npm run verify:demo
```

For browser coverage, install Chromium if needed and then run the Playwright suite:

```powershell
npm run test:e2e:install
npm run test:e2e:preview
npm run test:e2e
npm run typecheck:e2e
```

Current non-browser baseline:

- Vitest suite passes
- production build passes
- audit reports 0 vulnerabilities

Current browser baseline:

- Playwright e2e exists under `tests/e2e`
- `npm run test:e2e` runs the golden demo path in Chromium
- sandboxed environments may require permission to install Chromium or launch the browser
- if Chromium launch is blocked, use `npm run verify:demo` plus `npm run build` and `npm run preview` as the fallback local check

## Troubleshooting

- If `npm run dev` fails during dependency optimization in a restricted sandbox, run `npm run build` followed by `npm run preview`.
- If live OpenAI calls fail, leave `OPENAI_API_KEY` unset and use the deterministic mock provider.
- If the UI appears stale after changes, rebuild or reload the preview server.
- If Playwright binaries are missing, run `npm run test:e2e:install` before retrying browser tests.

## Contributing

Keep the product landing-first and reviewer-focused. Avoid turning the app into a generic chatbot or generic marketing page. New features should preserve typed contracts, deterministic demo behavior, governance visibility, and safe mock execution by default.
