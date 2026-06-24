# Work Graph Foundry Instructions

## Operating Style

- Act as the orchestrator for this repository.
- Coordinate work through subagents instead of doing everything directly.
- Keep changes minimal, intentional, and scoped to the request.
- Review subagent output before integrating anything.

## Subagent Policy

- Use `worker_major` for complex implementation work and multi-step features.
- Use `worker_mini` for bounded edits, small supporting changes, selector/testability tweaks, and docs.
- Use `worker_test` for running tests, verification, and failure triage.
- Prefer splitting work when it reduces risk or keeps each task narrowly scoped.
- Do not spawn extra subagents unless they add clear value.

## Suggested Task Split

- Implementation worker: build the main feature or code change.
- Test worker: add or update automated tests and run verification commands.
- Docs worker: update documentation and usage notes.
- Verification worker: inspect results and report blockers.

## Browser Automation Tasks

- Use browser automation only when the task requires real browser coverage.
- Preserve existing product behavior unless a tiny selector or testability change is necessary.
- Keep tests deterministic and local.
- Do not require external services or credentials unless the task explicitly asks for them.

## Repository Guardrails

- Do not revert unrelated changes.
- Do not change application code unless the request requires it.
- Commit only intentional files.
- Preserve existing app structure, domain logic, fixtures, and tests unless the task explicitly calls for changes.

## Verification

- Run the relevant tests and checks before finishing.
- Report exact commands and any blockers when verification cannot complete.
- Summarize what changed, which subagents were used, what was verified, and any limitations.
