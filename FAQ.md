# Samruna FAQ

## What is Samruna?

Samruna is a governed automation demo for enterprise workflows.

It takes messy operational traces, turns them into a work graph, finds repeated patterns and bottlenecks, generates an automation proposal, and lets a human approve or reject the proposal before anything runs.

The current version runs locally with synthetic data and safe simulation mode.

## Who is it for?

Samruna is built for teams that care about operational efficiency and governance:

- operations leaders
- IT and procurement teams
- automation teams
- compliance reviewers
- process owners
- hackathon judges or product reviewers evaluating the concept

## What problem does it solve?

Many enterprise processes are hidden across tickets, email, chat, approvals, and system logs. Teams know work is repetitive, but they cannot always prove where the bottleneck is or safely automate the next step.

Samruna shows a path from scattered work traces to governed automation:

1. collect the evidence
2. identify the repeated workflow
3. explain the bottleneck
4. propose a safe automation
5. require approval
6. simulate execution
7. preserve an audit trail

## What can I do in the demo?

You can run two synthetic workflow scenarios:

- **IT access requests**
- **Procurement intake**

For each scenario, you can load workflow evidence, analyze the graph, review an automation proposal, approve or reject it, simulate execution, export the run, import a saved run, and reset the workspace.

## Is this using real customer data?

No. The demo uses synthetic organization data only.

The scenarios are designed to feel realistic, but they do not contain real employee, customer, financial, HR, or production system records.

## What does the backend do?

The backend provides the local engine behind the full-stack demo.

It handles:

- API routes for workspace actions
- local SQLite persistence
- scenario loading and reset
- workflow analysis state
- proposal, governance, execution, and audit records
- export and import of demo state
- optional server-side OpenAI proposal generation
- fallback to the historical validation engine

The backend also keeps sensitive provider logic away from the browser.

## What does the frontend do?

The frontend is the product experience.

It shows:

- the landing page
- the dashboard workspace
- workflow evidence
- the work graph
- the proposal review flow
- approval and rejection actions
- simulated execution
- audit and export/import tools

The browser never receives OpenAI API keys.

## Where does OpenAI come in?

OpenAI is optional and backend-only.

When `OPENAI_API_KEY` is configured for the backend, Samruna can ask the OpenAI Responses API to generate a structured automation proposal from already-analyzed workflow context.

When no key is configured, or if live generation fails, Samruna uses the historical validation engine so the demo remains reliable.

## What does the AI actually do?

The AI acts as a workflow automation planner.

It can propose:

- the automation trigger
- required data
- forbidden data
- eligibility rules
- policy checks
- allowed actions
- escalation paths
- audit rationale

It does not execute work, approve itself, access the browser key, or directly mutate enterprise systems.

## What is safe simulation mode?

Safe simulation mode means execution is demonstrated without touching real enterprise systems.

When you approve and run a proposal, Samruna creates a simulated result and audit trail. It does not create real tickets, provision real accounts, send real messages, or modify production systems.

## Why is approval required?

Automation can affect access, policy, cost, compliance, and operational risk. Samruna keeps the human reviewer in control.

A proposal must be reviewed and approved before the simulated execution step becomes available.

## What is the Evidence view?

The **Evidence** view shows the source traces and normalized work items behind the analysis.

Use it to understand what data supports the graph and proposal before approving anything.

## What is the Graph view?

The **Graph** view shows the repeated workflow as connected actors, approvals, systems, actions, exceptions, and outcomes.

It helps explain where work slows down and why the proposed automation is relevant.

## What is Review & Run?

**Review & Run** is the governance checkpoint.

It shows the generated proposal, simulation results, assumptions, policy checks, escalation rules, and approval controls. This is where a reviewer decides whether the proposal is safe to approve.

## What is the Audit view?

The **Audit** view shows the recorded events for the demo run.

It also includes export, import, and reset controls so a run can be shared, replayed, or restored to the seeded state.

## What data would an organization need for a real deployment?

A real deployment would need scoped work-trace data with provenance, such as:

- ticket status changes
- approval events
- workflow timestamps
- system action logs
- policy catalogs
- role and team metadata
- approved excerpts or metadata from communication tools

It should not need passwords, unrestricted inbox access, broad chat history, API keys in the browser, or unrestricted write access.

## Would organizational data be safe?

The intended production model is based on least privilege and governance.

A production deployment should use:

- read-only connectors for discovery
- strict role-based access control
- human approval gates
- execution tool allowlists
- immutable audit logs
- retention policies
- backend-only AI provider calls
- summarized AI inputs instead of raw sensitive records where possible

The local demo demonstrates the safety pattern, but it is not a finished production security system.

## Can Samruna execute real enterprise actions today?

No. The current app executes in safe simulation mode only.

Real execution would require production connectors, identity controls, approval policy, tool allowlists, observability, and customer-specific security review.

## What still needs to be built for production?

The demo proves the product flow, but production use would require:

- authentication and RBAC
- real enterprise connectors
- durable production storage
- immutable audit logging
- production deployment infrastructure
- hardened AI observability and evaluation
- customer-specific compliance controls
- real execution tools with strict allowlists

## How do I run it locally?

Install dependencies and start the demo:

```powershell
npm install
npm run demo:dev
```

Open the local URL printed by Vite.

For the full-stack local backend:

```powershell
npm run backend:seed
npm run dev:fullstack
```

## How do I reset the demo?

From the product UI, open **Audit** and use **Reset**.

For the backend-backed demo, you can also run:

```powershell
npm run backend:seed
```

## Does the demo work without OpenAI?

Yes. Samruna works without live OpenAI credentials.

If `OPENAI_API_KEY` is not set, the historical validation engine generates reliable proposal behavior for the demo.

## Why is this a strong hackathon demo?

Samruna combines a clear enterprise problem with a complete governed workflow:

- a polished landing page
- a concrete before-and-after story
- visible evidence and graph reasoning
- AI proposal generation
- human approval
- safe execution simulation
- auditability
- reliable local fallback behavior

It is not just a chatbot. It is a governed workflow automation experience.
