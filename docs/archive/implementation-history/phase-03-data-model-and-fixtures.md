# Phase 03: Data Model And Fixtures

## Objective

Define typed data contracts and realistic local fixtures for the IT access request demo.

## User-Facing Outcome

The demo has believable historical work traces, policy rules, approvals, exceptions, and a new incoming request that can power the full product flow.

## Implementation Tasks

- Define TypeScript contracts for raw traces, normalized items, patterns, graph, insights, proposals, simulation, governance, execution, and learning.
- Create sample historical requests across email, ticket, chat, approval log, and system action sources.
- Add policy rules for standard access, privileged access, contractor access, data-sensitive systems, and missing approvals.
- Add approval history and realistic timestamps.
- Add at least one new incoming request for execution.
- Add fixture loader and validation tests.

## Files Likely To Change

- `src/domain/`
- `src/data/`
- `src/fixtures/`
- `src/**/*.test.ts`

## Data Contracts

Contracts listed in `03-data-and-agent-design.md` must be implemented as TypeScript types or schemas.

## UI Requirements

Fixture data should support labels, counts, statuses, and details needed by all dashboard panels.

## Agentic Behavior Covered

Prepares the observable world for all later agents.

## Acceptance Criteria

- Every fixture maps to a typed contract.
- Historical data includes enough variety for pattern detection and exceptions.
- New request data supports execution demo.
- Tests validate fixture shape and key invariants.

## Verification Commands

```powershell
npm run typecheck
npm test
```

## Demo Checkpoint

Fixture summary can be rendered or logged with count by channel, department, system, status, and exception type.

## Risks And Mitigations

- Risk: fixtures feel synthetic or too small.
- Mitigation: include varied phrasing, timestamps, business roles, systems, approval outcomes, and policy exceptions.

## Completion Notes

Completed. Added typed domain contracts, deterministic IT access request fixtures with 13 historical cases and 55+ raw traces, policy rules, approval history, a new incoming request, fixture loader, and validation tests. `npm run typecheck`, `npm test`, and `npm run build` pass.
