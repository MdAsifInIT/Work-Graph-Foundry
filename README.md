# Samruna

Samruna turns messy enterprise work traces into governed automation proposals.

It helps teams see where repeated work is happening, understand the bottlenecks behind it, review an AI-generated automation plan, and safely simulate execution only after approval.

The current version is a local POC - Proof Of Concept. It uses synthetic organization data, a reproducible workflow engine, and safe simulation mode so the experience is reliable without connecting to real enterprise systems.

## Why It Exists

Enterprise operations are often spread across tickets, email, chat, approvals, spreadsheets, and system logs. The same work happens again and again, but the process is hard to see clearly.

Samruna gives teams a way to:

- discover repeated workflows from operational traces
- turn those workflows into a visual work graph
- identify delays, exceptions, and approval bottlenecks
- generate a reviewable automation proposal
- simulate the proposal against historical cases
- require human approval before any execution
- keep an audit trail of every decision and run

## What You Can Try

The POC - Proof Of Concept includes two synthetic scenarios:

1. **IT access requests**
   Employees request application access through email, tickets, chat, approvals, and system logs.

2. **Procurement intake**
   Teams request software purchases, vendor onboarding, and invoice exception handling.

In each scenario, Samruna walks through the same operating model:

1. Load workflow traces.
2. Normalize the messy source evidence.
3. Detect repeated work patterns.
4. Build a graph of people, approvals, systems, exceptions, and outcomes.
5. Surface the main bottleneck.
6. Generate a governed automation proposal.
7. Review policy checks, required data, forbidden data, assumptions, and escalations.
8. Approve or reject the proposal.
9. Execute only in safe simulation mode.
10. Review the audit trail, export the run, or reset the POC - Proof Of Concept.

## POC - Proof Of Concept Walkthrough

1. Open the app.
2. Click **Launch**.
3. Choose **IT access requests** or **Procurement intake**.
4. Click **Load Workflow**.
5. Click **Analyze**.
6. Open **Evidence** to review source traces and normalized work items.
7. Open **Graph** to inspect the repeated workflow and bottleneck.
8. Click **Generate Proposal**.
9. Open **Review & Run** to inspect the proposal, simulation, and governance gate.
10. Click **Approve** or **Reject**.
11. If approved, click **Execute workflow**.
12. Open **Audit** to review events, export a summary, import a prior run, or reset.

## What The AI Does

Samruna uses AI as a workflow automation planner.

The AI does:

- read structured workflow context prepared by the system
- generate a proposal with triggers, required data, allowed actions, policy checks, and escalation paths
- explain the governance and simulation rationale

The AI does not:

- execute actions on its own
- bypass human approval
- connect directly to enterprise systems from the browser
- receive API keys in frontend code
- replace audit, policy, or compliance review

If live OpenAI credentials are not configured, Samruna uses the built-in historical validation engine so the POC - Proof Of Concept still works.

## Safety Model

The POC - Proof Of Concept is intentionally safe by default:

- all scenario records are synthetic
- execution is simulated
- proposals require human approval
- browser code never receives OpenAI API keys
- backend provider errors are sanitized before reaching the UI
- export/import data is local POC - Proof Of Concept state, not customer production data
- reset restores the seeded POC - Proof Of Concept state

For a production deployment, Samruna would need enterprise identity, role-based access control, scoped connectors, durable storage, immutable audit logs, and carefully governed execution tools.

## Run The POC - Proof Of Concept Locally

Requirements:

- Node.js 24 or newer
- npm

Install dependencies and start the frontend POC - Proof Of Concept:

```powershell
npm install
npm run demo:dev
```

Open the local URL printed by Vite.

If local dev-server dependency optimization is blocked, use the production preview path:

```powershell
npm run build
npm run preview
```

## Run With The Local Backend

The full-stack POC - Proof Of Concept adds a local API and SQLite-backed workspace state.

```powershell
npm run backend:seed
npm run dev:fullstack
```

The backend listens on `127.0.0.1:8787` by default. The generated SQLite database is stored at `.samruna/samruna.sqlite` unless `SAMRUNA_DB_PATH` is set.

To use the built full-stack server:

```powershell
npm run build
npm run preview:fullstack -- --port 4174
```

## Optional Live OpenAI Proposal Generation

Samruna works without OpenAI credentials. Leave `OPENAI_API_KEY` unset to use the historical validation engine.

To try live proposal generation locally, set the key only for the backend process:

```powershell
$env:OPENAI_API_KEY="sk-..."
$env:OPENAI_MODEL="gpt-5.5"
npm run backend:seed
npm run dev:fullstack
```

Never put `OPENAI_API_KEY` in browser code or frontend environment variables.

## Useful Commands

```powershell
npm run demo:dev          # Start the local frontend POC - Proof Of Concept
npm run dev:fullstack     # Start backend and frontend together
npm run backend:seed      # Reset local backend POC - Proof Of Concept state
npm run build             # Typecheck and build production assets
npm test                  # Run unit tests
npm run test:e2e          # Run Playwright browser tests
npm run verify:demo       # Typecheck, test, build, and audit POC - Proof Of Concept
npm run verify:fullstack  # Full verification path for frontend and backend
```

## Documentation

- [FAQ](FAQ.md): product, POC - Proof Of Concept, data, safety, and implementation questions.
- [Documentation Index](docs/README.md): full project documentation.
- [Overview](docs/01-overview.md): purpose, current state, and main flows.
- [POC - Proof Of Concept Setup](docs/04-demo-setup.md): local run steps and operator guidance.
- [Data Access And Security](docs/05-data-access-and-security.md): data needs and safety model.
- [Testing And Validation](docs/06-testing-and-validation.md): verification coverage.
- [Roadmap](docs/07-roadmap.md): current limits and production direction.

## Current Scope

Samruna is currently a POC - Proof Of Concept-grade product experience. It proves the workflow:

- observe work
- understand the pattern
- propose automation
- govern the proposal
- simulate execution
- audit the result

It does not yet include production authentication, live enterprise connectors, real provisioning actions, customer data ingestion, production infrastructure, or final compliance controls.

## Troubleshooting

- If the dev server fails in a restricted environment, run `npm run build` and then `npm run preview`.
- If the full-stack dev server fails, run `npm run build` and then `npm run preview:fullstack -- --port 4174`.
- If live OpenAI calls fail, remove `OPENAI_API_KEY` and use the historical validation engine.
- If Playwright browsers are missing, run `npm run test:e2e:install`.
- If the UI appears stale, reload the page or rebuild the preview server.

