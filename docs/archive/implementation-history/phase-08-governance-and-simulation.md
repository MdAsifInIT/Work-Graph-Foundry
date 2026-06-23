# Phase 08: Governance And Simulation

## Objective

Add historical replay simulation and human approval workflow.

## User-Facing Outcome

Users can test a proposed automation against history and approve, reject, or request changes with auditability.

## Implementation Tasks

- Implement simulation engine for historical cases.
- Classify each case as pass, fail, needs human, or policy risk.
- Aggregate simulation metrics and expected value.
- Implement governance decisions, comments, reviewer roles, and audit events.
- Block execution until approval exists.
- Add tests for simulation and governance state transitions.

## Files Likely To Change

- `src/domain/simulation*`
- `src/domain/governance*`
- `src/components/simulation*`
- `src/components/governance*`

## Data Contracts

- `SimulationResult`
- `SimulationCaseResult`
- `GovernanceRecord`
- `AuditEvent`
- `ReviewerRole`

## UI Requirements

Show simulation summary, case-level table, reviewer comments, decision state, audit timeline, and disabled execution before approval.

## Agentic Behavior Covered

Plan, test, and execute with governance.

## Acceptance Criteria

- Simulation results are deterministic and explainable.
- High-risk or missing-approval cases require human review.
- Governance decisions update audit state.
- Execution remains blocked until approval.

## Verification Commands

```powershell
npm run typecheck
npm test
npm run build
```

## Demo Checkpoint

Run simulation, show why some cases need human review, then approve the proposal with a comment.

## Risks And Mitigations

- Risk: governance looks decorative.
- Mitigation: enforce approval state in execution logic and audit trail.

## Completion Notes

Completed. Added historical replay simulation, aggregate simulation metrics, case classifications, governance records, approval gating, audit event generation, dashboard simulation panel, and approval state. Execution remains blocked until the proposal is approved. `npm run typecheck`, `npm test`, and `npm run build` pass.
