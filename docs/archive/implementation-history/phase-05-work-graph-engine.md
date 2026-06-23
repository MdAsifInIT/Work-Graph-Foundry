# Phase 05: Work Graph Engine

## Objective

Create the work graph representation for a selected process pattern.

## User-Facing Outcome

Users can see how access requests move through actors, approvals, policies, systems, exceptions, and outcomes.

## Implementation Tasks

- Build graph generation from normalized work items.
- Define node and edge types.
- Calculate graph metrics such as volume, average duration, exception rate, approval delay, and automation eligibility.
- Highlight bottleneck and exception paths.
- Add graph visualization or structured graph panel.
- Add tests for graph generation and metrics.

## Files Likely To Change

- `src/domain/graph*`
- `src/components/graph*`
- `src/domain/metrics*`

## Data Contracts

- `WorkGraph`
- `GraphNode`
- `GraphEdge`
- `GraphMetric`

## UI Requirements

Graph panel must show the selected process flow with readable labels, edge metrics, selected-node details, and a fallback table if the visual graph is too dense on mobile.

## Agentic Behavior Covered

Observe and map.

## Acceptance Criteria

- Graph includes requester, manager approval, policy check, IT provisioning, audit logging, exception handling, and outcomes.
- Metrics are deterministic and traceable to fixture data.
- UI communicates the workflow without a long explanation.

## Verification Commands

```powershell
npm run typecheck
npm test
npm run build
```

## Demo Checkpoint

Select the access-request pattern and show the generated graph with bottleneck path highlighted.

## Risks And Mitigations

- Risk: graph is unreadable.
- Mitigation: keep the MVP graph curated and provide a details panel for selected nodes.

## Completion Notes

Completed. Added deterministic work graph generation from normalized work items, with actor, approval, policy, provisioning, audit, exception, and outcome nodes; graph edges; approval delay, cycle-time, and exception metrics; dashboard graph panel; and graph tests. `npm run typecheck`, `npm test`, and `npm run build` pass.
