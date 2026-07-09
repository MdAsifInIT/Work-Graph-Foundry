# Samruna Hackathon Readiness Tasks

## Operating Rules

- Main thread acts as orchestrator and reviews all subagent output before integration.
- Implementation work is delegated to `worker_nano` or `worker_major`.
- Verification is delegated to `worker_test`.
- A phase is complete only after `worker_test` confirms tests or API checks pass.
- Commit after each verified phase before starting the next phase.
- Stop and document blockers if the same task fails after 3 consecutive iterations.

## Phase Plan

| Phase | Objective | Owner | Verifier | Status |
| --- | --- | --- | --- | --- |
| 1 | Backend Execution & OpenAI Integration | `worker_major` for architecture, `worker_nano` for localized implementation | `worker_test` | Complete |
| 2 | Synthetic Data Expansion | `worker_nano` | `worker_test` | Complete |
| 3 | Terminology Standardization | `worker_nano` | `worker_test` | Complete |
| 4 | Documentation Overhaul | `worker_nano` | `worker_test` | Planned |
| 5 | Quality Assurance & Remediation | `worker_major` for audit, `worker_nano` for fixes | `worker_test` | Planned |

## Progress Log

- 2026-07-09: Created orchestration tracker and initial worker mapping.
- 2026-07-09: Phase 1 started. Initial scan found an existing OpenAI proposal provider and deterministic execution runner; scope is to add OpenAI-backed execution while keeping fallback behavior.
- 2026-07-09: Phase 1 verified by `worker_test`. `npm run typecheck:server`, `npm run test:backend`, and targeted provider/execution tests passed. Live local API smoke used `.env` OpenAI settings and succeeded for both proposal and execution generation.
- 2026-07-09: Phase 2 started. Scope is to add additional business workflow scenarios with valid fixtures and scenario selection coverage.
- 2026-07-09: Phase 2 verified by `worker_test`. Fixture/persistence/workspace tests, server typecheck, e2e typecheck, and mock-provider smokes passed for `vendor-onboarding` and `invoice-exceptions`.
- 2026-07-09: Phase 3 started. Scope is context-aware terminology replacement from visible/documentation `demo` wording to `POC - Proof Of Concept`, while preserving identifiers, routes, file names, storage keys, and scripts.
- 2026-07-09: Phase 3 verified by `worker_test`. Remaining `demo` hits are intentional structural references. Server typecheck, e2e typecheck, and targeted domain/server tests passed.

## Blockers

- Full `npm run typecheck` currently fails on frontend module resolution for `clsx` and `tailwind-merge` in `src/features/landing/utils.ts`. Backend Phase 1 verification is not blocked; track for Phase 5 QA remediation.
