# Phase 00: Repo Discovery

## Objective

Inspect the current repository and document existing files, frameworks, conventions, constraints, risks, and implementation assumptions.

## User-Facing Outcome

The team has a grounded implementation plan based on the actual repository state instead of assumptions.

## Implementation Tasks

- Inspect the repo file tree.
- Read existing product and prompt documentation.
- Confirm whether an app scaffold, package manager, scripts, source tree, and tests already exist.
- Recommend a technical direction.
- Record initial risks and assumptions.

## Files Likely To Change

- `docs/implementation/00-master-plan.md`
- `docs/implementation/05-risk-register.md`
- `docs/implementation/06-progress-tracker.md`
- `docs/implementation/phases/phase-00-repo-discovery.md`

## Data Contracts

No product data contracts are implemented in this phase.

## UI Requirements

No UI implementation in this phase.

## Agentic Behavior Covered

Codex observes the repository state and maps constraints before implementation.

## Acceptance Criteria

- Repository inventory is documented.
- Existing source material is identified.
- Selected stack is recorded.
- Missing app foundation is explicitly noted.
- Progress tracker is updated.

## Verification Commands

```powershell
Get-ChildItem -Force
rg --files
git status --short
```

## Demo Checkpoint

No runnable demo yet. The checkpoint is a saved implementation control system.

## Risks And Mitigations

- Risk: hidden repo conventions are missed.
- Mitigation: use `rg --files`, read existing docs, and revisit discovery after scaffolding if new files appear.

## Completion Notes

Completed during initial planning. The repo currently contains `work-graph-foundry-explainer.md` and `codex-autonomous-system` documentation, but no app scaffold or tests.

