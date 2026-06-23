# Phase 06: Pattern Detection

## Objective

Detect repeated workflows, bottlenecks, and automation opportunities.

## User-Facing Outcome

Users see clusters of repeated work and understand why the access-request pattern is a strong automation candidate.

## Implementation Tasks

- Group normalized work items by request type, systems, policy path, and outcome.
- Score repeatability, volume, risk, manual effort, delay, and automation opportunity.
- Identify bottlenecks such as manager approval delays.
- Generate pattern summaries and representative examples.
- Add tests for grouping and score calculations.

## Files Likely To Change

- `src/domain/patterns*`
- `src/domain/insights*`
- `src/components/patterns*`
- `src/components/insights*`

## Data Contracts

- `WorkPattern`
- `PatternScore`
- `BottleneckInsight`
- `AutomationOpportunity`

## UI Requirements

Pattern list must show cluster name, volume, average cycle time, bottleneck, risk, opportunity score, and selected state.

## Agentic Behavior Covered

Understand and reason.

## Acceptance Criteria

- Access requests appear as a clear repeated pattern.
- Bottleneck insight is derived from fixture timestamps.
- Opportunity score balances volume, repeatability, delay, and risk.
- Pattern details support the planner phase.

## Verification Commands

```powershell
npm run typecheck
npm test
npm run build
```

## Demo Checkpoint

Show repeated access-request cluster and explain the bottleneck from system-calculated metrics.

## Risks And Mitigations

- Risk: scoring appears arbitrary.
- Mitigation: expose score components and keep formulas simple.

## Completion Notes

Completed. Added deterministic pattern grouping by request type, repeatability and opportunity scoring, manager approval bottleneck insights, opportunity value summaries, dashboard pattern panel, and pattern tests. `npm run typecheck`, `npm test`, and `npm run build` pass.
