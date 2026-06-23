# Demo Guide

This guide explains how to present Work Graph Foundry, what each screen means, and how to recover if a live service or dev server is unavailable.

## Demo Objective

The demo should prove that Work Graph Foundry is not a generic chatbot. It is an enterprise work intelligence layer that:

- observes work traces
- understands repeated patterns
- maps the real workflow
- reasons about bottlenecks and risk
- plans governed automation
- simulates before execution
- requires human approval
- executes safely
- recommends improvements

The presenter should make the full loop obvious without relying on a long explanation.

## Setup

Install and run:

```powershell
npm install
npm run dev
```

If development mode fails in a restricted environment, use:

```powershell
npm run build
npm run preview
```

The app does not require `OPENAI_API_KEY`.

## Five-Minute Presenter Script

### 1. Open The Dashboard

Say:

"This is Work Graph Foundry. It starts from messy enterprise work traces, not a predefined workflow."

Point out:

- dashboard-first interface
- scripted path strip
- mock AI mode
- governed execution state

### 2. Load Sample Data

Click `Load Sample`.

Say:

"The sample represents IT access requests spread across email, tickets, chat, approvals, and system actions."

Point out:

- raw trace count
- normalized item count
- warning count
- top system

### 3. Show Normalization

Use the raw-to-normalized evidence panel.

Say:

"The system observes a messy trace and extracts structured fields: requester, department, request type, system, status, policy flags, and source trace links."

This is the observe step.

### 4. Show The Work Graph

Use the IT access request flow panel.

Say:

"The graph shows how work actually moves: requester, manager approval, policy check, provisioning, audit logging, exception review, and outcome."

Point out:

- approval delay
- exception rate
- cycle time

This is the map step.

### 5. Show Pattern Detection

Use the repeated workflows panel.

Say:

"The system discovered standard application access as the most repeatable automation candidate and found manager approval as the bottleneck."

Point out:

- volume
- repeatability
- risk level
- opportunity score
- bottleneck evidence

This is the understand and reason step.

### 6. Show The Proposal

Use the governed automation proposal panel.

Say:

"The planner generates a structured automation proposal, not a vague suggestion. It includes trigger, policy checks, actions, escalations, confidence, expected value, and audit rationale."

This is the plan step.

### 7. Show Simulation

Use the historical replay panel.

Say:

"Before execution, the proposal is tested against historical cases. Some pass, some need human review, and high-risk cases stay under policy control."

Point out:

- pass count
- needs-human count
- policy-risk count
- avoided delay
- execution gate is blocked

This is the simulate step.

### 8. Approve Governance

Click `Approve`.

Say:

"Execution stays blocked until a human governance decision is recorded. Approval creates an audit event and opens the execution gate."

This is the govern step.

### 9. Run The New Case

Click `Run Case`.

Say:

"The approved workflow runs on a new request using safe mock tools: employee validation, policy evaluation, provisioning task creation, and audit logging."

This is the execute step.

### 10. Show The Learning Loop

Use the learning-loop section.

Say:

"The system recommends splitting exception-heavy cases into a human-review lane. That keeps standard access fast while preserving control."

This is the improve step.

### 11. Reset

Click `Reset`.

Say:

"The demo is deterministic and replayable."

## Value Moments To Emphasize

- The workflow is discovered from traces.
- The graph makes invisible coordination visible.
- The bottleneck is backed by timestamp-derived evidence.
- The proposal is structured and governed.
- Simulation happens before execution.
- Approval is a real gate.
- Execution is auditable.
- Learning is based on observed failures, delays, and exceptions.

## What Not To Say

Avoid framing the product as:

- a chatbot
- a workflow builder
- a static dashboard
- a generic automation tool

The key distinction is that Work Graph Foundry discovers the workflow before generating automation.

## Fallback Talk Track

If live AI is unavailable:

"The demo uses deterministic mock agents by default so the governed work loop is reliable. The architecture includes a structured OpenAI Responses API provider boundary for trusted server-side integration."

If dev mode fails:

"This environment blocks dependency optimization, so we are using the production build preview. That is the same artifact path we use for final verification."

## Manual Acceptance Checklist

Before presenting:

- `npm run build` passes.
- `npm test` passes.
- The app opens locally.
- `Load Sample` reveals all major panels.
- `Approve` changes execution gate from blocked to open.
- `Run Case` shows mock tool calls.
- Learning recommendation appears.
- `Reset` clears the run state.
- Mobile layout has no horizontal overflow.

## Audience-Specific Positioning

For executives:

"This shortens cycle time and turns hidden operational knowledge into governed automation."

For IT leaders:

"This shows where access work stalls and automates low-risk cases without losing control."

For compliance:

"Policy checks, simulation outcomes, approval comments, and audit events are first-class product states."

For engineers:

"The current implementation is typed, deterministic, tested, and ready for server-side provider and connector expansion."
