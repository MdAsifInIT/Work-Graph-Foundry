# Live OpenAI Integration Loop

## Summary

This file controls the recursive implementation loop for live OpenAI proposal generation in Work Graph Foundry on `backend-branch`.

The target is production-parity model integration through the trusted local backend while preserving the synthetic-data demo, SQLite state, governance gate, browser fallback mirror, and safe simulation mode for enterprise execution.

## Non-Negotiable Boundaries

- No enterprise data connectors.
- No authentication or RBAC.
- No live infrastructure provisioning.
- No real customer data.
- No browser-side secrets.
- No real enterprise write actions.
- All OpenAI API keys stay server-side in environment variables or future secret management.
- All model output is validated before persistence.
- Failed live model calls fall back to the Historical validation engine.
- Every execution pass updates this file and `tasks.md`.

## Current Baseline

- The app is a full-stack local demo with React, Vite, Node 24, `node:sqlite`, and `/api/workspace` state.
- The backend owns workspace state, seed/reset, import/export, governance, execution gating, and artifact persistence.
- Proposal generation is now routed through an injected AI provider on the backend.
- `OPENAI_API_KEY`, `OPENAI_MODEL`, and `OPENAI_TIMEOUT_MS` are read only by `server/ai.ts`.
- The browser displays backend-supplied provider metadata and does not import the OpenAI-capable provider.

## Phase 1: Backend Live OpenAI Proposal Path

### Objective

Route proposal generation through a server-owned AI provider contract with safe defaults.

### Agent Assignments

- `worker_major`: architecture and secret-boundary review.
- `worker_nano`: planning/log file setup.
- `worker_test`: final verification and failure triage.

### Implementation Tasks

- Inject `AiProvider` into `WorkspaceService`.
- Default to the Historical validation engine when no server-side key is configured.
- Build server-only provider config from `OPENAI_API_KEY`, `OPENAI_MODEL`, and `OPENAI_TIMEOUT_MS`.
- Set OpenAI Responses API requests to `store: false`.
- Normalize provider proposals to stable scenario/pattern/version/timestamp identity before persistence.
- Persist non-secret provider metadata and model invocation provenance.
- Add fallback metadata and audit events when live generation fails.
- Add tests for provider injection, fallback, metadata, structured output rejection, and secret-free API envelopes.

### Completion Gate

- No-key behavior remains deterministic.
- Live provider can be injected and observed through non-secret metadata.
- Failed provider calls fall back without breaking proposal/governance/run flow.
- Browser source no longer imports the OpenAI-capable provider module.

## Phase 2: Reviewer-Ready Production-Parity Layer

### Objective

Make the live integration clear to hackathon reviewers without overstating enterprise readiness.

### Implementation Tasks

- Surface provider mode/model/last generation status in the existing Overview view.
- Keep execution copy explicitly aligned to safe simulation mode.
- Document the server-only live-key run path.
- Document that live model reasoning uses synthetic data and safe simulation mode for enterprise execution.
- Keep browser fallback described as a mirror, not the source of truth.

### Completion Gate

- Reviewer can distinguish live proposal generation from safe simulated execution.
- Docs state that connectors, RBAC, provisioning, real customer data, and browser-side secrets remain out of scope.
- Non-browser verification passes without requiring an OpenAI key.

## Recursive Phase Schema

Append future phases using this schema:

```md
## Phase N: <Title>

### Objective
<One concrete outcome.>

### Trigger
<Planned milestone, reviewer finding, failing test, demo gap, security gap, or customer-readiness gap.>

### Agent Assignments
- worker_major:
- worker_nano:
- worker_test:
- Hackathon Reviewer worker_major:

### In Scope
-

### Out Of Scope
-

### Implementation Tasks
-

### API / Data Contract Changes
-

### Security And Secret Boundary
-

### Tests And Verification
-

### Hackathon Reviewer Report
- Score before: <0-100>
- Score after: <0-100>
- Blocking findings:
- Non-blocking findings:
- Customer confidence notes:

### Orchestrator Adaptation Log
- Added tasks:
- Deferred tasks:
- New phases created:
- Rationale:

### Completion Gate
-

### Append Log
- Date:
- Branch:
- Agents used:
- Files changed:
- Commands run:
- Results:
- Blockers:
```

## Append Log

### 2026-07-05: Phase 1 And Phase 2 Implementation Pass

- Branch: `backend-branch`
- Agents used: `worker_major` architecture review, `worker_nano` planning/log setup, `worker_test` verification.
- Status: complete for non-browser gates.
- Files changed: backend provider wiring, shared DTOs/persistence, frontend provider status display, tests, docs, and this loop ledger.
- Results:
  - `npm run typecheck:server` passed.
  - `npm test -- --run src/ai/providers.test.ts src/domain/persistence.test.ts` passed.
  - `npm run test:backend` passed, 20 tests.
  - `npm run typecheck` passed.
  - `npm test` passed, 62 tests.
  - `npm run typecheck:e2e` passed.
  - `npm run build` passed.
  - `npm run verify:fullstack` passed and `npm audit --audit-level=low` found 0 vulnerabilities.
  - Direct full-stack HTTP smoke with temp `WGF_DB_PATH` passed.
  - Production `dist/` scan found no `OPENAI_API_KEY`, `Bearer `, OpenAI endpoint, or OpenAI provider strings.
- Blockers: `npm run test:e2e -- --max-failures=1` built successfully, then Playwright Chromium failed before app assertions with `browserType.launch: spawn EPERM` for `C:\Users\Primary\AppData\Local\ms-playwright\chromium_headless_shell-1228\chrome-headless-shell-win64\chrome-headless-shell.exe`.
- Hackathon Reviewer score: 91/100 after stale full-stack plan wording was corrected. No blocking findings remain.

### 2026-07-05: Frontend Confidence Hardening Pass

- Branch: `backend-branch`
- Agents used: `worker_major` read-only hackathon/customer-confidence reviewer; implementation and integration in the main orchestrator thread; `worker_test` pending final verification.
- Reviewer score before edits: 76/100.
- Blocking findings:
  - Browser-generated Historical validation engine proposal state could misrepresent backend provider provenance.
  - Happy-path UI did not clearly show backend-connected vs browser fallback mode.
- Implementation tasks completed:
  - Made backend workspace snapshots authoritative for frontend actions when backend is available.
  - Kept local deterministic updates only for browser fallback mode and labeled that mode visibly.
  - Added provider/source-of-truth strip, sanitized fallback status, proposal provider provenance, and retry/reset affordances.
  - Renamed the execution CTA to `Execute workflow` and added no-enterprise-write copy.
  - Added production frontend secret scan coverage for browser bundle and app source.
- Verification results:
  - `npm run typecheck` passed.
  - `npm test` passed, 64 tests.
  - `npm run test:backend` passed, 20 tests.
  - `npm run build` passed.
  - `npm run scan:frontend-secrets` passed.
  - `npm run verify:fullstack` passed, including 0 vulnerabilities.
  - `npm run typecheck:e2e` passed.
  - `npm run test:e2e` passed, 12 Chromium tests.
  - `npm run test:e2e:preview` passed, 12 Chromium tests.
  - `git diff --check` passed with Windows line-ending warnings only.
- Blockers: none for this pass.
- Final reviewer follow-up:
  - `worker_major` final read-only score after the main hardening pass was 88/100 with no blocking findings.
  - The remaining fast-action `connecting` fallback risk was addressed by attempting backend actions before fallback during initial connection.
  - The source secret-scan coverage risk was addressed by adding browser-shared `src/domain` and `src/fixtures` roots.
  - Final expected readiness after follow-up fixes: 91/100; no blocking findings known.

### 2026-07-05: Backend-Backed Frontend API Authority Pass

- Branch: `backend-branch`
- Agents used: `worker_major` API-boundary review, `worker_nano` bounded gap scan, `worker_test` verification.
- Trigger: user requested implementation of the backend/API-backed frontend flow plan and a reviewer pass found that the frontend stored backend state but still rendered several locally recomputed artifacts.
- Files changed:
  - `src/app/useWorkGraphDemoController.ts`
  - `tsconfig.app.json`
  - `tasks.md`
  - `loop_task_phases.md`
- Implementation tasks completed:
  - Retained the latest backend `WorkspaceSnapshot` in the controller.
  - Preferred backend graph, proposal, simulation, governance, execution gate, workflow stages, audit events, scenario, validation, and provider metadata whenever the backend is connected.
  - Preserved deterministic local computation for browser fallback mirror mode.
  - Cleared stale backend snapshots when backend sync fails or browser fallback mode is entered.
  - Excluded `src/ai` from the browser app TypeScript project while keeping it in the server TypeScript project.
- Hackathon Reviewer Report:
  - Score before: 72/100.
  - Score after: 92/100 expected after patch and verification.
  - Blocking findings: none known.
  - Non-blocking findings: Chromium launch requires elevation in this environment; elevated PowerShell prints a non-project profile warning after successful browser runs.
  - Customer confidence notes: frontend now treats backend snapshots as authoritative in connected mode, keeps OpenAI backend-only, and continues to label enterprise execution as safe simulation mode.
- Verification results:
  - `npm run typecheck` passed.
  - `npm test` passed, 64 tests.
  - `npm run test:backend` passed, 20 tests.
  - `npm run build` passed.
  - `npm run scan:frontend-secrets` passed.
  - `npm run verify:fullstack` passed with 0 vulnerabilities.
  - `npm run typecheck:e2e` passed.
  - `npm run test:e2e` initially failed with `browserType.launch: spawn EPERM` in the sandbox, then passed with elevated browser launch, 12 Chromium tests.
  - `npm run test:e2e:preview` passed with elevated browser launch, 12 Chromium tests.
  - `git diff --check` passed with Windows line-ending warnings only.
- Blockers: none for implementation; browser launch needs escalation in this sandbox.

### 2026-07-05: Live OpenAI POC Smoke

- Branch: `backend-branch`
- Agents used: main orchestrator only.
- Trigger: user requested a live OpenAI API POC test.
- Files changed:
  - `tasks.md`
  - `loop_task_phases.md`
- Implementation tasks completed:
  - Checked for `OPENAI_API_KEY` without printing it.
  - Loaded the key only into the backend smoke process from local `.env`.
  - Ran direct `WorkspaceService` proposal generation against a temp SQLite DB.
  - Ran local HTTP `/api` proposal generation against a temp SQLite DB.
- Security And Secret Boundary:
  - No key, bearer header, raw prompt, or raw provider error was printed.
  - No browser OpenAI request was made.
  - The API key remained server-process-only.
- Results:
  - Direct service smoke passed.
  - HTTP `/api` smoke passed.
  - Provider mode: `openai`.
  - Provider label: `OpenAI Responses API`.
  - Model: `gpt-5.5`.
  - Invocation status: `succeeded`.
  - Validation status: `validated`.
  - Fallback code: none.
  - Proposal ID: `proposal-pattern-standard_access-v1`.
  - Audit trail included `Live OpenAI proposal generated`.
- Blockers: none.

### 2026-07-07: Dashboard UI Refinement Loop

- Branch: `backend-branch`
- Agents used: main orchestrator only. No subagents were used for this implementation pass.
- Trigger: user reported dashboard text, pre-execution green states, premature loaded/generated content, dropdown styling, spacing, and graph viewer issues from screenshots.

#### Iteration 1: Landing Metric Text

- Objective: prevent landing proof metrics from wrapping into awkward multi-line values and correct the synthetic-data wording.
- Files changed: `src/App.tsx`, `src/styles.css`, `tests/e2e/golden-demo.e2e.ts`.
- Implementation notes: replaced single metric strings with structured non-wrapping range spans, changed the proof copy to synthetic workflow traces, and changed preview execution copy from an approved run to a gated execution state.
- Verification result: passed automated verification and browser QA.
- Remaining issue: none known before verification.

#### Iteration 2: Premature Green States

- Objective: reserve green success styling for true success/completion instead of available or pre-execution states.
- Files changed: `src/app/AppShell.tsx`, `src/features/overview/OverviewView.tsx`, `src/features/review-run/ReviewRunView.tsx`, `src/styles.css`.
- Implementation notes: changed completed nav indicators to blue, made approval controls neutral/blue, made Overview next-action success depend on an actual execution run, and gated Review & Run success card styling behind `executionRun`.
- Verification result: passed automated verification and browser QA.
- Remaining issue: none known before verification.

#### Iteration 3: Dashboard Text Scale

- Objective: normalize dashboard text hierarchy across cards, summaries, status blocks, and review panels.
- Files changed: `src/styles.css`.
- Implementation notes: reduced oversized Overview/Review body copy, added shared card heading styles, tightened metrics typography, and kept labels on caption-sized tokens.
- Verification result: passed automated verification and browser QA.
- Remaining issue: none known before verification.

#### Iteration 4: Preloaded Before Execution

- Objective: avoid showing generated/executed outcomes before the corresponding workflow action exists.
- Files changed: `src/features/overview/OverviewView.tsx`, `src/features/review-run/ReviewRunView.tsx`.
- Implementation notes: Overview now shows pending/not-loaded/not-analyzed states until the relevant state exists; after-automation metrics remain neutral `Execute to view` values until `executionRun` exists; Review & Run delay savings remain a forecast until execution.
- Verification result: passed automated verification and browser QA.
- Remaining issue: none known before verification.

#### Iteration 5: Review Boundary And System Status Styling

- Objective: make dense review/status panels readable and polished.
- Files changed: `src/styles.css`.
- Implementation notes: extended bordered definition-list row styling to `.boundary-card` and `.status-card`, with wrapping `dd` content and consistent label hierarchy.
- Verification result: passed automated verification and browser QA.
- Remaining issue: none known before verification.

#### Iteration 6: Workflow Chooser Dropdowns

- Objective: apply a consistent native dropdown style across the workflow chooser and other dashboard selects.
- Files changed: `src/app/AppShell.tsx`, `src/styles.css`.
- Implementation notes: added a visible Workflow label to the toolbar chooser, preserved native select semantics, and made compact toolbar selects use the same bordered `.apple-select` treatment instead of transparent overrides.
- Verification result: passed automated verification and browser QA.
- Remaining issue: none known before verification.

#### Iteration 7: Spacing Repair

- Objective: repair broken dashboard/header/evidence spacing without changing product behavior.
- Files changed: `src/features/observe/ObserveView.tsx`, `src/styles.css`.
- Implementation notes: removed inline Evidence layout styles, added named Evidence summary classes, tightened bento card padding, and made the compact toolbar wrap cleanly on mobile.
- Verification result: passed automated verification and browser QA.
- Remaining issue: none known before verification.

#### Iteration 8: Workflow Viewer Graph

- Objective: make the workflow graph auto-size with a dotted background while preserving interaction and accessibility.
- Files changed: `src/app/useWorkGraphDemoController.ts`, `src/styles.css`.
- Implementation notes: spread visual graph node coordinates across more of the canvas, removed fixed graph min-width behavior, added a dotted canvas background, and reduced node sizing responsively.
- Verification result: passed automated verification and browser QA.
- Remaining issue: none known before verification.

#### Final Bug-Specific Pass

- Landing metric text: passed; landing metrics use structured non-wrapping ranges and corrected synthetic-data copy.
- Buttons/statuses green before execution: passed; pre-execution controls/statuses are neutral or blue, with green reserved for executed success.
- Dashboard text sizes: passed; Overview, Evidence, Review & Run, and status panels use the normalized text scale.
- Preloaded generated/executed content before workflow execution: passed; generated proposal and execution success content are gated by workflow state.
- Review boundary/System status styling: passed; definition rows are bordered, wrapped, and readable.
- Workflow chooser dropdown: passed; workflow, mobile view, and proposal version selects share the updated native select styling.
- Broken spacing: passed; header, toolbar, evidence, and dashboard layouts have no page-level horizontal overflow at tested viewports.
- Workflow viewer auto-resize with dotted background: passed; graph canvas uses a dotted background, auto-sized container, preserved labels/legend/pressed state, and no measured node overlaps in browser QA.

#### Verification Commands

- `npm run typecheck`: passed.
- `npm test`: passed, 12 files and 67 tests.
- `npm run build`: passed.
- `npm run typecheck:e2e`: passed.
- `npm run test:e2e`: passed, 12 Chromium tests.
- `npm run verify:demo`: passed, including `npm audit --audit-level=low` with 0 vulnerabilities.
- `git diff --check`: passed with line-ending warnings only.
- Browser QA: passed on `http://127.0.0.1:5173/`; landing, clean `/dashboard`, Graph, and Review & Run pre-execution states had no relevant console warnings/errors.

### 2026-07-07: Dashboard Copy And 100 Percent Scaling Follow-Up

- Branch: `backend-branch`
- Agents used: main orchestrator plus `worker_nano` for bounded copy/state edits; no `worker_major` was needed.
- Trigger: user reported remaining procurement synthetic notice, raw validation/provider copy, `0h`/`0 of 10`/`0/10` validation messaging, and graph breakage at 100% scaling.

#### Iteration 9: Procurement Notice Removal

- Objective: remove the visible procurement synthetic fixture sentence.
- Files changed: `src/fixtures/demoData.ts`, `src/features/overview/OverviewView.tsx`.
- Implementation notes: replaced the long procurement notice with short synthetic metadata and added a UI guard so the removed sentence is not rendered even if an older backend snapshot returns it.
- Verification result: browser QA at 100% scaling passed; automated verification passed.
- Remaining issue: none known before verification.

#### Iteration 10: Validation And Provider Copy

- Objective: remove raw/awkward status text such as `Output validation: not_applicable`, generated timestamp prose, `~0h`, and `0 of 10`/`0/10` claims from user-facing panels.
- Files changed: `src/app/useWorkGraphDemoController.ts`, `src/features/review-run/ReviewRunView.tsx`, `tests/e2e/golden-demo.e2e.ts`.
- Implementation notes: converted provider details and technical validation rows to plain-language labels, removed the generated timestamp from provider summary copy, and changed zero-savings or zero-pass simulations to a needs-review message rather than a success claim.
- Verification result: `npm run typecheck` passed locally; browser QA at 100% scaling found none of the reported bad strings; automated verification passed.
- Remaining issue: none known before verification.

#### Iteration 11: Graph Responsiveness At 100 Percent Scaling

- Objective: keep the workflow graph responsive at normal desktop browser scaling without page-level overflow, node overlap, or clipped labels.
- Files changed: `src/styles.css`.
- Implementation notes: increased graph canvas height responsiveness, gave the graph area more grid share, reduced fixed node width, contained node text/paint, and preserved the dotted background plus existing node/edge/legend semantics.
- Verification result: browser QA at 100% scaling passed with zero measured node overlaps, dotted background present, edge labels and pressed state preserved, and no page-level overflow; automated verification passed.
- Remaining issue: none known before verification.

#### Follow-Up Bug-Specific Pass

- Procurement synthetic fixture text: passed; exact removed sentence is not visible.
- Raw validation copy: passed; no visible `Output validation`, `not_applicable`, or generated-date provider phrase.
- Zero savings / zero validations copy: passed; no visible `~0h`, `0 of 10`, `0 / 10`, or `0/10` claim.
- Graph at 100% scaling: passed; `visualViewport.scale` was `1`, graph map measured 855px by 560px, and measured node overlaps were empty.
- Responsive page overflow: passed; measured page-level horizontal overflow was `0`.

#### Follow-Up Verification Commands

- `npm run typecheck`: passed.
- `npm test`: passed, 12 files and 67 tests.
- `npm run build`: passed.
- `npm run typecheck:e2e`: passed.
- `npm run test:e2e`: passed, 12 Chromium tests.
- `npm run verify:demo`: passed, including `npm audit --audit-level=low` with 0 vulnerabilities.
- `git diff --check`: passed with CRLF normalization warnings only.
